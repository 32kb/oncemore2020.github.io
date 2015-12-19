Bootstrap框架
============
引用Boostrap网站上的说法
> Bootstrap 是最受欢迎的 HTML、CSS 和 JS 框架，用于开发响应式布局、移动设备优先的 WEB 项目。

这句话一点都没有错，阅读过前面几节，一定会发现从头开始一行一行代码地写出一个漂亮的网站，实在是一个费时费力的事情，首先需要把基础的html元素写好，还要设计各个元素的样式(至少要适配不同分辨率的设备吧)，最后还要写javascript来驱动网页和实现交互。最关键的还不是这个，而是由普遍缺乏艺术灵性的工科生设计(designing, not coding)出来的网站，真的可能**很丑！** 自从Bootstrap出现之后，这个事情变得简单了不止一点点。如果觉得之前几节都无法一时久掌握，没关系，有了Bootstrap，我们照样可以写出漂亮的网页！

## Bootstrap 历史
Bootstrap 最初是由就职于 Twitter 的一个设计师和一个工程师创造的，现在，Bootstrap 已经成为了这个世界上最流行的前端开发框架和开源项目。Bootstrap 最初是由 @mdo 和 @fat 于2010年中旬创造的。 在开源之前被称为 Twitter Blueprint。经过几个月的开发，Twitter 举办了首届 Hack Week 并将这个项目被公布出来，各个技能水平的开发者都可以在没有任何外部指导的情况下参与进来。在开源之前的近一年多的时间里，这个项目作为公司内部工具开发的样式指南，当然，现在它仍然扮演者同样的角色。

参考: [Bootstrap-About](http://getbootstrap.com/about/)

## 获取Bootstrap
要使用Bootstrap，我们需要获取其css文件和js文件，以及字体和图标文件，主要文件结构如下
```
bootstrap/
├── css/
│   ├── bootstrap.css
│   ├── bootstrap.css.map
│   ├── bootstrap.min.css
│   ├── bootstrap.min.css.map
│   ├── bootstrap-theme.css
│   ├── bootstrap-theme.css.map
│   ├── bootstrap-theme.min.css
│   └── bootstrap-theme.min.css.map
├── js/
│   ├── bootstrap.js
│   └── bootstrap.min.js
└── fonts/
    ├── glyphicons-halflings-regular.eot
    ├── glyphicons-halflings-regular.svg
    ├── glyphicons-halflings-regular.ttf
    ├── glyphicons-halflings-regular.woff
    └── glyphicons-halflings-regular.woff2
```
这些文件都应该作为相对于html文档的外部文件，浏览器在渲染html文档时能够以某种方式找到这些文件。传统的方式是把他们全部放置在网站源代码目录中，这样浏览器会像获取html文档一样以http协议获取这些文件。这样做的缺点是服务器负载增大，并且速度无法保证，并且流量消耗大造成费用增加。

课前阅读资料中提到了[BootCDN](http://www.bootcdn.cn/)，CDN(Content Delivery Network)－内容分发网络，能够将网页的一些资源放到其它地方，这样浏览器可以从多个地方加载网页资源，提高性能。通常放置在CDN上的网页资源是一些公用的网页资源(当然现在很多其它网页资源也放到了CDN上面)，比如，Bootstrap资源！BootCDN上还收录了许多其它的插件，比如jQuery等，还包括一些字体资源。当然，提供类似服务的也不止BootCDN，国内外还有很多类似的服务。当CDN被用做整个网站资源的加速时，通常被包装成收费服务提供给开发者(CDN加速服务)。

使用CDN来加载Bootstrap的方式也很简单，只需要把css的href和javascript的src属性设置为BootCDN提供的地址即可。即把下面代码放到自己的网页的`<head></head>`之间
```html
<!-- 新 Bootstrap 核心 CSS 文件 -->
<link rel="stylesheet" href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css">
<!-- 可选的Bootstrap主题文件（一般不用引入） -->
<link rel="stylesheet" href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">
<!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<script src="//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>
<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script src="//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
```

好了，现在已经可以开始使用Bootstrap来快速设计网页了！

## 全局CSS样式
Bootstrap设置了全局的CSS样式，即只要给html元素添加class就可以具有Bootstrap组件的效果。

首先，确保html文档的格式
```html
<!DOCTYPE html>
<html lang="zh-CN">
  ...
</html>
```

然后，如html基础一节所说了，为了自动适配不同分辨率的设备，需要在`<head></head>`中添加
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```
这个时候，用户的设备访问网页时会自动根据设备分辨率调整显示效果，用户也具有缩放网页的能力，要禁用这一权限，可以做如下设置
```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
```

在不同设备上如何调整各个框格之间的位置和缩放是非常麻烦的事情，幸运的是，Bootstrap 提供了一套响应式、移动设备优先的**流式栅格系统**。

参考：[栅格系统](http://v3.bootcss.com/css/#grid)

## 组件
Bootstrap提供了可复用的组件，包括字体图标、下拉菜单、导航、警告框、弹出框等，不仅美观，而且全部采用响应式设计，自动适配分辨率！

官方文档对各个组件的使用提供了详细的说明，并且由示例代码，是最好的学习文档。

参考: [Bootstrap组件](http://v3.bootcss.com/components/)

## JavaScript驱动
Bootstrap同时支持使用javascript来动态地驱动网页内容，同样地，官方文档提供了详尽地说明。

参考[JavaScript插件](http://v3.bootcss.com/components/)

在之后的单独的javascript课中，很多实例将采用bootstrap框架来驱动。

## 自定义
除了默认的CSS样式外，还可以进行自定义并生成css文件，访问[Bootstrap－定制](http://v3.bootcss.com/components/)使用这一功能！

## Homework
将[Bootstrap组件](http://v3.bootcss.com/components/)添加到“简单的HTTP服务器一节”中下载的网页源代码文件中的对应部分(源代码中有指引)，体会使用Bootstrap是多么地简单。

**提示**:
1. Ubuntu中内置文本编辑器为gedit，进入源代码目录之后运行
```bash
$ gedit index.html
```
打开源代码进行编辑，编辑源代码的过程中服务器可以保持运行，修改源代码后保存代码就可在浏览器中刷新查看效果。
2. 直接从代码的第38行开始书写代码
3. 如果觉得虚拟机里面的文本编辑器不趁手，可以将index.html拷贝到共享文件夹中，然后在主机windows中使用自己喜欢的代码编辑器编辑代码，然后通过共享文件夹访问index.html并覆盖虚拟机中的源代码。(linux中拷贝文件的指令:`cp source target`,使用`cp /shared_folder/index.html /source_folder/index.html`可以直接覆盖旧文件)。

**参考代码(2015-11-16更新)**:
1. git仓库地址从gitcafe迁移到了git@oschina，所以需要重新克隆仓库到本地，代码：
   ```bash
   $ git clone https://git.oschina.net/OnceMore2020/webbasic-slides.git
   $ cd webbasic-slides
   ```
2. 【重要】:一定要开启http服务器访问html文档，而不是使用浏览器直接打开`index.html`
3. 参考代码不唯一
