简单的http服务器
===============

服务器程序是开启http服务的软件系统，用于响应远程的web浏览器的请求。虽然浏览器能够直接打开html文件查看，但是可以注意到浏览器地址栏是以`file://`开头的，而遗留的安全设计考虑导致其不能执行本地文件，故给javascript的作用机制造成障碍，故需要使用实在的能提供http服务的程序来开启http服务，这样能够更快速更准确地看到自己写的代码，以及修改了代码，网页会怎么变化。

除了大型的服务器程序，如[Apache](https://httpd.apache.org/)，[Nginx](https://www.nginx.com/)外，我们有很多种方式来启动一个http服务，如[Github Pages](https://pages.github.com/)使用Ruby社区的[Jekyll](https://jekyllrb.com/)来生成静态页面，[nodejs](https://nodejs.org/en/)也可以开启http服务。虽然这些服务器程序的易用性都逐渐增强，但是依然需要一定的配置，给了解html、css、javascript带来了麻烦。为了规避这种麻烦，我们首先使用Python来开启一个简单的http服务器，打开终端，输入下面的代码
```bash
$ git clone https://git.oschina.net/OnceMore2020/webbasic-slides.git
$ cd webbasic-slides
$ python -m SimpleHTTPServer 8080
```
将会在给定的示例源码目录开启http服务，端口号8080。

如果当前linux拥有唯一的外网地址，那么可以用`ip:port`地址在web浏览器中访问网站；如果当前linux在局域网中，那么通过设置路由器端口转发也可以用`ip:port`访问，或者用局域网分配的ip在内网访问`local_ip:port`。`port`代表开启http服务时设置的端口号，在这里是8080。

OK，现在我们已经能够访问自己开启的web服务了。生成的网页是利用了html5特性的基于网页的slides，原项目是@bartaz开发的[impress.js项目](https://github.com/impress/impress.js)，本节课后作业会基于这个网页模版来完成。
