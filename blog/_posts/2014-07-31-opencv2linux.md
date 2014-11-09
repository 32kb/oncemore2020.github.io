---
layout: post
title: "快速开始学习OpenCV"
modified: 2014-07-31 12:12:24 +0800
tags: [OpenCV,Computer Visions,handbook]
image:
  feature: homefeature.jpg
comments: true
share: true
---

在Linux下安装好OpenCV2后，如何快速开始使用或学习OpenCV是首要问题。如何编译一个采用了OpenCV运算库的程序呢(C/C++)？有下面几种不同的思路：

* 使用命令行gcc给定编译参数进行编译(复杂度高);
* 使用一个IDE，配置头文件和库文件路径，常用的有Eclipse，Code::Blocks，Qt等(复杂度适中);
* 使用命令行工程构建工具CMake(清晰明了，复杂度低，易于上手).

本文采用最后一种方式，推荐采用Linux作为工作环境，专注于算法理解和学习实现的同学使用。在[编译安装OpenCV](http://oncemore2020.github.io/blog/opencv2install/)
的时候已经安装好了CMake以及一系列构建工具，现在介绍如何使用工具包来编译程序。

# 工作目录树
使用CMake构建工程，工作目录应该具有如下结构：

{% highlight bash %}
--------------------
    |-CMakeLists.txt
    |-main.cpp
--------------------
{% endhighlight %}

其中`CMakeLists.txt`是工程设定文件，稍后深入了解其内容，`main.cpp`是源程序文件。

# CMake设定
这里给出一种简单可复制的工程设定文件，在应用到其它源程序时只需要进行少量修改。

{% highlight bash %}
cmake_minimum_required(VERSION 2.8)
project( main )
find_package( OpenCV REQUIRED )
add_executable( main main.cpp )
target_link_libraries( main ${OpenCV_LIBS} )
{% endhighlight %}

设置文件是很容易理解的，规定了工程文件名，程序包要求，编译源文件名，编译目标可执行文件名，以及链接库对象和库路径。

# 源文件
采用一个简单的程序进行演示，程序用到`core.hpp`和`highgui.hpp`头文件，实现读入一个图像，进行水平翻转后输出到文件。代码如下：
{% highlight bash %}
#include <opencv2/core/core.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <iostream>

using namespace cv;
using namespace std;

int main(){
    Mat image = imread("test.jpg");
    if ( !image.data ){
        cout << "No image LOADED!" << endl;
    }
    namedWindow("Original Image");
    cout << "size: " << image.size().height << " , "
        << image.size().width << endl;
    imshow("Original Image", image);
    Mat result;
    flip(image, result, 1);     
    namedWindow("Output Image");
    imshow("Output Image", result);
    waitKey(0);
    imwrite("output.jpg", result);
    return 0;
}
{% endhighlight %}

# 构建
在工作目录里命令行输入以下指令进行构建：
{%highlight bash %}
cmake .
make
{% endhighlight %}

构建过程终端输出如图
![CLI codes](/images/opencv2linux/code.png)

构建完成后则可以运行`./test`程序，得到想要的结果。
![CLI codes](/images/opencv2linux/out.png)

# 总结
在学习OpenCV2的过程中，往往是模块化地了解各个库内的接口，这样单一源程序即可完成，所以采用CMake可以快速的尝试新的代码，只需要
复制文件就可以新建一个工程开始试验新的函数功能接口。深入了解CMake，可以参考[CMake指南](http://www.cmake.org/cmake/help/cmake_tutorial.html)
,应该已经足够。
