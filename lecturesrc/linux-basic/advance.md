## 进阶使用
本节介绍一些进阶的使用，进一步提升使用Linux的效率。

## 脚本
对于一些经常使用的指令，我们可以将他们放到一个文本文件中，然后给这个文本文件加上可执行权限，这样每次只需要执行这些可执行文件即可达到目的。以升级系统为例，需要在命令行输入
```bash
$ sudo aptitude update && sudo aptitude safe-upgrade
```
每次都这么长的指令通常是比较烦人的，为了解决这个问题，首先创建一个文本文件并用文本编辑器打开
```bash
$ touch sys-update
$ gedit sys-update
```
输入
```bash
#! /bin/sh
sudo aptitude update && sudo aptitude safe-upgrade
```
然后保存退出。然后给其加上可执行权限
```bash
$ chmod +x sys-update
```

然后在终端输入
```bash
$ ./sys-update
```
即可完成系统升级。

这种把命令行指令保存到文本文件中的方式，即是常说的**脚本**。

## 重定向输出
Linux shell（比如 Bash、Zsh）接收或发送序列和字符串流 形式的输入或输出，每个字符都独立于与之相邻的字符，字符没有被组织成结构化记录或固定大小的块。不管实际的字符串流进入或来自文件、键盘、显示窗口或其他 I/O 设备，都使用文件 I/O 技术来访问流。

输入流通常通过终端击键为程序提供输入。输出流通常向终端输出文本字符。简单说，程序的输入和输出即是I/O流。**重定向输出** 可以将指令的输出保存到文件，即**重定向**。可以通过两种方法将输出重定向到文件：
* `>`: 将输出 重定向到文件，必须具有该文件的写权限，如果该文件不存在，将创建它；如果该文件已经存在，通常将**覆盖**所有现有内容，并且没有任何警告。
* `>>`: 将输出 重定向到一个文件中，也一样要求具有该文件的写权限，如果该文件不存在，将创建它；如果该文件已经存在，输出将**附加到现有的内容后面**。

如果一个程序有大量的标准输出(log)，如`python -m SimpleHTTPServer`，我们希望将它们重定向到log文件以便查证，可以使用
```bash
$ python -m SimpleHTTPServer > log.txt
```
这样在每次开启一个HTTP服务器时，都会将输出覆盖`log.txt`。如果我们希望保留文件原来的内容，则可以使用`>>`。

## 管道
除了将输出重定向到文件，还可以在不同的指令之间用流进行**通信**。这种机制可以通过构造命令**管道线(Pipeline)** 来完成 - 来自一个命令的输出被导入或重定向为下一个命令的输入。
```bash
command1 | command2 | command3 | command4
```
命令之间用`|`分隔，通常不会用到这么长的管道线，更多的时候我们只用来连接两个命令。例如
```bash
$ cat .profile | less
```
可以将`cat`的输出通过管道传递给`less`。管道机制实际上用生产线和流程图的思想来提高程序执行的效率。

## grep
对于程序输出的文本，可以借助`grep`和管道符`|`来过滤文本，即查找特定的内容。例如`.zsh_history`文件中存储了我们运行的指令历史，如果想查看使用`cat`的历史，可以输入
```
$ cat .zsh_history | grep cat
```
来完成。

## find
`find`提供在文件系统中进行查找的功能，其使用的格式是`find`+`路径`+`参数`。例如在家目录里面查找带`.zsh`关键字开头的文件，可以输入
```bash
$ find ~ -name ".zsh*"
/home/guanhao/Documents/OnceCLI/.zshrc
/home/guanhao/Documents/OnceCLI/.zsh_aliases
/home/guanhao/.zsh_history
/home/guanhao/.zsh-update
/home/guanhao/.zshrc
/home/guanhao/.zsh_aliases
```
`-name`参数即用文件名进行规则匹配，规则在`""`中指定，`*`是Linux中的通配符，可以匹配任意字符。

除了`-name`参数外，还有一些其它有用的参数，如`-size`，如果我们需要在当前目录查找大于5MB的文件，可以输入
```bash
$ find . -size +5000k
```

`find`还支持很多参数选项，请参考`man find`。

## 链接
Linux文件系统的一个强大功能是**符号链接**，即创建一个文件的副本而不拷贝其数据区域，类似于C++的引用的机制。例如
```bash
$ mkdir iTunes
$ ln -s Music/TaylorSwift iTunes/TaylorSwift
$ ll iTunes
total 8
drwxrwxr-x  2 guanhao guanhao 4096 Nov 15 13:17 ./
drwxr-xr-x 17 guanhao guanhao 4096 Nov 15 13:18 ../
lrwxrwxrwx  1 guanhao guanhao   17 Nov 15 13:17 TaylorSwift -> Music/TaylorSwift
```
属性提示符的第一个`l`表示这是符号链接。符号链接占用的磁盘空间是很小的。`ll ~`可以发现zsh和tmux等的配置文件都是符号链接。

## 权限
权限是Linux安全机制的基石。特定的权限能够规范用户的操作，但仍然不排除需要修改权限的情形，前面讲过主要有`r,w,x`三类权限，现在我们来看看如何修改权限。

### chmod
`chmod`表示change the access mode，即修改访问权限。`chmod`使用`u,g,o`来分别表示所有者、所在组和其它用户的权限，使用`+,-`来增加和删除权限，例如
```bash
$ touch hello
$ chmod u+rwx,go-rwx hello
$ ll hello
-rwx------ 1 guanhao guanhao 0 Nov 15 13:28 hello*
```
以上指令给所有者(`u`)加上所有权限，给其它用户(`g`和`o`)删除所有的权限。

除了使用字母代码来修改权限外，还支持使用数字编码的方式来修改权限，Linux用`4`表示`r`，用`2`表示`w`，用`1`表示`x`，则所有用户的权限可以用三个数字来表示，例如`400`表示所有者可读，其它用户无权限，`500`表示所有者可读可执行，其它用户无权限，`777`表示给所有用户加上`rwx`权限。例如
```bash
$ touch goodbye
$ chmod 777 goodbye
```

**建议**: 如非必要，不要使用`chmod 777`。

## 初级进程管理
Linux系统运行了很多程序，这一小节介绍一些进程管理的技巧。

### 终端复用
[tmux](https://tmux.github.io/)是一个终端复用器，可以用于快速地在多个程序之间切换，提供多窗口和分屏等功能，并且能够detach(将程序切换到后台)和attach(将后台程序调到前台)。

启动`tmux`然后detach，然后管理这些window，整理各种程序。例如我们可以使用`server`来运行服务器程序，用`db`来运行数据库程序，在需要管理他们的时候attach上来就可以，这样显得井井有条;-)

常用的快捷键:

|快捷键|功能|
|:----|:---|
|Leader,-|水平分屏|
|Leader,\|垂直分屏|
|Leader,q|退出光标所在面板|
|Leader,h/j/k/l|在面板间切换|
|Leader,$|更改窗口名字|
|Leader,d|detach窗口|

其中`Leader`为触发tmux功能的热键，OnceCLI设置其为`Ctrl+a`。

最常用的操作流程：
1. `tmux -2`启动tmux
2. 然后`ctrl+a,-`或`ctrl+a,\`来分一些窗口，`ctrl+a,h/j/k/l`在窗口间切换并运行不同的任务
3. 使用`Ctrl+a,d`将当前的session给detach掉
4. 使用`tmux list-sessions`查看当前detech的sessions，使用`tmux at -t`+`session名字`可以将相应session切换到前台。

### 查看进程
除了使用`top`或者`htop`查看程序外，使用得更多的是`ps`，不加选项的`ps`输出的可用信息几乎没有，关于`ps`的选项可以参考其manual，最常用的选项是`aux`，能够输出进程拥有者，进程ID，占用的CPU和内存等信息。
```bash
$ ps aux
```
会输出大量信息，要过滤出有用的信息，可以使用管道和`grep`来过滤信息，例如
```bash
$ ps aux | grep dhclient
```
可以查看dhclient的进程号等信息。

### 终止进程
Linux中终止进程的机制也是采用给进程发送信号的原理，终止进程的信号是KILL，可以在终端使用
```bash
$ kill pid
```
来终止进程号为pid的进程。

## Problems
1. 把加载虚拟机共享文件夹的指令封装到一个脚本中。
2. 有重定向输出，从设计的角度应该有重定向输入，搜索并学习一下。
