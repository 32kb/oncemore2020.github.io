拂晓之剑 - 现代文本编辑器
===================

## GUI友好的编辑器
可视化交互程序的快速发展催生了一些设计现代化的文本编辑器，现列举几款现代化文本编辑器的佼佼者:

* [Sublime Text](http://www.sublimetext.com/): "The text editor you'll fall in love with"
* [Atom](https://atom.io/) : "A hackable text editor
for the 21st Century"
* [Visual Studio Code](https://www.visualstudio.com/en-us/products/code-vs.aspx): "Code editing redefined and optimized for building and debugging modern web and cloud applications."

三个编辑器都提供了扩展安装功能，操作方面默认多采用组合键来完成，不过可以安装vim-mode插件来使用vim模式编辑文本。另外，三款编辑器都跨平台支持Windows、Linux、OS X。

Atom是Github团队在2014年开源的基于Chromium架构的文本编辑器，本身是跑在浏览器框架下的，历时一年多，Atom的社区现在非常活跃，常用的插件都能从社区下载(包括vim-mode)。Atom提供了命令行插件管理器`apm`，可以非常方便地进行插件搜索安装。例如
```bash
apm search <package_name> # 搜索插件
apm install <package_name> # 安装插件
apm update  # 升级插件
```

Atom团队还通过Atom的开发，发布了一个基于Web开发跨平台桌面应用的框架 [Electron](http://electron.atom.io/)，微软利用这个框架开发了 Visual Studio Code，和Atom很相似，在Web开发方面特别强大。

## Vim的重生 - NeoVim
由于Vim本身的codebase存在很多问题，加上作者Bram Moolenaar在引进新功能方面较为保守，[Thiago de Arruda](http://tarruda.github.io/)在一次Pull Request 被拒绝后开启了[NeoVim项目](https://github.com/neovim/neovim)，NeoVim和Vim兼容，由于采用异步I/O机制(目前正在朝[libuv](https://github.com/libuv/libuv/blob/master/README.md)迁移)，插件有可能获得更好的性能。

一个典型的好处是插件可以并发安装了，使用[vim-plug](https://github.com/junegunn/vim-plug)安装插件，再也不用等那么久了。

![vim05](./pics/vim05.gif)

NeoVim目前还处于频繁地开发和迭代中，不过已经能用于实际使用了。

关于NeoVim为什么比Vim好，参考: [Why Neovim is Better than Vim](Why Neovim is Better than Vim)。Vim可能会消失，但是他的思想将会永存。
