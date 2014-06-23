---
layout: post
title: "基于Haar小波特征的AdaBoost级联器:OpenCV实现"
modified: 2014-04-14 13:08:38 +0800
tags: [OpenCV,Computer Visions,学习笔记]
image:
  feature: feature-cv2.jpg
  background: bg-4.jpg
comments: ture
share: ture
---
基于Haar小波的AdaBoost级联器在低分辨率条件和(接近于)实时处理应用下具有优势，
笔记记录采用OpenCV提供的运算库进行实现的细节，包括：

* 训练数据批量准备技术
* 采用OpenCV提供的程序库进行级联器训练
* 级联器实现

# 技术笔记
排版为PDF格式方便下载和查看：[点此下载](/assets/pdf/HaarTechNotes.pdf)

# 测试结果
训练数据库是庞大的(并且是必须庞大的，才能足以覆盖特征空间)，训练过程是漫长的，所以实际上我的PC上现在也
没训练出结果，所以分类器文件采用了OpenCV提供的分类器，效果不是特别的好。注意程序中的参数需要根据实际情况
调整，这将会直接影响结果。

图片中的两个完全可见的walkers被框出来了，离视角最近的walker因为不完全可见，所以没有被框出来。

![Haar Output](/images/HaarCascader/haaroutput.jpg)

目前打算采用HOG特征来继续完成毕业设计。
