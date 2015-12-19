Node.js
=======
上一节已经介绍过，nodejs是“服务器端的JavaScript”，后程部分我们也会逐渐采用Nodejs来作为服务器程序。

## 安装
目前Ubuntu14.04软件仓库中提供的版本是`v0.10.25`，但是官网提供的长期支持版本是`v4.2.2`，并且最新的稳定版本已经到了`v5.1.0`，关于怪异的版本号问题，参考[请用 Node.js 4.0.0](https://cnodejs.org/topic/55efcc524b70f72113ff4f3b)。

后期`v4.x`和`v5.x`版本一定会成为主流，故推荐使用[nvm](https://github.com/creationix/nvm)来安装和管理更新版本的nodejs，打开终端，输入
```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash
$ source .zshrc
```
完成nvm的安装。nvm会将nodejs的二进制程序安装到用户自己的目录里面，从而不需要获取root权限，输入
```bash
$ which node
```
可以查看所在的位置。

nodejs提供了很多开发者写好的模块，使用这些模块可以更便捷地规避底层的细节实现，很多有用的工具，比如gitbook，grunt等，都是nodejs的模块，这和Python的一系列包是一样的道理。[npm](https://www.npmjs.com/) - Nodejs Pakcage Manager 是用来管理nodejs包的工具。要安装一个包，使用`npm install `来完成，例如
```
$ npm install gitbook
```
可以安装gitbook。

可以使用[淘宝npm](http://npm.taobao.org/)加速npm。

## http 服务器
在网页目录新建一个js文件`app.js`，拷贝如下内容:
```JavaScript
var http = require('http');

http.createServer(function (request, response) {
	// 发送 HTTP 头部
	// HTTP 状态值: 200 : OK
	// 内容类型: text/plain
	response.writeHead(200, {'Content-Type': 'text/plain'});

	// 发送响应数据 "Hello World"
	response.end('Hello World\n');
}).listen(8080);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8080/');
```
这时候打开浏览器输入 http://127.0.0.1:8080/index.html，可以看到页面显示了Hello, world.

但是，如果我们要响应的是本地的html文档，例如作业里的`index.html`，我们不仅要响应`index.html`的请求，还需要响应图片、js文件、CSS文件的请求，需要`url`模块来解析用户请求的地址，根据请求的地址来响应给用户不同的数据。
```JavaScript
var http = require('http');
var fs = require('fs'); // 读文件系统
var url = require('url'); // 解析url
var mime = require('mime'); // 解析文件类型

// 创建服务器
http.createServer( function (request, response) {  
   // 解析请求，包括文件名
   var pathname = url.parse(request.url).pathname;

   // 输出请求的文件名
   console.log("Request for " + pathname + " received.");

   // 从文件系统中读取请求的文件内容
   fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
         console.log(err);
         // HTTP 状态码: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else{	         
         // HTTP 状态码: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': mime.lookup(pathname)});

         // 响应文件内容
         response.end(data);		
      }
      //  发送响应数据
      response.end();
   });   
}).listen(8080);

// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8080/');
```

此时打开`http://127.0.0.1:8080/index.html`，就能够看到网页目录内的内容了。
