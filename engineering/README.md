# 一、脚手架工具

## 工程化

### 前端工程化

前端工程化是指遵循一定标准和规范，通过工具提高效率、降低成本的一种手段。



遇到的问题

* 想使用 ES6+ 新特性，但是兼容有问题
* 想使用 Less/Sass/PostCSS 增强 CSS 的编程性，但是运行环境不能直接支持
* 想使用模块化的方式提高项目的可维护性，但运行环境不能直接支持
* 部署上线前需要手动压缩代码及资源文件，部署过程中需要手动上传代码到服务器
* 多人协作开发，无法硬性统一大家的代码风格，质量无法保证
* 部分功能开发时需要等待后端服务接口提前完成

主要解决的问题

* 传统语言或语法弊端
* 无法使用模块化/组件化
* 重复的机械式工作
* 代码风格统一、质量保证
* 依赖后端服务接口支持
* 整体依赖后端项目

### 工程化表现

一切以提高效率、降低成本、质量保证为目的的手段都属于“工程化”。

一切重复的工作都应该被自动化。



<img src="./images/front.png" style="zoom: 60%" />



创建项目

* 自动创建项目结构
* 创建特定类型文件

编码

* 自动化格式化代码
* 校验代码风格
* 编译/构建/打包

预览/测试

* WebServer / Mock
* Live Reloading / HMR
* Source Map

提交

* Git Hooks
* Lint-staged
* 持续集成

部署

* CI/CD
* 自动发布

### 工程化不等于工具

工具并不是工程化的核心，工程化的核心应该是对象项目整体的规划和架构。工具只是实现工程化的手段。



<img src="./images/ci.png" style="zoom: 60%" />



成熟的工程化集成方案

* creat-react-app
* vue-cli
* angular-cli
* gatsby-cli



> 前端工程化是由 NodeJS 强力驱动的。

## 脚手架工具概要

脚手架可以帮助我们自动的创建项目基础结构、提供项目规范和约定。

* 相同的组织结构
* 相同的开发范式
* 相同的模块依赖
* 相同的工具配置
* 相同的基础代码

IDE 创建项目的过程就是一个脚手架的工作流程。

## 常见的脚手架工具

* 根据信息创建对应的项目基础结构。
  * React：creat-reacta-pp
  * Vue：vuec-li
  * Angular：angular-cli

* Yeoman

  根据一套模板生成对应的项目结构。比较灵活，易扩展。

* Plop

  项目开发过程中创建特定类型的文件，例如创建一个组件/模板所需要的文件

## Yeoman

Yeoman 是一款创建现代化应用的脚手架工具。不同于 Vue-cli 这类工具，Yeoman 更像是一个脚手架运行平台。我们可以通过 Yeoman 搭配不同的 Generator 去创建任何类型的项目。我们可以创建自己的 Generator，从而定义自己的脚手架。在专注于框架开发的人眼中，Yeoman 过于通用，不够专注，所以可能 vue-cli 这样的脚手架更容易被接受。

## Yeoman 基础使用

Yeoman 是基于 NodeJS 开发的工具模块。

全局范围安装 yo

```js
npm install yo -g
```

安装对应的 generator

```js
npm install generator-node -g
```

通过 yo 运行 generator 项目

```js
yo node
```

## Sub Generator

sub generator。

```js
yo node:cli
```

链接到全局

```js
npm link
```

## Yeoman 使用步骤

1. 明确需求；
2. 找到合适的 Generator；
3. 全局范围安装找到的 Generator；
4. 通过 Yo 运行对应的 Generator；
5. 通过命令行交互填写选项；
6. 生成你的所需要的项目结构；



例如创建一个网页应用

1. 通过 yeoman 官网（https://yeoman.io/generators/）找到 webapp
2. `npm install generator-webapp`
3. `yo webapp`

## 自定义 Generator

我们可以基于 Yeoman 搭建自己的脚手架。

Generator 本质上就是一个 NPM 模块。

### Generator 基本结构

generator



<img src="./images/generator.png" style="zoom: 60%" />



sub generator



<img src="./images/sub_generator.png" style="zoom: 60%" />



### `generator-<name>`

名称必须是 `generator-<name>` 格式。如果不按照格式开发，yeoman 使用 generator 会找不到模块。

```js
npm init -y
```

```js
npm install yeoman-generator --save-dev
```

generators/app/index.js

```js
// Generator 核心入口

// 需要导出一个继承自 Yeoman Generator 的类型，Yeoman Generator 工作时会自动调用在此类型中的生命周期方法
// 我们在这些方法中可以通过调用父类提供的一些工具方法实现一些功能，例如文件写入等

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing () {
    // Yeoman 在生成文件阶段会自动调用次方法，我们这里尝试往项目目录中写入文件
    this.fs.write(
      this.destinationPath('test.txt'),
      Math.random().toString()
    );
  }
}
```

链接命令到全局

```js
npm link
```

使用 generator

```js
yo sample
```

## 根据模板创建文件

generators/app/templates/foo.txt

```js
模板文件，内部使用 EJS 模板标记输出数据
例如：<%= title %>
 
其他的 EJS 语法也支持

<% if (success) { %>
  Hello Foo.
<% } %>
```

generators/app/index.js

```js
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing () {
    // 通过模板方式写入文件到目标目录
    const tmpl = this.templatePath('foo.txt');
    // 输出目录
    const output = this.destinationPath('foo.txt');
    // 模板数据上下文
    const context = { title: 'Hello ~', success: false };

    this.fs.copyTpl(tmpl, output, context);
  }
}
```

相对于手动创建每一个文件，模板的方式可以大大提高效率。

# 二、自动化构建

## 自动化构建概述

自动化构建就是把我们开发阶段写出来的源代码自动化的转换成生产代码的代码。

一般我们会把这个转化过程叫做自动化构建工作流。可以帮助我们尽可能脱离运行环境兼容带来的问题。

在开发阶段使用提高效率的语法、规范和标准。

* ECMAScript Next
* Sass
* 模板引擎

这些用法大都不被浏览器直接支持。自动化构建工具可以构建那些不被支持的特性。



## 自动化构建: css 转化案例

### 编写样式文件

```scss
$body-bg: #f8f9fb;
$body-color: #333;

body {
  margin: 0 auto;
  padding: 20px;
  max-width: 800px;
  background-color: $body-bg;
  color: $body-color;
}
```

### 安装 sass

```js
yarn add sass --dev
```

### 执行 sass 命令，构建样式

```js
.\node_modules\.bin\sass scss/main.scss css/style.css
```

### NPM Scripts

```js
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "sass scss/main.scss css/styles.css"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "sass": "^1.37.5"
  }
}
```

script 会自动发现 node_modules 里面的命令

```js
yarn build
```

npm scripts 是实现自动化构建工作流的最简方式。

### 安装 browser-sync

```js
yarn add browser-sync --dev
```

```js
yarn serve
```

启动服务之前，可能样式还没有构建，我们可以使用 npm scrtips 的钩子机制。

```js
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "sass scss/main.scss css/style.css",
    "preserve": "yarn build",
    "serve": "browser-sync ."
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "browser-sync": "^2.27.5",
    "sass": "^1.37.5"
  }
}
```

### 实时监听文件变化

```js
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "sass scss/main.scss css/style.css --watch",
    "preserve": "yarn build",
    "serve": "browser-sync ."
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "browser-sync": "^2.27.5",
    "sass": "^1.37.5"
  }
}
```

这样会存在问题，sass 监听会阻塞 serve 执行，我们需要 build 和 serve 同时执行。

```js
yarn add npm-run-all --dev
```

编写 scripts

```js
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "sass scss/main.scss css/style.css --watch",
    "serve": "browser-sync .",
    "start": "run-p build serve"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "browser-sync": "^2.27.5",
    "npm-run-all": "^4.1.5",
    "sass": "^1.37.5"
  }
}
```

```js
yarn start
```

实时监听文件变化并自动刷新

```js
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "sass scss/main.scss css/style.css --watch",
    "serve": "browser-sync . --files \"css/*.css\"",
    "start": "run-p build serve"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "browser-sync": "^2.27.5",
    "npm-run-all": "^4.1.5",
    "sass": "^1.37.5"
  }
}
```

## 常见的自动化构建工具

npm scripts 可以解决一定的自动化任务，但是针对于复杂的过程，npm scripts 就很吃力，这里我们就需要更加专业的构建工具。

* Grunt
  * 最早的前端构建系统，插件生态非常完善
  * Grunt 的插件几乎可以帮你完成任何事情，但是工作过程是基于临时文件（磁盘读写）实现的，构建速度相对较慢
* Gulp
  * 很好地解决了 Grunt 构建速度慢的问题，基于内存实现
  * 默认支持同时执行多个任务，效率比较高，使用方式相对 Grunt 更加直观易懂
  * 插件生态同样十分完善，目前市面上最流行的前端构建系统
* FIS
  * 百度的前端团队推出的一款构建系统
  * 相对于 Grunt 和 Gulp 微内核的特点，FIS 更像是一种捆绑套餐，把项目中典型需求集成到内部

初学者，可以使用 FIS，如果要求灵活多变，Gulp、Grunt 是更好的选择。

> 严格来说，webpack 是一个模块打包工具，不在讨论范围之类。

## 1. Grunt

### 基本使用

初始化项目

```js
yarn init -y
```

安装 grunt 包

```js
yarn add grunt
```

创建 gruntfile 文件

```js
code gruntfile.js
```

定义 grunt 任务

```js
// Grunt 的入口文件
// 用于定义一些需要 Grunt 自动执行的任务
// 需要导出一个函数，该函数接收一个 grunt 的形参，内部提供一些创建任务的 API

module.exports = grunt => {
  grunt.registerTask('foo', () => {
    console.log('hello grunt');
  });
}
```

执行 foo 任务，任务可以存在多个

```js
yarn grunt foo
```



任务描述信息，registerTask 第二个参数

```js
// Grunt 的入口文件
// 用于定义一些需要 Grunt 自动执行的任务
// 需要导出一个函数，该函数接收一个 grunt 的形参，内部提供一些创建任务的 API

module.exports = grunt => {
  grunt.registerTask('foo', () => {
    console.log('hello grunt');
  });
  grunt.registerTask('bar', '任务描述', () => {
    console.log('other task~');
  });
}
```

```js
yarn grunt --help
```



如果注册任务的名称为 default，那么运行任务时，就不需要写任务抿成

```js
// Grunt 的入口文件
// 用于定义一些需要 Grunt 自动执行的任务
// 需要导出一个函数，该函数接收一个 grunt 的形参，内部提供一些创建任务的 API

module.exports = grunt => {
  grunt.registerTask('foo', () => {
    console.log('hello grunt');
  });
  grunt.registerTask('bar', '任务描述', () => {
    console.log('other task~');
  });
  grunt.registerTask('default', () => {
    console.log('default task~');
  });
}
```

```js
yarn grunt 
```



default 一般用来依次执行其他任务

```js
module.exports = grunt => {
  grunt.registerTask('foo', () => {
    console.log('hello grunt');
  });
  grunt.registerTask('bar', '任务描述', () => {
    console.log('other task~');
  });
  // grunt.registerTask('default', () => {
  //   console.log('default task~');
  // });

  grunt.registerTask('default', ['foo', 'bar']);
}
```

```js
yarn grunt
```

 

grunt 异步任务

```js
grunt.registerTask('async-task', function () {
  const done = this.async();

  setTimeout(() => {
    console.log('async task working~');
    done();
  }, 1000);
});
```

```js
yarn grunt async-task
```

### 标记任务失败

return false 即可标记为任务失败

```js
module.exports = grunt => {
  grunt.registerTask('bad', () => {
    console.log('bad working~');
    return false;
  });
  grunt.registerTask('foo', () => {
    console.log('foo working~');
  });
  grunt.registerTask('default', ['bad', 'foo']);
}
```

任务失败后，后续任务不会执行。我们可以通过 --force 强制后续任务继续执行。

```js
yarn grunt --force
```

 

异步任务也可以标记失败，使用 done(false)

```js
grunt.registerTask('bad-async', function () {
  const done = this.async();

  setTimeout(() => {
    done(false);
  }, 1000);
});
```

### 配置方法

```js
module.exports = grunt => {
  grunt.initConfig({
    foo: {
      bar: 123
    }
  });

  grunt.registerTask('foo', () => {
    console.log(grunt.config('foo'));
    console.log(grunt.config('foo.bar'));
  });
}
```

```js
yarn grunt foo
```

### 多目标任务

```js
module.exports = grunt => {
  grunt.initConfig({
    build: {
      options: {
        foo: 'bar'
      },
      css: {
        options: {
          foo: 'baz'
        }
      },
      js: '2'
    }
  });

  // 多目标模式，可以让任务根据配置形成多个子任务
  grunt.registerMultiTask('build', function () {
    console.log('build task');
    console.log(this.options());
    console.log(`target: ${ this.target }, data: ${ this.data }`)
  });
}
```

运行目标任务

```js
yarn grunt build
```

运行指定目标任务

```js
yarn grunt build:css
```

### 插件使用

插件机制时 Grunt 机制的核心。很多构建任务都是通用的，所有由很多预设插件，插件内部封装了通用的构建任务。

一般来说，我们的构建过程都是由通用的构建任务组成。



安装 grunt-contrib-clean

```js
yarn add grunt-contrib-clean
```

```js
module.exports = grunt => {
  grunt.initConfig({
    clean: {
      temp: 'temp/app.js'
    }
  });
  grunt.loadNpmTasks('grunt-contrib-clean');
}
```

```js
yarn grunt clean	
```



通配符配置

```js
module.exports = grunt => {
  grunt.initConfig({
    clean: {
      temp: 'temp/*.txt'
    }
  });
  grunt.loadNpmTasks('grunt-contrib-clean');
}
```

```js
module.exports = grunt => {
  grunt.initConfig({
    clean: {
      // 清除所有子目录以及子目录下的文件
      temp: 'temp/**'
    }
  });
  grunt.loadNpmTasks('grunt-contrib-clean');
}
```



使用 Grunt 插件

* 找到可使用插件，进行安装
* 加载插件任务（loadNpmTasks）
* initConfig 中为任务增加配置选项

### 常用插件

#### grunt-sass

```js
yarn add grunt-sass sass --dev
```

```js
const sass = require('sass');

module.exports = grunt => {
  grunt.initConfig({
    sass: {
      options: {
        sourceMap: true,
        implementation: sass
      },
      main: {
        files: {
          'dist/css/main.css': 'src/scss/main.scss'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-sass');
}
```

```js
yarn grunt sass 
```

#### grunt-babel

新特性支持，代码转化

```js
yarn add grunt-babel @babel/core @babel/preset-env --dev
```

减少 loadNpmTasks 使用

```js
yarn add load-grunt-tasks --dev
```

```js
const sass = require('sass');
const loadGruntTasks = require('load-grunt-tasks');

module.exports = grunt => {
  grunt.initConfig({
    sass: {
      options: {
        sourceMap: true,
        implementation: sass
      },
      main: {
        files: {
          'dist/css/main.css': 'src/scss/main.scss'
        }
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env']
      },
      main: {
        files: {
          'dist/js/app.js': 'src/js/app.js'
        }
      }
    }
  });

  // grunt.loadNpmTasks('grunt-sass');
  loadGruntTasks(grunt); // 自动加载所有的 grunt 插件任务
}
```

```js
yarn grunt babel
```

#### grunt-contrib-watch

```js
yarn add grunt-contrib-watch --dev
```

```js
const sass = require('sass');
const loadGruntTasks = require('load-grunt-tasks');

module.exports = grunt => {
  grunt.initConfig({
    sass: {
      options: {
        sourceMap: true,
        implementation: sass
      },
      main: {
        files: {
          'dist/css/main.css': 'src/scss/main.scss'
        }
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env']
      },
      main: {
        files: {
          'dist/js/app.js': 'src/js/app.js'
        }
      }
    },
    watch: {
      js: {
        files: ['src/js/*.js'],
        tasks: ['babel']
      },
      css: {
        files: ['src/scss/*.scss'],
        tasks: ['sass']
      },
    }
  });

  loadGruntTasks(grunt); // 自动加载所有的 grunt 插件任务

  grunt.registerTask('default', ['sass', 'babel', 'watch']);
}
```

```js
yarn grunt
```

## 2. Gulp

Gulp 作为当下最流行的前端构建系统，其核心特点就是高效、易用。

### 基本使用

```js
yarn init -y
```

```js
yarn add gulp --dev
```

```js
code gulpfile.js
```

Gulp 最新版需要使用 done 标识任务结束。

```js
// gulp 入口文件

exports.foo = done => {
  console.log('foo task working');

  done(); // 标识任务完成
}

exports.default = done => {
  console.log('default task working');
  done();
}
```

gulp 4.0 之前注册 Gulp 任务需要通过 Gulp 模块内部的方法实现。Gulp 4.0 以后保留了这种方式。

```js
const gulp = require('gulp');

gulp.task('bar', done => {
  console.log('bar task working');

  done();
});
```

### 组合任务

```js
const { series, parallel } = require('gulp');

const task1 = done => {
  setTimeout(() => {
    console.log('task1 working');
    done();
  }, 1000);
}

const task2 = done => {
  setTimeout(() => {
    console.log('task2 working');
    done();
  }, 1000);
}

const task3 = done => {
  setTimeout(() => {
    console.log('task3 working');
    done();
  }, 1000);
}

exports.foo = series(task1, task2, task3); // 串行执行
exports.bar = parallel(task1, task2, task3); // 并行执行
```

构建 JS、CSS 时可以使用 parallel。代码部署可以使用 series，部署前必须构建完毕。

### 异步任务

回调方式

```js
exports.callback = done => {
  console.log('callback task');
  done();
}

exports.callback = done => {
  console.log('callback task');
  done(new Error('task failed'));
}
```

Promise 方式

```js
exports.promise = () => {
  console.log('promise task');
  return Promise.resolve();
}

exports.promise = () => {
  console.log('promise task');
  return Promise.reject(new Error('task failed'));
}
```

async/await 方式

```js
const timeout = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

exports.async = async () => {
  await timeout(1000);
  console.log('async task');
}
```

stream 方式

```js
exports.stream = () => {
  const readStream = fs.createReadStream('package.json');
  const wirteStream = fs.createWriteStream('temp.txt');

  readStream.pipe(wirteStream);

  return readStream;
}
```

### 构建过程

输入（读取流）	=>	加工（转换流）	=>	输出（写入流） 

```css
/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */

/* Document
   ========================================================================== */

/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 */

 html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
}

/* Sections
   ========================================================================== */

/**
 * Remove the margin in all browsers.
 */

body {
  margin: 0;
}

/**
 * Render the `main` element consistently in IE.
 */

main {
  display: block;
}

/**
 * Correct the font size and margin on `h1` elements within `section` and
 * `article` contexts in Chrome, Firefox, and Safari.
 */

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

/* Grouping content
   ========================================================================== */

/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */

hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd `em` font sizing in all browsers.
 */

pre {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/* Text-level semantics
   ========================================================================== */

/**
 * Remove the gray background on active links in IE 10.
 */

a {
  background-color: transparent;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */

abbr[title] {
  border-bottom: none; /* 1 */
  text-decoration: underline; /* 2 */
  text-decoration: underline dotted; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */

b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd `em` font sizing in all browsers.
 */

code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */

small {
  font-size: 80%;
}

/**
 * Prevent `sub` and `sup` elements from affecting the line height in
 * all browsers.
 */

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Embedded content
   ========================================================================== */

/**
 * Remove the border on images inside links in IE 10.
 */

img {
  border-style: none;
}

/* Forms
   ========================================================================== */

/**
 * 1. Change the font styles in all browsers.
 * 2. Remove the margin in Firefox and Safari.
 */

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */
}

/**
 * Show the overflow in IE.
 * 1. Show the overflow in Edge.
 */

button,
input { /* 1 */
  overflow: visible;
}

/**
 * Remove the inheritance of text transform in Edge, Firefox, and IE.
 * 1. Remove the inheritance of text transform in Firefox.
 */

button,
select { /* 1 */
  text-transform: none;
}

/**
 * Correct the inability to style clickable types in iOS and Safari.
 */

button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}

/**
 * Remove the inner border and padding in Firefox.
 */

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

/**
 * Restore the focus styles unset by the previous rule.
 */

button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

/**
 * Correct the padding in Firefox.
 */

fieldset {
  padding: 0.35em 0.75em 0.625em;
}

/**
 * 1. Correct the text wrapping in Edge and IE.
 * 2. Correct the color inheritance from `fieldset` elements in IE.
 * 3. Remove the padding so developers are not caught out when they zero out
 *    `fieldset` elements in all browsers.
 */

legend {
  box-sizing: border-box; /* 1 */
  color: inherit; /* 2 */
  display: table; /* 1 */
  max-width: 100%; /* 1 */
  padding: 0; /* 3 */
  white-space: normal; /* 1 */
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */

progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */

textarea {
  overflow: auto;
}

/**
 * 1. Add the correct box sizing in IE 10.
 * 2. Remove the padding in IE 10.
 */

[type="checkbox"],
[type="radio"] {
  box-sizing: border-box; /* 1 */
  padding: 0; /* 2 */
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * 1. Correct the odd appearance in Chrome and Safari.
 * 2. Correct the outline style in Safari.
 */

[type="search"] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */

[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Change font properties to `inherit` in Safari.
 */

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/* Interactive
   ========================================================================== */

/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */

details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */

summary {
  display: list-item;
}

/* Misc
   ========================================================================== */

/**
 * Add the correct display in IE 10+.
 */

template {
  display: none;
}

/**
 * Add the correct display in IE 10.
 */

[hidden] {
  display: none;
}

```

```js
const fs = require('fs');
const { Transform } = require('stream');

exports.default = () => {
  const read = fs.createReadStream('normalize.css');
  const wirte = fs.createWriteStream('dist/normalize.min.css');

  // 代码转换
  const transform = new Transform({
    transform: (chunk, encoding, callback) => {
      const input = chunk.toString();
      const output = input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g, '');
      callback(null, output);
    }
  })

  read
    .pipe(transform)
    .pipe(wirte);

  return read;
}
```

Gulp 官方定义就是 The streaming build system，基于流的构建系统。

Gulp 希望实现一个构建管道的概念，这样在后续扩展插件时就有很统一的方式。

### 文件操作 API

Gulp 已经提供的文件操作 API，相对于 node API，它更强大，更容易使用。

转换 CSS 代码

```js
yarn add gulp-clean-css --dev
```

修改扩展名

```js
yarn add gulp-rename --dev
```

gulpfile.js

```js
const { src, dest } = require('gulp');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');

exports.default = () => {
  return src('src/*.css')
    .pipe(cleanCss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('dist'));
}
```

### 案例

```js
yarn add gulp --dev
```

```js
code gulpfile.js
```

#### 样式编译

```js
yarn add gulp-sass --dev
```

sass 只会转换非 _ 为前缀的代码。以 _ 为前缀的文件会被忽略掉。

```js
const { src, dest } = require('gulp');
const sass = require('gulp-sass');


const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' })
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(dest('dist'))
}

module.exports = {
  style
}
```

#### 脚本编译

```js
yarn add gulp-babel @babel/core @babel/preset-env --dev
```

babel 只是一个转换平台，提供环境，具体起到转换作用的是 babel 内部的插件，preset 是插件集合。

preset-env 就是最新的所有特性的整体打包，使用它可以把所有特性都做转换。

```js
const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');

const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' })
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(dest('dist'))
}

const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('dist'));
}

module.exports = {
  style,
  script
}
```

```js
yarn gulp script
```

#### 页面模板编译

```js
yarn add gulp-swig --dev
```

```js
const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const swig = require('gulp-swig');

const data = require('./src/data');

const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' })
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(dest('dist'))
}

const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('dist'));
}

const page = () => {
  return src('src/*.html', { base: 'src' })
    .pipe(swig({ data }))
    .pipe(dest('dist'));
}

module.exports = {
  style,
  script,
  page
}
```

```js
yarn gulp page
```

组合任务

```js
const { src, dest, parallel } = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const swig = require('gulp-swig');

const data = require('./src/data');

const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' })
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(dest('dist'))
}

const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('dist'));
}

const page = () => {
  return src('src/*.html', { base: 'src' })
    .pipe(swig({ data }))
    .pipe(dest('dist'));
}

const compile = parallel(style, script, page);

module.exports = {
  compile
};
```

```js
yarn gulp compile
```

#### 图片和字体文件转换

```js
yarn add gulp-imagemin --dev
```

```js
const { src, dest, parallel } = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const swig = require('gulp-swig');
const imagemin = require('gulp-imagemin');

const data = require('./src/data');

const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' })
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(dest('dist'))
}

const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('dist'));
}

const page = () => {
  return src('src/*.html', { base: 'src' })
    .pipe(swig({ data }))
    .pipe(dest('dist'));
}

const image = () => {
  return src('src/assets/images/**', { base: 'src' })
    .pipe(imagemin())
    .pipe(dest('dist'))
}

const font = () => {
  return src('src/assets/fonts/**', { base: 'src' })
    .pipe(imagemin())
    .pipe(dest('dist'))
}

const compile = parallel(style, script, page, image, font);

module.exports = {
  compile
};
```

```js
yarn gulp compile
```

#### 其他文件及文件清除

```js
yarn add del --dev
```

```js
const { src, dest, parallel, series } = require('gulp');

const del = require('del');

const sass = require('gulp-sass');
const babel = require('gulp-babel');
const swig = require('gulp-swig');
const imagemin = require('gulp-imagemin');

const data = require('./src/data');

const clean = () => {
  return del(['dist']);
}

const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' })
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(dest('dist'))
}

const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('dist'));
}

const page = () => {
  return src('src/*.html', { base: 'src' })
    .pipe(swig({ data }))
    .pipe(dest('dist'));
}

const image = () => {
  return src('src/assets/images/**', { base: 'src' })
    .pipe(imagemin())
    .pipe(dest('dist'))
}

const font = () => {
  return src('src/assets/fonts/**', { base: 'src' })
    .pipe(imagemin())
    .pipe(dest('dist'))
}

const extra = () => {
  return src('public/**', { base: 'public' })
    .pipe(dest('dist'));
}

const compile = parallel(style, script, page, image, font);

const build = series(clean, parallel(compile, extra));

module.exports = {
  build
};
```

#### 自动加载插件

```js
yarn add gulp-load-plugins --dev
```

```js
const { src, dest, parallel, series } = require('gulp');

const del = require('del');
const loadPlugins = require('gulp-load-plugins');

const data = require('./src/data');

const plugins = loadPlugins();

const clean = () => {
  return del(['dist']);
}

const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' })
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    .pipe(dest('dist'))
}

const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('dist'));
}

const page = () => {
  return src('src/*.html', { base: 'src' })
    .pipe(plugins.swig({ data }))
    .pipe(dest('dist'));
}

const image = () => {
  return src('src/assets/images/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

const font = () => {
  return src('src/assets/fonts/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

const extra = () => {
  return src('public/**', { base: 'public' })
    .pipe(dest('dist'));
}

const compile = parallel(style, script, page, image, font);

const build = series(clean, parallel(compile, extra));

module.exports = {
  build
};
```

#### 开发服务器

热更新开发服务器。

```js
yarn add browser-sync --dev
```

```js
const { src, dest, parallel, series } = require('gulp');

const del = require('del');
const browserSync = require('browser-sync');
const loadPlugins = require('gulp-load-plugins');

const data = require('./src/data');

const plugins = loadPlugins();
const bs = browserSync.create();

const clean = () => {
  return del(['dist']);
}

const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' })
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    .pipe(dest('dist'))
}

const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('dist'));
}

const page = () => {
  return src('src/*.html', { base: 'src' })
    .pipe(plugins.swig({ data }))
    .pipe(dest('dist'));
}

const image = () => {
  return src('src/assets/images/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

const font = () => {
  return src('src/assets/fonts/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

const extra = () => {
  return src('public/**', { base: 'public' })
    .pipe(dest('dist'));
}

const serve = () => {
  bs.init({
    notify: false,
    port: 3000,
    open: false,
    files: 'dist/**',
    server: {
      baseDir: 'dist',
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  });
}

const compile = parallel(style, script, page, image, font);

const build = series(clean, parallel(compile, extra));

module.exports = {
  build,
  serve
};
```

#### 监听变化以及构建变化

使用 gulp 的 watch 方法，配合 browserSync 的 files 属性。

```js
const { src, dest, parallel, series, watch } = require('gulp');

const del = require('del');
const browserSync = require('browser-sync');
const loadPlugins = require('gulp-load-plugins');

const data = require('./src/data');

const plugins = loadPlugins();
const bs = browserSync.create();

const clean = () => {
  return del(['dist']);
}

const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' })
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    .pipe(dest('dist'));
}

const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('dist'));
}

const page = () => {
  return src('src/*.html', { base: 'src' })
    .pipe(plugins.swig({ data, defaults: { cache: false } }))
    .pipe(dest('dist'));
}

const image = () => {
  return src('src/assets/images/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'));
}

const font = () => {
  return src('src/assets/fonts/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'));
}

const extra = () => {
  return src('public/**', { base: 'public' })
    .pipe(dest('dist'));
}

const serve = () => {
  watch('src/assets/styles/*.scss', style);
  watch('src/assets/scripts/*.js', script);
  watch('src/*.html', page);

  watch([
    'src/assets/images/**',
    'src/assets/fonts/**',
    'public/**'
  ], bs.reload);

  bs.init({
    notify: false,
    port: 3000,
    // open: false,
    files: 'dist/**',
    
    server: {
      baseDir: [
        'dist',
        'src',
        'public'
      ],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  });
}

const compile = parallel(style, script, page);
const build = series(clean, parallel(compile, extra, image, font));
const dev = series(compile, serve);

module.exports = {
  build,
  dev
};
```

开发环境

```js
yarn gulp dev
```

生产环境

```js
yarn gulp build
```



还有一种不使用 files 的方法，直接构建过程中追加 `bs.reload` 方法。

```js
const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' })
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true }))
}

const serve = () => {
  watch('src/assets/styles/*.scss', style)
  watch('src/assets/scripts/*.js', script)
  watch('src/*.html', page)

  watch([
    'src/assets/images/**',
    'src/assets/fonts/**',
    'public/**'
  ], bs.reload)

  bs.init({
    notify: 3000,
    port: 2080,
    server: {
      baseDir: ['temp', 'src', 'public'],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  })
}
```

#### useref 文件引用处理

```js
yarn add gulp-useref
```

```js
const useref = () => {
  return src('dist/*.html', { base: 'dist' })
    .pipe(plugins.useref({ searchPath: ['dist', '.'] }))
    .pipe(dest('dist'));
}

module.exports = {
  useref
};
```

#### 文件压缩

```js
yarn add gulp-htmlmin gulp-uglify gulp-clean-css --dev
```

```js
yarn add gulp-if --dev
```

htmlmin 还有其他配置，比如移除注释、删除空属性

```js
const useref = () => {
  return src('dist/*.html', { base: 'dist' })
    .pipe(plugins.useref({ searchPath: ['dist', '.'] }))
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    })))
    .pipe(dest('temp'));
}
```

```js
module.exports = {
  useref
};
```

#### 重新规划构建过程

```js
const { src, dest, parallel, series, watch } = require('gulp');

const del = require('del');
const browserSync = require('browser-sync');
const loadPlugins = require('gulp-load-plugins');

const data = require('./src/data');

const plugins = loadPlugins();
const bs = browserSync.create();

const clean = () => {
  return del(['dist']);
}

const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' })
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    .pipe(dest('temp'));
}

const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('temp'));
}

const page = () => {
  return src('src/*.html', { base: 'src' })
    .pipe(plugins.swig({ data, defaults: { cache: false } }))
    .pipe(dest('temp'));
}

const image = () => {
  return src('src/assets/images/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'));
}

const font = () => {
  return src('src/assets/fonts/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'));
}

const extra = () => {
  return src('public/**', { base: 'public' })
    .pipe(dest('dist'));
}

const serve = () => {
  watch('src/assets/styles/*.scss', style);
  watch('src/assets/scripts/*.js', script);
  watch('src/*.html', page);

  watch([
    'src/assets/images/**',
    'src/assets/fonts/**',
    'public/**'
  ], bs.reload);

  bs.init({
    notify: false,
    port: 3000,
    open: false,
    files: 'temp/**',
    
    server: {
      baseDir: [
        'temp',
        'src',
        'public'
      ],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  });
}

const useref = () => {
  return src('temp/*.html', { base: 'temp' })
    .pipe(plugins.useref({ searchPath: ['temp', '.'] }))
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    })))
    .pipe(dest('dist'));
}

const compile = parallel(style, script, page);

const build = series(
  clean,
  parallel(
    series(compile, useref),
    extra,
    image,
    font
  )
);
const dev = series(compile, serve);

module.exports = {
  build,
  dev
};
```

#### 规整构建过程

gulpfile.js

```js
const { src, dest, parallel, series, watch } = require('gulp');

const del = require('del');
const browserSync = require('browser-sync');
const loadPlugins = require('gulp-load-plugins');

const data = require('./src/data');

const plugins = loadPlugins();
const bs = browserSync.create();

const clean = () => {
  return del(['dist', 'temp']);
}

const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' })
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    .pipe(dest('temp'));
}

const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('temp'));
}

const page = () => {
  return src('src/*.html', { base: 'src' })
    .pipe(plugins.swig({ data, defaults: { cache: false } }))
    .pipe(dest('temp'));
}

const image = () => {
  return src('src/assets/images/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'));
}

const font = () => {
  return src('src/assets/fonts/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'));
}

const extra = () => {
  return src('public/**', { base: 'public' })
    .pipe(dest('dist'));
}

const serve = () => {
  watch('src/assets/styles/*.scss', style);
  watch('src/assets/scripts/*.js', script);
  watch('src/*.html', page);

  watch([
    'src/assets/images/**',
    'src/assets/fonts/**',
    'public/**'
  ], bs.reload);

  bs.init({
    notify: false,
    port: 3000,
    open: false,
    files: 'temp/**',
    
    server: {
      baseDir: [
        'temp',
        'src',
        'public'
      ],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  });
}

const useref = () => {
  return src('temp/*.html', { base: 'temp' })
    .pipe(plugins.useref({ searchPath: ['temp', '.'] }))
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    })))
    .pipe(dest('dist'));
}

const compile = parallel(style, script, page);

const build = series(
  clean,
  parallel(
    series(compile, useref),
    extra,
    image,
    font
  )
);
const develop = series(compile, serve);

module.exports = {
  clean,
  build,
  develop
};
```

package.json

```js
"scripts": {
  "clean": "gulp clean",
  "build": "gulp build",
  "dev": "gulp develop"
}
```

### 封装工作流

Gulpfile + Gulp = 构建工作流。

Gulpfile + Gulp CLI = gulp-pages。

#### 开发

```js
const path = require('path');
const { src, dest, parallel, series, watch } = require('gulp');

const del = require('del');
const browserSync = require('browser-sync');
const loadPlugins = require('gulp-load-plugins');

const cwd = process.cwd();

let config = {
  build: {
    src: 'src',
    dist: 'dist',
    temp: 'temp',
    public: 'public',
    paths: {
      styles: 'assets/styles/*.scss',
      scripts: 'assets/scripts/*.js',
      pages: '*.html',
      images: 'assets/images/**',
      fonts: 'assets/fonts/**'
    }
  }
};

try {
  const loadConfig = require(path.join(cwd, 'pages.config.js'));
  config = Object.assign({}, config, loadConfig);
} catch (error) {
  throw new Error(error.message || error);
}


const plugins = loadPlugins();
const bs = browserSync.create();

const clean = () => {
  return del([config.build.dist, config.build.temp]);
}

const style = () => {
  return src(config.build.paths.styles, { base: config.build.src, cwd: config.build.src })
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    .pipe(dest(config.build.temp))
    .pipe(bs.reload({ stream: true }));
}

const script = () => {
  return src(config.build.paths.scripts, { base: config.build.src, cwd: config.build.src })
    .pipe(plugins.babel({ presets: [ require('@babel/preset-env') ] }))
    .pipe(dest(config.build.temp))
    .pipe(bs.reload({ stream: true }));
}

const page = () => {
  return src(config.build.paths.pages, { base: config.build.src, cwd: config.build.src })
    .pipe(plugins.swig({ data: config.data, defaults: { cache: false } }))
    .pipe(dest(config.build.temp))
    .pipe(bs.reload({ stream: true }));
}

const image = () => {
  return src(config.build.paths.images, { base: config.build.src, cwd: config.build.src })
    .pipe(plugins.imagemin())
    .pipe(dest(config.build.dist));
}

const font = () => {
  return src(config.build.paths.fonts, { base: config.build.src, cwd: config.build.src })
    .pipe(plugins.imagemin())
    .pipe(dest(config.build.dist));
}

const extra = () => {
  return src('**', { base: config.build.public, cwd: config.build.public })
    .pipe(dest(config.build.dist));
}

const serve = () => {
  watch(config.build.paths.styles, { cwd: config.build.src }, style);
  watch(config.build.paths.scripts, { cwd: config.build.src },script);
  watch(config.build.paths.pages, { cwd: config.build.src }, page);

  watch([
    config.build.paths.images,
    config.build.paths.fonts,
  ], { cwd: config.build.src }, bs.reload);

  watch([
    '**'
  ], { cwd: config.build.public }, bs.reload);

  bs.init({
    notify: false,
    port: 3000,
    open: false,
    
    server: {
      baseDir: [
        config.build.temp,
        config.build.src,
        config.build.public
      ],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  });
}

const useref = () => {
  return src(config.build.paths.pages, { base: config.build.temp, cwd: config.build.temp })
    .pipe(plugins.useref({ searchPath: [config.build.temp, '.'] }))
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    })))
    .pipe(dest(config.build.dist));
}

const compile = parallel(style, script, page);

const build = series(
  clean,
  parallel(
    series(compile, useref),
    extra,
    image,
    font
  )
);
const develop = series(compile, serve);

module.exports = {
  clean,
  build,
  develop
};
```

```js
#! /usr/bin/env node

process.argv.push('--cwd');
process.argv.push(process.cwd());
process.argv.push('--gulpfile');
process.argv.push(require.resolve('..'));

require('gulp/bin/gulp');
```

```js
{
  "name": "gulp-pages",
  "version": "0.1.0",
  "description": "static web app workflow",
  "keywords": [
    "gulp-pages",
    "yueluo"
  ],
  "homepage": "http://git.yueluo.club/tools/gulp-pages#readme",
  "license": "MIT",
  "author": "yueluo <yueluo@qq.com> (https://yueluo.club)",
  "files": [
    "lib",
    "bin"
  ],
  "main": "lib/index.js",
  "bin": "bin/gulp-page.js",
  "directories": {
    "lib": "lib"
  },
  "repository": {
    "type": "git",
    "url": "git+http://git.yueluo.club/tools/gulp-pages.git"
  },
  "scripts": {
    "lint": "standard --fix"
  },
  "dependencies": {
    "@babel/core": "^7.5.5",
    "@babel/preset-env": "^7.5.5",
    "browser-sync": "^2.26.7",
    "del": "^5.1.0",
    "gulp": "^4.0.2",
    "gulp-babel": "^8.0.0",
    "gulp-clean-css": "^4.2.0",
    "gulp-htmlmin": "^5.0.1",
    "gulp-if": "^3.0.0",
    "gulp-imagemin": "^6.1.0",
    "gulp-load-plugins": "^2.0.1",
    "gulp-sass": "^4.0.2",
    "gulp-swig": "^0.9.1",
    "gulp-uglify": "^3.0.2",
    "gulp-useref": "^3.1.6"
  },
  "devDependencies": {
    "standard": "^13.1.0"
  },
  "engines": {
    "node": ">=6"
  }
}
```

```js
npm publish
```

#### 使用

```js
npm i gulp-pages
```

```js
{
  "name": "demo",
  "version": "0.1.0",
  "main": "index.js",
  "repository": "https://git.yueluo.club/heore/notes.git",
  "author": "yueluo <yueluo.yang@qq.com> (https://yueluo.club)",
  "license": "MIT",
  "scripts": {
    "clean": "gulp-pages clean",
    "build": "gulp-pages build",
    "dev": "gulp-pages develop"
  },
  "dependencies": {
    "bootstrap": "^4.3.1",
    "jquery": "^3.4.1",
    "popper.js": "^1.15.0"
  },
  "devDependencies": {
    "gulp-pages": "^0.1.0"
  }
}
```

## 3. FIS

百度的前端团队推出的构建系统，最早只是内部使用，后来开源。目前使用的人较少。

相对于 Gulp 和 Grunt，FIS 的核心特点是高度集成，它把常用的配置集成在内部。

> 目前逐步退出历史舞台，不常用，了解为主。

### 基本使用

```js
npm i fis3 -g
```

```js
fis3 release -d dist
```

匹配路径，配置输出目录

```js
fis.match('*.{js,scss,png}', {
  release: '/assets/$0'
})
```

> 高版本 nodejs 会报错，建议安装 nvm，使用 node 版本 10.16.3

### 编译与压缩

编译 sass

```js
npm i fis-parser-node-sass --dev
```

编译 ES6

```js
npm i fis-parser-babel-6.x --dev
```

配置文件

```js
// fis-conf.js

fis.match('*.{js,scss,png}', {
  release: '/assets/$0'
});

fis.match('**/*.scss', {
  rExt: '.css',
  parser: fis.plugin('node-sass')
});

fis.match('**/*.js', {
  parser: fis.plugin('babel-6.x'),
  optimizer: fis.plugin('clean-css')
});

fis.match('**/*.js', {
  parser: fis.plugin('babel-6.x'),
  optimizer: fis.plugin('uglify-js')
});
```

 运行

```js
fis3 release -d output
```

查看配置文件

```js
fis3 inspect
```