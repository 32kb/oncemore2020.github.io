英雄纪元 - Vim vs. Emacs
========================

Emacs 诞生于MIT的人工智能实验室，前身是1972年 Carl Mikkelson 开发的 [TECO](http://www.emacswiki.org/emacs/TECO) 文本编辑器，可以在用户输入指令后更新显示器的输出。1974年，FSF(Free Software Foundation) 创始人 [Richard Stallman](http://www.emacswiki.org/emacs/RichardStallman) 改进了 TECO ，主要是加入了 **宏(macro)特性**，也正是由于其宏特性，1976年 Richard Stallman 将一系列宏操作集成为指令集和，并加入了扩展性，将文本编辑器命名为 **Emacs(Editor MACroS)**。1981年，Emacs 移植到 Unix，采用 MockLisp 作为扩展语言。直到1984年，Stallman 开始重新开发 Emacs 的实现，即目前众所周知的 Gnu Emacs，采用 EmacsLisp 作为扩展语言，从此其版本号开始迭代衍进，目前的最新版本号是 24.5 (2015年)。有关 Emacs 的历史，参考: [Emacs History](http://www.emacswiki.org/emacs/EmacsHistory)。常见的Linux发行版的软件仓库内都包含了 Gnu Emacs，其主页为: [Gnu Emacs](https://www.gnu.org/software/emacs/)。

Vim 的前身 - Vi，诞生于1976年，由 Bill Joy 开发，主要是为了让一个文本文件全屏显示而不是像 Unix 的原生编辑器 ed 一样每次只能显示一行，VI 命名也来自于这个特性 - Visual Interface 。Bram Moolenaar 1991 年开发了 Vim - Vi IMproved，增加了许多改进和特性，并支持扩展。Vim 采用 VimScript 作为扩展语言。目前Vim的最新版本号是 7.4 (2013年)，和 Emacs 一样，常见的Linux发行版都集成了较新版本的 Vim，其主页是: [Vim Online](http://www.vim.org/index.php)。

Emacs 和 Vi(m) 是20世纪最优秀的文本编辑器，并且在21世纪继续大放异彩，其本后是两类文本编辑器的代表，即 Emacs派和Vi派。俗话说“一山不容二虎”，西方世界一神论的宗教背景下，两派编辑器的用户终于产生了冲突。两派用户均认为自己使用的文本编辑器才是最好的，并且鄙视使用另一款文本编辑器的用户。Emacs 和 Vi(m) 在不同的历史时期具有鲜明的特性对比，例如内存占用、扩展特性、用户界面、语言支持等，在不同的历史时期，两类编辑器在这些领域也是相互赶超，不分高下。而经过历史的洗礼，两者仍然存在的巨大区别，是其**操作模式** - Emacs 使用组合键(Ctrl,Alt+键)来操作，而Vi几乎不用这两个键，而是输入语义的字符序列解析决策树来完成操作，并且规定了不同的编辑模式(目前Vim具有 Insert, Normal, Visual模式，另说三种模式是指 Command, Insert 和 Last line，在下认为前者在目前更精确)。除此之外，Emacs 和Vim的另一个比较明显的区别在于泛义的扩展性，Emacs支持内嵌图像等媒体对象，并且具有庞大的扩展系统，几乎就可以作为一个操作系统，而Vi更多地是独占命令行完成文本编辑工作，目前Vim在这方面与Emacs的差距逐渐缩小，真正用于编程和调试方面，功能特性几乎不分高下。Emacs的许多扩展在目前高性能PC普及和用户交互快速进步的背景下，显得并没有什么卵用(现在谁愿意用Emacs来浏览网页、听音乐呢?)

所以，Emacs 和 Vi(m)目前最大的区别还是在文本编辑方式的本身，即：组合键还是语义序列？Vim派的用户表示Emacs用户经常使用Ctrl和Alt等组合键容易造成**腕关节损伤**，事实也确实是这样。[Text Editors: What are the main differences between Vim and Emacs?](https://www.quora.com/Text-Editors/What-are-the-main-differences-between-Vim-and-Emacs) 这篇问答对Emacs和Vim作了较可观的对比，作者认为Vim的语义序列编辑的思想更为胜出 - Vim/gVim/MacVim may die, but the language of Vim, which is Vim's real power, will live on since it has no home.

当然，组合键操作思想在目前的很多文本编辑器中更为流行，因为对新手友好并且理解方便，而Vim的语义序列指令对新手来说是非常陡峭的。编辑器的圣战不会停止，因为两类编辑器的操作思想会永存，而其冲突永远不会停息(在新的思想诞生之前)。

关于两类编辑器的更多细节，参考:
1. [Editor War](https://en.wikipedia.org/wiki/Editor_war)
2. [What are the pros and cons of Vim and Emacs?](http://unix.stackexchange.com/questions/986/what-are-the-pros-and-cons-of-vim-and-emacs)
3. [Kernel Panic - 编辑器巡礼](https://ipn.li/kernelpanic/4/)
