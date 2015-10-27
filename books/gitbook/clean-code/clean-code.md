#《代码整洁之道》

*Robert C. Martin* 著，译名《代码整洁之道》。按照章节整理，[十六进制](http://baike.baidu.com/view/230306.htm)编号。

> 代码质量与其整洁度成正比。干净的代码，既在质量上较为可靠，也为后期维护、升级奠定了良好基础。

## Foreword (丹麦人James O. Coplien书)
**0x0000**. 丹麦语，**"Honesty in small things is not a small thing."** ，**Honesty**也很重要！
> Ærlighed i små ting er ikke nogen lille ting.

两点说明细节的重要性，首先，高手从小处登堂入室，才能被委以重任做大事；其次，细小的瑕疵，会影响整体的魅力。
> Small things matter.

> God is in the details. - Ludwig mies van der Rohe

**0x0001**. Agile指**敏捷开发**，Scrum是敏捷开发的一个子集，可以参考[敏捷开发和Scrum](https://github.com/larrycai/sdcamp/blob/master/contents/1-chapter1-agile-scrum.markdown)。

> In these days of *Scrum and Agile*, the focus is on quickly bringing product to market. We want the factory running at top speed to produce software.

这句话背后的意思还是资本和利益在驱动，最终要的是产品交付的速度，时间就是金钱。

**0x0002**. 软件开发超过80%的时间用于**维护**

> In software, 80% or more of what we do is quaintly called "maintenance": the act of repair.

James 引用了丰田汽车的**5S原则**，5S原则是丰田汽车为了改善自动化汽车制造流程所使用的工具，帮助生产线上的问题更容易浮现，包含：
* **Sort**: 把很少用到的东西从工作区域中移开
* **Systematize**: 为每个工具规定好固定的放置地点
* **Shine**: 保持清洁
* **Standardize**: 规范化操作
* **Self-discipline**: 定期核查反省，虚心改正

这和代码编写有相通的地方，比如第三点，不要在代码中放置注释来回顾历史，展望未来;第四点，使用一致的代码风格实践;第五点适合所有工作。

**0x0003**. 代码可读性的重要性

> Making your code readable is as important as making it executable.

**0x0004**. 毫不留情地重构

> In code, refactor mercilessly.

**0x0005**. 为了表示这并不是东方哲学(日本)独有而使西方读者抱有成见，James举了很多西方谚语，很有趣，记录如下

比如关于整洁性(处女座福利)
> Cleanliness is next to godliness.

关于细节重要性
> He who is faithful in little is faithful in much.

关于果断重构，防患于未然
> A stitch in time saves nine.

> The early birds catches the worm.

> Don't pull off until tomorrow what you can do today.

> An ounce of prevention is worth a pound of cure.

> An apple a day keeps the doctor away.

关于"不积畦步，无以至千里。"
> Mighty oaks from little acorns.

**0x0006**. 每次放假回家都对这句话深有体会
> As every homeowner knows, such care and ongoing refinement never come to an end.

**0x0007**. Bell实验室的发现，合理缩进的重要性
> Consistent indentation style was one of the most statistically significant indicators of low bug density.

**0x0008**. 有道理
> Quality is the result of a million selfless acts of care—not just of any great method that descends from the heavens.

**0x0009**. 下次谁在你面前说写代码是脏活，就回敬这两句
> We should view our code as the beautiful articulation of noble efforts of design—design as a process, not a static endpoint.

> Code is anti-evil, and clean code is perhaps divine.

**0x000a**. "人非圣贤，孰能无过"的英文翻译
> To err is human; to forgive, divine.

## Introduction
**0x000b**. 下面这幅图狠戳程序员痛点和笑点

![wtfm](../pics/clean-code/wtfm.jpg)
