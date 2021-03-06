# 0.1 + 0.2 != 0.3

在 JavaScript 中，`0.1 + 0.2`  不等于 `0.3` 。

实际上，大多数语言中都存在此问题（基于 IEEE-754 标准），例如 Java 和 Python。

## 前置知识

分析为什么产生该问题之前，我们有必要了解一些前置知识。

### 科学计数法

当我们要标记或运算某个较大或较小且位数较多时，用科学计数法可以避免浪费很多的空间和时间。

* `1000000000` 使用科学计数法可以表示为：`1 * 10^3`；
* `0.001` 使用科学计数法表示为：`1 * 10^-3`；
* `0.1` 使用科学计数法表示为：`1 * 10^-1`。

### IEEE-754

[IEEE-754 ](https://zh.wikipedia.org/wiki/IEEE_754) 规定单精度浮点数使用 4 字节进行存储，双精度浮点数使用 8 字节进行存储，表示为三部分：符号位、阶、尾数。

在 JavaScript 中，浮点数是基于 [IEEE-754](https://zh.wikipedia.org/wiki/IEEE_754) 中的 **双精度（64位）** 标准进行存储的。也就是说，浮点数存储在内存空间中是一个 64 位的二进制小数形式。

<img src="./images/IEEE-754.png" >

* sign bit：符号位（1 bit）。表示正负号，0 表示正数、1 表示负数。
* exponent：指数位（11 bits）。用来存储指数表示次方数。
* mantissa：尾数位（52 bits）。存储尾数表示精确度，1 <= M < 2。

符号位没有什么可说的，就是用来表示正负数。

指数位表示次方数，这里的次方数是以当前的进制数为底。比如次方数为 5。

* 如果当前是十进制，就是 10 的 5 次方；
* 如果当前是二进制，就是 2 的 5 次方。

尾数位存储尾数表示精确度，用来表示一个大于等于 1 小于 2 的数值。

> IEEE-754 规定，在计算机内部保存尾数时，默认这个数的第一位总是 1，因此可以被舍去，只保存后面部分，这样可以节省 1 位有效数字，对于双精度 64 位浮点数，M 为 52 位，将第一位的 1 舍去，可以保存的有效数字为 52 + 1 = 53 位。

如果我们以 S 表示正负号，H 表示进制数，E 表示次方数，M 表示尾数，则浮点数 value 就可以表示为：**value = S * M * H^E** 。

同理可以得出二进制公式为：**value = S * M * 2^E** 。

### 指数位偏移量

> 指数偏移量，是指浮点数表示法中的指数位的编码值为指数的实际上加上某个固定的值。 
> IEEE-754 国际标准固定该固定值为 2 的 (e - 1) 次方减一。这里的 e 为存储指数的位元的长度，即有几个 bit。

由于指数位可能是负数，也有可能是正数，即指数是有符号整数，而有符号整数的计算是比无符号整数麻烦的。所以为了避免不必要的麻烦，在实际存储指数的时候，需要把指数转换成无符号整数。

float 的指数部分是 8 位，则指数的取值范围就是 `-126 ~ +127`，为了消除负数带来的实际计算上的影响（比如比较大小，加减法等），可以在实际存储的时候，给指数做一个简单的映射，加上一个偏移量，比如 float 的偏移量为 127，这样就不会存在负数了。

> 2 ^ 7 - 1 = 127

如果指数为 6，则实际存储的是 6 + 127 = 133，即把 133 转换成二进制之后再存储。
如果指数为 -3，则实际存储的是 -3 + 127 = 124，即把 124 转换为二进制之后再存储。

当我们需要计算实际代表的十进制数的时候，再把指数减去偏移量即可。

double 类型的取值范围是`-1022 ~ +10`，偏移量为 1023。

> 2 ^ 10 - 1 = 1023

### 0.1 存储过程

在计算机中，有效数转换成二进制是通过乘以 2（`*2`）的方式，如果结果大于 1，则取乘积的小数部分继续乘以 2，结果为 0 终止计算，最终结果是取每一次乘积中的整数位。

> 整数部分转二进制采用 `/2` 取余法，小数部分二进制采用 `*2` 取整法。

```
0.1 转换成二进制过程

0.1 * 2 = 0.2 取整 0
0.2 * 2 = 0.4 取整 0
0.4 * 2 = 0.8 取整 0
0.8 * 2 = 1.6 取整 1
0.6 * 2 = 1.2 取整 1
0.2 * 2 = 0.4 取整 0
0.4 * 2 = 0.8 取整 0
0.8 * 2 = 1.6 取整 1
0.6 * 2 = 1.2 取整 1
0.2 * 2 = 0.4 取整 0
0.4 * 2 = 0.8 取整 0
0.8 * 2 = 1.6 取整 1
0.6 * 2 = 1.2 取整 1
0.2 * 2 = 0.4 取整 0
0.4 * 2 = 0.8 取整 0
0.8 * 2 = 1.6 取整 1
0.6 * 2 = 1.2 取整 1
...
```

可以看到，后面是一段重复的运算过程，最后的结果是：

```
0.0001100110011001100110011001100110011001100110011001100110011...
```

使用二进制浮点数的科学计数法表示：

```
0.0001100110011001100110011001100110011001100110011001100110011...
0.0001100110011001100110011001100110011001100110011001100110011... * 2^0

=> 转换为整数

1.100110011001100110011001100110011001100110011001100110011... * 2^-4

=> 简写

1.100110011001100110011... * 2^{-4}
```

下面我们来看如何使用 IEEE-754 标准存储值。先回顾一下二进制公式：**value = S * M * 2^E** 。

**符号位**

由于 0.1 为整数，所以符号位 `S = 0`。

**指数位**

E = -4，实际存储为 `-4 + 1023 = 1019`，二进制为 `1111111011`，因为 E 为 11 位，最终为 `01111111011`。

**尾数位**

在 IEEE-754 中，双精度 64 位下最多存储的有效整数为 52 位，会采用 **就近舍入（round to nearest） 模式（进一舍零）** 进行存储。

```
1|1001100110011001100110011001100110011001100110011001 // M 舍去首位的 1，得到如下
1001100110011001100110011001100110011001100110011001 // 0 舍 1 入，得到如下
1001100110011001100110011001100110011001100110011010 // 最终存储
```

最终存储结果就是：

```
S  E            M
0  01111111011  1001100110011001100110011001100110011001100110011010 
```

<img src="./images/0.1.png" />

> 0.1 IEEE-754 可视化数值可以参考这个网站： http://bartaz.github.io/ieee754-visualization/

### 浮点数运算步骤

* 对阶：使得两个数的小数位对齐；
* 求和：将两个数对阶之后按照定点得加减运算规则计算；
* 规格化：为了增加有效数得位数，必须将求和（差）之后的尾数进行规格化。

## 0.1 + 0.2 的计算过程

上面我们已经讲解过浮点数 0.1 的 IEEE-754 标准的存储过程，0.2 也同理，可以自己推理下。

```
S  E            M
0  01111111011  1001100110011001100110011001100110011001100110011010 // 0.1
0  01111111100  1001100110011001100110011001100110011001100110011010 // 0.2
```

### 对阶

浮点数加减首先要判断两数的指数为是否相同（小数点位置是否对齐），如两数指数位不同，需要对阶保证指数位相同。
对阶时遵循 **小阶向大阶看齐原则** ，尾数向右移位，每移动一位，指数位加 1 直到指数位相同，即完成对阶。

本示例中，0.1 的阶码为 -4 小于 0.2 的阶码 -3，所以需要对 0.1 做移码操作。

```
// 0.1 移动之前
0  01111111011  1001100110011001100110011001100110011001100110011010 

// 0.1 右移 1 位之后尾数最高位空出一位（0 舍 1 入，此处舍去末尾 0）
0  01111111100  100110011001100110011001100110011001100110011001101(0) 

// 0.1 右移 1 位完成
0  01111111100  1100110011001100110011001100110011001100110011001101
```

尾数右移 1 位之后最高位空出，如何填补呢？这里涉及两个概念：

* 逻辑右移：最高位永远补 0。
* 算数右移：不改变最高位值，是 1 补 1，是 0 补 0，尾数部分存在隐藏掉的最高位为 1。

> 右移升阶时，会把隐藏位的 1 给取出。
>
> 1.1001100110011001100110011001100110011001100110011010
> =>
> 0.1100110011001100110011001100110011001100110011001101(0)
> =>
> 0.1100110011001100110011001100110011001100110011001101

### 求和

两个尾数直接求和：

```
  0.1100110011001100110011001100110011001100110011001101(0) // 0.1
+ 1.1001100110011001100110011001100110011001100110011010    // 0.2
 10.0110011001100110011001100110011001100110011001100111
```

### 规格化、舍入

由于产生进位，阶码需要 +1，对应的十进制为 1021，此时阶码为 1021 - 1023（64 中间值）= -2，此时符号位、指数位如下所示：

```
  S  E
= 0  01111111101
```

尾部进位 2 位，去除最高值默认的 1，因最低位为 1，需要进行舍入操作（二进制中以 0 为结尾），舍入的方法就是在最低有效位加 1，若为 0 则直接舍去，若为 1 则继续加 1。

```
  10.0110011001100110011001100110011001100110011001100111  // + 1
= 10.0110011001100110011001100110011001100110011001101000  // 去除最高位默认的 1
=  1.00110011001100110011001100110011001100110011001101000 // 最后一位 0 舍去
=    0011001100110011001100110011001100110011001100110100  // 尾数最终结果
```

IEEE-754 中最终存储如下：

```
0  01111111101  0011001100110011001100110011001100110011001100110100
```

最高位为 1，得到的二进制数如下所示：

```
2^-2 * 1.0011001100110011001100110011001100110011001100110100
```

转换为十进制如下所示：

```
0.30000000000000004
```

## 解决方案

### toFixed

不考虑精度时，可以使用 `toFixed` 进行进制转化。

使用 `toFixed` 会出现以下问题：

```js
0.445.toFixed(2) // 0.45
0.446.toFixed(2) // 0.45
0.435.toFixed(2) // 0.43 ?
0.4356.toFixed(2) // 0.44
```

```js
0.15.toFixed(1) // 0.1 ?
0.25.toFixed(1) // 0.3
0.35.toFixed(1) // 0.3 ?
0.45.toFixed(1) // 0.5
0.55.toFixed(1) // 0.6
0.65.toFixed(1) // 0.7
0.75.toFixed(1) // 0.8

0.151.toFixed(1) // 0.2
0.251.toFixed(1) // 0.3
0.351.toFixed(1) // 0.4
0.451.toFixed(1) // 0.5
0.551.toFixed(1) // 0.6
0.651.toFixed(1) // 0.7
0.751.toFixed(1) // 0.8
```

为什么会造成这么多诡异的情况呢？

这是因为 `toFixed` 使用的是一种叫做 **四舍六入五成双（四舍六入五凑偶）** 的进位方法：对于位数很多的近似数，当有效位确定后，后面多余的数字应该舍去，只保留有效数最后一位。具体规则如下：

* 四舍：指小于或等于 4 时，直接舍去；
* 六入：指大于或等于 6 时，舍去后进 1；
* 五凑偶：当 5 后面还有数字时，舍 5 进 1，当 5 后面没有数字或为 0 时
  * 5 前面的数字小于等于 4 时，偶数则舍 5 进 1，奇数则直接舍去；
  * 5 前面的数字大于 4 时，舍 5 进 1。

所以说，我们使用 `toFixed` 的方案来解决浮点数的运算问题，是不安全的。

### 将数字转为整数

```js
function add(num1, num2) {
 const num1Digits = (num1.toString().split('.')[1] || '').length;
 const num2Digits = (num2.toString().split('.')[1] || '').length;
 const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
 return (num1 * baseNum + num2 * baseNum) / baseNum;
}
```

```js
add(0.1, 0.2) // 0.3
```

### 使用第三方库

如果需要比较精确的浮点数运算，可以使用一些现有的库来完成计算。例如：[decimal.js](https://www.npmjs.com/package/decimal)，math.js 或 big.js。

```js
import Decimal from 'decimal.js'

const a = new Decimal(0.1)
const b = a.add(0.2)

console.log(b.toNumber()) // 0.3

const c = new Decimal(16.1)
const d = c.mul(1000)

console.log(d.toNumber()) // 16100
```

### 字符串模拟运算

可以考虑使用字符串模拟数字运算。

## 参考文章

[IEEE-754 维基百科](https://zh.wikipedia.org/wiki/IEEE_754)

[浮点数之谜](https://www.javascriptc.com/books/nodejs-roadmap/javascript/floating-point-number-0.1-0.2.html)

[0.1 + 0.2 == 0.3 ?](https://www.yuque.com/yyne87/bpfdka/hxih5y#oGJyB)

[float 和 double 偏移量](https://zhidao.baidu.com/question/1644364071497328980.html)
