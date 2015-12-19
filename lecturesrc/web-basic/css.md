CSS基础
=======
CSS(Cascading Style Sheets)-层叠样式表，定义了html文档内元素的显示样式，在上一节已经了解到可以在html文件内使用inline style来定义样式，但是通常更高效的做法是将样式定义在单独的一个文件中，即外部样式表。外部样式表中指定的html元素(标签)的样式能够对外部链接到该样式表的html文档内的所有标签生效，并且能讲html标签样式的设计工作独立出来，这无疑提高了工作的效率。

## CSS基础语法
CSS的语法构成非常简单，朴素的CSS和html一样，没有流程控制等概念(后面会简介less和sass)，其组成为：**选择器＋样式声明**，样式声明的构成为:**属性＋值**，如下图所示为对`h1`进行定义样式的操作，假设这条语句存储在一个后缀为`*.css`的文件中。

![css00](./pics/css/css00.gif)

如上声明语句定义了`h1`的`color`和`font-size`属性，分别表示颜色和字体大小。这样对外部链接了该CSS文件的html文档，`h1`的样式都将是指定的这个格式。

### 分组选择器
另外，选择器支持分组，即一次选择多个元素标签，用逗号隔开
```css
h1,h2,h3,h4,h5,h6 {
  color: green;
}
```

### 派生选择器
通过依据元素在其位置的上下文关系来定义样式，你可以使标记更加简洁。比方说，你希望列表(`<li></li>`)中的`<strong></strong>`元素变为斜体字，而不是通常的粗体字，可以这样定义一个派生选择器：
```css
li strong {
    font-style: italic;
    font-weight: normal;
}
```
这时只对`<li></li>`中的`<strong></strong>`起作用
```html
<p><strong>我是粗体字，不是斜体字，因为我不在列表当中，所以这个规则对我不起作用</strong></p>
<ol><!--有序列表-->
<li><strong>我是斜体字。这是因为 strong 元素位于 li 元素内。</strong></li>
<li>我是正常的字体。</li>
</ol>
```
合理的使用派生选择器可以减少不必要地使用`id`和`class`，减小工作量。

### id选择器
id选择器可以为标有特定id的html元素指定特定的样式。id选择器以`#`来定义。下面的两个 id 选择器，第一个可以定义元素的颜色为红色，第二个定义元素的颜色为绿色：
```css
#red {color:red;}
#green {color:green;}
```
下面的html代码中，id属性为red的p元素显示为红色，而id属性为green的p元素显示为绿色。
```html
<p id="red">这个段落是红色。</p>
<p id="green">这个段落是绿色。</p>
```
需要注意的是id是唯一的，因为它本身被设计出来就是为了作为一个元素的“身份“，不能产生二义性。

实践中id选择器常结合派生选择器来对某一特定元素的子元素进行样式定义。

### class选择器
class选择器以一个点号(`.`)开头，接`class`类名，如
```css
.center {text-align: center}
```
将使所有拥有center类的html元素居中。

class选择器也常和派生选择器一起使用，对特定类的子元素进行样式定义。

除了以上选择器，还可以对所有具有某一属性的元素进行样式定义，参考[属性选择器](http://www.w3school.com.cn/css/css_syntax_attribute_selector.asp)，这一个特性使用较少。

### 选择器继承
同时，CSS还具有继承的特性，比如对`<body></body>`定义字体类型，`<body></body>`中的子元素会继承该字体。建议入门时不要使用继承特性，这样会让整个样式结构显得比较混乱，做到这一点，即把一些样式尽量具体化到子元素，这样虽然会增加代码量，但是不容易出错。

在html基础中我们已经了解了常用的html标签(元素)，对应的是CSS语法的选择器，所以要继续学习CSS基础语法，我们需要了解常用的属性及每个属性可以选择的值的集合。

## 常用CSS属性及值选择
### 基础样式

设置背景样式:

|作用|属性|值集合|
|:--|:--|:----|
|背景颜色|background-color|[CSS合法颜色值](http://www.w3school.com.cn/cssref/css_colors_legal.asp)|
|背景图片|background-image|文件位置|
|背景重复|background-repeat|[background-repeat属性](http://www.w3school.com.cn/cssref/pr_background-repeat.asp)|
|背景定位|background-position|[background-position属性](http://www.w3school.com.cn/cssref/pr_background-position.asp)|
|背景滚动|background-attachment|[background-attachment属性](http://www.w3school.com.cn/cssref/pr_background-attachment.asp)|

参考页面：
1. [Google-Color Web Style](https://www.google.com/design/spec/style/color.html#color-ui-color-palette)
2. [Background Patterns](http://www.bgpatterns.com/)

设置文本:

|作用|属性|细节|
|:--|:--|:----|
|首行缩进|text-indent|[text-indent属性](http://www.w3school.com.cn/cssref/pr_text_text-indent.asp)|
|水平对弃|text-align|[text-align属性](http://www.w3school.com.cn/cssref/pr_text_text-align.asp)|
|词间距|word-spacing|[word-spacing属性](http://www.w3school.com.cn/cssref/pr_text_word-spacing.asp)|
|字符间距|letter-spacing|[letter-spacing属性](http://www.w3school.com.cn/cssref/pr_text_letter-spacing.asp)|
|字符变换|text－transform|none,uppercase,lowercase,capitalize|
|文本装饰|text-decoration|none,underline,overline,line-through|

有兴趣可以参考[汉字标准格式](https://css.hanzi.co/)，极大优化了中文排版。

设置字体:

|作用|属性|细节|
|:--|:--|:----|
|字体系列|font-family|[font-family属性](http://www.w3school.com.cn/cssref/pr_font_font-family.asp)|
|字体风格|font-style|normal,italic|
|字体变型|font-variant|[font-variant属性](http://www.w3school.com.cn/cssref/pr_font_font-variant.asp)|
|字体加粗|font-weight|[font-weight属性](http://www.w3school.com.cn/cssref/pr_font_weight.asp)|
|字体大小|font-size|[font-size属性](http://www.w3school.com.cn/cssref/pr_font_font-size.asp)|

参考页面:
* [CSS字体系列](http://www.w3school.com.cn/css/css_font-family.asp)

设置超链接：

链接的特殊性在于能够根据它们所处的状态来设置它们的样式。

|状态|含义|
|:--|:--|
|link|普通，未访问|
|visited|已访问|
|hover|取得鼠标指针焦点时|
|active|被点击的时刻|

[在线测试](http://www.w3school.com.cn/tiy/t.asp?f=css_link)

设置列表:

|作用|属性|细节|
|:--|:--|:----|
|列表类型|list-style-type|[list-style-type属性](http://www.w3school.com.cn/cssref/pr_list-style-type.asp)|
|列表图像|list-style-image|[list-style-image属性](http://www.w3school.com.cn/cssref/pr_list-style-image.asp)|

通常可以通过`list-style`来用简写的方式统一设置，参考[list-style属性](http://www.w3school.com.cn/cssref/pr_list-style.asp)。

设置表格:

|作用|属性|细节|
|:--|:--|:----|
|表格边框|border|[表格边框](http://www.w3school.com.cn/tiy/t.asp?f=csse_table_border)|
|边框折叠|border－collapse|[折叠边框](http://www.w3school.com.cn/tiy/t.asp?f=csse_table_border-collapse)|
|尺寸|width,height|px,%|

更多细节，参考[CSS表格](http://www.w3school.com.cn/css/css_table.asp)

## 框模型
CSS框模型更好地控制各个元素之间的区分界，结合下图很好理解：

![css01](./pics/css/css01.gif)

参考：[CSS框模型](http://www.w3school.com.cn/css/css_boxmodel.asp)

## less和sass
正如之前说的，CSS本身没有编程语言的特性，为了进一步提升工作效率，**变量**、**继承**、**运算**、**函数** 等概念得以引入，从而促成了sass和less的产生。less和sass实质上是对css的语法拓展，所以也称为**CSS预编译器**，目前说到设计样式表，通常都是实用sass和less来生成的。比如Bootstrap3之前的版本是用less写的，从3.0版本开始从less向sass迁移。

在课上完全理解less或sass需要花过多时间，两者本身的设计思想和使用都比较简单，大家可以课下花时间了解。当然，更重要的是时刻清楚我们想要做什么，针对样式设计来说，理解CSS的机制是最重要的。

参考:
1. [less教程](http://www.bootcss.com/p/lesscss/)
2. [sass十分钟入门](http://www.w3cplus.com/sassguide/)

## Homework
1. 本节有很多参考链接，逐一访问它们，跟着在线演示理解一遍，很快可以对css有一个入门的了解。
2. 阅读less教程或者sass教程，理解变量、mixins、继承、import等特性的机制。
3. Q: 如何深入学习CSS? A: 阅读[Way Lau－CSS3教程](https://www.gitbook.com/book/waylau/css3-tutorial/details)
