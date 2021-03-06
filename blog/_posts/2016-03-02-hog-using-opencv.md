---
layout: post
title: "HOG/linSVM检测器"
modified: 2016-03-02
tags: [CV]
---
采用HOG特征进行训练的SVM分类器在中等图像分辨率和低处理时间限制要求下具有优势，笔记记录HOG特征的理论基础，以及采用OpenCV的_HOGDescriptor_配合SVMLight实现分类器。包括：

* HOG特征理论基础
* 程序实现

## 技术笔记

PDF格式：[点此下载](/blog/media/hog-using-opencv/HOGTechNotes.pdf)

## 训练

采用[**INRIAPerson**](http://pascal.inrialpes.fr/data/human/)数据集进行训练和测试。笔记内提供了训练的方法和实现。

## 测试
OpenCV的_HOGDescriptor_有预训练的分类器可以通过`hog.setSVMDetector(HOGDescriptor::getDefaultPeopleDetector());`来加载，示例：

```cpp
#include <stdio.h>
#include <opencv2/opencv.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/ml/ml.hpp>

using namespace std;
using namespace cv;

/**
 * 显示检测结果
 * @param found:包含有效检测结果的矩形
 * @param imageData:原始测试图像
 */
static void showDetections(const vector<Rect>& found, Mat& imageData) {
    vector<Rect> found_filtered;
    size_t i, j;
    for (i = 0; i < found.size(); ++i) {
        Rect r = found[i];
        for (j = 0; j < found.size(); ++j)
            if (j != i && (r & found[j]) == r)
                break;
        if (j == found.size())
            found_filtered.push_back(r);
    }
    for (i = 0; i < found_filtered.size(); i++) {
        Rect r = found_filtered[i];
		  r.x += cvRound(r.width*0.1);
		  r.width = cvRound(r.width*0.8);
		  r.y += cvRound(r.height*0.07);
		  r.height = cvRound(r.height*0.8);
        rectangle(imageData, r.tl(), r.br(), Scalar(0, 255, 0), 3);
		  putText(imageData,"Pedestrian",Point(r.x, r.y+r.height),
				  FONT_HERSHEY_SIMPLEX,r.width*0.006,CV_RGB(255, 20, 147),2.0);
    }
}

/**
 * 测试检测器
 * @param hog:HOG描述符
 * @param imageData：测试图像
 */
static void detectTest(const HOGDescriptor& hog, Mat& imageData) {
    vector<Rect> found;
    int groupThreshold = 2;
    Size padding(Size(32, 32));
    Size winStride(Size(8, 8));
    double hitThreshold = 0.;
    hog.detectMultiScale(imageData, found, hitThreshold, winStride, padding, 1.05, groupThreshold);
    showDetections(found, imageData);
}


int main(int argc, char** argv) {

	 // 使用默认参数
    HOGDescriptor hog;
    // DT-2005建议参数
	 //hog.winSize = Size(64, 128);
	 // 加载训练的HOG特征描述符文件
    //hog.setSVMDetector(descriptorVector);
    hog.setSVMDetector(HOGDescriptor::getDefaultPeopleDetector());
    Mat testImage;
	 testImage=imread("test.jpg");
	 imshow("origin image",testImage);
    detectTest(hog, testImage);
    imshow("HOG custom detection", testImage);
	 waitKey(0);
	 return EXIT_SUCCESS;
}
```

测试效果如下：
![HOGTestOutput](/blog/media/hog-using-opencv/HOGoutput.jpg)


## 后续发展
在DT-2005以后直方图类算法得到了比较完善的改进，一方面是HOG特征计算方法的改进，另一方面将HOG特征和AdaBoost算法联合形成分类器，OpenCV 也提供了对应的实现，参考：

_Laptev I._ Improving object detection with boosted histograms[J]. _Image and Vision Computing, 2009, 27(5): 535-544._

后续在行人检测方面也有新的算法提出，建议参考

_Benenson R, Omran M, Hosang J, et al._ Ten years of pedestrian detection, what have we learned?[C]. _Computer Vision-ECCV 2014 Workshops. Springer International Publishing, 2014: 613-627._
