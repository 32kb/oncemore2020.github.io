---
layout: post
title: "OpenCV2访问像素值的几种方法"
modified: 2014-11-05 21:26:26 +0800
tags: [OpenCV,Computer Visions]
image:
  feature: homefeature.jpg
comments: true
share: ture
---

进行空域处理的第一步就是要访问图像某个位置的像素值，OpenCV2提供了几种访问图像像素的方法，
主要包括随机访问稀疏位置集合和遍历图像大面积连续区域(甚至整幅图像)像素两类模式，
本文对几种常用的方法进行总结。

**GOALS**:

* 随机访问像素
* 遍历区域像素
   * 实例：色彩空间压缩
   * 采用指针访问
   * 采用迭代器访问
* 哪种方法更高效？

**Reference**:

*《OpenCV 2 Computer Vision Application Programming Cookbook》- Chapter 2*

# 1.随机访问像素

## 1.1 实例:椒盐噪声

## 1.2 方法

# 2.遍历区域像素

## 2.1实例:色彩空间压缩

## 2.2采用指针

## 2.3采用迭代器

# 3.性能比较

##3.1计时方法

##3.2对比结果
