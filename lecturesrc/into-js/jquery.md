jQuery
======

> jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. With a combination of versatility and extensibility, jQuery has changed the way that millions of people write JavaScript.

[jQuery](https://jquery.com/) 是几乎每一个网站的前端都会使用的 JavaScript 库，因为它给 JavaScript 的开发带来了非常便利的特性:
* 可以忽略浏览器的差异了
* DOM的操作更加快捷和直观
* AJAX 的使用更加便捷

## 如何使用
jQuery 的发行版形式是单个`*.js`文件，包括用于开发的未压缩版本，和用于生产的压缩版本(浓缩到一行)。使用压缩版本能减少加载时间，适合在无需对jQuery进行自定义调整的场景，通常压缩版本的形式是`jquery.min.js`。使用jQuery非常简单，只需要从之前提到的 [bootcdn](http://www.bootcdn.cn/jquery/) 上复制一个script标签放到html文件里面即可。具体放置于`<head></head>`标签内还是html文档的末尾，开发者可以自行选择。

目前常用的jQuery版本横跨`1.x`到`3.x`版本，`3.x`版本还处于alpha阶段，暂时不建议使用。更常用的是`1.x`版本，因为保留了对古老浏览器的支持，如果我们决定不再对使用IE9之前版本的古老浏览器的用户友好，我们可以直接选择`2.x`版本，目前(2015-11-22)稳定的`2.x`版本号是`2.1.4`，稳定的`1.x`版本号是`1.11.3`。例如如果要使用`2.1.4`版本的压缩版本的jQuery，在`<head></head>`标签内加入
```html
<script src="//cdn.bootcss.com/jquery/2.1.4/jquery.min.js"></script>
```

## 选择器

在没有jQuery以前，要选择浏览器的DOM，需要使用`document.getElementById('show-btn')`之类的语法，先不说这样书写量大，效率低，这样还容易造成书写错误(大小写混杂的驼峰型变量)。有了jQuery后，同样地选择器，使用`$('#show-btn')`就可以完成！

### 别名
引入jQuery后，也就赠送了一个全局的`window.jQuery`变量，为了使用的简便，使用`$`来作为`jQuery`变量的别名，也就是说，`window.jQuery`和`window.$`是等价的，这也就解释了为什么我们很多时候阅读的js代码里`$`满天飞的情况。使用`$`简化了选择器的使用。

### 基础选择器
jQuery提供了完备的选择器功能，可以通过id,tag,class,属性查找，如下列表

|查找对象|示例|
|:-----|:---|
|id|`var main_id = $('#main')`|
|tag|`var img_tag = $('img')`|
|class|`var btn_class = $('.btn')`|
|属性|`var button = $('[type=button]')`|

如果jQuery选择器成功找到了DOM，则返回jQuery对象，如果没有找到，则返回`[]`，如果找到多个匹配的DOM，则返回`Array`对象作为DOM的容器。注意，id选择器通常得到的要不是`[]`那就是唯一的一个DOM。另外，class选择器还支持多个class同时选择，只需要填写多个class名字隔开即可。

**注意**: 选择多个class时**不要**使用空格隔开class，否则就变成了后面讲到的层级选择器。

### 组合选择器
组合选择器可以限定选择器查找时的范围，比如只需要查找`input`表单内的`email`，可以使用
```JavaScript
var emailInput = $('input[name=email]');
```
还可以使用tag和class组合
```JavaScript
var tr = $('tr.red');
```

### 多项选择器
除了一次选择多个class外，还可以和组合选择器结合来进行选择
```JavaScript
$('p,div'); // 把<p>和<div>都选出来
$('p.red,p.green'); // 把<p class="red">和<p class="green">都选出来
```

### 层级选择器
层级选择器可以更精细地选择，例如
```html
<div class="testing">
    <ul class="lang">
        <li class="lang-javascript">JavaScript</li>
        <li class="lang-python">Python</li>
        <li class="lang-lua">Lua</li>
    </ul>
</div>
```
可以通过`<div class="testing"></div>`和`<ul class="lang"></ul>`来选择到内层的`<li></li>`，因为前两者都是后者的父节点。
```JavaScript
$('ul.lang li.lang-javascript'); // [<li class="lang-javascript">JavaScript</li>]
$('div.testing li.lang-javascript'); // [<li class="lang-javascript">JavaScript</li>]
```

### 子选择器
注意到通过层级选择器可以选择到某一节点下**任意层次**的节点，要强制限定只能是父子关系，可以使用子选择器来实现
```JavaScript
$('ul.lang>li.lang-javascript'); // 可以选出[<li class="lang-javascript">JavaScript</li>]
$('div.testing>li.lang-javascript'); // [], 无法选出，因为<div>和<li>不构成父子关系
```

关于jQuery选择器的更多细节，例如过滤器等，参考: [jQuery 参考手册 - 选择器](http://www.w3school.com.cn/jquery/jquery_ref_selectors.asp)。

## 操作DOM

### 修改内容
jQuery提供了`.text()`和`.html()`两种方法来修改选择到的DOM，区别在于前者修改的是除标签外的文本，而后者是直接修改DOM的html代码。修改后的内容只需要放到括号内，用`''`括起来则可。例如上次的作业，要隐藏图像，我们可以直接将其父节点的html文本置空即可
```JavaScript
$('#father-div').html('');
```

### 修改样式
jQuery提供了`.css()`来修改DOM的样式，语法是`css('name', 'value')`，其中`name`是CSS的属性名字，`value`对应的是值。可以通过链式语法方便的批量修改CSS，例如对于
```html
<div id="test-id">
  <p style="background-color: #000000 ">Hello world</p>
  <p>Goodbye</p>
</div>
```
可以使用
```JavaScript
$('#test-id p').css('background-color', '#ffd351').css('color', 'red');
```
来一次性修改背景颜色和字体颜色。在不给`value`时，可以获取CSS属性，如`$('#test-id p').css('background-color')`可以获取当前的背景颜色。

### 显示和隐藏
其实显示和隐藏元素的最简单的实现是使用jQuery的`hide()`和`show()`方法
```JavaScript
var a = $('a[target=_blank]');
a.hide(); // 隐藏
a.show(); // 显示
```
这样的好处是，我们既不用手动修改html代码来改变DOM树结构，也不用修改CSS来修改其显示样式。

### 添加删除
jQuery提供了`.append()`和`.prepend()`方法来向选择的DOM内添加元素，前者是添加到末尾，后者添加到开头。示例
```html
<div id="test-div">
    <ul>
        <li><span>JavaScript</span></li>
        <li><span>Python</span></li>
        <li><span>Swift</span></li>
    </ul>
</div>
```
可以通过
```JavaScript
var ul = $('#test-div>ul');
ul.append('<li><span>Haskell</span></li>');
```
来讲字符串内的html添加到`<ul></ul>`内。除了传入字符串，还可以传入一个DOM对象，示例
```JavaScript
// 创建DOM对象:
var ps = document.createElement('li');
ps.innerHTML = '<span>Pascal</span>';
// 添加DOM对象:
ul.append(ps);

// 添加jQuery对象:
ul.append($('#scheme'));
```
另外，同级别的节点也支持插入新元素，需要用到`.after()`和`.before()`
```JavaScript
var js = $('#test-div>ul>li:first-child');
js.after('<li><span>Lua</span></li>');
```
在`<li><span>JavaScript</span></li>`之后插入了`<li><span>Lua</span></li>`。

删除DOM，只需要在选择之后使用`.remove()`即可。

### 表单
截至目前，我们还没有写过和服务器交互，**表单** 是用户向服务器提交信息的工具，如登录、注册、更新个人信息时填的表，就是表单。表单通常包含输入框，选框等组件，参考[Bootstrap - 表单](http://v3.bootcss.com/css/#forms)。jQuery提供了`.val()`方法来方便地修改表单的值，示例:
```JavaScript
/*
    <input id="test-input" name="email" value="">
    <select id="test-select" name="city">
        <option value="BJ" selected>Beijing</option>
        <option value="SH">Shanghai</option>
        <option value="SZ">Shenzhen</option>
    </select>
    <textarea id="test-textarea">Hello</textarea>
*/
var
    input = $('#test-input'),
    select = $('#test-select'),
    textarea = $('#test-textarea');

input.val(); // 'test'
input.val('abc@example.com'); // 文本框的内容已变为abc@example.com

select.val(); // 'BJ'
select.val('SH'); // 选择框已变为Shanghai

textarea.val(); // 'Hello'
textarea.val('Hi'); // 文本区域已更新为'Hi'
```

## 监听事件
要网页响应用户的请求，或是其他网页状态的变化，需要使用监听事件的机制来实现，例如上次作业中响应按钮，可以使用jQuery给选择器选择的DOM绑定一个响应函数，这个响应函数响应的是`click`**事件**。完整的事件列表，参考: [HTML事件属性](http://www.w3cschool.cn/html_ref_eventattributes.html)。

jQuery提供了`.on()`方法来给DOM绑定事件，以上节作业按钮的`click`事件为例，
```JavaScript
<script>
  $('#show-btn').on('click',function() {
    $('#test').html('<img src="./pics/snow.jpg" style="display:block;margin-left:auto;margin-right:auto;">');
  });

  $('#hide-btn').on('click',function() {
    $('#test').html('');
  });
</script>
```
这样监听到`click`事件后就会触发绑定的匿名函数，非常便利。

## AJAX
传统的网页在响应用户的请求后会返回一个新的网页，即一个请求对应一个单个的网页。从设计的角度来说这样是有明显的弊端的，如果网络延迟大，服务器响应的网页没有到达用户，用户就会得到一个404页面。一种新的思路是，页面使用JavaScript来发送请求，收到服务器的响应后再修改本地的页面，这样就不用再打开新页面(刷新本地页面)了，**AJAX(Asynchronous JavaScript and XML)** 就是用来做这个的。每次响应需要一个**回调函数** 来获取和处理响应，这样就能**部分更新网页**，而不是重新加载整个页面。

关于AJAX，再多开一门课也不够时间讲，细节请参考: [AJAX - 简介](http://www.w3school.com.cn/ajax/ajax_intro.asp)。

jQuery使用`.ajax()`方法来完成AJAX请求，语法是`ajax(url, settings)`，`url`是请求的页面，`settings`是请求的一些选项，包括:
* `async`: 默认是`true`,表示异步执行请求
* `method`: 默认是`GET`，可选项`POST`和`PUT`。
* `contentType`: 发送POST请求的格式，默认值为`application/x-www-form-urlencoded; charset=UTF-8`，也可以指定为`text/plain`或`application/json`
* `data`: 发送的数据
* `dataType`: 接受的数据格式，可以是`html`、`json`、`xml`。

举例，我们跨域访问豆瓣电影的API，获得*Into the wild*这部电影的信息，在作业的`index.html`内添加
```html
<div class="step slide" data-x="0" data-y="-700">
        <textarea id="ajax-response" class="form-control" rows="30">显示v2ex.com最热主题</textarea>
        <button type="button" class="btn btn-primary" id="ajax-btn">请求</button>
        <script>
            function ajaxLog(s) {
                var txt = $('#ajax-response');
                txt.val(txt.val() + '\n' + s);
            }
            $('#ajax-btn').on('click',function() {
                $('#ajax-response').val('');
                $.ajax('https://api.douban.com/v2/movie/subject/1905462', {
                    dataType: 'jsonp'
                }).done(function (data) {
                    ajaxLog('成功, 收到的数据: ' + JSON.stringify(data));
                }).fail(function (xhr, status) {
                    ajaxLog('失败: ' + xhr.status + ', 原因: ' + status);
                }).always(function () {
                    ajaxLog('请求完成: 无论成功或失败都会调用');
                });
        </script>
</div>
```
使用链式语法来回调函数`ajaxLog`，注意`dataType`为`jsonp`，因为豆瓣电影和我们的http服务器属于不同的域名，域外访问需要指定`jsonp`来实现。更多关于域外访问的细节，参考: [Cross-Origin Resource Sharing](http://www.w3.org/TR/cors/)。

## Next
要熟练使用jQuery，只凭本节的内容是远远不够的，最好的学习资料是[W3C的jQuery教程](http://www.w3school.com.cn/jquery/)。jQuery还可以干其他事情，例如实现动画效果等。此外，Bootstrap的JavaScript插件也很好地应用了jQuery，应该仔细阅读[Bootstrap - JavaScript插件](http://v3.bootcss.com/javascript/)。
