---
layout: post
title: "Haar/AdaBoost级联器"
modified: 2016-03-02
tags: [CV]
---
采用Haar小波特征的AdaBoost级联器在低分辨率图像和(接近于)实时处理应用下具有优势，笔记记录采用OpenCV提供的运算库进行实现的细节，包括：

* 训练数据批量准备技术
* 采用OpenCV提供的程序库进行级联器训练
* 级联器实现

## 技术笔记

PDF格式：[点此下载](/blog/media/haar-cascader-using-opencv/HaarTechNotes.pdf)

## 测试结果

训练数据库规模很大(以覆盖特征空间)，训练过程十分漫长。分类器采用了 OpenCV 预先训练好的分类器。注意参数调整对结果影响很大。

图片中的两个完全可见的walkers被框出来了，离视角最近的walker因为不完全可见，所以没有被框出来。

![Haar Output](/blog/media/haar-cascader-using-opencv/haaroutput.jpg)

