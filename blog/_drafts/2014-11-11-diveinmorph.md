---
layout: post
title: "用三种视角看形态学操作"
modified: 2014-11-11 19:39:58 +0800
tags: [Computer Visions, OpenCV2]
image:
  feature: homefeature.jpg
comments: true
share: true
---

数学形态学起源于岩相学对岩石结构的定量描述工作，近年来在数字图象处理和机器视觉领域中得到了广泛的应用。
本文分别从Gonzalez的《Digital Image Processing》(以下简称DIP)和Szeliski的《Computer Vision: Algorithms and Applications》(以下简称CVAA)的视角对二值形态学处理进行理解，
然后拓展到灰度图像处理(做了这个拓展后其实也拓展到了处理彩色图像)，后者主要是受到OpenCV中形态学处理的实现的启发。

# Gonzalez视角

即集合论的视角，Gonzalez的DIP第９章有详细的描述，清华大学的艾海舟教授的数字图像处理的课程主页上有一个简要且完备的[讲解](http://media.cs.tsinghua.edu.cn/~ahz/digitalimageprocess/chapter08/chapt08_ahz.htm)。

# Szeliski视角

用集合的观点去描述数学形态学，既高大上又严谨，想想都有点高逼格。但是大牛就是大牛，大牛会勇敢地说不，
微软研究院的Szeliski在他的CVAA一书中只用了两页不到的篇幅就把形态学操作的大部分内容都覆盖了，下面我们来看看他是怎么做到的。

> This is not the usual way in which these operations are described, but I find it a nice simple way to unify the processes.

所以我揣测他只是觉得自己讲计算机视觉的书已经写了TM接近1000页了，只是想节省篇幅而已==!。

# OpenCV视角

Gonzalez的DIP第９章后半部分讲了形态学操作在灰度图像上的拓展，这也是OpenCV的实现方式(毕竟本质都是一样的，
其实Gonzalez视角和Szaliski的视角本质也是相同的，悟一下！)，之所以称为OpenCV视角，
是因为我最一开始是从OpenCV的实现中受到启发的，后来才到DIP中进行验证(毕竟大家这么忙，有多少人会把教科书看到每章最后一节?)。

# 采用OpenCV２实现
