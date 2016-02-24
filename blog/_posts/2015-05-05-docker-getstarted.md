---
layout: post
title: "Docker上手"
modified: 2015-05-05 10:29:23 +0800
tags: [Coding]
---
本文摘抄自[Docker-从入门到实践](https://www.gitbook.com/book/yeasy/docker_practice/details)，作为Docker学习笔记整理概要。

# 什么是Docker
Docker 是一个伟大的开源项目，诞生于 2013 年初，最初是 dotCloud 公司内部的一个业余项目。
Docker 项目的目标是实现轻量级的操作系统虚拟化解决方案。Docker 的基础是 Linux 容器（LXC）等技术。
在 LXC 的基础上 Docker 进行了进一步的封装，让用户不需要去关心容器的管理，使得操作更为简便。用户操作 Docker 的容器就像操作一个快速轻量级的虚拟机一样简单。
项目目前遵从 Apache 2.0 协议。

**项目代码**: [Docker](https://github.com/docker/docker)

# 为什么要使用 Docker？

首先，Docker 容器的启动可以在秒级实现，这相比传统的虚拟机方式要快得多。
其次，Docker 对系统资源的利用率很高，一台主机上可以同时运行数千个 Docker 容器。

容器除了运行其中应用外，基本不消耗额外的系统资源，使得应用的性能很高，同时系统的开销尽量小。传统虚拟机方式运行 10 个不同的应用就要起 10 个虚拟机，而Docker 只需要启动 10 个隔离的应用即可。

具体说来，Docker 在如下几个方面具有较大的优势。

## 交付和部署
对开发和运维（devop）人员来说，最希望的就是一次创建或配置，可以在任意地方正常运行。
**开发者可以使用一个标准的镜像来构建一套开发容器，开发完成之后，运维人员可以直接使用这个容器来部署代码。**
Docker 可以快速创建容器，快速迭代应用程序，并让整个过程全程可见，使团队中的其他成员更容易理解应用程序是如何创建和工作的。
Docker 容器很轻很快！容器的启动时间是秒级的，大量地节约开发、测试、部署的时间。

## 高效虚拟化
Docker 容器的运行不需要额外的 hypervisor 支持，它是**内核级的虚拟化**，可以实现更高的性能和效率。

## 迁移和扩展

Docker 容器几乎可以在任意的平台上运行，包括物理机、虚拟机、公有云、私有云、个人电脑、服务器等。

## 更简单的管理
所有的修改都以增量的方式被分发和更新(自动脑补到git)，从而实现自动化并且高效的管理。

## 对比传统虚拟机

传统方式是在硬件层面实现虚拟化

![传统虚拟化](/blog/figures/head-first-docker/virtualization.png)

而Docker容器是在操作系统层面上实现虚拟化，直接复用本地主机的操作系统

![Docker](/blog/figures/head-first-docker/docker.png)

# 基本概念

## 镜像

**Docker 镜像**就是一个**只读**的模板。
镜像可以用来创建**Docker 容器**。

例如：一个镜像可以包含一个完整的 ubuntu 操作系统环境，里面仅安装了 Apache 或用户需要的其它应用程序。

## 容器

Docker 利用**容器**来运行应用。
容器是从镜像创建的运行实例。它可以被启动、开始、停止、删除。每个容器都是相互隔离的、保证安全的平台。
可以把容器看做是一个简易版的 Linux 环境（包括root用户权限、进程空间、用户空间和网络空间等）和运行在其中的应用程序。
镜像是**只读**的，容器在启动的时候创建一层**可写层**作为最上层。

## 仓库

**仓库**是集中存放**镜像文件**的场所，分为**公开仓库（Public）**和**私有仓库（Private）**两种形式，
概念跟 [Git](http://git-scm.com) 类似。

最大的公开仓库是 [Docker Hub](https://hub.docker.com)，存放了数量庞大的镜像供用户下载。
国内的公开仓库包括 [Docker Pool](http://www.dockerpool.com) 等，可以提供大陆用户更稳定快速的访问。

# 安装

常见的Linux发行版包管理器都包含了Docker，如Ubuntu下可采用`sudo apt-get install -y docker.io`来安装。
但是这些包版本较落后。

采用下面的方法可以简洁地安装新版本Docker

```
curl -s https://get.docker.io/ubuntu/ | sudo sh
```

运行完成后输入

```
sudo docker run -i -t ubuntu /bin/bash
```

若进入到一个虚拟的Bash，则表示安装成功(实际上这个命令还会自动下载ubuntu镜像)。

# 镜像

## 获取镜像

可以使用 `docker pull` 命令来从仓库获取所需要的镜像。
如从Docker Hub 仓库下载一个 Ubuntu 14.04 操作系统的镜像。

```
sudo docker pull ubuntu:14.04
```

实际上执行了 `$ sudo docker pull registry.hub.docker.com/ubuntu:14.04`，
即从注册服务器 `registry.hub.docker.com` 中的 `ubuntu` 仓库来下载标记为 `14.04` 的镜像。

官方仓库注册服务器下载较慢，可以从其他仓库下载。
从其它仓库下载时需要指定完整的仓库注册服务器地址，
并且需要在安装前修改配置文件`/etc/default/docker`文件，添加以下行

```
DOCKER_OPTS="--insecure-registry dl.dockerpool.com:5000"
```

以免出现证书问题。

例如从Docker Pool上下载Ubuntu 14.04镜像

```
sudo docker pull dl.dockerpool.com:5000/ubuntu:14.04
```


完成后，即可随时使用该镜像了，例如创建一个容器，让其中运行 bash 应用。

```
sudo docker run -t -i ubuntu:14.04 /bin/bash
```

## 查看镜像

查看本地已有的镜像

`sudo docker images`

会列出如下属性：

* `REPOSITORY`:来自于哪个仓库，如ubuntu
* `TAG`:镜像的标记，如14.04
* `IMAGE ID`:唯一标识一个镜像的ID
* `CREATED`:创建时间
* `VIRTUAL SIZE`:镜像大小

输入以下命令以简化上一步安装的ubuntu14.04镜像的`REPOSITORY`属性为ubuntu

```
sudo docker tag dl.dockerpool.com:5000/ubuntu:14.04 ubuntu:14.04
```

然后输入`sudo docker images`可以看到有两个ID相同的镜像，表示他们实际指向了同一镜像。

## 删除镜像
可以使用`sudo docker rmi [REPOSITORY:TAG]` 命令移除本地的镜像。

## 本地创建镜像

先使用ubuntu:14.04镜像启动容器。

```
sudo docker run -t -i --dns=114.114.114.114 ubuntu:14.04 /bin/bash
```

**注意**：`--dns`选项一定要加上，不然默认会让容器使用8.8.8.8的DNS，你懂的。

**记住**：启动bash后命令提示行首会显示`root@[ID]`，这个ID为当前运行的容器的ID，记住它，之后会用到。

在容器中修改ubuntu的软件源为中科大提供的源

```
vi /etc/apt/sources.list
```

在文件开头插入以下内容

{% highlight bash %}
deb http://mirrors.ustc.edu.cn/ubuntu/ trusty main restricted universe multiverse
deb http://mirrors.ustc.edu.cn/ubuntu/ trusty-security main restricted universe multiverse
deb http://mirrors.ustc.edu.cn/ubuntu/ trusty-updates main restricted universe multiverse
deb http://mirrors.ustc.edu.cn/ubuntu/ trusty-proposed main restricted universe multiverse
deb http://mirrors.ustc.edu.cn/ubuntu/ trusty-backports main restricted universe multiverse
deb-src http://mirrors.ustc.edu.cn/ubuntu/ trusty main restricted universe multiverse
deb-src http://mirrors.ustc.edu.cn/ubuntu/ trusty-security main restricted universe multiverse
deb-src http://mirrors.ustc.edu.cn/ubuntu/ trusty-updates main restricted universe multiverse
deb-src http://mirrors.ustc.edu.cn/ubuntu/ trusty-proposed main restricted universe multiverse
deb-src http://mirrors.ustc.edu.cn/ubuntu/ trusty-backports main restricted universe multiverse
{% endhighlight %}

在容器中安装Python

```
apt-get update && apt-get install python
```

结束后，我们使用 exit 来退出，现在我们的容器已经被我们改变了，使用 `docker commit` 命令来提交更新后的副本。

{% highlight bash %}
sudo docker commit -m "revise sources.list and install python" 0b2616b0e5a8 ubuntu:python
{% endhighlight %}

其中，`-m` 为提交说明，和git操作类似，之后是用来创建镜像的容器ID(之前要记住的那个)，
最后指定目标镜像的仓库名和`TAG`信息。创建成功后会返回新镜像的ID。
使用 `sudo docker images` 可以看到新创建的镜像，可以使用新镜像来启动容器

```
$ sudo docker run -t -i ubuntu:python /bin/bash
```

## Dockerfile!

使用 `docker commit` 来扩展一个镜像比较简单，但是不方便在一个团队中分享。
我们可以使用 `docker build` 来创建一个新的镜像。为此，首先需要创建一个 Dockerfile，包含一些如何创建镜像的指令。

在test文件夹中新建一个 Dockerfile

```
mkdir test && cd test
```

```
touch Dockerfile
```

Dockerfile 中每一条指令都创建镜像的**一层**，例如：

{% highlight bash %}
# This is a comment
FROM ubuntu:14.04
MAINTAINER guanhao <guanhao@wang.com>
RUN apt-get -q update
RUN apt-get -y install python
{% endhighlight %}

Dockerfile 基本语法:

* 使用`#`来注释
* `FROM` 指令告诉 Docker 使用哪个镜像作为基础
* 接着是维护者的信息
* `RUN`开头的指令会在创建中运行，比如安装一个软件包，在这里使用 apt-get 来安装了一些软件

编写完成 Dockerfile 后可以使用 `docker build` 来生成镜像。

```
sudo docker build -t="ubuntu:newpython" .
```

其中 `-t` 表示target，指定目标镜像的`REPOSITORY:TAG`，
“.” 为当前目录(存放Dockerfile)，也可以替换为一个具体的 Dockerfile 的路径。

可以看到 build 进程在执行操作。它要做的第一件事情就是上传这个 Dockerfile 内容，因为所有的操作都要依据 Dockerfile 来进行。
然后，Dockerfile 中的指令被一条一条的执行。每一步都创建了一个新的容器，在容器中执行指令并提交修改（就跟之前介绍过的 `docker commit` 一样）。当所有的指令都执行完毕之后，返回了最终的镜像 id。所有的中间步骤所产生的容器都被删除和清理了。

**注意**:一个镜像不能超过 127 层

此外，还可以利用 `ADD` 命令复制本地文件到镜像；用 `EXPOSE` 命令来向外部开放端口；
用 `CMD` 命令来描述容器启动后运行的程序等。例如

{% highlight bash %}
# put my local web site in myApp folder to /var/www
ADD myApp /var/www
# expose httpd port
EXPOSE 80
# the command to run
CMD ["/usr/sbin/apachectl", "-D", "FOREGROUND"]
{% endhighlight %}

## 从本地文件系统导入

要从本地文件系统导入一个镜像，可以使用 openvz（容器虚拟化的先锋技术）的模板来创建：
openvz 的模板下载地址为 [templates](http://openvz.org/Download/templates/precreated) 。

比如，先下载了一个 ubuntu-14.04 的镜像，之后使用以下命令导入：
```
sudo cat ubuntu-14.04-x86_64-minimal.tar.gz  |docker import - ubuntu:14.04
```

##上传镜像

用户可以通过 `docker push` 命令，把自己创建的镜像上传到仓库中来共享。
例如，用户在 Docker Hub 上完成注册后，可以推送自己的镜像到仓库中。

```
sudo docker push guanhao/ubuntu
```


