---
layout: post
title: "Numpy编程基础"
modified: 2015-01-13 15:36:51 +0800
categories: 
tags: [Python]
image:
  feature: 
comments: true
share: true 
---
# 准备工作
用Numpy操作数值计算比单纯地采用Python要高效得多，因为Numpy一方面针对数值计算做过优化，另一方面，具有更丰富的数据类型和数据精度选择。
使用Numpy之前要导入用到的模块，在生产中采用
{% highlight python %}
from numpy import arange
{% endhighlight %}
要比
{% highlight python %}
from numpy import *
{% endhighlight %}
更好。学习过程中不必计较此点，因此开启ipython的`--pylab`选项是最方便的，可以导入学习numpy过程中几乎所有需要用到的模块，同时还可以节省输入`print`来查看变量值的时间。

# 数值阵列
阵列是几乎一切后续计算任务的基础，这一点numpy和matlab是一致的。
##　基本操作
Numpy采用`ndarray`来处理多维数值阵列(数组)，`ndarray`在内存中主要包含两部分：

* 描述数据的头
* 实际数据

数组的索引量与Python一样，从`0`开始。`.dtype`属性表示数组的数据类型，`.shape`表示数组的形状。示例:
{% highlight python %}
a = arange(5)
a.dtype
a.shape
{% endhighlight %}
将分别输出`dtype('int64')`(在64位环境下)和`(5,)`。其中`.shape`返回值为元组(tuple)类型，`arange(5)`方法返回`array([0,1,2,3,4])`，注意与`array([[0,1,2,3,4]])`区分，后者的形状为`(1,5)`，表示行向量。

## 数据类型
`.dtype`方法返回的数据类型，`.dtype.itemsize`返回以字节表示的数据大小。
Numpy提供的数据类型，主要如下表：

| 类型                | 说明                                  |
| :---                | ---:                                  |
| bool                | 布尔类型，占１位                      |
| inti                | 平台整型，`int32`或`int64`            |
| int8                | 1字节(-128至127)                      |
| int16               | 整型(-32768至32767)                   |
| int32               | 整型(-2^31至2^31-1)                   |
| int64               | 整型(-2^63至2^63-1)                   |
| uint8               | 无符号整型(0至255)                    |
| uint16              | 无符号整型(0至65535)                  |
| uint32              | 无符号整型(0至2^32-1)                 |
| uint64              | 无符号整型(0至2^64-1)                 |
| float16             | 半精度浮点数:符号位+5位指数+10位小数  |
| float32             | 单精度浮点数:符号位+8位指数+23位小数  |
| float64或float      | 双精度浮点数:符号位+11位指数+52位小数 |
| complex64           | 实数部分和虚数部分各用32位浮点数表示  |
| complex128或complex | 实数部分和虚数部分各用64位浮点数表示  |

数据类型之间在合理的情况下可以相互转换，例如`float64(42)`,`bool(42)`,`int8(42.0)`等。不合理的情况是指不能把复数转换为其他类型。但是可以把实数转换为复数，如`complex(1.0)`表示把1.0作为实部，虚部为j0的复数。

## 构造数据类型
了解了数据类型，就可以在定义数组时指定数据类型，如`arange(7,dtype=uint16)`。另外，可以指定一个数据类型给变量
{% highlight python %}
t=dtype('float64')
{% endhighlight %}
`t`的属性`.type`将返回`numpy.float64`,另外`.str`属性将会返回字符串表示的数据类型`'<f8'`，其中第一位表示数据存储的字节顺序，`<`表示最小位先存储，`>`表示最大位先存储，`f`表示`float`，`8`表示使用了8个字节即64位来存储双精度浮点数。

除了存储例如`arange(4)`产生的全是数的数据(齐次性的)，`ndarray`还可以存储非齐次的数据，即存储的数据不一定具有同样的数据类型，这和C语言的结构体概念很类似，称为结构数组。若不显式指明数据类型，`array()`函数将默认为处理浮点型数据，因此在定义结构数组前需要先构造数据类型。
{% highlight python %}
t = dtype([('name', str_, 40),('numitems', int32), ('price', float32)])
{% endhighlight %}
在IPython中输入`t`将输出`dtype([('name', 'S40'), ('numitems', '<i4'), ('price', '<f4')])`,或采用`t['name']`获取单个域的数据类型。构造了数据类型，即可定义一个结构数组
{% highlight python %}
itemz = array([('X(Deluxe Version)',666,110),('1989',888,120)],dtype=t)
{% endhighlight %}
即定义了一个结构数组来存储了两张唱片的存货量和价格等信息。

## 索引和切片
对于一维数组，例如`a=arange(9)`，`a[3:7]`将返回`array([3,4,5,6])`,3表示从下标为3的位置开始，７表示在下标为７之前的一个位置结束；`a[:7:2]`将返回`array([0,2,4,6])`，第一个参数省略，表示从下标0位置开始，第3个参数表示步进为2;`a[::-1]`将返回｀array([8,7,6,5,4,3,2,1,0])，即反序排列的数组，前两个参数省略，步进为负数表示从尾部开始索引。

对于多维数组,以2X3X4的数组作为示例
{% highlight python %}
b = arange(24).reshape(2,3,4)
{% endhighlight %}
为了便于理解，将数组可视化表示为

<figure>
    <a href="/images/numpybasic/slice.png"><img src="/images/numpybasic/slice.png" alt="_"></a>
</figure>

需要在3个维度确定下标的索引范围，采用`,`来分开三个维度的索引切片参数，在每一个位置，采用和一维数组相同的索引和切片规则，下表给出了多种索引和切片的方式

| 输入         | 输出                                                                                   |
| :--          | --:                                                                                    |
| b[0,0,0]     | 0                                                                                      |
| b[:,0,0]     | array([0,12])                                                                          |
| b[0]         | array([[0,1,2,3],[4,5,6,7],[8,9,10,11]])                                               |
| b[0,:,:]     | 同上                                                                                   |
| b[0,...]     | 同上                                                                                   |
| b[0,1]       | array([4,5,6,7])                                                                       |
| b[0,1,::2]   | array([4,6])                                                                           |
| b[:,1]       | array([[4,5,6,7],[16,17,18,19]])                                                       |
| b[0,:,1]     | array([1,5,9])                                                                         |
| b[0,:,-1]    | array([3,7,11])                                                                        |
| b[0,::-1,-1] | array([11,7,3])                                                                        |
| b[0,::2,-1]  | array([3,11])                                                                          |
| b[::-1]      | array([[[12,13,14,15],[16,17,18,19],[20,21,22,23]],[[0,1,2,3],[4,5,6,7],[8,9,10,11]]]) |

其中`...`可以用于替代多个`:`,在三维示例中体现不出什么用处，但是在更高维的数组里面就能使代码更加简洁。

## 改变数组形状
`ravel()`和`flatten()`可以将多维数组压缩为一维数组，不同的是`flatten()`会新分配空间存储空间。
`reshape()`和`resize()`可以根据元组给出一个参数改变数组的形状，不同的是`resize()`的操作是in-place的，即其会实质性地对b进行改变。
另外可以采用对`b.shape`赋值的方式对b的形状进行改变。