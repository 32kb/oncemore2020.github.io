函数
=========
本节介绍JavaScript的函数的一些细节，其中会涉及到一些 **函数式编程(Functional Programming)** 的概念。

## JavaScript函数

### 函数基础
在JavaScript内定义最普通的函数需要使用`function`关键字，紧接函数名字和参数列表(用`,`分隔参数)，然后就是用花括号`{}`括起来的函数体，函数体内包含一些语句，以及返回语句`return`。

**注意**: 没有`return`也会返回，返回结果为`undefined`。

在JavaScript中，更多地用法是把一个函数赋值给一个变量，例如
```JavaScript
var abs = function (x) {
    if (x >= 0) {
        return x;
    } else {
        return -x;
    }
};
```
将一个**匿名函数**赋值给变量`abs`(求绝对值的函数，摘抄自[廖雪峰的JavaScript教程](http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/00143449926746982f181557d9b423f819e89709feabdb4000))，这和传统的方式
```JavaScript
function abs(x) {
    if (x >= 0) {
        return x;
    } else {
        return -x;
    }
}
```
是完全一样的。

**调用函数** 的方式看起来也和其它编程语言没有什么区别
```JavaScript
abs(-99);
```

可是，真的没有区别吗?其实是有的，区别在于可以传入任意个参数，且不检查参数的类型(动态语言)，和函数定义时的参数列表没有关系，甚至可以一个参数也不传入，例如
```JavaScript
abs(100,-99)
abs(10,'hello',null)
```

这种设计带来的副作用是在函数里面必须要更加小心地处理参数，如参数检查
```JavaScript
if (typeof x !== 'number') {
    throw 'Not a number';
}
```

JavaScript还赠送了一个关键字`arguments`来表示所有的参数，类似于一个`Array`对象。在函数体内部，不需要声明和定义，就可以通过arguments来访问所有的参数
```JavaScript
for (var i=0; i<arguments.length; i++) {
        alert(arguments[i]); // 10, 20, 30
}
```

如果我们要获取调用者多传送进来的所有参数，我们还需要做一个集合上的减操作，即用`arguments`集合减去定义的参数集合。仔细想一下，绕了这么大一圈，真的大丈夫？不就是为了取几个参数吗。于是ES6附加再赠送了一个关键字`rest`来表示除函数定义时的参数之外的其它参数，前提是需要在参数列表的最后加上`...rest`，例如
```JavaScript
function foo(a, b, ...rest) {
    console.log('a = ' + a);
    console.log('b = ' + b);
    console.log(rest);
}

foo(1, 2, 3, 4, 5);
// 结果:
// a = 1
// b = 2
// Array [ 3, 4, 5 ]

foo(1);
// 结果:
// a = 1
// b = undefined
// Array []
```
这下好了，参数`a`和`b`该怎么用就怎么用，如果还有其它参数，我们从`rest`里面找。那这个时候`arguments`还有啥用呢？就剩一点点了 - 判断参数的个数:
```JavaScript
if (arguments.length === 2) {
    ...
}
```

### 命名空间
和其它编程语言一样，我们需要注意一个变量的作用范围，即所谓的全局变量、局部变量等概念。Javascript 的变量作用域为**函数体**，即变量定义所在的函数体外不可使用该变量。独立的函数的变量也相互独立。对于嵌套函数，JavaScript 规定内部函数可以访问外部函数的变量，外部函数却不能访问内部函数的变量，并且在变量重名时，内部变量自动屏蔽外部变量。

由于作用域是**函数体**，和C/C++等不同的是在循环语句`for`中定义的变量在循环外、函数内仍然有效！这当然也是不怎么好的，一般认为循环变量`i`在循环结束之后自己的使命也就应该结束了。为了解决这个问题，ES6引入关键字`let`，用于声明**块级作用域**的变量。示例
```JavaScript
'use strict';

function foo() {
    var sum = 0;
    for (let i=0; i<100; i++) {
        sum += i;
    }
    i += 1; // SyntaxError
}
```

定义在任何函数之外的变量(全局)则具有全局的作用域，JavaScript 赠送一个全局的对象`window`，所有的全局变量都被绑定为`window`的属性，例如
```JavaScript
'use strict';

var jt = 'JiaoTong';
window.jt === jt; //True
```
因为函数也是变量，所以顶层的函数也是`window`的属性。这样的设计让`window`有一种海纳百川的感觉，实际上直觉告诉我们这样并不好，容易导致所谓的 **命名空间冲突**。为了解决这个问题，可以采用一个全局的对象来维护变量，从而隔离功能相对独立的函数和变量。示例
```JavaScript
// 唯一的全局变量MYAPP:
var MYAPP = {};

// 其他变量:
MYAPP.name = 'myapp';
MYAPP.version = 1.0;

// 其他函数:
MYAPP.foo = function () {
    return 'foo';
};
```
### 常量
由于设计缺陷，之前只能*从字面上*规定一个常量，即将变量名全部使用大写字母书写，实际上这些变量仍然能够被修改。ES6引入了本来应该存在的`const`关键字。
```JavaScript
'use strict';

const PI = 3.14;
PI = 3;
PI; // 3.14
```
在最新版的Chrome中，使用`PI=3`并不会报错，但`PI`绝对不会被修改。有了`const`，大写变量也终于能安静地只负责代码风格了。

到这里，已经能够感受到Javascript语言设计上真的有点混乱，ES6和后续的ES7标准极力地在修补语言问题。学习Javascript的过程中还会遇到不少类似的体验。

### 对象
和其它编程语言一样，绑定给一个对象的函数成为**方法**，绑定函数给对象和绑定变量没有什么区别
```JavaScript
var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
        var y = new Date().getFullYear();
        return y - this.birth;
    }
};

xiaoming.age; // function xiaoming.age()
xiaoming.age(); // 今年调用是25,明年调用就变成26了
```
注意到`this`，了解过面向对象(OO)编程的同学一定知道这个变量指向的是当前的对象，所以`this.birth`相当于`xiaoming`的`birth`属性。但是由于设计缺陷，`this`在有些时候会变得非常怪异，例如
```JavaScript
function getAge() {
    var y = new Date().getFullYear();
    return y - this.birth;
}

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: getAge
};

xiaoming.age(); // 25, 正常结果
getAge(); // NaN
```
单独调用`getAge()`会返回`NaN`，是因为在调用函数时，`this`指向的是`window`，只有在用`xiaoming.age()`调用函数时，`this`指向的才是`xiaoming`，这个问题即使使用
```JavaScript
var fn = xiaoming.age; // 先拿到xiaoming的age函数
fn(); // NaN
```
来表示`fn`是`xiaoming`的方法，也是无法解决的！ECMA爹觉得这个问题也不好修复，干脆决定在`'use strict';`时直接让单独使用函数时的`this`直接指到`undefined`，把犯错误的门关上。

要修正这个错误，还需要使用`apply`关键字，`apply`接收两个参数，第一个表示绑定的`this`，第二个是`Array`类型的参数列表。示例:
```JavaScript
function getAge() {
    var y = new Date().getFullYear();
    return y - this.birth;
}

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: getAge
};

xiaoming.age(); // 25
getAge.apply(xiaoming, []); // 25, this指向xiaoming, 参数为空
```

## 高阶函数
JavaScript中函数也是变量导致了函数的横行霸道(“一等公民” - first class function)，这样一来，函数可以返回函数了，从设计的角度来说，也可以使用函数作为参数，称为**高阶函数(High-order function)** 。把函数作为参数，函数参数的作用不再仅仅是变量和状态的通信了，还包括行为的通信！这样提高了函数的抽象能力。这种思想在其它编程语言的演进中也能看出端倪，例如C++的排序函数就可以在参数里指定一个比较大小的函数，这样一来，不仅能够简化排序函数的设计(不用分开设计顺序和倒序了)，而且排序规则也不仅仅限于数值大小了，从而丰富了排序函数的功能。

### Map & Reduce
身在大数据时代，一定用过或听过 **Map & Reduce**，Google 的大牛 Jeffrey Dean 的论文 [MapReduce: Simplified Data Processing on Large Clusters](http://static.googleusercontent.com/media/research.google.com/zh-CN//archive/mapreduce-osdi04.pdf) 对 Map & Reduce 算法作了比较详细的介绍。和Python一样，JavaScript 内置了对map和reduce的支持。

**map** 和其名字一样，可以将一个函数“部署”或作用到数据上，使得函数对数据集合的每一个元素都起作用。JavaScript的`Array`对象具有`.map()`方法，可以接收一个函数作为参数。例如
```JavaScript
function pow(x) {
    return x * x;
}

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr.map(pow); // [1, 4, 9, 16, 25, 36, 49, 64, 81]
```
这相对于传统的使用循环来达到目的的方法，抽象性更高，我们可以自由地定义`map()`的函数参数，以实现不同的运算。

**reduce** 会缩减数据的规模，`Array`对象的`.reduce()`方法接收一个函数作为参数，这个函数必须接收两个参数，每次将`Array`中的两个元素传递给函数，计算结果连同剩余的数据继续进行运算。形式为
```JavaScript
[x1, x2, x3, x4].reduce(f) = f(f(f(x1, x2), x3), x4)
```
例如对`Array`求和
```JavaScript
var arr = [1, 3, 5, 7, 9];
arr.reduce(function (x, y) {
    return x + y;
}); // 25
```

### filter
高阶函数的另一个应用是利用函数的返回结果作为对`Array`元素的过滤规则，函数返回`true`则保留，否则滤除当前元素，例如滤除偶数的操作:
```JavaScript
var arr = [1, 2, 4, 5, 6, 9, 10, 15];
var r = arr.filter(function (x) {
    return x % 2 !== 0;
});
r; // [1, 5, 9, 15]
```

### sort
正如之前所说，高阶函数能够丰富排序函数的抽象能力，`Array`对象的`.sort()`方法接收一个函数作为排序规则，例如倒序排序
```JavaScript
var arr = [10, 20, 1, 2];
arr.sort(function (x, y) {
    if (x < y) {
        return 1;
    }
    if (x > y) {
        return -1;
    }
    return 0;
}); // [20, 10, 2, 1]
```
由于排序通常需要指定自定义的排序规则，也许是由于这个原因，我们无法阻止JavaScript在没有接收到排序函数时选择何种默认排序函数，事实也是这样，JavaScript调皮地选择了先将元素转换为字符串，然后再根据ASCII序进行排序。。。。例如
```JavaScript
[10, 20, 1, 2].sort(); // [1, 10, 2, 20]
```

## 闭包
### 惰性求值
对于大规模的数据(甚至是无穷大的序列)，可能不需要立即求和，而是在需要的时候再计算结果。例如对一个存储在`Array`中的序列数据求和，可以将求和的函数作为返回值，而不是立即返回计算结果
```JavaScript
function lazy_sum(arr) {
    var sum = function () {
        return arr.reduce(function (x, y) {
            return x + y;
        });
    }
    return sum;
}
```
这样在使用`var f = lazy_sum([1, 2, 3, 4, 5]);`调用`lazy_sum`函数时，不会立刻返回计算结果，而是在`f();`时才执行实际的计算。这类思想称为 **惰性求值**，是函数式编程的一个重要特性之一

### 私有变量
惰性求值，实际上将函数和参数变量都返回了！即可视为将参数状态和函数的操作一起作为返回值，这种思想称为 **闭包**。**闭包** 除了可以实现惰性求值之外，更重要的是返回的变量包含了函数的状态，并且其状态对外是隐藏的，这种状态存储机制在面向对象设计里面需要用类的私有成员变量来实现。
```JavaScript
'use strict';

function create_counter(initial) {
    var x = initial || 0;
    return {
        inc: function () {
            x += 1;
            return x;
        }
    }
}

var c1 = create_counter();
c1.inc(); // 1
c1.inc(); // 2
c1.inc(); // 3

var c2 = create_counter(10);
c2.inc(); // 11
c2.inc(); // 12
c2.inc(); // 13
```

### Currying
把一个函数的多个参数分解成多个函数， 然后把函数多层封装起来，每层函数都返回一个函数去接收下一个参数这样，可以简化函数的多个参数。这即是函数式编程的**Currying**思想。

例如，计算幂函数的时候，使用`Math.pow(x, y)`函数闭包创建函数`pow2`和`pow3`
```JavaScript
function make_pow(n) {
    return function (x) {
        return Math.pow(x, n);
    }
}

// 创建两个新函数:
var pow2 = make_pow(2);
var pow3 = make_pow(3);

pow2(5); // 25
pow3(7); // 343
```
这样即将幂函数的底和幂次分开，第一层使用`make_pow()`确定幂次，第二层再将底传递过去。

## lambda? 匿名函数
为了简化匿名函数的使用，编程语言们争相引入了`lambda`关键字，ES6也引入了所谓的**箭头函数**来简化匿名函数的使用，例如
```JavaScript
x => x * x
```
等效于
```JavaScript
function (x) {
    return x * x;
}
```
相比之下省略了不少输入。同时因为`=>`独立于原有设计，`this`的作用域缺陷也得到了修复，例如
```JavaScript
var obj = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        var fn = () => new Date().getFullYear() - this.birth; // this指向obj对象
        return fn();
    }
};
obj.getAge(); // 25
```
这里的`this`会正确地指向对象`obj`，而不是莫名其妙的地飞到`window`上去。

## generator
JavaScript的**生成器(Generator)** 和Python的生成器非常类似。生成器是可以多次返回的函数，并且可以保存函数的状态，这样的话就**不用使用其它对象来保存状态了**。JavaScript使用`function*`来定义生成器，例如生成斐波拉契数列的生成器
```JavaScript
function* fib(max) {
    var
        t,
        a = 0,
        b = 1,
        n = 1;
    while (n < max) {
        yield a;
        t = a + b;
        a = b;
        b = t;
        n ++;
    }
    return a;
}
```
`max`表示的是数列的最大长度，使用`fib(5)`可以得到一个`generator`对象，然后可以逐次使用`.next()`方法得到多次返回的值，注意返回值是保存在一个对象中的，这个对象除了记录了返回值，还记录了`done`来表示是否生成结束，示例
```JavaScript
var f = fib(5);
f.next(); // {value: 0, done: false}
f.next(); // {value: 1, done: false}
f.next(); // {value: 1, done: false}
f.next(); // {value: 2, done: false}
f.next(); // {value: 3, done: true}
```

另外一种更简便的方式是使用`for ... of ...`语法，如
```JavaScript
for (var x of fib(5)) {
    console.log(x); // 依次输出0, 1, 1, 2, 3
}
```

## 函数式编程阅读资料
本节所讲，只是函数式编程的皮毛，需要进一步了解函数式编程的思想和实践，推荐阅读：

1. [函数式编程 - 陈皓](http://coolshell.cn/articles/10822.html)
2. [函数式编程 - 郭家寶](https://www.byvoid.com/upload/fl/images/FP/FP.pdf)
3. [傻瓜式函数编程](https://github.com/justinyhuang/Functional-Programming-For-The-Rest-of-Us-Cn/blob/master/FunctionalProgrammingForTheRestOfUs.cn.md)
