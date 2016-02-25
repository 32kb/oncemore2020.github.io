---
layout: post
title: "Markdown快速上手"
modified: 2014-03-31 20:42:37 +0800
tags: [Valyria Steel]
---
Markdown是一种[**轻量级标记语言**](http://zh.wikipedia.org/wiki/%E8%BD%BB%E9%87%8F%E7%BA%A7%E6%A0%87%E8%AE%B0%E8%AF%AD%E8%A8%80)，由[**John Gruber**](http://en.wikipedia.org/wiki/John_Gruber)和
[**Aaron Swartz**](http://en.wikipedia.org/wiki/Aaron_Swartz)创始。我之前使用过MS Office类文本处理器和TeX排版系统(算是两个派系)，
了解过Markdown后我认为他在前两者之间取了一个折中，即同时保留了**易读性**和**易写性**,所以有必要进行系统地学习。本文特色是和LaTeX
进行了对比分析。

# 文章目录
{:.no_toc}

* 这段文字会被替换为文章目录，但目录内不包括 "文章目录" 自身
{:toc}

#编辑器
推荐使用在线Markdown编辑器[**StackEdit**](https://stackedit.io/)，能够实现实时的预览，首先这是基于Web的，不依赖操作
系统，这足以使许多人不必为如何使用Markdown而望而生畏，对于学习和验证语法是很好的。写博客时还是
推荐采用自己熟悉的文本编辑器提高效率，许多静态博客工具(比如此博客采用的[**Jekyll**](http://jekyllrb.com/))会自动地生成相应的html网页。

#入门-基本语法 {#start}

##段落
一个段落是不包含空行的文本片段，当出现一个空行时，表示空行下面的是新段落。在区块对象之间使用空行一般是比较好的习惯。
在LaTeX下面，使用`\\`和`\newline`或是一个空行进行换行，使用两个空行进行段落区分。

##转义字符
接下来会介绍一些Markdown语法中的关键字(标号)，如何在文章中显示这些标号，而不是让Markdown处理
对应的关键字呢？方法和C的转义字符类似。使用反斜杠`\`后面加标号来实现，主要包括下面这些标号。

```Vim
\   反斜线
`   反引号
*   星号
_   底线
{}  花括号
[]  方括号
()  括弧
#   井字号
+   加号
-   减号
.   英文句点
!   惊叹号
```
而在LaTeX中，基本上所有的关键字都会以`\`号开始，这和转义字符思想是一样的。

##标题
Markdown采用`#`符号进行标题分级(类Atx形式)，最高可分级到六级标题。

```Vim
#一级标题

##二级标题

###三级标题

####四级标题

#####五级标题

######六级标题
```

---

#一级标题
{:.no_toc}

##二级标题
{:.no_toc}

###三级标题
{:.no_toc}

####四级标题
{:.no_toc}

#####五级标题
{:.no_toc}

######六级标题
{:.no_toc}

---

为了增强可读性，可在标题后面增加任意数量的`#`，但是标题分级由前面的`#`数量决定。

另外一种方法是类Setext形式，用`=`表示一级标题，`-`表示二级标题。

```Vim
一级标题
========

二级标题
--------
```

---

一级标题
========
{:.no_toc}

二级标题
--------
{:.no_toc}

---

注意`=`和`-`的数量是任意的，一般的习惯是写到与标题长度对齐。
如果采用LaTeX呢，能想到的是用`\section{}`来实现对文章分节从而实现类似的效果。

```TeX
\section{一级标题}
\subsection{二级标题}
\subsubsection{三级标题}
```

相比之下就会发现，使用Markdown来实现不需要章节自动编号的文章要简单得多，但是在文章需要有清晰的章节结构和自动编号的时候，
采用LaTeX仍然具有核心优势，特别是章节之间引用功能，是Markdown无法取代的。但这也正是Markdown的设计思想，轻量级。当然也有
跨界作品进行Markdown和LaTeX的整合，但已经暂时超出了Markdown基本语法的学习范围。

##引用
Markdown采用`>`符号进行标记引用的内容，引用允许采用嵌套，这时只需要采用`>>`即可，`>`的数量表示
嵌套的层次。同时，引用内允许采用其他markdown语法。

```Vim
> 张三丰道
>
>> 用意不用力，太极圆转，无使断绝。
>
> 当得机得势，令对手其根自断。一招一式，务须节节贯串，如长江大河，滔滔不绝。
> 他适才见张无忌临敌使招，已颇得太极三昧，只是他原来武功太强，拳招中棱角分
> 明，未能体会太极拳那“圆转不断”之意。
```

---

> 张三丰道
>
> > 用意不用力，太极圆转，无使断绝。
>
> 当得机得势，令对手其根自断。一招一式，务须节节贯串，如长江大河，滔滔不绝。
> 他适才见张无忌临敌使招，已颇得太极三昧，只是他原来武功太强，拳招中棱角分
> 明，未能体会太极拳那“圆转不断”之意。

---

在LaTeX中，需要使用摘录环境：`quote`,`quotation`或是`verse`。

```TeX
\begin{quote}
引文两端都缩进。
\end{quote}

\begin{quotation}
引文两端都缩进，首行增加缩进。
\end{quotation}

\begin{verse}
引文两端缩进，第二行起增加缩进。
\end{verse}
```

相比之下，在对引文格式没有严格要求的情况下，使用Markdown较为方便，但是对引文格式有严格要求的场合，LaTeX
仍然是最适合的，Markdown在这种场合之下需要手动设置各行的缩进，反而不如LaTeX方便。

##列表
支持无序列表和有序列表。无序列表使用`*`,`+`,`-`号进行标记,他们的作用是等效的。

```Vim
* 苹果
+ 番茄
- 板蓝根
```

---

* 苹果
+ 番茄
- 板蓝根

---

有序列表需要使用数字标号。

```Vim
1. 草莓
2. 黄瓜
3. 金银花
```

---

1. 草莓
2. 黄瓜
3. 金银花

---

需要注意的是，在列表标号(`*`,`+`,`-`,`1.`)后面，需要有一个空格。另外，有序列表前面的数字标号实际上并不需要是正确的(也就是
想看起来的样子)，这完全是给懒人设计的，比如采用：

```Vim
9. 鬼
5. 舞
2. 日
7. 决
```
得到的是下面的效果：

---

9. 鬼
5. 舞
2. 日
7. 决

---

列表也支持较长的文本(段落)，这时只需要列表标号和段落起始之间要保留空格就好，段落换行
后的行缩进与否并不重要，但是保持整齐的缩进是比较好的风格。


```Vim
* 张无忌道：“人家高兴，你也高兴，那才是真高兴啊。”那少女
  冷笑道：“哼！我跟你说在前头，这时候我心里高兴，就不来害
  你。哪一天心中不高兴了，说不定会整治得你死不了，活不成，
  到时候你可别怪我。”
* 张无忌摇头到：“我从小给坏人整治到大，越是整治，越是硬朗。”
  那少女冷笑道：“别把话说得满了，咱们走着瞧吧。“
```

---

* 张无忌道：“人家高兴，你也高兴，那才是真高兴啊。”那少女
  冷笑道：“哼！我跟你说在前头，这时候我心里高兴，就不来害
  你。哪一天心中不高兴了，说不定会整治得你死不了，活不成，
  到时候你可别怪我。”
* 张无忌摇头到：“我从小给坏人整治到大，越是整治，越是硬朗。”
  那少女冷笑道：“别把话说得满了，咱们走着瞧吧。“

---

如果一个列表项内包含多个段落，那么每个段落开头都必须缩进,不然会出现奇怪的格式错误，比如识别不出下一项列表项。


```Vim
* 张无忌道：“人家高兴，你也高兴，那才是真高兴啊。”

  那少女冷笑道：“哼！我跟你说在前头，这时候我心里高兴，就不来害
  你。哪一天心中不高兴了，说不定会整治得你死不了，活不成，
  到时候你可别怪我。”
* 张无忌摇头到：“我从小给坏人整治到大，越是整治，越是硬朗。”
  那少女冷笑道：“别把话说得满了，咱们走着瞧吧。“
```

---

* 张无忌道：“人家高兴，你也高兴，那才是真高兴啊。”

  那少女冷笑道：“哼！我跟你说在前头，这时候我心里高兴，就不来害
  你。哪一天心中不高兴了，说不定会整治得你死不了，活不成，
  到时候你可别怪我。”
* 张无忌摇头到：“我从小给坏人整治到大，越是整治，越是硬朗。”
  那少女冷笑道：“别把话说得满了，咱们走着瞧吧。“

---

如果需要在列表项里嵌入代码段或是引用段，需要注意引入额外的缩进以保持格式正确。

在LaTeX中，可以使用无序列表环境`itemize`，有序列表环境`enumerate`，描述列表
环境`description`以及**paralist**宏包提供的压缩列表环境`compactitem`，`compactenum`，
`compactdesc`以及行间列表环境`inparaitem`，`inparaenum`，`inparadesc`等多种环境。
在功能集合角度来说更加完备。同时，`\item`项后可以使用`[]`来设置不同的列表标记符号，
特别是和**amssymb**宏包配合起来的时候更加强大。例如：

```TeX
\begin{itemize}
	\item[$\spadesuit$] 令狐冲
	\item[$\clubsuit$]  任盈盈
\end{itemize}
```
能够得到这样的效果：
![latexlist](/images/markdownxuexibiji/latexlist.png)

##分隔线
在同一行中使用三个以上的`*`,`-`,`_`来建立一个分隔线，分隔线标号之间允许出现空格。

```Vim
***

---

___

* * *

```

在LaTeX中，采用`rule`来画分隔线，如`\noindent\rule{\textwidth}{1pt}`。

##代码块
一小段语句或是表达式可以用`` ` ``号括起来，注意如果代码片段内包含`` ` ``符号，需要使用两个`` ` ``括起来

```Vim
A single backtick in a code span: `` ` ``

A backtick-delimited string in a code span: `` `foo` ``
```

---

A single backtick in a code span: `` ` ``

A backtick-delimited string in a code span: `` `foo` ``

---

若是涉及到较长的多行代码片段，简单的代码块可以采用缩进来实现。


```Vim
下面是代码示例：

	#include<stdio.h>
	int main(void)
	{
		printf("旮那边的朋友你们好!\n");
		return 0;
	}
```

---

下面是代码示例：

		#include<stdio.h>
		int main(void)
		{
			printf("旮那边的朋友你们好!\n");
			return 0;
		}

---

如果需要代码语法高亮功能，需要配合相应插件来使用，推荐使用[**Pygments**](http://pygments.org/)。
用下面的方法将代码段拷贝进`{% raw %}{% highlight # %}{% endraw %}`和`{% raw %}{% endhighlight %}{% endraw %}`
之间即可。`#`表示相应的编程语言，可以参考[支持的语言](http://pygments.org/languages/)。

```Vim
#include<stdio.h>
int main(void)
{
	printf("旮那边的朋友你们好!\n");
	return 0;
}
```

在LaTeX中，需要采用**listings**宏包，功能同样非常完备，下面是我喜欢的一种配置。

```TeX
\usepackage{listings}
\lstset{numbers=left,numbersep=4pt,
frame=lines,framerule=1pt,basicstyle=\ttfamily\scriptsize,
}

...

\begin{lstlisting}[language=bash]
find ./positive_images/ -name '*.pgm' -exec\
	echo \{\} 1 0 0 18 36 \; >positives.txt
\end{lstlisting}

```

##强调
Markdown使用`*`和`_`标号来强调，包围在两个`**`或是`__`之间的内容会显示成粗体，包围在两个`*`或是`_`之间的
内容会显示成斜体。

```Vim
**滚粗**

__滚粗__

*黄药师*

_郭襄_
```

---

**滚粗**

__滚粗__

*黄药师*

_郭襄_

---

在LaTeX中，可以使用`underline`下划线强调，或是使用`emph`进行斜体强调，同时，可以使用
`textit`,`textsf`,`texttt`,`textbf`等来实现，功能比Markdown要完备。

##链接
Markdown支持两种形式的链接标记，其一是行内式，链接文字用`[]`括起来，链接地址用`()`括起来。
`"Title"`可以省略。

```Vim
这是我的[主页](http://oncemore2020.github.io "Title").
```

---

这是我的[主页](http://oncemore2020.github.io "Title").

---

如果链接地址需要多次使用，每一次都输入地址难免过于麻烦，这时候适合采用参考式。
参考式可以把链接地址内容在文章的任何地方用一个标记来表示，然后在其它地方引用这个
标记。如下面这个例程，使用第一行的参考式时，`homepage`标号在第二行定义。

```Vim
这是我的[主页][homepage]。
[homepage]: http://oncemore2020.github.io  "TEMPORA MUTANTUR NOS ET MUTAMUR IN ILLIS"
```

---

这是我的[主页][homepage]。

[homepage]: http://oncemore2020.github.io  "TEMPORA MUTANTUR NOS ET MUTAMUR IN ILLIS"

---

也可以省略第二个`[]`里的标记，这时会默认把链接文字就当成是标号。下面提供两种比较好的范例。

```Vim
I get 10 times more traffic from [Google] [1] than from
[Yahoo] [2] or [MSN] [3].

  [1]: http://google.com/        "Google"
  [2]: http://search.yahoo.com/  "Yahoo Search"
  [3]: http://search.msn.com/    "MSN Search"
```
或是

```Vim
I get 10 times more traffic from [Google][] than from
[Yahoo][] or [MSN][].

  [google]: http://google.com/        "Google"
  [yahoo]:  http://search.yahoo.com/  "Yahoo Search"
  [msn]:    http://search.msn.com/    "MSN Search"
```
都会产生下面的效果。

---

I get 10 times more traffic from [Google][] than from
[Yahoo][] or [MSN][].

  [google]: http://google.com/        "Google"
  [yahoo]:  http://search.yahoo.com/  "Yahoo Search"
  [msn]:    http://search.msn.com/    "MSN Search"

---

还有一种称为**自动链接**的方式，将地址直接放进`<>`中，支持网址和邮件地址。

```Vim
<address@example.com>

<http://example.com/>
```

---

<address@example.com>

<http://example.com/>

---

在LaTeX中，使用**hyperref**宏包可以实现超链接和文章内的交叉引用，功能更加完备。
如交叉应用的实现。

```TeX
\label{sec:hyperlink}

  ...

编号形式的链接：\ref{sec:hyperlink}
文字形式的链接：\hyperref[sec:hyperlink]{链接}
```

以及网址的链接实现：

```TeX
\url{http://oncemore2020.github.io}
\href{http://oncemore2020.github.io}{王师的主页}
```

文章内没有清晰明了的交叉引用是Markdown的软肋。

##图片
Markdown嵌入图片的方法和链接类似，也分为**行内式**和**参考式**。

**行内式**

```Vim
![Vim](/images/markdownxuexibiji/vim.png "vim logo")
```
以及**参考式**

```Vim
![Vim][id]

[id]: /images/markdownxuexibiji/vim.png "vim logo"
```

都能嵌入如下的图片。

---

![Vim][id]

[id]: /images/markdownxuexibiji/vim.png "vim logo"

---

图片地址可以采用网址或是本地路径。

Markdown的图片嵌入功能并不是很完善，比如不能较自由的控制图片大小位置以及对图片的引用和注释等等。相比之下，
LaTeX处理起图片相关的任务要成熟得多。常见的使用`figure`环境，如下面的IEEE Trans的规范插图方法。

```TeX
%Single Column Floating Figure
\begin{figure*}[!t]
\centering
\includegraphics[width=5in]{myfigure.pdf}
\caption{Simulation Results.}
\label{fig_sim}
\end{figure*}

%Double column floating figure
\begin{figure*}[!t]
\centering
\subfloat[Case I]{\includegraphics[width=2.5in]{box}%
\label{fig_first_case}}
\hfil
\subfloat[Case II]{\includegraphics[width=2.5in]{box}%
\label{fig_second_case}}
\caption{Simulation results.}
\label{fig_sim}
\end{figure*}
```

##表格
Markdown采用下面的语法来实现表格。无对齐格式的方法：

```Vim
Item      | Value
--------- | -----
Computer  | 1600 USD
Phone     | 12 USD
Pipe      | 1 USD
```

---

Item      | Value
--------- | -----
Computer  | 1600 USD
Phone     | 12 USD
Pipe      | 1 USD

---

以及设置对齐的方法,`:`在若干数量的`-`左边表示左对齐，`:`在若干数量的`-`右边
表示右对齐，若干数量的`-`位于两个`:`中间表示中间对齐：

```Vim
| Item      |    Value | Qty  |
| :-------- | --------:| :--: |
| Computer  | 1600 USD |  5   |
| Phone     |   12 USD |  12  |
| Pipe      |    1 USD | 234  |
```

---

| Item      |    Value | Qty  |
| :-------- | --------:| :--: |
| Computer  | 1600 USD |  5   |
| Phone     |   12 USD |  12  |
| Pipe      |    1 USD | 234  |

---

与插图环境类似，LaTeX在表格方面具有更完备的功能。下面是IEEE Trans的表格规范。

```TeX
%Floating Table
\begin{table}[!t]
\renewcommand{\arraystretch}{1.3}
\caption{An Example of a Table}
\label{table_example}
\centering
\begin{tabular}{|c||c|}
\hline
One & Two\\
\hline
Three & Four\\
\hline
\end{tabular}
\end{table}
```

##脚注
Markdown使用下面的方法来设置脚注。

```Vim
You can create footnotes like this[^footnote].

  [^footnote]: Here is the *text* of the **footnote**.
```

---

You can create footnotes like this[^footnote].

  [^footnote]: Here is the *text* of the **footnote**.

---

如果要实现和上面相同的脚注的话，LaTeX使用`footnote`来设置。

```TeX
You can create footnotes like this.\footnote{
Here is the \emph{text} of the \textbf{footnote}.}
```


#进阶-跨界合作
由于Markdown和html的同源性(就像辟邪剑谱和葵花宝典一样)，使得以轻量级著称的Markdown可以插上许多翅膀从而在某些方面实现逆袭。


##代码语法高亮-Pygments
这在入门部分的代码部分已经说明过。详细配置超出本文范围，可以参考其
<a href="http://pygments.org/" class="btn btn-info">官方网站</a>
配置过程非常简单。



##图标使用-Font Awesome

使用[**Font Awesome**](http://fontawesome.io/)可以方便地使用美观的矢量图标，并且支持通过CSS自定义缩
放，色彩，阴影等。查看
<a href="http://fontawesome.io/get-started/" class="btn btn-info">Get Started with Font Awesome</a>
以了解配置方法。最简单的是使用`BootstrapCDN`方法，我采用的是`LESS Ruby Gem`方法，这样进行自定义时
相对来说比较方便，且不用担心速度的问题。配置好之后可以到
<a href="http://fontawesome.io/icons/" class="btn btn-info">icons</a>
查看可用的图标，找到图标对应的标识符之后，可采用如下的方法使用。

```Vim
<i class="icon-file"></i>
```
其中`icon-file`为对应图标的标识符。下面的图标都是使用Font Awesome得到的。

<i class="icon-compass icon-4x"></i>
<i class="icon-weibo icon-4x"></i>
<i class="icon-file-text icon-4x"></i>
<i class="icon-linux icon-4x"></i>
<i class="icon-youtube-play icon-4x"></i>
<i class="icon-anchor icon-4x"></i>
<i class="icon-cloud-download icon-4x"></i>
<i class="icon-comments icon-4x"></i>
<i class="icon-camera icon-4x"></i>

更多使用方法，可以参考
<a href="http://fortawesome.github.io/Font-Awesome/examples/" class="btn btn-info">Examples</a>
了解更多。

由于LaTeX与html并不是很同源，所以要如此方便地使用图标功能，需要依赖于`METAFONT`和`METAPOST`，学习
曲线是比较陡峭的。

##文章内交叉引用
需要注意的是交叉引用并不是标准Markdown的语法，一些转换器提供了这个扩展，比如本博客采用
的[**kramdown**](http://kramdown.gettalong.org/)。以**kramdown**为例，介绍交叉引用的方法。
首先需要在需要引用的分级标题后设置一个`{#id}`，然后在其它任何地方使用这个唯一的标识符来进行
引用以方便文章内的跳转。比如在本文源文件的**入门-基本语法**后面进行标识。

```Vim
#入门-基本语法 {#start}
```
然后进行引用：

```Vim
[入门-基本语法](#start)
```
点击下面的链接会跳转到相应的部分。

---

[入门-基本语法](#start)

---

除了手动设置标题标识符之外，kramdown还支持自动生成各章节的标识符(这在默认的情况下是打开的)。
生成的规则如下：

- 删除除字母，数字，空格，横线以外的字符
- 删除第一个字母之前的字符
- 除了字母和数字外的字符被转换为横线
- 所有字母转换为小写形式
- 如果到了这一步所有字符都被删除了，使用`section`标识符
- 如果标识符重复，则自动在后面加`-1`,`-2`来加以区分

下面是标识符自动生成示例：

| Sample header | generated ID |
|:--------------|:-------------|
|# This is a header|this-is-a-header|
|## 12. Anather one 1 here|another-one-1-here|
|### Do ^& it now|do-it-now|
|# This is a header|this-is-a-header-1|
|# 123456789|section|
|# 金刚不坏之身|section-1|

kramdown的标识符生成算法没有考虑到中文支持，所以纯中文标题都会被编成`section`,并且会自动重命名加以区分。
比如本文中第一个标题是`编辑器`，则其对应的标识符为`section`,第二个标题是`入门-基本语法`，因为已经被手动
命名，所以其标识符就是手动命名的标识符，第三个标题是`段落`，则其标识符自动设置为`section-1`,依次类推。
这样的一个问题是需要引用的时候设置的标识符非常不清晰，所以在kramdown的标识符自动生成算法支持中文之前，
对需要引用的标题段手动设置标识符是比较好的方法。

如下将对`编辑器`段进行引用。

```Vim
[编辑器](#section)
```
点击下面链接将跳转到对应部分。

---

[编辑器](#section)

---

LaTeX的交叉引用功能前面已有介绍。

##自动生成目录
了解了kramdown对章节的自动标识，再理解kramdown如何自动生成目录，就显而易见了。
因为kramdown自动对每一个章节标题设置标识符，则用这些标识符生成目录是很简单的。
kramdown规定`toc`为目录的引用名，将其放置在一个列表项目中会自动替换为当前文章
的目录结构。

```Vim
# 文章目录
{:.no_toc}

* 这段文字会被替换为文章目录，但目录内不包括 "文章目录" 自身
{:toc}
```
`{:.no_toc}`告诉kramdown不要将文章目录包含到自身之中，列表项中的文字都会被替换
成目录项，所以上面代码中的那些字并不会显示出来，只会显示目录本身。文章目录本身
的标识符则是`markdown-toc`。点击下面链接跳转到目录：

[文章目录](#markdown-toc)

LaTeX的目录自动生成功能需要使用一条`\tableofcontents`来生成。

##数学环境-Mathjax
幸运的是kramdown内置了对LaTeX数学环境的支持，使用**MathJax**来渲染LaTeX数学表达式。但是并没有将MathJax合并
到kramdown中，要使用MathJax，需要在html的`script`段中添加如下代码，开启通过动态加载MathJax CDN来实现转换。

```html
<script type="text/javascript"
   src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
```

配置好MathJax以后，数学环境需要使用`$$`来包围，支持LaTeX ams宏包中的数学符号。
例如：

```Vim
$$
\begin{align*}
  & \phi(x,y) = \phi \left(\sum_{i=1}^n x_ie_i, \sum_{j=1}^n y_je_j \right)
  = \sum_{i=1}^n \sum_{j=1}^n x_i y_j \phi(e_i, e_j) = \\
  & (x_1, \ldots, x_n) \left( \begin{array}{ccc}
      \phi(e_1, e_1) & \cdots & \phi(e_1, e_n) \\
      \vdots & \ddots & \vdots \\
      \phi(e_n, e_1) & \cdots & \phi(e_n, e_n)
    \end{array} \right)
  \left( \begin{array}{c}
      y_1 \\
      \vdots \\
      y_n
    \end{array} \right)
\end{align*}
$$
```
将得到如下数学环境：

---

$$
\begin{align*}
  & \phi(x,y) = \phi \left(\sum_{i=1}^n x_ie_i, \sum_{j=1}^n y_je_j \right)
  = \sum_{i=1}^n \sum_{j=1}^n x_i y_j \phi(e_i, e_j) = \\
  & (x_1, \ldots, x_n) \left( \begin{array}{ccc}
      \phi(e_1, e_1) & \cdots & \phi(e_1, e_n) \\
      \vdots & \ddots & \vdots \\
      \phi(e_n, e_1) & \cdots & \phi(e_n, e_n)
    \end{array} \right)
  \left( \begin{array}{c}
      y_1 \\
      \vdots \\
      y_n
    \end{array} \right)
\end{align*}
$$

---


如果担心MathJax CDN的速度问题，可以查看
<a href="http://docs.mathjax.org/en/latest/installation.html" class="btn btn-info">Installing and Tesing MathJax</a>
将其配置到本地。事实上我采用从MathJax CDN转换速度并未受到明显影响。

由于数学环境本来就是从LaTeX中学习过来的，所以在这一点上并不需要进行比较。

#总结
通过上面的对比分析，可以发现Markdown的易用性好且功能基本齐全，非常适合写作，写技术笔记，发表博客文章等应用场合。而在
科技论文和大型书籍排版方面，LaTeX显得更为成熟，并且Markdown中许多扩展特性的思想和LaTeX中实现的方法大体相同。所以对有
人说的Markdown配合扩展会在将来取代LaTeX的论断，我并不是很认可。相反，Markdown和LaTeX应该会在未来变得更加明确自己的任
务分工，并不断巩固自己的地位，这样才能健康地发展下去。作为用户并不希望看到将来"MarkTeX"的出现。
