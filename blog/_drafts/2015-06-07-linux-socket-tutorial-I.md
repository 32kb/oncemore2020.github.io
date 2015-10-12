---
layout: post
title: "Linux套接字编程指南-Part I:API介绍"
modified: 2015-06-07 19:13:40 +0800
tags: [linux]
comments: true
description: "指南性的Socket编程简要总结,上半部分主要介绍套接字编程的流程和API的接口。"
share: true
---

un\*x系统**进程间通信(InterProcess Communication)**各种方式总称为**IPC**,如管道，队列，信号等，用于在同一计算机上运行的进程间通信。
**网络进程间通信(network IPC)**提供一种不同计算机上进程相互通信的机制,
POSIX.1规定的套接字接口基于4.4BSD。套接字接口可以采用不同的网络协议(不依赖于具体协议)，本文关注最TCP/IP协议栈套接字。
首先介绍套接字数据传输的基本流程，然后介绍套接字寻址规则和接口函数。
其中基本流程简单明了，寻址比较复杂，通常也是各种寻址编程给套接字编程引入了复杂性，本文将其独立出来解释。

# 0. 基本流程

面向连接的的套接字数据传输流程如下图(credits@Mani Radhakrishnan&Jon Solworth)所示。

![TCP-flowchart](/blog/figures/socket-tutorial/tcp-flow.png)

其中,**服务器(server)**和**客户端(client)**分别需要进行一系列操作，方框内表示需要调用的函数。

无连接的套接字通信流程如下图(credits@Mani Radhakrishnan&Jon Solworth)所示。

![Connectionless](/blog/figures/socket-tutorial/cc.png)

# 1. 面向连接的套接字

## 1.1 创建套接字

与文件描述符访问文件一样，套接字描述符是通信终端的抽象，实际上，套接字描述符在un\*x系统上的实现也是基于文件描述符的，
一些文件描述符相关函数(`read`和`write`)也兼容套接字描述符。套接字不依赖于具体协议，既可以是面向连接的，也可以是无连接的；
可以是基于数据包的，也可以是基于流的；可以是可靠连接，也可以是不可靠连接。一个套接字被其**域(domain)**,**类型(type)**和**协议(protocol)**完全确定。

要创建一个套接字，需要调用`socket`函数

{% highlight C %}
#include <sys/types.h>
#include <sys/socket.h>

// 返回值：若成功则返回套接字描述符，出错则返回-1
int socket(int domain, int type, int protocol);
{% endhighlight %}

参数解释：

* domain:域，确定地址格式
* type:套接字类型
* protocol:通常为0，表示按照给定的域和套接字类型选择协议

域通常以`AF_`开头，助记为*address family(地址族)*，常用的域包括

* AF\_INET:IPv4因特网域,ip+端口号
* AF\_INET6:IPv6因特网域,ip+端口号
* AF\_UNIX:UNIX域

常见的套接字类型包括

* SOCK\_DGAM:长度固定，无连接，不可靠，报文传输
* SOCK\_STREAM:有序，可靠，双向，面向连接，字节流
* SOCK\_RAW:IP协议数据报接口
* SOCK\_SEQPACKET:长度固定有序，可靠，面向连接，报文传输

`AF_INET`域中`SOCK_STREAM`类型的默认协议为TCP(传输控制协议)，`SOCK_DGRAM`类型的默认协议是UDP(用户数据报协议)。
数据报通信时不需要逻辑连接，而字节流需要在通信前建立逻辑连接。可以将数据报比喻为寄信，不能保证投递次序，且可能寄丢，
而面向连接的协议就像打电话，先要接通才能进行交流，且是双向的。

## 1.2 关闭/释放套接字

与文件描述符类似，创建描述符后，得到的是一个I/O描述符，不再使用时，采用`close`关闭释放描述符。
当一个套接字描述符被复制后，即开启**引用计数**机制，只有当所有引用被关闭时建立的网络连接才被释放。
在某些情况下，需要禁止读或者写数据，可以采用`shutdown`来禁止套接字的输入/输出，这对所有套接字引用均生效(无论有多少描述符引用)。

{% highlight C %}
//返回值：成功则返回0，出错返回-1
int shutdown(int sockfd, int how);
{% endhighlight %}

`how`参数可选列表：

* SHUT\_RD:关闭读端
* SHUT\_WR:关闭写端
* SHUT\_RDWR:关闭读写端

## 1.3 地址绑定

服务器为了接收客户端的连接请求，需要将服务器套接字绑定到一个众所周知的地址，这样客户端套接字才能发现用以连接服务器的地址。
`bind`函数将地址绑定到一个服务器套接字
{% highlight C %}
#include <sys/types.h>
#include <sys/socket.h>

//返回值:成功则返回0,出错返回-1
int bind(int sockfd, const struct sockaddr *addr, socklen_t len);
{% endhighlight %}

其中`sockfd`为套接字描述符，`addr`指向与地址族无关的地址结构体，
`len`为`addr`的字节数。具体细节在**3.3地址格式**中说明。
需要注意的是，与客户端的套接字关联的地址并没有太大意义，因为连接请求总是客户端发起的，其只需知道服务器的地址就可以建立连接。

## 1.4 服务器监听

服务器调用`listen`来宣告可以接收来自客户端的请求
{% highlight C %}
#include <sys/socket.h>

//返回值:成功则返回0，错误返回-1
int listen(int sockfd, int backlog);
{% endhighlight %}
参数`backlog`提示该进程所要入队的连接请求数量，上限由`<sys/socket.h>`中的`SOMAXCONN`决定。
调用了`listen`后，套接字就能接收连接请求。

## 1.5 客户端请求

客户端通过`connect`函数来指定建立连接的目标，并向该目标发送连接请求。
{% highlight C %}
#include <sys/socket.h>

//返回值:若成功则返回0，若出错则返回-1
int connect(int sockfd, const struct sockaddr *addr, socklen_t len);
{% endhighlight %}

当服务器等待队列满或服务器还未开启时，连接可能失败，需要引入处理机制。
可以采用自延时循环直至连接成功，除此之外，**指数补偿(exponential backoff)**算法较常用,
详见*《UNIX环境高级编程-第二版》*程序清单16-2。

## 1.6 接收请求

函数`accept`获得连接请求并建立连接。

{% highlight C %}
#include <sys/socket.h>

//返回值:成功则返回套接字描述符，错误则返回-1
int accept(int sockfd, struct sockaddr *addr, socklen_t *len);
{% endhighlight %}
注意到`accept`返回的套接字描述符连接到使用`connect`的客户端，
这个新的套接字描述符和原始套接字`sockfd`具有相同的套接字类型和地址族，除此之外，
`sockfd`和这个连接没有关联，继续保持可用状态，以便接收其他请求。

## 1.7 数据传输

虽然套接字描述符兼容`read`和`write`，但其不支持附加选项。使用更多的是`send`和`recv`函数。

`send`函数用于发消息

{% highlight C %}
#include <sys/socket.h>

//返回值：成功则返回发送的字节数，失败返回-1
ssize_t send(int sockfd, const char *buf, size_t nbytes, int flags);
{% endhighlight %}

其中`buf`指向待发数据，`nbytes`表示发送数据字节数，标志位`flags`可取

* 0:默认
* `MSG_OOB`:发送**外带(Out-of-Band)数据**

外带数据仅TCP协议支持，用于标记紧急数据，详细使用请参考*《UNIX网络编程》*。

`recv`函数用于接收数据
{% highlight C %}
#include <sys/socket>

//返回值：成功则返回消息字节数，失败返回-1
ssize_t recv(int sockfd, char *buf, size_t nbytes, int flags);
{% endhighlight %}
表示将最大长度为`nbytes`的数据存储进`buf`中，标志位`flags`可取

* 0:默认
* `MSG_OOB`:外带消息
* `MSG_PEEK`:返回报文内容而不真正取走报文(偷看)

注意到`send`和`recv`函数中都没有显式地指定目标地址，因为面向连接的套接字在建立连接的时候即隐含地存储了传输的目标地址。

# 2. 无连接的套接字
关于面向连接和无连接的套接字的区别在**1.1创建套接字**中有过介绍。
无连接的套接字是端到端的，甚至可以说没有服务器和客户端的概念(更强调发送端和接收端的概念)，数据传输过程包括
`socket`,`bind`(可选),`connect`(可选),`sendto/recvfrom`,`shutdown`,`close`等流程，
其中创建套接字和面向连接的套接字创建类似，不同的是规定套接字类型为`SOCK_DGRAM`，关闭/释放套接字和面向连接的套接字操作完全相同。
下面详细介绍`bind`,`connect`,`sendto/recvfrom`操作。

## 2.1 地址绑定

与面向连接的套接字不同，无连接的套接字没有严格的服务器的概念，即没有主机是在等待另一台主机的连接申请，
前面提到过，`bind`操作对于请求建立连接的套接字并没有太大意义，因此，
`bind`操作是可选的，地址可以在数据传输的过程中指定。

## 2.2 数据传输

函数`sendto`和`recvfrom`通常用于无连接的套接字上。`sendto`和`send`类似，区别是可以针对无连接套接字指定目标地址。

{% highlight C %}
#include <sys/socket.h>

// 返回值：成功则返回发送的字节数，失败返回-1
ssize_t sendto(int sockfd, const void *buf, size_t nbytes, int flags, const struct sockaddr *destaddr, socklen_t destlen);
{% endhighlight %}

表示将`buf`中缓存的长度为`nbytes`的消息，发送给以长度为`destlen`的`destaddr`指定的目标。

`recvfrom`函数用以接收数据，与`recv`区别在于可以定位数据发送端的地址。

{% highlight C %}
#include <sys/socket.h>

//返回值：成功则返回消息字节数，无消息返回0，失败时返回-1
ssize_t recvfrom(int sockfd, void *buf, size_t len, int flags, struct sockaddr *addr, socklen_t *addrlen);
{% endhighlight %}

表示接收最大长度为`len`的消息存储进`buf`，发送端的地址存储进`addr`，长度为`addlen`。

## 2.3 "建立连接"

函数`connect`还可以用于无连接的套接字，这样每次传输报文时就不需要再提供地址了。需要注意的是，
建立连接后，仅能收发来指定地址的报文，并且需要使用`send/recv`而不是`sendto/recvfrom`来传输数据。

# 3.寻址

通过基本流程，可发现无论是面向连接还是无连接的套接字，都需要规定：收/发的IP(`fromIP`,`toIP`)和端口(`fromPORT`,`toPORT`)以及采用的协议(`protocol`)。
套接字编程中最复杂的部分主要来自于这五个因素,下面具体介绍。

## 3.1端口

由于套接字通信连接需要固定的端口，需要注意linux的端口规则：

* 0-1023: 需要管理员权限才能使用
* 1024-5000: 常用的端口
* 5001-64K-1: 临时端口

## 3.2字节序

如果处理器架构为**大端(big-endian)**字节序，最大字节地址对应于数字**最低有效字节(LSB)**,**小端(little-endian)字节序**则相反。
一些处理器的字节序是固定的，另外一些处理器的字节序是可配置的，这给异构计算机系统交换数据造成了困难，所以网络协议必须指定网络字节序,
在使用套接字时，将处理器字节序转换为网络字节序，保证传输数据的终端在网络上交换的数据字节序是一致的。
**TCP/IP协议栈指定大端字节序**,对于TCP/IP应用程序，以下4个通用函数可以实现在计算机处理器字节序和网络字节序之间的转换。

{% highlight C %}
#include <arpa/inet.h>
uint32_t htonl(uint32_t hostint32); //以网络字节序表示的32位整型数
uint16_t htons(uint16_t hostint16); //以网络字节序表示的16位整型数
uint32_t ntohl(uint32_t netint32);  //以主机字节序表示的32位整型数
uint16_t ntohs(uint16_t netint16);  //以主机字节序表示的16位整型数
{% endhighlight %}
其中`h`表示主机(host),`n`表示网络(net),`l`表示32位整数(long),`s`表示16位整数(short)。

## 3.3地址格式

地址标识了特定通信中的端点，地址格式依赖于域，为了使套接字不依赖于具体通信域，
地址被强制转换为通用的地址结构`sockaddr`(参考**1.3地址绑定**)。

{% highlight C %}
struct sockaddr {
    sa_family_t sa_family; // 地址族
    char sa_data[];
    ...
};
{% endhighlight %}

套接字实现可以自由地添加额外成员并定义`sa_data`成员的大小。

因特网地址定义在`<netinet/in.h>`中，例如在`AF_INET`域中，套接字地址如下结构`sockaddr_in`所示:
{% highlight C %}
struct in_addr {
    in_addr_t s_addr; //IPv4地址
};

struct sockaddr_in {
    sa_family_t sin_family; //地址族
    in_port_t sin_port; //端口号
    struct in_addr sin_addr; //IPv4地址
};
{% endhighlight %}
注意`in_port_t`和`in_addr_t`均为整型，具体定义在`<stdint.h>`中。

各种域的地址结构相差较大，但都会被强制转换为`sockaddr`结构传入套接字中。

有时需要打印人能够理解的地址或手动指定地址并转换为计算机能够理解的地址，
需要用到`<arpa/inet.h>`中的`inet_ntop`和`inet_pton`两个函数在网络二进制地址(计算机理解的)和点分十进制字符串地址(人所理解的)之间转换,

{% highlight C %}
#include <arpa/inet.h>

//返回值:成功则返回1,格式无效返回0，错误返回-1
int inet_ntop(int domain, const char *addrPtr, char *strPtr, size_t len);

//返回值:成功则返回1，格式无效返回0，错误返回-1
int inet_pton(int domain, const char *strPtr, void *addrPtr);
{% endhighlight %}

`domain`参数支持`AF_INET`和`AF_INET6`，`strPtr`存储点分十进制表示的地址字符串，
`addrPtr`指向网络二进制地址(`AF_INET`为32位整型，`AF_INET6`为128位整型)。
`inet_pton`更常用，因为在编程中一般以字符串形式指定IP地址，然后用该函数转换后存入`sockaddr_in.sin_addr`中(详见示例程序)。

## 3.4 地址查询

地址查询常用于在应用程序中打印主机和服务信息。下面介绍地址查询函数，
这些函数会从各种地方(`/etc/hosts`, `/etc/services`, DNS, NIS)找到用户想要的信息。

过去最为常用的`gethostbyname`和`gethostbyaddr`可分别从主机名和地址获取主机信息，但是这两个函数会返回指向静态文件的指针，
并且对IPv6支持不好，故被认为是过时的，在将来会被淘汰，本文不做介绍。
POSIX.1定义的`getaddrinfo`和`getnameinfo`这两个替代函数被证明是更好的选择。

`getaddrinfo`允许将一个主机名字和服务名字映射(转换)到一个地址。

{% highlight C %}
#include <sys/socket.h>
#include <netdb.h>

// 返回值：成功则返回0，出错返回非0错误码
int getaddrinfo(const char *host, const char *service, const struct addrinfo *hint, struct addrinfo **res);

void freeaddrinfo(struct addrinfo *ai);
{% endhighlight %}
参数`host`为主机名或点分十进制表示的主机地址,`service`为十进制的端口号，或者已定义的服务名称，如nfs,ftp,http等，
通过`res`指针参数返回一个指向`addrinfo`结构体链表的指针。

`addrinfo`结构体至少包含如下成员
{% highlight C %}
struct addrinfo {
    int ai_flags;   //自定义标志
    int ai_family;  //地址族
    int ai_socktype;    //套接字类型
    int ai_protocol;    //协议
    socklen_t ai_addrlen;   //地址字节数
    struct sockaddr *ai_addr;   //地址
    char *ai_canonname; //规范主机名
    struct addrinfo *ai_next;   //链表的下一个节点
};
{% endhighlight %}

`hint`用于过滤地址，可以是空指针(不过滤)，或是指向`addrinfo`结构体的指针，表示期望返回的信息类型的暗示，
需要使用结构体中的`ai_family`,`ai_flags`,`ai_protocol`和`ai_socktype`成员,其他成员变量必须置0，成员指针指向`NULL`。
`ai_flags`常用标志如下

* AI_CANONNAME : 返回规范名，而不是别名
* AI_NUMERICHOST : 以数字形式返回主机地址
* AI_NUMERICSERV : 以端口号返回服务
* AI_PASSIVE : 套接字用于监听绑定

另外需要注意的是，返回的错误信息需要用`gai_strerror`来转换
{% highlight C %}
#include <netdb.h>

//返回值：指向描述错误的字符串的指针
const char *gai_strerror(int error);
{% endhighlight %}

函数`getnameinfo`将地址转换为主机名或者服务名
{% highlight C %}
#include <sys/socket.h>
#include <netdb.h>

//返回值：成功则返回0，错误则返回非0值
int getnameinfo(const struct sockaddr *addr, socklen_t alen, char *host, socklen_t hostlen, char *service, socklen_t servlen, unsigned int flags);
{% endhighlight %}
将套接字地址`addr`(长度为`alen`)转换为主机名或服务名，若主机名和服务名任一非空，则存储进长度分别为`hostlen`和`servlen`的缓冲区`host`和`service`中。
`flags`指定转换方式，可取

* NI_DGRAM : 服务基于数据报而非基于流
* NI_NAMEREQD : 如果找不到主机名，则返回错误
* NI_NOFQDN : 对于本地主机，仅返回完全限定域名的节点名字部分
* NI_NUMERICHOST : 以数字形式返回主机地址
* NI_NUMERICSERV : 以数字形式返回服务(端口号)
