## Chapter 1 - A Tutorial Introduction

# Hello,world!
C源文件后缀为`*.c`，如下helloworld.c文件

```C
#include <stdio.h>

main()
{
	printf("Hello,world!\n");
}
```

使用gcc编译文件，在不指定参数的情况下，会得到`a.out`可执行文件，输入`./a.out`运行程序，
或者在gcc编译时用`-o`选项指定目标程序，编译完成后执行目标程序。


```bash
$ gcc helloworld.c
$ ./a.out
Hello,world!

$ gcc helloworld.c -o hello
$ ./hello
Hello,world!
```

C源程序在任何条件下都包括**函数(functions)**和**变量(variables)**，函数包括指定计算操作的**语句(statements)**，
变量存储计算期间使用的值。**main函数**比较特殊，程序从main函数的开头开始执行，这意味着每一个程序都必须在某个地方具有main函数。
main函数通常会**调用(call)**其他函数来执行任务,这些函数可以自己编写，也可以是包含的**库文件(libraries)**提供的函数，
如`helloworld.c`中的第一行`#include <stdio.h>`告诉**编译器(compiler)**需要包含**标准输入/输出库(standard input/output library)**，
因为**C语言本身没有提供输入/输出功能**，`main`函数需要调用`stdio.h`中的`printf()`函数。

函数之间进行通讯的一种方法是让函数调用提供一个称为**参数(arguments)**的值列表给被调用的函数，
在`helloworld.c`中，`main`函数不接收任何参数，则是一个空参数列表`()`。
函数的语句被包括在`{ }`中，`helloworld.c`只有一条语句，调用了`printf()`函数，
参数为`"Hello,world\n"`，`printf()`是一个**库函数**，用于标准输出。上例中传递的是一个**字符串常量**，
`\n`称为**换行符**，在输出字符串后进行换行。`printf()`函数不会自动设置换行，所以下面的程序会得到和`helloworld.c`一样的输出。


```C
#include <stdio.h>

main()
{
	printf("Hello,");
	printf("world!");
	printf("\n");
}
```

`\n`实际上代表一个字符(换行符)，换行符属于不能显式打印或显式可见的符号，C 用**转义字符(escape sequence)**来处理这类字符。
如`\t`代表制表符，`\b`表示退格，`\"`表示双引号，`\\`表示反斜杠。

> Exercise 1-1. Run the "hello, world" program on your system. Experiment with leaving out parts of the
> program, to see what error messages you get.


```c
#include <stdio.h>

int main(void)
{
	printf("hello, world\n");
	return 0;
}
```
这个程序中加入了`return`语句，因为`main`函数总是返回`int`型变量，显式地指出是一种比较好的编码风格。

> exercise 1-2. Experiment to find out what happens when printf's argument string contains \c, where c
> is some character not listed above.


```c
#include <stdio.h>

int main(void)
{
	char c;
	printf("响铃警告. \a\n");
	printf("换页. \f\n");
	printf("这个转义字符, \r, 将光标移向行首.\n");
	printf("\t水平制表符.\n");
	printf("垂直制表符\v换行并缩进到上一行行尾后一个字符.\n");
	printf("回格<>.\b\b");
	scanf("%c",&c);
	return 0;
}
```
注意有一些转义字符会在不同的终端下产生不同的效果(如`\v`)。

# 变量和算术表达式

温度转换程序$$^{\circ}C=(5/9)(^{\circ}F-32)$$


```C
#include <stdio.h>

/* print Fahrenheit-Celsius table
	for fahr = 0,20,...300 */
main()
{
	int fahr,celsius;
	int lower,upper,step;

	lower = 0;	/* lower limit of temperature scale */
	upper = 300;	/* upper limit */
	step = 20;	/* step size */

	fahr = lower;
	while (fahr <= upper) {
		celsius = 5 * (fahr -32) / 9;
		printf("%d\t%d\n", fahr, celsius);
		fahr = fahr + step;
	}
}
```

`/* */`之间的内容称为**注释(comment)**，其间的任何内容都会被编译器排除。

C中的变量在使用之前必须被**声明(declaration)**，说明变量的性质，通常包括变量类型和变量列表。
`int`类型表示整型。C还提供了其他数据类型，如`float`(浮点型)，`char`(字符型)，`short`(短整型)，
`long`(长整型)，`double`(双精度浮点型)等。这些类型的大小是**依赖于机器(machine-dependent)**的。

`=`表示**赋值运算(assignment statements)**。

温度表的每一行的操作方式是相同的，这种情况下可以采用**循环(loop)**来处理，上例中采用了`while`循环。
其操作流程为：

1.  测试括号内条件
2.  如果括号内条件为真，循环体(`{ }`内的语句)被执行，然后继续测试括号内条件，循环`1.`和`2.`
3.  如果括号内条件为假，则循环终止

将循环语句用`{ }`括起来，同时对语句采用**缩进(indent)**是比较好的编码风格。**K&R**建议:

> writing only one statement per line, and using blanks around operators to clarify grouping.

注意到`celsius = 5 * (fahr - 32) / 9;`中先乘5再除以9而不是直接乘以5/9，因为C的整型除法会截断小数
部分，因为5和9都是整数，5/9得到的结果将是0，这样会造成整个温度表转换出来的都是0。

上例的`printf()`函数用到了格式化输出，`%d`表示十进制(decimal)整型，变量在字符串参数之后按次序列出，用`,`分隔。
例子那样使用`printf()`表示输出`fahr`和`celsius`变量，中间用一个制表符`\t`隔开。注意`%`和后面的变量列表元素数
量以及对应元素的类型必须匹配。

需要注意，`printf()`并不是C语言的一部分，并且C语言中没有定义输入和输出，`printf()`属于标准库函数。

上例的输出并不是很美观，因为没有右对齐，解决这个问题的方法是对`%d`指定一个宽度，
比如`printf("%3d %6d\n",fahr,celsius);`，这样会将`fahr`用3个字符宽度输出，`celsius`用6个字符宽度输出。

另外，由于整型除法截断，上例并不是很精确，使用**浮点型**来进行运算可以解决这个问题。

```C
#include <stdio.h>

/* print Fahrenheit-Celsius table
for fahr = 0, 20, ..., 300; floating-point version */
main()
{
	float fahr, celsius;
	float lower, upper, step;

	lower = 0;	/* lower limit of temperatuire scale */
	upper = 300;	/* upper limit */
	step = 20;	/* step size */

	fahr = lower;
	while (fahr <= upper) {
		celsius = (5.0/9.0) * (fahr-32.0);
		printf("%3.0f %6.1f\n", fahr, celsius);
		fahr = fahr + step;
	}
}
```

将`fahr`和`celsius`改成**float**类型后，温度转换能以更自然的形式写出。`5.0`和`9.0`表示这两个
常量是浮点型，则`5.0/9.0`不会产生截断。如果**操作数**都是浮点型，则按照浮点型运算(如上例)，
如果操作数既有整型也有浮点型，则整型会在运算之前转换成浮点型。**K&R**建议：

> writing float-point constants with explicit decimal points even when they have integral
  values emphasizes their floating-point nature for human readers.

`printf()`中的`%3.0f`表示浮点数`fahr`用至少3个字符的宽度打印，并且不带小数点和小数部分，`%6.1f`
表示浮点数`celsius`用至少6个字符的宽度打印，在小数点后带1位小数。注意指定浮点数格式的两个部分可以省去，
如`%6f`只指定宽度，`%,2f`只指定小数点后保留两位小数，而宽度不受限制，`%f`只指定输出浮点数。

同时，`printf()`还能识别的格式化参数有`%o`(八进制整数)，`%x`(十六进制整数)，`%c`(字符)，`%s`(字符串)
以及`%%`(不转换格式，输出一个"%")

> Exercise 1-3. Modify the temperature conversion program to print a heading above the table.


```C
#include<stdio.h>

int main(void)
{
	float fahr,celsius;
	int lower,upper,step;

	lower = 0;
	upper = 300;
	step = 20;
	printf("%3c %6c\n",'F','C');
	fahr=lower;
	while(fahr<=upper)
	{
		celsius=(5.0/9.0)*(fahr-32.0);
		printf("%3.0f %6.1f\n",fahr,celsius);
		fahr = fahr+step;
	}
	return 0;
}
```

> Exercise 1-4. Write a program to print the corresponding Celsius to Fahrenheit table.


```C
#include<stdio.h>

int main(void)
{
	float fahr,celsius;
	int lower,upper,step;

	lower = 0;
	upper = 300;
	step = 20;
	printf("%3c %6c\n",'C','F');
	celsius=lower;
	while(celsius<=upper)
	{
		fahr=(9.0/5.0)*celsius+32.0;
		printf("%3.0f %6.1f\n",celsius,fahr);
		celsius = celsius+step;
	}
	return 0;
}
```

# for语句
温度转换程序的另一种实现方式：


```C
#include <stdio.h>
/* print Fahrenheit-Celsius table */
main()
{
	int fahr;

	for (fahr = 0; fahr <= 300; fahr = fahr + 20)
		printf("%3d %6.1f\n", fahr, (5.0/9.0)*(fahr-32));
}
```

与之前的程序不同，除了`fahr`之外的变量都精简了，并且`fahr`为int类型。

除此之外，转换温度的计算并入了`printf()`语句。这代表了一个通用规则：

> in any context where it is permissible to use the value of some type,you can use a more complicated expression of that type.

程序中`printf()`的第三个参数必须与`%6.1f`匹配，那么任何浮点型的表达式都可以作为第三个参数。

**for语句**属于循环语句，包括**初始化(initialization)**:`fahr = 0;`，**测试条件(test condition)**:`fahr <= 300;`，以及
**步进(increment step)**:`fahr = fahr + 20`。循环在测试条件不满足时终止。

`for`和`while`之间的选择需要视情况而定。`for`通常适用于初始化和步进是单一语句并且具有一定联系的情况，相比`while`更加紧凑，
因为他将循环控制语句放在了同一个地方。

> Exercise 1-5. Modify the temperature conversion program to print the table in reverse order,that is, from 300 degrees to 0.


```C
#include <stdio.h>

/*for version*/
int main(void)
{
	float fahr,celsius;
	int lower,upper,step;

	lower = 0;
	upper = 300;
	step = 20;

	printf("%3c%6c",'C','F');
	for(celsius = upper;celsius >= lower;celsius -= step)
	{
		fahr = (9.0/5.0) * celsius + 32.0;
		printf("%3.0f%6.1f\n",celsius,fahr);
	}
	return 0;
}


/*while version*/
//int main(void)
//{
//	float fahr,celsius;
//	int lower,upper,step;
//
//	lower = 0;
//	upper = 300;
//	step = 20;
//
//	printf("%3c%6c\n",'C','F');
//	celsius = upper;
//	while(celsius >= lower)
//	{
//		fahr = (9.0/5.0)*celsius + 32.0;
//		printf("%3.0f %6.1f\n",celsius,fahr);
//		celsius -= step;
//	}
//
//	return 0;
//}
```

# 符号常量

将300和20这样的"magic numbers"直接放在程序中是一种坏习惯，破坏了程序的可读性，并且难以系统地修改。
一种处理这类"magic numbers"的方法是给他们设置有意义的名称，`#define`语句为**符号常量(symbolic constant)**
设置一个字符串来表示。

```C
#define name replacement list
```

这样一来任何出现`name`的地方(除了在引号之内或是另外一个名称的一部分之外)都会被替换为相应的`replacement text`。
`name`和变量一样，是以字母开头的由字母和数字组成的序列。`replacement text`不限于数字，可以是任何字符序列。
这样温度转换程序改进如下：

```C
#include <stdio.h>

#define LOWER 0		/* lower limit of table */
#define UPPER 300		/* upper limit */
#define STEP 20		/* step size */

/* print Fahrenheit-Celsius table */
main()
{
	int fahr;
	for (fahr = LOWER; fahr <= UPPER; fahr = fahr + STEP)
		printf("%3d %6.1f\n", fahr, (5.0/9.0)*(fahr-32));
}
```

注意到`#define`行并没有以`;`结束。`LOWER`，`UPPER`，`STEP`**并不是**变量,所以不会出现在声明语句中。
符号常量通常采用大写形式书写，这样能与变量名加以区分。

# 字符输入/输出

**文本流(text stream)**指划分为行的字符序列，每一行由0个或更多的字符紧跟一个换行符，**标准库**负责确认输入/输出流
的这种规范，使用标准库的C程序员可以不必担心是否符合上述规范。

标准库提供了许多函数来一次读入或是写入一个字符，`getchar()`和`putchar()`是最简单的。

每次被调用时，`getchar()`从文本流中读入_下一个输入字符_并返回它的值，
`putchar()`输出一个字符。

## 文件拷贝

采用`getchar()`和`putchar()`能够一个字符一个字符地将输入拷贝到输出。

```C
#include <stdio.h>

/* copy input to output; 1st version*/
main()
{
	int c;
	c = getchar();
	while (c != EOF) {
		putchar(c);
		c = getchar();
	}
}
```

关系操作符`!=`表示"不等于"。

`char`类型专门用来存储字符数据，但是任何整型也可以用来存储字符数据。程序中采用`int`有重要原因。为了识别输入的终止，
`getchar()`在输入结束之后返回一个区别于任何有效字符的值，被称为`EOF`(end of file)。这样一来我们必须将`c`声明为足够
装下`getchar()`返回的任何值，我们不能采用`char`类型，因为`c`必须能够装下除有效字符(`char`能存的所有值)以外的其他值
，所以我们采用`int`。

`EOF`定义在`<stdio.h>`中，其具体值并不重要，因为不会是`char`所能表示的任何值，采用符号常量来处理，可以确保程序不依赖于
任何具体数值。

同时，`c=getchar();`语句本身具有一个值，这个值与赋值运算后赋值符号左边的值一致，这就允许这条赋值语句作为更大的表达式
的一部分，比如将这条赋值语句作为`while`循环的测试条件。

```C
#include <stdio.h>
/* copy input to output; 2nd version */
main()
{
	int c;
	while ((c = getchar()) != EOF)
		putchar(c);
}
```

程序得到变得更加紧凑，并且可读性更强，但同时也更容易出错。

赋值语句两侧的括号是必须的，因为`!=`的优先级高于`=`，关系测试会在赋值之前进行。这样一来`c=getchar()!=EOF`
和`c=(getchar()!=EOF)`是等价的，将导致`c`的值不是0就是1.

> Exercsise 1-6. Verify that the expression getchar() != EOF is 0 or 1.


```C
#include<stdio.h>

int main(void)
{
	printf("Press a key.ENTER would be nice :-)\n\n");
	printf("The expression \"getchar()!=EOF\" is:%d",getchar()!=EOF);
	return 0;
}
```

Linux下使用`<Ctrl-D>`结束输入，当输入有效字符时，表达式值为1，否则为0.

> Exercise 1-7. Write a program to print the value of EOF.


```C
#include<stdio.h>

int main(void)
{
	printf("The value of EOF is %d\n\n",EOF);
	return 0;
}
```

Linux 下`<stdio.h>`中定义的`EOF`值为-1.

## 字符统计
统计字符个数的程序：

```C
#include <stdio.h>

/* count characters in input; 1st version */
main()
{
	long nc;

	nc = 0;
	while (getchar() != EOF)
		++nc;
	printf("%ld\n", nc);
}
```

`++`操作符表示自增1，这里也可以使用`nc = nc + 1`，但是`++nc`更为简洁和高效。相应的,`--`对应自减1。
`++`和`--`放在变量前和变量后在表达式中具有不同的值，虽然都对变量进行加1或者减1。

`long`整型至少是32位，对应格式化字符`%ld`，这里使用`long`整型是因为`int`类型是16位，最大可表示32767，
这在统计时很容易发生溢出。若要统计更多的字符，可以采用`double`类型，下面是采用`for`语句实现的另一个
字符统计版本。

```C
#include <stdio.h>

/* count characters in input; 2nd version */
main()
{
	double nc;
	for (nc = 0; getchar() != EOF; ++nc)
		;
	printf("%.0f\n", nc);
}
```

`float`和`double`都使用`%f`来进行格式化，`%.0f`表示不输出小数点和小数部分(在统计结果中是没有意义的)。

由于所有的工作在测试和步进中完成，`for`循环体为空，但是C语法要求`for`语句需要有循环体，所以放置
**空语句(null statement)**来满足语法要求。放在单独一行以增加可读性。

如果被统计的文本为空，则上面两个版本都会输出正确答案0。从这之中可看出`while`和`for`语句的优点：在循环
开始之前进行测试。这确保了程序对一些小的扰动(边界条件)仍然能够保证结果正确。

## 行统计
之前提到过，标准库确保输入文本流是行序列，每一行由换行符结束，所以进行行统计等效为统计新行(换行符)。

```C
#include <stdio.h>
/* count lines in input */

main()
{
	int c, nl;

	nl = 0;
	while ((c = getchar()) != EOF)
		if (c == '\n')
			++nl;
	printf("%d\n", nl);
}
```

`if`语句括号之内条件为真时执行语句(一行或是由`{}`括起来的多行)，设置缩进能增加可读性。

`==`的意思是"等于"，用两个"="来和赋值符`=`加以区分。混淆两者往往会出错，但是编译器不会提醒。

单引号`'`括起来的字符表示一个整型值，等于机器的字符集中对应的索引值，称为**字符常量(character constant)**。
如字符'A'是一个字符常量，在_ASCII字符集_中的值为65，同时也是字符'A'的内部表示方法。当然，使用'A'比使用65
要好，因为显式含义，并且独立于字符集。

字符串常量中的转义字符仍然是合法的字符常量，'\n'表示换行符，在ASCII中的值为10。需要注意的是`\n`仅仅代表一个字符。

> Exercise 1-8. Write a program to count blanks, tabs, and newlines.


```C
#include<stdio.h>

int main(void)
{
	int blanks,tabs,newlines;
	int c;
	int done = 0;
	int lastchar = 0;

	blanks = 0;
	tabs = 0;
	newlines = 0;

	while(done == 0)
	{
		c = getchar();

		if(c == ' ')
			++blanks;

		if(c == '\t')
			++tabs;

		if(c == '\n')
			++newlines;

		if(c == EOF)
		{
			if(lastchar != '\n')
			{
				++newlines;
			}
			done = 1;
		}

		lastchar = c;
	}

	printf("Blanks:%d\nTabs:%d\nNewlines:%d\n",blanks,tabs,newlines);
	return 0;
}
```
在判断`EOF`时测试`EOF`之前的字符是为了处理某些不以换行符结束的文件。

> Exercise 1-9. Write a program to copy its input to its output, replacing each string of one or more blanks by a single blank.

方法一：设置一个`inspace`变量来标志当前处理的字符是否为空格。

```C
#include <stdio.h>

int main(void)
{
  int c;
  int inspace;
  inspace = 0;
  while((c = getchar()) != EOF)
  {
    if(c == ' ')
    {
      if(inspace == 0)
      {
        inspace = 1;
        putchar(c);
      }
    }
    /* We haven't met 'else' yet, so we have to be a little clumsy */
    if(c != ' ')
    {
      inspace = 0;
      putchar(c);
    }
  }
  return 0;
}
```

方法二：记录之前的一个字符来判断是否输出当前空格。

```C
#include <stdio.h>

/* count lines in input */
int main()
{
        int c, pc; /* c = character, pc = previous character */

        /* set pc to a value that wouldn't match any character, in case
        this program is ever modified to get rid of multiples of other
        characters */

        pc = EOF;

        while ((c = getchar()) != EOF) {
                if (c == ' ')
                        if (pc != ' ')   /* or if (pc != c) */
                                putchar(c);

                /* We haven't met 'else' yet, so we have to be a little clumsy */
                if (c != ' ')
                        putchar(c);
                pc = c;
        }

        return 0;
}
```

方法三：当出现一个空格后，就把之后可能紧接着出现的空格全部跳过。注意为什么使用`break`
那里还需要判定是否为`EOF`.

```C
#include<stdio.h>

int main(void)
{
	int c;

	while((c=getchar())!=EOF)
	{
		if(c==' ')
		{
			putchar(c);
			while((c=getchar())==' '&&c!=EOF)
			;
		}
		if(c==EOF)
			break;
		putchar(c);
	}
	return 0;
}
```

> Exercise 1-10. Write a program to copy its input to its output, replacing each tab by \t, each
  backspace by \b, and each backslash by \\. This makes tabs and backspaces visible in an
  unambiguous way.

方法一：变量`d`用来标志是否出现了需要处理的三种符号，如果出现则进行处理并将`d`置1。

```C
#include<stdio.h>

int main(void)
{
	int c,d;

	while((c=getchar())!=EOF)
	{
		d=0;
		if(c=='\\'){
			putchar('\\');
			putchar('\\');
			d=1;
		}
		if(c=='\t'){
			putchar('\\');
			putchar('t');
			d=1;
		}
		if(c=='\b'){
			putchar('\\');
			putchar('b');
			d=1;
		}
		if(d==0)
			putchar(c);
	}
	return 0;
}
```

方法二：定义一个符号常量`ESC_CHAR`来识别反斜杠。

```C
#include <stdio.h>

#define ESC_CHAR '\\'

int main(void)
{
  int c;

  while((c = getchar()) != EOF)
  {
    switch(c)
    {
      case '\b':
        putchar(ESC_CHAR);
        putchar('b');
        break;
      case '\t':
        putchar(ESC_CHAR);
        putchar('t');
        break;
      case ESC_CHAR:
        putchar(ESC_CHAR);
        putchar(ESC_CHAR);
        break;
      default:
        putchar(c);
        break;
    }
  }
  return 0;
}
```

## 单词统计
定义"单词"为不包含空格，制表符或是换行符的字符序列。单词统计和UNIX系统程序`wc`类似。


```C
#include <stdio.h>
#define IN 1	/* inside a word */
#define OUT 0	/* outside a word */

/* count lines, words, and characters in input */
main()
{
	int c, nl, nw, nc, state;

	state = OUT;
	nl = nw = nc = 0;
	while ((c = getchar()) != EOF) {
		++nc;
		if (c == '\n')
			++nl;
		if (c == ' ' || c == '\n' || c == '\t')
			state = OUT;
		else if (state == OUT) {
			state = IN;
			++nw;
		}
	}
	printf("%d %d %d\n", nl, nw, nc);
}
```

每次程序处理到一个单词的开头的时候，就将单词计数加1，`state`变量配合符号常量`IN`和`OUT`用来记录当前处理的字符是否在一
个单词内，初始化设置为`OUT`。使用`IN`和`OUT`而不是`1`和`0`，K&R说明如下。

> In a program as tiny as this, it makes little difference, but in larger programs, the increase in clarity is well worth the
> modest extra effort to write it this way from the beginning.

`nl = nw = nc = 0;`这条语句基于这样一个事实，即C的赋值语句从右到左进行，则这条语句和`nl = (nw = (nc = 0));`是等效的。

`||`是**逻辑或**操作符，相应的`&&`表示**逻辑与**操作符(优先级比`||`高)。逻辑表达式的值从左到右计算，并且一旦确定表达式的值
之后就不再进行运算(短路运算)，这在很多复杂场合是非常有用的。

`else`用来处理`if`后面的条件不满足时(还有剩下的许多可能)的场合，不难想到这两个分支一次只会执行一个。

> Exercise 1-11. How would you test the word count program? What kinds of input are most
> likely to uncover bugs if there are any?

可以采用下面的测试方法(有点单元测试的思想)：

* 包含0个单词的输入文件
* 包含一个非常长的单词而不换行的输入文件
* 包含所有空白符(‘\f’,'\t','\v')而没有换行符的输入文件
* 包含66000个换行符的输入文件(注意`unsigned int`可以表示的整数范围)
* 在单词之间设置大量的空白符号序列
* 包含66000个只有一个字母的单词，每行66个
* 包含66000个单词，没有换行
* 采用`/usr/dict`目录下的文件作为输入(在ubuntu中为`/usr/share/dict/words`)
* 输入文件包含大量的长单词
* 将可执行文件(二进制)作为输入
* 将`dev/null`作为输入

下面是用来产生符合前7条测试规则的测试文件的程序：


```C
#include <assert.h>
#include <stdio.h>

int main(void)
{
	FILE *f;
	unsigned long i;
	static char *ws = " \f\t\v";
	static char *al = "abcdefghijklmnopqrstuvwxyz";
	static char *i5 = "a b c d e f g h i j k l m "
					  "n o p q r s t u v w x y z "
					  "a b c d e f g h i j k l m "
					  "n o p q r s t u v w x y z "
					  "a b c d e f g h i j k l m "
					  "n\n";

	/* 生成如下规则: */
	/* 包含0个单词的输入文件 */
	f = fopen("test0", "w");
	assert(f != NULL);
	fclose(f);

	/* 包含一个非常长的单词而不换行的输入文件 */
	f = fopen("test1", "w");
	assert(f != NULL);
	for (i = 0; i < ((66000ul / 26) + 1); i++)
	fputs(al, f);
	fclose(f);

	/* 包含所有空白符而没有换行符的输入文件 */
	f = fopen("test2", "w");
	assert(f != NULL);
	for (i = 0; i < ((66000ul / 4) + 1); i++)
	fputs(ws, f);
	fclose(f);

	/* 包含66000个换行符的输入文件 */
	f = fopen("test3", "w");
	assert(f != NULL);
	for (i = 0; i < 66000; i++)
	fputc('\n', f);
	fclose(f);

	/* 在单词之间设置大量的空白符号序列 */
	f = fopen("test4", "w");
	assert(f != NULL);
	fputs("word", f);
	for (i = 0; i < ((66000ul / 26) + 1); i++)
	fputs(ws, f);
	fputs("word", f);
	fclose(f);

	/* 包含66000个只有一个字母的单词，每行66个 */
	f = fopen("test5", "w");
	assert(f != NULL);
	for (i = 0; i < 1000; i++)
	fputs(i5, f);
	fclose(f);

	/* 包含66000个单词，没有换行 */
	f = fopen("test6", "w");
	assert(f != NULL);
	for (i = 0; i < 66000; i++)
	fputs("word ", f);
	fclose(f);

	return 0;
}
```

> Exercise 1-12. Write a program that prints its input one word per line.

同样使用`inspace`来标识当前处理的字符是否在单词之间，在必要的时候换行。

```C
#include<stdio.h>

int main(void)
{
	int c;
	int inspace=0;

	while((c=getchar())!=EOF)
	{
		if(c==' '||c=='\t'||c=='\n')
		{
			if(inspace==0)
			{
				inspace=1;
				putchar('\n');
			}
		}
		else
		{
			inspace=0;
			putchar(c);
		}
	}
	return 0;
}
```

# 数组
如果要用程序来统计数字(0-9)，空白字符以及其他字符的出现次数，那么使用数组来记录结果要比采用10个变量来记录10个数字要好。


```C
#include <stdio.h>

/* count digits, white space, others */
main()
{
	int c, i, nwhite, nother;
	int ndigit[10];

	nwhite = nother = 0;
	for (i = 0; i < 10; ++i)
		ndigit[i] = 0;

	while ((c = getchar()) != EOF)
		if (c >= '0' && c <= '9')
			++ndigit[c-'0'];
		else if (c == ' ' || c == '\n' || c == '\t')
			++nwhite;
		else
			++nother;

	printf("digits =");
	for (i = 0; i < 10; ++i)
		printf(" %d", ndigit[i]);
	printf(", white space = %d, other = %d\n",
		nwhite, nother);
}
```

`int ndigit[10];`声明一个可以存放10个整数的数组，数组索引从0开始，所以10个元素为`ndigit[0]`,`ndigit[1]`,...,`ndigit[9]`，
从for语句中可以看出这种规定。数组的索引值可以采用任何整型表达式。

`if (c >= '0' && c <= '9')`用来测试`c`是否是一个数字，如果是，则其实际数值为`c - '0'`，这依赖于所采用的字符集内数字的编码
是连续的，所幸所有的字符集都是这样给数字编码的。

程序处理其他情况(不是数字)时引入了`else if`，这样提供了一种处理多分支条件的机制(`switch`也可以用来处理)。分支从上到下进行
判断直到某个分支的条件满足，然后执行对应分支的语句。

在多分支甚至存在分支嵌套的情况下，严格使用缩进是比较好的编码风格。

> Exercise 1-13. Write a program to print a histogram of the lengths of words in its input. It is
> easy to draw the histogram with the bars horizontal; a vertical orientation is more challenging.

用垂直直方图输出结果的程序如下。理解这个程序有几个难点。其一是各个变量的用途，在注释中标出。其二
是`inspace`和`firstletter`这两个变量，将`firstletter`初始化为1的目的是控制输入开头时模拟为刚处理
完一个单词，在程序一开始就将其置0。其三是格式化输出垂直直方图的方法，之所以记录`maxval`也是为输出
直方图服务的。特别需要注意变量初始化是不能偷懒的，比如`maxval`，因为单词长度大于零才会被统计，所以
初始化其为0是合理的。


```C
#include<stdio.h>

#define MAXLEN 10

int main(void)
{
	int c;
	int inspace = 0;
	int firstletter = 1;
	int wordlen = 0;
	int maxval = 0;
	int thisval = 0;
	int thisindex;
	int lengtharr[MAXLEN+1];
	int done=0;

	for(thisindex=0;thisindex<=MAXLEN;thisindex++)
	{
		lengtharr[thisindex]=0;
	}

	while(!done)
	{
		c=getchar();
		if(c==' '||c=='\t'||c=='\n'||c==EOF)
		{
			if(inspace==0)
			{
				firstletter=0;
				inspace=1;

				if(wordlen<=MAXLEN)
				{
					if(wordlen>0)
					{
						thisval = ++lengtharr[wordlen-1];
						if(thisval>maxval)
						{
							maxval=thisval;
						}
					}
				}
				else
				{
					thisval=++lengtharr[MAXLEN];
					if(thisval>maxval)
					{
						maxval=thisval;
					}
				}
			}
			if(c==EOF)
			{
				done=1;
			}
		}
		else
		{
			if(inspace==1||firstletter==1)
			{
				wordlen=0;
				firstletter=0;
				inspace=0;
			}
			++wordlen;
		}
	}

	for(thisval=maxval;thisval>0;thisval--)
	{
		printf("%4d|",thisval);
		for(thisindex=0;thisindex<=MAXLEN;thisindex++)
		{
			if(lengtharr[thisindex]>=thisval)
			{
				printf("   *");
			}
			else
			{
				printf("    ");
			}
		}
		printf("\n");
	}
	printf("    +");
	for(thisindex=0;thisindex<=MAXLEN;thisindex++)
	{
		printf("----");
	}
	printf("\n     ");
	for(thisindex=0;thisindex<MAXLEN;thisindex++)
	{
		printf("%4d",thisindex+1);
	}
	printf("  >%d\n",MAXLEN);
	return 0;
}
```

> Exercise 1-14. Write a program to print a histogram of the frequencies of different characters
> in its input.

由于字符集内的字符并不是都可见，所以输出统计信息是采用其ASCII码来标注是比较合理的方法。


```C
#include<stdio.h>

#define NUM_CHARS 256

int main(void)
{
	int c;
	long freqarr[NUM_CHARS+1];		/* 记录统计信息 */

	long thisval=0;
	long maxval=0;
	int thisidx=0;

	/* 初始化统计结果 */
	for(thisidx=0;thisidx<=NUM_CHARS;thisidx++)
	{
		freqarr[thisidx]=0;
	}

	while((c=getchar())!=EOF)
	{
		if(c<NUM_CHARS)  /* 字符值小于256 */
		{
			thisval=++freqarr[c];
			if(thisval>maxval)
			{
				maxval=thisval;
			}
		}
		else	/*字符值大于等于256 */
		{
			thisval=++freqarr[NUM_CHARS];
			if(thisval>maxval)
			{
				maxval=thisval;
			}
		}
	}

	/* 格式化输出结果 */
	for(thisval=maxval;thisval>0;thisval--)
	{
		printf("%4ld |",thisval);
		for(thisidx=0;thisidx<NUM_CHARS;thisidx++)
		{
			if(freqarr[thisidx]>=thisval)
			{
				printf("*");
			}
			else if(freqarr[thisidx]>0)
			{
				printf(" ");
			}
		}
		printf("\n");
	}
	printf("     +");
	for(thisidx=0;thisidx<=NUM_CHARS;thisidx++)
	{
		if(freqarr[thisidx]>0)
		{
			printf("-");
		}
	}
	printf("\n      ");

	/* 按位输出字符ASCII码值 */
	for(thisidx=0;thisidx<NUM_CHARS;thisidx++)
	{
		if(freqarr[thisidx]>0)
		{
			printf("%d",thisidx/100); 	/* 百位 */
		}
	}
	printf("\n      ");
	for(thisidx=0;thisidx<NUM_CHARS;thisidx++)
	{
		if(freqarr[thisidx]>0)
		{
			printf("%d",(thisidx-(100*(thisidx/100)))/10);	/* 十位 */
		}
	}
	printf("\n      ");
	for(thisidx=0;thisidx<NUM_CHARS;thisidx++)
	{
		if(freqarr[thisidx]>0)
		{
			printf("%d",thisidx-(10*(thisidx/10)));  /* 个位 */
		}
	}

	/* 字符值大于256的结果输出 */
	if(freqarr[NUM_CHARS]>0)
	{
		printf(">%d\n",NUM_CHARS);
	}
	printf("\n");
	return 0;
}
```

# 函数

**函数**提供了封装一些操作的实现，优点是可以在不了解其具体实现的情况下进行调用。K&R如此形容：

> With properly designed functions,it is possible to ignore **how** a job is done;knowing  **what** is done is sufficient.

下面程序使用的用`pow(m,n)`可以计算m的n次幂，虽然这不是效率最高的实现，但足够用来描述函数的一些概念：


```C
#include <stdio.h>

int power(int m, int n);

/* test power function */
main()
{
	int i;

	for (i = 0; i < 10; ++i)
		printf("%d %d %d\n", i, power(2,i), power(-3,i));

	return 0;
}

/* power: raise base to n-th power; n >= 0 */
int power(int base, int n)
{
	int i, p;

	p = 1;
	for (i = 1; i <= n; ++i)
		p = p * base;
	return p;
}
```

函数按照程序中给定的方式来定义，需要给定**返回类型(return-type)**,**函数名(function-name)**,**参数声明(parameter declarations)**
以及函数体内的**变量定义(declarations)**和**语句(statements)**。函数定义可以任何顺序出现，可以存在于一个源文件或多个源文件中，但
同一个函数不能分开来定义。

`power()`使用的参数名字对其他函数不可见，其他函数可以使用相同的参数名字而不发生冲突，例如`main()`中的`i`和`power()`中的`i`并不相关
。

函数需要采用`return expression;`来返回一个值给调用者，`expression`可以省略，此时`return;`只起控制作用，不返回任何值。`main()`函数
和其它函数一样，也要返回一个值，一般来说，返回0表示正常退出，返回非零值表示异常或错误退出。此后都将对`main()`设置返回语句，K&R：

> but we will include them hereafter,as a reminder that programs should return status to their environment.

在`main()`之前的`int power(int base, int n);`称为**函数原型(function prototype)**，声明`power()`是一个接收两个int参数并且返回int值
的函数，函数原型需要和定义以及调用相匹配，但参数名字并不需要匹配，并且在函数原型中可以省略，也就是说`int power(int, int);`和程序
中的函数原型是等效的。

**ANSI C**和之前标准的最大的改进在于函数的声明和定义，在以前的标准中，`power()`的定义将会是这样子：


```C
/* power: raise base to n-th power; n >= 0 */
/*(old-style version) */
power(base, n)
int base, n;
{
	int i, p;

	p = 1;
	for (i = 1; i <= n; ++i)
		p = p * base;
	return p;
}
```

参数名在括号内给定，其类型在花括号前声明，缺省为`int`类型。

`power()`的声明将会是`int power();`，并没有参数列表，所以编译器不能即时检查`power()`是否被正确调用。相比之下，新语法标准
允许编译器更容易检测参数数量和类型的错误，建议使用新标准。

> The old style of declaration and definition still works
> in ANSI C, at least for a transition period, but we strongly recommend that you use the new
> form when you have a compiler that supports it.

> Exercise 1.15. Rewrite the temperature conversion program of Section 1.2 to use a function
>  for conversion.


```C
#include<stdio.h>

float FtoC(float f)
{
	float c;
	c=(5.0/9.0)*(f-32.0);
	return c;
}

int main(void)
{
	float fahr,celsius;
	int lower,upper,step;

	lower=0;
	upper=300;
	step=20;

	printf("F    C\n\n");
	fahr=lower;
	while(fahr<=upper)
	{
		celsius=FtoC(fahr);
		printf("%3.0f %6.1f\n",fahr,celsius);
		fahr=fahr+step;
	}
	return 0;
}
```

# 参数-传值调用

在C中，所有的函数参数都通过**值传递(passed by value)**，这意味着被调用的函数接收了存在临时变量中的参数值而不是原始变量。

> It usually leads to more compact programs with fewer extraneous variables,because parameters can be treated as
> conveniently initialized local variables in the called routine.

利用这种特性，可以写出另外一种`power()`的实现


```C
/* power: raise base to n-th power; n >= 0; version 2 */
int power(int base, int n)
{
	int p;

	for (p = 1; n > 0; --n)
		p = p * base;
	return p;
}
```

参数`n`是一个临时变量，用它来控制循环，则不需要额外设置`i`变量，函数内无论对`n`怎么操作都不会影响到`power()`调用的原始变量。

同时，必要的时候也需要在调用过程中修改一个变量的值，这时调用函数需要提供目标变量的**地址(address)**(**指针(pointer)**)，并且
调用函数必须将参数声明为指针类型，然后间接地通过这个指针来访问变量。

但是，数组则不是这样，当数组的名字被用作参数时，传递给函数的值是数组起始元素的地址，而不会另外创建数组的拷贝。

# 字符数组
C中最常用的数组是**字符数组(Character Arrays)**，为了描述字符数组的使用，下面的程序用来读入文本行序列然后打印最长的文本行。

* 读入行到输入结束
* 如果比之前的最长行长，保存最长行及其长度
* 读入结束后输出最长行

为了实现流程，首先实现一个函数`getline()`来读入下一行输入，`getline()`要能够返回标识文件结束的信号，可以采用`0`来表示文件
结束，因为所有有效文本行的长度都不会是0，即使是只包含一个换行符的文本行的长度都是1。然后需要实现一个函数`copy()`来将得到的
新的最长行拷贝到安全的位置。最后使用`main()`函数来调用前两者达到目的。


```C
#include <stdio.h>
#define MAXLINE 1000	/* maximum input line length */

int getline(char line[], int maxline);
void copy(char to[], char from[]);

/* print the longest input */
main()
{
	int len;	/* current line length */
	int max;	/* maximum length seen so far */
	char line[MAXLINE];		/* current input line */
	char longest[MAXLINE];	/* longest line saved here */

	max = 0;
	while ((len = getline(line, MAXLINE)) > 0)
		if (len > max) {
			max = len;
			copy(longest, line);
		}
	if (max > 0) /* there was a line */
		printf("%s", longest);
	return 0;
}

/* getline: read a line into s, return length */
int getline(char s[],int lim)
{
	int c, i;
	for (i=0; i < lim-1 && (c=getchar())!=EOF && c!='\n'; ++i)
		s[i] = c;
	if (c == '\n') {
		s[i] = c;
		++i;
	}
	s[i] = '\0';
	return i;
}

/* copy: copy 'from' into 'to'; assume to is big enough */
void copy(char to[], char from[])
{
	int i;

	i = 0;
	while ((to[i] = from[i]) != '\0')
		++i;
}
```

注意，上面这个函数使用gcc编译时会报错，因为`stdio.h`中已经对`getline()`进行了定义。将`getline()`改成其它名字能够
解决这个问题。

在`int getline(char s[],int lim);`的函数声明中，并不必要指定数组的长度(对数组进行声明时指定长度是为了分配内存)。
`copy()`不返回任何值，所以是`void`类型，表示不返回值。

`getline()`在数组的结尾设置一个'\0'来标识字符串的结尾，字符串在数组中也是按照"字符串字符+\0"来存储的，格式化字符串`%s`
要求相应的参数是这种形式表示的，`copy()`也依赖于这种表示形式。

如果某一行长到超过了数组的长度，`getline()`在数组收集满之后仍然会继续工作，这会造成一些扰动。`main()`函数可以通过判断
行的长度以及最后一个字符来判定是否出现了这种情况。

`getline()`事先并不知道输入行的长度，所以需要设置溢出处理，但是`copy()`调用时已经知道了字符串的长度，所以可以省掉溢出
检查。

> Exercise 1-16. Revise the main routine of the longest-line program so it will correctly print
> the length of arbitrary long input lines, and as much as possible of the text.

方法一：修改`getline()`函数，使之返回文本行的实际长度而不是写入数组的字符个数，程序为了实现这个功能新增加了
一个变量，这样`j`用来控制写入数组，`i`用来记录字符串长度。将`getline()`格外
命名以免编译器报错。程序每读入一行，就输出当前行的长度及字符串，在输入结束以后，输出最长行及其长度。


```C
#include <stdio.h>

#define MAXLINE 1000 /* maximum input line size */

int getline_1(char line[], int maxline);
void copy(char to[], char from[]);

/* print longest input line */
int main(void)
{
	int len; /* current line length */
	int max; /* maximum length seen so far */
	char line[MAXLINE];	/* current input line */
	char longest[MAXLINE]; /* longest line saved here */

	max = 0;

	while((len = getline_1(line, MAXLINE)) > 0)
	{
		printf("%d: %s", len, line);

		if(len > max)
		{
			max = len;
			copy(longest, line);
		}
	}
	if(max > 0)
	{
		printf("Longest is %d characters:\n%s", max, longest);
	}
	printf("\n");
	return 0;
}

/* getline_1: read a line into s, return length */
int getline_1(char s[], int lim)
{
	int c, i, j;

	for(i = 0, j = 0; (c = getchar())!=EOF && c != '\n'; ++i)
	{
		if(i < lim - 1)
		{
			s[j++] = c;
		}
	}
	if(c == '\n')
	{
		if(i <= lim - 1)
		{
			s[j++] = c;
		}
		++i;
	}
	s[j] = '\0';
	return i;
}

/* copy: copy 'from' into 'to'; assume 'to' is big enough */
void copy(char to[], char from[])
{
	int i;

	i = 0;
	while((to[i] = from[i]) != '\0')
	{
		++i;
	}
}
```

方法二：这个方法对题目进行了更深刻的理解(和中文译本上的差不多)，首先是修改`main()`程序，其次是实现
“输出任意长的长度的同时尽可能多地输出字符(20个)”。理解程序的难点依旧在理解每个变量的作用。程序使用
`getmore`来控制继续读取超出数组存储之外而又在换行符之前的字符，`temp`在必要的时候记录字符串开始的
段，`prevmax`用来实现统计任意长度的输入，每次超出数组存储长度而又没有换行时进行长度累加。


```C

#include <stdio.h>

#define MAXLINE 20

int getline_1(char s[], int lim);
void copy(char to[], char from[]);

int main(void)
{
	char line[MAXLINE];
	char longest[MAXLINE];
	char temp[MAXLINE];
	int len, max, prevmax, getmore;

	max = prevmax = getmore = 0;
	while((len = getline_1(line, MAXLINE)) > 0)
	{
		if(line[len - 1] != '\n')
		{
			if(getmore == 0)
				copy(temp, line);
			prevmax += len;
			if(max < prevmax)
				max = prevmax;
			getmore = 1;
		}
		else
		{
			if(getmore == 1)
			{
				if(max < prevmax + len)
				{
					max = prevmax + len;
					copy(longest, temp);
					longest[MAXLINE - 2] = '\n';
				}
				getmore = 0;
			}
			else if(max < len)
			{
				max = len;
				copy(longest, line);
			}
			prevmax = 0;
		}
	}
	if(max > 0)
	{
		printf("%s", longest);
		printf("len = %d\n", max);
	}
	return 0;
}

int getline_1(char s[], int lim)
{
	int c, i;
	for(i = 0;
		i < lim - 1 && ((c = getchar()) != EOF && c != '\n');
		++i)
		s[i] = c;

	if(c == '\n')
	{
		s[i] = c;
		++i;
	}
	else if(c == EOF && i > 0)
	{
		/* gotta do something about no newline preceding EOF */
		s[i] = '\n';
		++i;
	}
	s[i] = '\0';
	return i;
}

void copy(char to[], char from[])
{
	int i;

	i = 0;
	while((to[i] = from[i]) != '\0')
		++i;
}
```

> Exercise 1-17. Write a program to print all input lines that are longer than 80 characters.

遇到此类问题时，需要注意边界情况。输出长度大于80的字符串，设置符号常量`MINLENGTH`为81，当输入字符串包括80个有
效字符加一个换行符的边界情况时，`readbuff()`会在遇到换行符时返回0，这样`main()`不会判定为满足长度条件。
程序的思想是先调用`readbuff()`尝试读取字符串，如果读到81个有效字符而没有遇到EOF或是'\n'时，继续调用`copyline()`
来输出之前保存在buffer[]中的字符以及剩余的字符。

还需要注意的是`readbuff()`和`copyline()`对`size_t`类型的`i`变量进行初始化。试想`readbuff()`不对`i`进行初始化，
`i`的初始值是未知的，假设是一个很大的数，将会直接跳过`while`语句返回1，然后使`main()`调用`copyline()`把所有字符
都输出，造成错误。所以初始化赋值往往对程序的正确性有很大的影响，一个小的扰动也能造成程序发生重大错误。


```C
#include <stdio.h>

#define MINLENGTH 81

char buffer[MINLENGTH];

int readbuff(char *buffer);
int copyline(char *buffer);

int main(void)
{
	int status = 0;
	while(status != -1){
		status = readbuff(buffer);
		if(status == 1){
			status = copyline(buffer);
		}
	}
	return 0;
}

int readbuff(char *buffer)
{
	size_t i = 0;
	int c;

	while(i < MINLENGTH){
		c = getchar();
		if(c == EOF) return -1;
		if(c == '\n') return 0;
		buffer[i++] = c;
	}
	return 1;
}

int copyline(char *buffer)
{
	size_t i;
	int c;
	int status = 1;

	for(i = 0;i < MINLENGTH;i++)
		putchar(buffer[i]);
	while(status ==1){
		c = getchar();
		if(c == EOF)
			status = -1;
		else if(c == '\n')
			status = 0;
		else
			putchar(c);
	}
	putchar('\n');
	return status;
}
```

> Exercise 1-18. Write a program to remove trailing blanks and tabs from each line of input,
> and to delete entirely blank lines.

下面是Ben Pfaff给出的解答，确实比较neat，理解程序有几个难点。
符号常量`MAXQUEUE`用来限制每次最大可处理的行末空白符号('\t'或' ')数量，如程序中设定为1001，则表示
最大每次可以处理行末出现1000个空白符号，空白符号临时存储在`blank[]`数组中，`head`用来标识最后
存在`blank[]`中的空白符号位置，`tail`用来标识当前未处理的第一个空白符号的位置。Ben Pfaff的意思
是既然到目前章节为止还没有介绍动态分配存储空间的技术，那么限定每次可以处理的空白符号数量，如果
某次没有处理完，那么通过`main()`函数的返回值`retval`来指示给系统程序还需要继续处理，这样就可以通过系统
程序多次调用该处理程序来达到目的。

如果读入换行符，表示这一行已经到了输入结尾，需要将`head`和`tail`初始化，然后根据`nonspace`来
判断是否还有空白字符没有处理，如果`nonspace`是0，则这就是一个只包含换行符或是只包含空白字符和
换行符的行，直接删除掉(即不输出换行符)，如果`nonspace`是1，则表示空白字符已经处理完或是已经处理
完了这次系统调用能处理的行末空白字符(之后说明)。若遇到空白符号，首先检查当前`blank[]`中已经临时存放了多少
待处理的空白字符，若是没有达到上限，则将空白字符存在`head`位置同时`head`要往后移一个单位。若是
已经达到上限，此时无论当前存储的空白字符是否属于行末空白符，都要先输出一个空白符，如果这个被输
出的空白字符不属于行末空白字符，当然不影响，但如果这个被输出的空白字符属于行末字符，则为了保证
之后的空白字符正确存储进`blank[]`，必须要腾出位置来，这个输出的行末空白字符要留给下一次系统程序
调用时再来处理。输出`tail`位置的空白字符，`tail`相应地要往`head`靠近一个单位，并修改`retval`告诉
系统程序这次调用没有处理好，同时要将`nonspace`置1，因为这次系统调用已经处理不了了，遇到'\n'时
只能输出换行符，把未处理完的任务"留给后人解决"。腾出位置后将最新读入的空白字符存到`head`位置处
然后往后移一个单位。若遇到非空白字符，则输出`blank[]`之中临时存储的所有空白字符，然后输出非空白
字符并将`nonspace`置1表示`blank[]`中没有还未输出的空白字符。

由于在命令行直接输出不便验证是否去除了行末空白字符，使用**输出重定向**到文件来验证是一种检查正确性
的方法。


```C
#include <stdio.h>
#include <stdlib.h>

#define MAXQUEUE 1001

int advance(int pointer)
{
	if (pointer < MAXQUEUE - 1)
		return pointer + 1;
	else
		return 0;
}

int main(void)
{
	//freopen("output.txt","w",stdout);   /*输出重定向到文件*/
	char blank[MAXQUEUE];
	int head, tail;
	int nonspace;
	int retval;
	int c;

	retval = nonspace = head = tail = 0;
	while ((c = getchar()) != EOF) {
		if (c == '\n') {
			head = tail = 0;
			if (nonspace)
				putchar('\n');
			nonspace = 0;
		}
		else if (c == ' ' || c == '\t') {
			if (advance(head) == tail) {
				putchar(blank[tail]);
				tail = advance(tail);
				nonspace = 1;
				retval = EXIT_FAILURE;
			}
			blank[head] = c;
			head = advance(head);
		}
		else {
			while (head != tail) {
				putchar(blank[tail]);
				tail = advance(tail);
			}
			putchar(c);
			nonspace = 1;
		}
	}
	return retval;
}
```

细心的同学会发现上面的程序经过多次系统调用总能处理完行末空白符号，但是如果两个非空白字符之间的空白字符达到了处理上限(例如："A"
+1000个空白字符+"B")，虽然
这些空白字符都能正确输出并且不影响处理可能会出现的行末空白符，但是`retval`同样会给系统程序返回还要继续处理的信号，这样就会
造成系统程序在处理这种扰动情况时虽然已经处理好了仍然会无限次地调用该程序。查看系统程序调用后的返回值可以使用命令`echo $?`来查看
，我们可以将`MAXQUEUE`修改得较小来验证。Chris Sidi给出了基于Ben Pfaff给出的方法的改进的方法，
加入新变量`spaceJustPrinted`来检查当前最后输出的字符是否为空白字符，这样在遇到换行符时再根据之前输出的字符来判断是否要返回错误
信号。程序还增加了处理某些文本文件最后一行没有换行符的情况，增加了鲁棒性。


```C

#include <stdio.h>
#include <stdlib.h>

#define MAXQUEUE 1001

int advance(int pointer)
{
	if (pointer < MAXQUEUE - 1)
		return pointer + 1;
  	else
		return 0;
}

int main(void)
{
	char blank[MAXQUEUE];
 	int head, tail;
  	int nonspace;
  	int retval;
  	int c;
  	int spaceJustPrinted; /*boolean: was the last character printed whitespace?*/

	retval = spaceJustPrinted = nonspace = head = tail = 0;
  	while ((c = getchar()) != EOF) {
		if (c == '\n') {
			head = tail = 0;
      	    if (spaceJustPrinted == 1) /*if some trailing whitespace was printed...*/
        		retval = EXIT_FAILURE;
      	    if (nonspace) {
        		putchar('\n');
        		spaceJustPrinted = 0; /* this instruction isn't really necessary since
                                        spaceJustPrinted is only used to determine the
                                        return value, but we'll keep this boolean
                                        truthful */
       		    nonspace = 0;  /* moved inside conditional just to save a needless
                                assignment */
      	    }
    	}
    	else if (c == ' ' || c == '\t') {
      	    if (advance(head) == tail) {
        		putchar(blank[tail]); /* these whitespace chars being printed early
                                      are only a problem if they are trailing,
                                      which we'll check when we hit a \n or EOF */
        		spaceJustPrinted = 1;
        		tail = advance(tail);
        		nonspace = 1;
     	 	}
    		blank[head] = c;
      	    head = advance(head);
    	}
    	else {
      	    while (head != tail) {
        		putchar(blank[tail]);
        		tail = advance(tail);
      	    }
      	putchar(c);
      	spaceJustPrinted = 0;
      	nonspace = 1;
    	}
  	}

  	/* if the last line wasn't ended with a newline before the EOF,
  	we'll need to figure out if trailing space was printed here */
  	if (spaceJustPrinted == 1) /*if some trailing whitespace was printed...*/
    	retval = EXIT_FAILURE;

 	return retval;
}
```

这道题还有其他的方法，比如将输入存到字符数组，然后从换行符开始往前删可能的空白字符等。

> Exercise 1-19. Write a function `reverse(s)` that reverses the character string `s`. Use it to
> write a program that reverses its input a line at a time.

一种简单的思路是把行末换行符先去掉，然后将'\0'之前的字符颠倒顺序，最后输出的时候再补上换行符。


```C
#include <stdio.h>

#define MAX_LINE 1024

void discardnewline(char s[]);
int reverse(char s[]);
int getaline(char s[],int lim);

int main(void)
{
	char line[MAX_LINE];

	while(getaline(line,MAX_LINE)>0)
	{
		discardnewline(line);
		reverse(line);
		printf("%s\n",line);
	}
	return 0;
}

void discardnewline(char s[])
{
	int i;
	for (i = 0; s[i] != '\0'; i++)
	{
		if(s[i] == '\n')
			s[i] = '\0';
	}
}

int reverse(char s[])
{
	char ch;
	int i,j;

	for(j=0; s[j] != '\0'; j++)
		;
	--j;
	for(i = 0; i < j; i++)
	{
		ch = s[i];
		s[i] = s[j];
		s[j] = ch;
		--j;
	}
	return 0;
}

int getaline(char s[], int lim)
{
	int c,i;
	for(i=0;
		i < lim - 1 && (c = getchar()) != EOF && c != '\n';
		++i)
		s[i] = c;
	if(c =='\n'){
		s[i] = c;
		++i;
	}
	s[i] = '\0';
	return i;
}
```

看上去行末的'\n'确实比较讨厌，所以要先把它去掉，但是仔细想想，其实这并不是必要的，可以精简
程序如下。


```C
#include <stdio.h>

#define MAX_LINE 1024

int reverse(char s[]);
int getaline(char s[],int lim);

int main(void)
{
	char line[MAX_LINE];

	while(getaline(line,MAX_LINE)>0)
	{
		reverse(line);
		printf("%s",line);
	}
	return 0;
}

int reverse(char s[])
{
	char ch;
	int i,j;

	for(j=0; s[j] != '\n'; j++)
		;
	--j;
	for(i = 0; i < j; i++)
	{
		ch = s[i];
		s[i] = s[j];
		s[j] = ch;
		--j;
	}
	return 0;
}

int getaline(char s[], int lim)
{
	int c,i;
	for(i=0;
		i < lim - 1 && (c = getchar()) != EOF && c != '\n';
		++i)
		s[i] = c;
	if(c =='\n'){
		s[i] = c;
		++i;
	}
	s[i] = '\0';
	return i;
}
```

# 外部变量与作用域

在`main()`中声明的变量例如`line`,`longest`等对于`main()`是**局部(local)变量**，其他函数不能直接访问。对于其他函数也是
一样，不同函数中的`i`并不具有联系。函数内的局部变量只在函数调用时创建，然后在函数退出时在内存中消失，因为这个原因常称
他们为**自动(automatic)变量**。自动变量不会在两次调用之间保存值，所以必须在函数入口处显式地设定。

除了自动变量，还可以定义一种**外部(external)**变量，能够被任何函数访问，这样可以替代参数列表来进行函数之间的通讯。这样
每次调用函数修改外部变量后其值都会保存。外部变量只能在所有函数之外定义一次，并分配存储空间。在函数中同时必须对其进行声
明后才能访问。可以通过`extern`语句显式声明，或通过上下文隐式声明。

为了说明外部变量，修改最长行程序如下，`max`为外部变量。


```C
#include <stdio.h>

#define MAXLINE 1000	/*  maximum input line size */

int max;	/* maximum length seen so far */
char line[MAXLINE];		/* current input line */
char longest[MAXLINE];	/* longest line saved here */

int getaline(void);
void copy(void);

/*print longest input line; specialized version */
main()
{
	int len;
	extern int max;
	extern char longest[];

	max = 0;
	while((len = getaline()) > 0)
		if(len > max){
			max = len;
			copy();
		}
	if (max > 0)	/* there was a line */
		printf("%s",longest);
	return 0;
}

/* getaline: specialized version */
int getaline(void)
{
	int c,i;
	extern char line[];

	for(i = 0;i < MAXLINE - 1
		&& (c=getchar()) != EOF && c != '\n';++i)
		line[i] = c;
	if(c == '\n'){
		line[i] = c;
		++i;
	}
	line[i] = '\0';
	return i;
}

/* copy: specialized version */
void copy(void)
{
	int i;
	extern char line[],longest[];

	i = 0;
	while((longest[i] = line[i]) != '\0')
		++i;
}
```

在函数使用外部变量之前，函数必须要知道外部变量的名字，声明前面要加上关键字`extern`。在特定情况下，`extern`可以省略，这时
外部变量需要在函数之前定义，这样`main()`,`getaline()`,`copy()`中的`extern`都是多余的。

> In fact, common practice is to place definitions of all external
> variables at the beginning of the source file, and then omit all extern declarations.

另外一种情况，如果程序有多个源文件，一个变量定义在_file1_中并且在_file2_和_file3_中使用，在_file2_和_file3_中必须用`extern`
声明。通常实践上将外部变量和函数放在一个文件中，即头文件。

因为上面的`getaline()`和`copy()`没有参数，但是为了向前兼容，ANSI C使用`void`来显式声明，以关闭所有参数列表检查。

需要注意**定义(definitions)**和**声明(declarations)**的区别，定义是创建变量并分配存储空间，声明是说明变量性质但不分配内存。


> The usual practice is to collect extern declarations of variables and functions in a
> separate file, historically called a header, that is included by #include at the front of each
> source file.

另外，过分依赖外部变量实际上并不好(虽然看起来这样可以简化通讯，参数列表可以变短并且变量访问更容易)。

> But external variables are always there even when you don't want them.
> Relying too heavily on external variables is fraught with peril since it leads to programs
> whose data connections are not all obvious - variables can be changed in unexpected and even
> inadvertent ways, and the program is hard to modify.

这一节的最长行版本并没有之前的版本好，有两个原因：

* 过度依赖外部变量；
* 把程序里的变量放到函数模块中，这样破坏了`getaline()`和`copy()`的通用性。


> Exercise 1-20. Write a program __detab__ that replaces tabs in the input with the proper number
> of blanks to space to the next tab stop. Assume a fixed set of tab stops, say every n columns.
> Should n be a variable or a symbolic parameter?

> Exercise 1-21. Write a program entab that replaces strings of blanks by the minimum
> number of tabs and blanks to achieve the same spacing. Use the same tab stops as for detab.
> When either a tab or a single blank would suffice to reach a tab stop, which should be given
> preference?

> Exercise 1-22. Write a program to ``fold'' long input lines into two or more shorter lines after
> the last non-blank character that occurs before the n-th column of input. Make sure your
> program does something intelligent with very long lines, and if there are no blanks or tabs
> before the specified column.

> Exercise 1-23. Write a program to remove all comments from a C program. Don't forget to
> handle quoted strings and character constants properly. **C comments don't nest**.

> Exercise 1-24. Write a program to check a C program for rudimentary syntax errors like
> unmatched parentheses, brackets and braces. Don't forget about quotes, both single and
> double, escape sequences, and comments. (This program is hard if you do it in full
> generality.)
