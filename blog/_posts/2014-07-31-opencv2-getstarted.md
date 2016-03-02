---
layout: post
title: "OpenCV上手"
modified: 2014-07-31
tags: [CV]
---

在Linux下安装好OpenCV2后，如何快速开始使用或学习OpenCV是首要问题。如何编译一个使用了OpenCV运算库的程序呢(C/C++)？有下面几种不同的思路：

* 使用命令行gcc给定编译参数进行编译(复杂度高);
* 使用一个IDE，配置头文件和库文件路径，常用的有Eclipse，Code::Blocks，Qt等(复杂度适中);
* 使用命令行工程构建工具CMake(清晰明了，复杂度低，易于上手).

本文采用最后一种方式，推荐采用Linux作为工作环境。开始之前，建议参考[编译安装OpenCV2](http://oncemore2020.github.io/blog/opencv2compile)编译 OpenCV 并安装CMake等构建工具。

## 工作目录
使用CMake构建工程，工作目录应该具有如下结构：


```bash
    |-CMakeLists.txt
    |-main.cpp
```

其中`CMakeLists.txt`是 CMake 配置文件，`main.cpp`是源程序文件。

## CMake设定
这里给出一种简单可复制的工程设定文件，在应用到其它源程序时只需要进行少量修改。


```bash
cmake_minimum_required(VERSION 2.8)
project( main )
find_package( OpenCV REQUIRED )
add_executable( main main.cpp )
target_link_libraries( main ${OpenCV_LIBS} )
```

设置文件规定了工程文件名、程序包依赖、源文件、目标文件、以及链接库对象和库路径。

## 示例
采用一个简单的程序进行演示，程序用到`core.hpp`和`highgui.hpp`头文件，实现读入一个图像，进行水平翻转后输出到文件。代码如下：

```bash
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
```

### 构建

在工作目录里命令行输入以下指令进行构建：

```Bash
cmake .
make
```

构建过程终端输出如图

![CLI codes](/blog/media/opencv2-getstarted/code.png)

构建完成后则可以运行`./test`程序

![CLI codes](/blog/media/opencv2-getstarted/out.png)

## 总结

在学习OpenCV2的过程中，往往是模块化地了解各个库内的接口，这样单一源程序即可完成，采用上面的设定，可以快速的尝试模块接口。

更多关于CMake，参考[CMake指南](http://www.cmake.org/cmake/help/cmake_tutorial.html)。
