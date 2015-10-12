---
layout: post
title: "Numpy安装纪要"
modified: 2015-01-13 11:37:51 +0800
categories:
tags: [Python]
image:
  feature:
comments: true
share: true
---

# Python
Install python in Debian/Ubuntu:
{% highlight Bash %}
sudo apt-get install python
sudo apt-get install python-dev
{% endhighlight %}

# Misc
After python is installed, some packages need to be installed to get scientific computing tasks done.
Install these packages corresponded to your operating system.
Overview of the Linux distributions and corresponding package names for Numpy, Scipy, Matplotlib, and IPython:

| Linux distribution | Numpy                           | Scipy        | Matplotlib        | IPython |
| :----------------- | :---:                           | :---:        | :--------:        | :-----: |
| Arch Linux         | python-numpy                    | python-scipy | python-matplotlib | ipython |
| Debian             | python-numpy                    | python-scipy | python-matplotlib | ipython |
| Fedora             | numpy                           | python0scipy | python-matplotlib | ipython |
| Gentoo             | dev-python/numpy                | scipy        | matplotlib        | ipython |
| OpenSUSE           | python-numpy,python-numpy-devel | python-scipy | python-matplotlib | ipython |
| Slackware          | numpy                           | scipy        | matplotlib        | ipython |

# Numpy and Scipy Documentation
[docs.scipy.org/doc](http://docs.scipy.org/doc/)
