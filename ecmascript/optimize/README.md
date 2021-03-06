# JS 性能优化

性能优化不可避免。任何一种提高运行效率，降低运行开销的行为都可以看作是一种优化操作。

## 一、内存优化

内存泄漏案例：

```js
function fn () {
  arrList = [];
  arrList[100000] = 'yueluo is a coder';
}

fn();
```

### 内存管理

内存：由读写单元组成，表示一片可操作空间

管理：人为的去操作一片空间的申请、使用和释放

内存管理：开发者主动地申请空间、使用空间、释放空间

管理流程：申请 - 使用 - 释放



**JavaScript 内存管理**

* 申请内存空间

* 使用内存空间

* 释放内存空间



```js
// 申请空间
let obj = {};

// 使用空间
obj.name = 'yueluo';

// 释放空间
obj = null;
```

### 垃圾回收

* JavaScript 中内存管理是自动的
* 对象不再被引用时被视为垃圾
* 对象不能访问到时被视为垃圾

#### 可达对象

* 可以访问到的对象就是可达对象（引用、作用域链）
* 可达的标准就是从根出发是否能够被找到
* JavaScript 中的根可以理解为是全局变量对象

#### 引用与可达

```js
let obj = { name: 'yueluo' };

let obj2 = obj;

obj = null;

console.log(obj); // { name: 'yueluo' };
```



```js
function group (obj1, obj2) {
  obj1.next = obj2;
  obj2.prev = obj1;
  
  return {
    o1: obj1,
    o2: obj2
  }
}

let obj = group({ name: 'obj1' }, { name: 'obj2' });

console.log(obj); // {o1: {…}, o2: {…}}
```



<img src="./images/object.png" style="zoom: 60%" />



### GC 算法

#### GC 定义与作用

GC 就是垃圾回收机制的简写，GC 可以找到内存中的垃圾、并释放和回收空间。

#### GC 中的垃圾

程序中不再需要使用的对象、程序中不能再访问到的对象

#### GC 算法

* GC 是一种机制，垃圾回收器完成具体的工作

* 工作的内容就是查找垃圾释放空间、回收空间
* 算法就是工作时查找和回收所遵循的规则

#### 常见 GC 算法

* 引用计数
* 标记清除
* 标记整理
* 分代回收

##### 引用计数算法

核心思想：设置引用数，判断当前引用数是否为 0 

引用关系改变时，引用计数器修改引用数字。

```js
const user1 = { age: 11 };
const user2 = { age: 12 };
const user3 = { age: 13 };

const nameList = [user1.age, user2.age, user3.age];

function fn () {
  num1 = 1;
  num2 = 2;
}

fn();
```

优点：

* 发现垃圾时立即回收
* 最大限度减少程序暂停

缺点：

* 无法回收循环引用的对象
* 时间开销大

```js
function fn () {
  const obj1 = {};
  const obj2 = {};
  
  obj1.name = obj2;
  obj2.name = obj1;
  
  return 'yueluo is a coder';
}

fn();
```

存在互相引用关系，使用引用计数算法无法进行垃圾回收。

##### 标记清除算法

核心思想：分标记和清除二个阶段完成

遍历所有的对象找标记活动对象，遍历所有对象清除没有标记对象，回收相应空间。



<img src="./images/sign.png" style="zoom: 60%" />



第一个阶段中找到所有可达对象，如果涉及到引用层次关系会递归查找进行标记。

第二个阶段会进行清除，找到没有标记的对象，进行垃圾回收，同时将第一次的标记进行清除。这样就完成一次垃圾回收。

最终会把回收的空间放到空闲列表上面，方便后续程序申请空间使用。

优点：

* 相对于标记清除算法，可以解决对象循环引用问题；

缺点：

* 易产生空间碎片化，垃圾回收后导致地址不连续，不能让空间得到最大化使用

##### 标记整理算法

标记整理算法可以看作是标记清除算法的增强。

标记阶段的操作和标记清除一致，清除阶段会先执行整理，移动对象位置，让地址产生连续，最大化的利用空间。



<img src="./images/clear_before.png" style="zoom: 60%" />

<img src="./images/clear_after.png" style="zoom: 60%" />

<img src="./images/clear_after02.png" style="zoom: 60%" />



#### GC 算法总结

* 引用计数
  * 内部通过引用计数器维护每个对象的引用数值，通过数值是否为 0， 判断是否是垃圾对象
  * 可以及时回收垃圾对象、最大限度减少程序卡顿时间
  * 无法回收循环引用的对象、资源消耗较大（维护引用计数器，需要频繁操作）
* 标记清除
  * 遍历所有对象，将当前活动对象进行标记、遍历所有对象，将没有被标记的对象释放掉
  * 可以回收循环引用的对象
  * 容易产生碎片化空间，浪费空间、不会立即回收垃圾对象（清除时存在全停顿现象）
* 标记整理
  * 和标记清除类似，不过要在清除前先整理当前内存空间
  * 减少碎片化空间
  * 不会立即回收垃圾对象

### V8

#### 介绍

V8 是一款主流的 JavaScript 执行引擎。

* 采用即时编译
* 内存设有上限
  * windows 64位操作系统不超过 1.5 GB，32 位操作系统不超过 800 MB
  * V8 本身是为浏览器制造的，现有内存大小对于网页应用来说是足够使用的
  * V8 内部使用的垃圾回收机制也决定它采用这种方式

#### 垃圾回收策略

采用分代回收的思想，把内存空间按照一定规则分成两类，新生代和老生代。

针对不同对象采用不同算法。

V8 中常用 GC 算法

* 分代回收
* 空间复制
* 标记清除
* 标记整理
* 标记增量

#### 回收新生代对象

V8 内存空间一分为二，小空间用于存储新生代对象（64 位 32 M，32 位 16 M ）。

新生代指的是存活时间较短的对象。



<img src="./images/memory.png" style="zoom: 60%" />



主要采用复制算法和标记整理算法

* 将新生代内存区分为二个等大小空间，使用空间为 From 状态、空闲空间为 To 状态
* 活动对象存储于 From 空间，标记整理后将活动对象拷贝至 To
  * 拷贝过程存在晋升现象，将新生代对象移动至老生代
  * 晋升条件：一轮 GC 还存活的新生代需要晋升，To 空间的使用率超过 25% 
* From 与 To 交换空间完成内存释放

#### 回收老生代对象

64 位操作系统 1.4 G，32 位操作系统 700 M。

老生代对象就是指存活时间较长的对象。



**主要采用标记清除、标记整理、增量标记算法**

* 使用标记清除完成垃圾空间的回收
* 新生代对象向老生代区域移动，并且老生代区域不足以存放新生代区域对象，采用标记整理进行空间优化
* 采用增量标记进行效率优化

**新老生代垃圾回收对比**

* 新生代区域垃圾回收使用空间换时间
* 老生代区域垃圾回收不适合复制算法
  * 空间一分为二，浪费空间
  * 存放数据较多，复制过程消耗时间较多

**标记增量如何优化垃圾回收**

垃圾回收工作时会阻塞当前 JavaScript 程序执行，存在空档期（全停顿）。

标记增量就是将一整段的垃圾回收操作拆分成多个小步，组合完成整个回收，不需要一次完成整个垃圾回收过程。标记增量可以让垃圾回收和程序执行交替工作。



<img src="./images/sign02.png" style="zoom: 60%" />



#### 垃圾回收总结

V8 是一款主流的 JavaScript 执行引擎，V8 内存设置上限。

V8 采用分代回收的思想实现垃圾回收，将内存分为新生代和老生代，分别使用不同的 GC  算法。

### Performance

#### 工具介绍

* GC 的目的是为了实现内存空间的良性循环。

* 良性循环的基石是合理使用。需要时刻关注内存变化。

* Performance 提供多种监控方式。

通过使用 Performance 时刻监控内存。

**使用步骤**

* 打开浏览器输入目标网址
* 打开开发人员工具面板，选择性能
* 开启录制功能，访问具体页面
* 执行用户行为，一段时间后停止录制
* 分析界面中记录的内存信息

#### 内存问题的体现

分析内存问题的前提条件是网络环境正常。

外在表现

* 页面出现延迟加载或经常性暂停（，可能出现频繁的垃圾回收
* 页面持续性出现糟糕的性能，可能存在内存膨胀
* 页面的性能随时间加长越来越差

#### 监控内存的方式

界定内存问题的标准

* 内存泄漏：内存使用持续升高
* 内存膨胀：多数设备上都存在性能问题
* 频繁垃圾回收：通过内存变化图进行分析

监控内存的几种方式

* 浏览器任务管理器
* Timeline 时序图记录
* 堆快照查找分析 DOM
* 判断是否存在频繁的垃圾回收

#### 任务管理器监控内存

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

  <button id="J-btn">Button</button>
  
  <script>
    const oBtn = document.getElementId('J-btn');
    
    oBtn.onclick = function () {
      let arrList = new Array(1000000);
    }
  </script>
  
</body>
</html>
```

shift + esc 打开浏览器任务管理器。任务管理器只能说明存在问题，但是不能很准确的定位问题。



<img src="./images/js_memory.png" style="zoom: 60%" />

#### Timeline 记录内存

```html
<button id="J-btn">Add</button>

<script>
	const oBtn = document.getElementById('J-btn');
  
  oBtn.onclick = function () {
    let arrList = new Array(1000000);
  }
</script>
```



<img src="./images/memory02.png" style="zoom: 60%" />

#### 堆快照查找分离 DOM

分离 DOM

* 界面元素存活在 DOM 树上
* 垃圾对象时的 DOM 节点
* 分离状态的 DOM 节点（界面已经不存在，但是存在 JS 引用）



```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

  <button id="J-btn">Add</button>
  
  <script>
    const oBtn = document.getElementById('J-btn');
  
    let tempElem;

    function test () {
      for (let i = 0; i < 100000; i++) {
        const ul = document.createElement('ul');

        for (let i = 0; i < 10; i++) {
          const li = document.createElement('li');

          ul.appendChild(ul);
        }

        tempElem = ul;
      }
    }

    oBtn.addEventListener('click', test);
  </script>
  
</body>
</html>
```



<img src="./images/memory03.png" style="zoom: 60%" />

#### 判断是否存在频繁 GC

频繁垃圾回收现象

* GC 工作时应用程序是停止的
* 频繁且过长的 GC 会导致应用假死
* 用户使用中感知应用卡顿

如何确定频繁地垃圾回收

* Timeline 中频繁的上升下降
* 任务管理器中数据频繁的增加或者减小

#### Performance 总结

Performance 使用

* Performance 使用流程
* 内存问题的相关分析
* Performance 时序图监控内存变化
* 任务管理器监控内存变化

## 二、代码优化

精准测试 JavaScript 性能

* 本质上就是采集大量的执行样本进行数学统计和分析
* 使用基于 Benchmark.js 的 https://jsperf.com/ 完成，在线脚本性能测试

Jsperf 使用流程

* GitHub 账号登录
* 填写个人信息（非必须）
* 填写详细的测试用例信息（title、slug）
* 填写准备代码（DOM 操作经常使用）
* 填写必要的 setup 和 teardown 代码
* 填写代码测试片段

### 慎用全局变量

程序运行过程中，如果需要对某些数据进行存储，需要尽可能的放到局部作用域中，使用局部变量。

* 全局变量定义在全局执行上下文，是所有作用域链的顶端
* 全局执行上下文一直存在于上下文执行栈，直到程序退出
* 如果某个局部作用域出现同名变量则会遮蔽或污染全局

### 缓存全局变量

将使用中无法避免的全局变量缓存到局部

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

  <input type="button" value="btn" id="J-btn1" />
  <input type="button" value="btn" id="J-btn2" />
  <input type="button" value="btn" id="J-btn3" />
  <input type="button" value="btn" id="J-btn4" />
  <p>1111</p>
  <input type="button" value="btn" id="J-btn5" />
  <input type="button" value="btn" id="J-btn6" />
  <p>2222</p>
  <input type="button" value="btn" id="J-btn7" />
  <input type="button" value="btn" id="J-btn8" />
  <p>3333</p>
  <input type="button" value="btn" id="J-btn9" />
  <input type="button" value="btn" id="J-btn10" />
  
  <script>
    function getBtn () {
      let oBtn1 = document.getElementById('J-btn1');
      let oBtn3 = document.getElementById('J-btn3');
      let oBtn5 = document.getElementById('J-btn5');
      let oBtn7 = document.getElementById('J-btn7');
      let oBtn9 = document.getElementById('J-btn9');
    }

    function getBtn2 () {
      const _doc = document;

      let oBtn1 = _doc.getElementById('J-btn1');
      let oBtn3 = _doc.getElementById('J-btn3');
      let oBtn5 = _doc.getElementById('J-btn5');
      let oBtn7 = _doc.getElementById('J-btn7');
      let oBtn9 = _doc.getElementById('J-btn9');
    }
  </script>
  
</body>
</html>
```

### 通过原型添加方法

在原型对象上新增实例对象需要的方法 。

```js
var Fn1 = function () {
  this.foo = function () {
    console.log(1111);
  }
}

let f1 = new Fn1();
```

```js
var Fn2 = function () {}

fn2.prototype.foo = function () {
  console.log(1111);
}

let f2 = new Fn2();
```

### 避开闭包陷阱

闭包特点

* 外部具有指向内部的引用
* 在 “外” 部作用域访问 “内” 部作用域的数据 

关于闭包

* 闭包是一种强大的语法。
* 闭包使用不当很容易出现内存泄漏
* 不要为了闭包而闭包

```js
function foo () {
  var name = 'yueluo';
  
  function fn () {
    console.log(name);
  }
  
  return fn;
}

var a = foo();

a();
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

  <input type="button" id="J-btn" />
  
  <script>
    function foo () {
      var el = document.getElementById('J-btn');

      el.onclick = function () {
        console.log(el.id);
      }
    }

    foo();
  </script>
  
</body>
</html>
```

存在内存泄漏。

```js
function foo () {
  var el = document.getElementById('J-btn');

  el.onclick = function () {
    console.log(el.id);
  }

  el = null;
}

foo();
```

### 避免属性访问方法使用

JavaScript 中的面向对象

* JS 不需属性的访问方法，所有属性都是外部可见的
* 使用属性访问方法只会增加一层重定义，没有访问的控制力

```js
function Person () {
  this.name = 'coder';
  this.age = 23;
  
  this.getAge = function () {
    return this.age;
  }
}

const p = new Person();
const age = p.getAge();
```

```js
function Person () {
  this.name = 'coder';
  this.age = 23;
  
  this.getAge = function () {
    return this.age;
  }
}

const p = new Person();
const age = p.age;
```

提供成员方法在执行效率上比直接访问效率低。

### For 循环优化

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

  <p class="btn">add</p>
  <p class="btn">add</p>
  <p class="btn">add</p>
  <p class="btn">add</p>
  <p class="btn">add</p>
  <p class="btn">add</p>
  <p class="btn">add</p>
  <p class="btn">add</p>
  <p class="btn">add</p>
  <p class="btn">add</p>

  <script>
    var oBtns = document.getElementsByClassName('btn');
    
    for (var i = 0; i < oBtns.length; i++) {
      console.log(i);
    }
    
    for (var i = 0, len = oBtns.length; i < len; i++) {
      console.log(i);
    }
  </script>
  
</body>
</html>
```

### 选择最优的循环方法

```js
var arr = new Array(1, 2, 3, 4, 5);

console.time();
arr.forEach(function (item) {
  console.log(item);
});
console.timeEnd();

console.time();
arr.map(function (item) {
  console.log(item);
});
console.timeEnd();

console.time();
for (var i = arr.length; i; i--) {
  console.log(arr[i]);
}
console.timeEnd();

console.time();
for (var i in arr) {
  console.log(arr[i]);
}
console.timeEnd();
```

效率对比： for > for in > map > forEach。

浏览器可能对 forEach 有优化操作，所以差距也不明显。

### 文档碎片优化

节点的添加操作必然会有回流和重绘，建议使用 DocumentFragment。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

  <script>
    for (var i = 0; i < 10; i++) {
      var oP = document.createElement('p');

      oP.innerHTML = i;

      document.body.appendChild(oP);
    }
  </script>
  <script>
    const oFrag = document.createDocumentFragment();

    for (var i = 0; i < 10; i++) {
      var oP = document.createElement('p');

      oP.innerHTML = i;
  
      oFrag.appendChild(oP);
    }

    document.body.appendChild(oFrag);
  </script>
  
</body>
</html>
```

### 克隆优化节点操作

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

  <p id="J-box">old</p>

  <script>
    for (var i = 0; i < 10; i++) {
      var oP = document.createElement('p');

      oP.innerHTML = i;

      document.body.appendChild(oP);
    }
  </script>
  
  <script>
    const oldP = document.getElementById('J-box');

    for (var i = 0; i < 10; i++) {
      var oP = oldP.cloneNode(false);

      oP.innerHTML = i;

      document.body.appendChild(oP);
    }
  </script>
  
</body>
</html>
```

### 直接量替换 new Object

```js
var arr = [1, 2, 3];

var arr2 = new Array(1, 2, 3);
```

。。。