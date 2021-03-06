# Jest

## 简单测试

```js
// demo.js

function sum (a, b) {
  return a + b;
}

function subtract (x, y) {
  return x - y;
}

module.exports = {
  sum,
  subtract
}
```

```js
// demo.test.js

// 1. 引入测试函数
const { sum, subtract } = require('./demo');

// 2. 定义函数输入
const result = sum(1, 2);
// 3. 定义预期输出
const expected = 3;

// 4. 检查函数是否返回预期结果
if (result !== expected) {
  throw new Error(`sum(1, 2) result ${ expected }, but get ${ result }`);
}
```

## 断言和测试用例

定义 expect 断言函数

```js
const { sum, subtract } = require('./demo');

expect(sum(1, 2)).toBe(3);

function expect (result) {
  return {
    toBe (expected) {
      if (result !== expected) {
        throw new Error(`expect result ${ expected }, but get ${ result }`);
      }
    }
  }
}
```

```js
const { sum, subtract } = require('./demo');

expect(sum(1, 2)).toBe(3);
expect(subtract(2, 1)).toBe(1);

function expect (result) {
  return {
    toBe (expected) {
      if (result !== expected) {
        throw new Error(`expect result ${ expected }, but get ${ result }`);
      }
    }
  }
}
```

定义 test 函数，test 函数其实就是测试用例，一个测试用例可以包含多个断言函数。

```js
test('sum(1, 2) result is 3', () => {
  expect(sum(1, 2)).toBe(3);
})
test('subtract(2, 1) result is 1', () => {
  expect(subtract(2, 1)).toBe(1);
})

function test (message, callback) {
  try {
    callback();
  } catch (error) {
    console.error(`${ message }: ${ error }`);
  }
}

function expect (result) {
  return {
    toBe (expected) {
      if (result !== expected) {
        throw new Error(`expect result ${ expected }, but get ${ result }`);
      }
    }
  }
}
```

## Jest 体验

### 安装、使用

初始化 package.json、安装 jest

```js
pnpm init -y

pnpm i jest -D
```

定义 scripts 脚本

```js
// package.json

{
  "scripts": {
    "test": "jest"
  },
}
```

运行测试脚本

```js
pnpm run test
```

```js
 PASS  ./demo.test.js
  √ sum(1, 2) result is 3 (2 ms)
  √ subtract(2, 1) result is 1                                                                                                                                                         
                                                                                                                                                                                       
Test Suites: 1 passed, 1 total                                                                                                                                                         
Tests:       2 passed, 2 total                                                                                                                                                         
Snapshots:   0 total
Time:        0.401 s, estimated 1 s
Ran all test suites.
```

> jest 在运行 *.test.js 文件时，会把 test、expect 等相关辅助函数注册到全局环境。

### 增加代码提示

```js
pnpm i @types/jest -D
```

安装 @types 模块后，可以直接使用 jest 提示，无须引入。

## Jest 介绍

[Jest](https://jestjs.io/) 是 Facebook 出品的一个 JavaScript 开源测试框架。相对其他测试框架，它最大特点就是内置了常用的测试工具，比如零配置、自带断言、测试覆盖率等功能，实现了开箱即用。

Jest 使用但不限于以下技术项目：Babel、TypeScript、Node、React、Angular、Vue 等。

Jest 特点：

* 零配置
* 自带断言
* 作为一个面向前端的测试框架，Jest 可以利用其特有的快照测试功能，通过比对 UI 代码生成的快照文件，实现对 React 等常见框架的自动化测试
* Jest 的测试用例是并行执行的，只执行发生改变的文件所对应的测试
* 测试覆盖率
* Mock 模拟

## 配置文件

Jest 提供默认的零配置的使用方式，不过我们可以通过配置文件的方式去更改默认配置。

生成配置文件

```js
 npx jest --init
```

<img src="./images/config.png" />

配置文件中会生成所有配置，不过大部分都是默认配置。

```js
// jest.config.js

/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration 官方文档地址
 */

module.exports = {
  // All imported modules in your tests should be mocked automatically
  // automock: false,

  // Stop running tests after `n` failures
  // bail: 0,

  // The directory where Jest should store its cached dependency information
  // cacheDirectory: "C:\\Users\\yueluo\\AppData\\Local\\Temp\\jest",

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  // collectCoverage: false,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  // collectCoverageFrom: undefined,

  // The directory where Jest should output its coverage files
  // coverageDirectory: undefined,

  // An array of regexp pattern strings used to skip coverage collection
  // coveragePathIgnorePatterns: [
  //   "\\\\node_modules\\\\"
  // ],

  // Indicates which provider should be used to instrument code for coverage
  // coverageProvider: "babel",

  // A list of reporter names that Jest uses when writing coverage reports
  // coverageReporters: [
  //   "json",
  //   "text",
  //   "lcov",
  //   "clover"
  // ],

  // An object that configures minimum threshold enforcement for coverage results
  // coverageThreshold: undefined,

  // A path to a custom dependency extractor
  // dependencyExtractor: undefined,

  // Make calling deprecated APIs throw helpful error messages
  // errorOnDeprecated: false,

  // The default configuration for fake timers
  // fakeTimers: {
  //   "enableGlobally": false
  // },

  // Force coverage collection from ignored files using an array of glob patterns
  // forceCoverageMatch: [],

  // A path to a module which exports an async function that is triggered once before all test suites
  // globalSetup: undefined,

  // A path to a module which exports an async function that is triggered once after all test suites
  // globalTeardown: undefined,

  // A set of global variables that need to be available in all test environments
  // globals: {},

  // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
  // maxWorkers: "50%",

  // An array of directory names to be searched recursively up from the requiring module's location
  // moduleDirectories: [
  //   "node_modules"
  // ],

  // An array of file extensions your modules use
  // moduleFileExtensions: [
  //   "js",
  //   "mjs",
  //   "cjs",
  //   "jsx",
  //   "ts",
  //   "tsx",
  //   "json",
  //   "node"
  // ],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  // moduleNameMapper: {},

  // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
  // modulePathIgnorePatterns: [],

  // Activates notifications for test results
  // notify: false,

  // An enum that specifies notification mode. Requires { notify: true }
  // notifyMode: "failure-change",

  // A preset that is used as a base for Jest's configuration
  // preset: undefined,

  // Run tests from one or more projects
  // projects: undefined,

  // Use this configuration option to add custom reporters to Jest
  // reporters: undefined,

  // Automatically reset mock state before every test
  // resetMocks: false,

  // Reset the module registry before running each individual test
  // resetModules: false,

  // A path to a custom resolver
  // resolver: undefined,

  // Automatically restore mock state and implementation before every test
  // restoreMocks: false,

  // The root directory that Jest should scan for tests and modules within
  // rootDir: undefined,

  // A list of paths to directories that Jest should use to search for files in
  // roots: [
  //   "<rootDir>"
  // ],

  // Allows you to use a custom runner instead of Jest's default test runner
  // runner: "jest-runner",

  // The paths to modules that run some code to configure or set up the testing environment before each test
  // setupFiles: [],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  // setupFilesAfterEnv: [],

  // The number of seconds after which a test is considered as slow and reported as such in the results.
  // slowTestThreshold: 5,

  // A list of paths to snapshot serializer modules Jest should use for snapshot testing
  // snapshotSerializers: [],

  // The test environment that will be used for testing
  testEnvironment: "jsdom",

  // Options that will be passed to the testEnvironment
  // testEnvironmentOptions: {},

  // Adds a location field to test results
  // testLocationInResults: false,

  // 默认文件配置规则
  // The glob patterns Jest uses to detect test files
  // testMatch: [
  //   "**/__tests__/**/*.[jt]s?(x)",
  //   "**/?(*.)+(spec|test).[tj]s?(x)"
  // ],

  // 默认忽略目录
  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  // testPathIgnorePatterns: [
  //   "\\\\node_modules\\\\"
  // ],

  // The regexp pattern or array of patterns that Jest uses to detect test files
  // testRegex: [],

  // This option allows the use of a custom results processor
  // testResultsProcessor: undefined,

  // This option allows use of a custom test runner
  // testRunner: "jest-circus/runner",

  // A map from regular expressions to paths to transformers
  // transform: undefined,

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  // transformIgnorePatterns: [
  //   "\\\\node_modules\\\\",
  //   "\\.pnp\\.[^\\\\]+$"
  // ],

  // An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them
  // unmockedModulePathPatterns: undefined,

  // Indicates whether each individual test should be reported during the run
  // verbose: undefined,

  // An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
  // watchPathIgnorePatterns: [],

  // Whether to use watchman for file crawling
  // watchman: true,
};
```

## JestCli 选项

Jest 不仅可以通过配置文件配置，还可以通过命令行参数进行配置。

```js
// a.test.js

test('test a', () => {
  console.log('this a');
})
```

```js
// demo.test.js

const { sum, subtract } = require('./demo');

test('sum(1, 2) result is 3', () => {
  expect(sum(1, 2)).toBe(3);
})
test('subtract(2, 1) result is 1', () => {
  expect(subtract(2, 1)).toBe(1);
})
```

直接运行 `pnpm run test` 会执行所有的测试用例。

```js
> 02@1.0.0 test
> jest

 PASS  ./a.test.js
  ● Console

    console.log
      this a

      at Object.log (a.test.js:2:11)

 PASS  ./demo.test.js

Test Suites: 2 passed, 2 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        1.58 s
Ran all test suites.
```

我们还可以指定需要测试的文件

```js
// package.json

{
  "scripts": {
    "test": "jest",
    "test2": "jest demo.test.js"
  }
}
```

执行 `pnpm run test2`  只会执行 `demo.test.js` 文件。

```js
 PASS  ./demo.test.js
  √ sum(1, 2) result is 3 (1 ms)
  √ subtract(2, 1) result is 1                                                   
                                                                                 
Test Suites: 1 passed, 1 total                                                   
Tests:       2 passed, 2 total                                                   
Snapshots:   0 total
Time:        0.454 s, estimated 1 s
Ran all test suites matching /demo.test.js/i.
```

现在 jest 只会在手动执行的时候触发，如果我们向实时监听文件变化可以这样配置。

```js
// package.json

{
  "scripts": {
		// ...
    "test:watch": "jest --watchAll"
  }
}
```

运行脚本文件，jest 就会监听所有文件的执行。

```js
> 02@1.0.0 test
> jest

 PASS  ./a.test.js
  ● Console

    console.log
      this a

      at Object.log (a.test.js:2:11)

 PASS  ./demo.test.js
 PASS  ./a.test.js
  ● Console

    console.log
      this a

      at Object.log (a.test.js:2:11)


Test Suites: 2 passed, 2 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        1.109 s
Ran all test suites.

Watch Usage
 › Press f to run only failed tests.
 › Press o to only run tests related to changed files.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```

建议开发过程中使用 `watch` 模式，可以实时给予反馈。

## 监视模式

### --watchAll

监视文件的更改并在任何更改时重新运行所有的测试文件。

```js
jest --watchAll
```

### --watch

> 该模式需要 Git 支持

监视 Git 仓库中的文件更改，并重新运行已更改文件相关的测试。如果文件未更改，不会执行任何测试文件。

```js
jest --watch
```

## 监视模式的服务命令

执行 `jest --watchAll` 后，会打印出如下内容：

```js
Watch Usage
 › Press f to run only failed tests.
 › Press o to only run tests related to changed files.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```

执行脚本后，可以通过键盘控制 jest。

* f：只运行失败的测试
* o：只运行与更改文件相关的测试，即 watch模式（需要 git 支持）
* a：运行所有的测试，即 watchAll 模式
* p：以文件名正则表达式模式进行过滤
  * 只有 --watchAll 的时候 p 模式才生效
  * 注意：testRegex 将尝试使用绝对路径的方式来检测
* t：根据测试名称进行过滤，即 `test('sum')` ，sum 就是测试名称
* q：退出监视模式
* enter：触发测试重新执行

## 使用 ES6 模块

Jest 在运行测试的时候会自动找到 Babel 将 ES6 代码转换为 ES5 执行。

> 运行原理：运行测试之前，结合 Babel，先把你的代码做一次转化，模块被转换为 CommonJS，运行转换后的测试用例代码。

```js
pnpm install babel-jest @babel/core @babel/preset-env -D
```

```js
// babel.config.js

module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
  ]
}
```

```js
// demo.js
export function sum (a, b) {
  return a + b;
}

export function subtract (x, y) {
  return x - y;
}
```

```js
// demo.test.js
import { sum, subtract } from './demo';

test('sum(1, 2) result is 3', () => {
  expect(sum(1, 2)).toBe(3);
})
test('subtract(2, 1) result is 1', () => {
  expect(subtract(2, 1)).toBe(1);
})
```

执行脚本文件 `pnpm run test2` 可以正常运行。

```js
> 02@1.0.0 test2 D:\workspace\notes\jest\02
> jest demo.test.js

 PASS  ./demo.test.js
  √ sum(1, 2) result is 3 (1 ms)
  √ subtract(2, 1) result is 1                                                                                                                                                         
                                                                                                                                                                                       
Test Suites: 1 passed, 1 total                                                                                                                                                         
Tests:       2 passed, 2 total                                                                                                                                                         
Snapshots:   0 total
Time:        2.086 s
Ran all test suites matching /demo.test.js/i.
```

## Jest API

测试文件中，Jest 将所有的方法和对象放入到全局环境中，不需要导入任何内容就可以使用。不过也支持显式导入。

```js
pnpm i @jest/globals -D
```

```js
import { describe, expect, test } from '@jest/globals';
```

### Test 函数

test 函数别名：`it(name, fn, timeout)`，test 函数就是一个测试用例。

* `test(name, fn, timeout)`
* `test.concurrent(name, fn, timeout)`
* `test.concurrent.each(table)(name, fn, timeout)`
* `test.concurrent.only.each(table)(name, fn)`
* `test.each(table)(name, fn, timeout)`
* `test.only(name, fn, timeout)` ：仅运行当前测试用例（针对当前模块）

### Expect 匹配器

编写测试前，通常需要检查值是否满足某些条件。Expect 支持访问许多 “匹配器”，以验证不同的内容。

```js
test('global expect', () => {
  expect(2 + 2).toBe(4); // 匹配数字
  expect({ name: 'jack' }).toEqual({ name: 'jack' }); // 匹配对象
  expect('yueluosensen').toMatch(/yueluo/); // 正则匹配
  expect(4).toBeGreaterThan(2); // 大于
  expect(4).toBeLessThan(5); // 小于
})
```

更多用法：https://jestjs.io/docs/expect

### describe 函数

describe 创建一个将几个测试组合在一起的块。

```js
describe('demo', () => {
  test('sum(1, 2) result is 3', () => {
    expect(sum(1, 2)).toBe(3);
  })
  test('subtract(2, 1) result is 1', () => {
    expect(subtract(2, 1)).toBe(1);
  })
})

describe('global', () => {
  test('global expect', () => {
    expect(2 + 2).toBe(4); // 匹配数字
    expect({ name: 'jack' }).toEqual({ name: 'jack' }); // 匹配对象
    expect('yueluosensen').toMatch(/yueluo/); // 正则匹配
    expect(4).toBeGreaterThan(2); // 大于
    expect(4).toBeLessThan(5); // 小于
  })
})
```

如果测试用例同时写在一个文件中，可以将相关的测试用例进行分组。

相关用法：

* `describe(name, fn)`
* `describe.each(table)(name, fn, timeout)`
* `describe.only(name, fn)`
* `describe.only.each(table)(name, fn)`
* `describe.skip(name, fn)`
* `describe.skip.each(table)(name, fn)`

### 生命周期钩子

* `beforeAll(fn, timeout)`：测试用例之前执行（仅运行一次）
* `beforeEach(fn, timeout)`：每个测试用例运行之前，都会执行一次
* `afterAll(fn, timeout)`：测试用例执行完毕执行（仅运行一次）
* `afterEach(fn, timeout)`：每个测试用例执行完毕之后，都会执行一次

### Jest 对象

Jest 对象自动位于每个测试文件中的范围内。

jest 对象中的方法有助于创建模拟，可以控制 Jest 的整体行为。也可以手动导入。

```js
// jest.autoMockOn
// jest.useFakeTimers
```

详情内容参考：https://jestjs.io/docs/jest-object。

## 常用匹配器

https://jestjs.io/docs/using-matchers。

### Common Matchers

```js
describe('common matchers', () => {
  test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
    expect('hello').toBe('hello');
    expect(true).toBe(true);
  
    const author = { name: 'yueluo' };
    expect(author).toBe(author); // toBe 只可以判断对象引用
    expect({ name: 'yueluo' }).toEqual({ name: 'yueluo' }); // toEqual 可以判断对象属性是否相同
  });
});
```

### Truthiness

```js
describe('truthiness', () => {
  test('null', () => {
    const n = null;
    expect(n).toBeNull(); // 判断为 null
    expect(n).toBeDefined(); // 判断是否已定义
    expect(n).not.toBeUndefined(); // 判断不是未定义
    expect(n).not.toBeTruthy(); // 判断不是 true
    expect(n).toBeFalsy(); // 判断是 false
  });
  
  test('zero', () => {
    const z = 0;
    expect(z).not.toBeNull(); // 判断不是 null
    expect(z).toBeDefined(); // 判断是否已定义
    expect(z).not.toBeUndefined(); // 判断不是未定义
    expect(z).not.toBeTruthy();// 判断不是 true
    expect(z).toBeFalsy(); // 判断是 false
  });
});
```

### Numbers

```js
describe('numbers', () => {
  test('two plus two', () => {
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);
  
    // toBe and toEqual are equivalent for numbers
    expect(value).toBe(4);
    expect(value).toEqual(4);
  })

  test('adding floating point numbers', () => {
    const value = 0.1 + 0.2;
    //expect(value).toBe(0.3); This won't work because of rounding error
    expect(value).toBeCloseTo(0.3); // This works.
  });
})
```

### Strings

```js
describe('strings', () => {
  test('there is no I in team', () => {
    expect('team').not.toMatch(/I/);
  });
  
  test('but there is a "stop" in Christoph', () => {
    expect('Christoph').toMatch(/stop/);
  });
})

```

### Array and iterables

```js
describe('arrays', () => {
  const shoppingList = [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'milk',
  ];
  
  test('the shopping list has milk on it', () => {
    expect(shoppingList).toContain('milk');
    expect(shoppingList.length).toBe(5);
    expect(new Set(shoppingList)).toContain('milk');
  });
})
```

### Exceptions

```js
describe('exceptions', () => {
  function compileAndroidCode() {
    throw new Error('you are using the wrong JDK');
  }
  
  test('compiling android goes as expected', () => {
    expect(() => compileAndroidCode()).toThrow();
    expect(() => compileAndroidCode()).toThrow(Error);
  
    // You can also use the exact error message or a regexp
    expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
    expect(() => compileAndroidCode()).toThrow(/JDK/);
  });
})
```

### And More

This is just a taste. For a complete list of matchers, check out the [reference docs](https://jestjs.io/docs/expect).

Once you've learned about the matchers that are available, a good next step is to check out how Jest lets you [test asynchronous code](https://jestjs.io/docs/asynchronous).

## 测试异步代码

新建 async.test.js 文件，并执行以下命令。

```js
npx jest async.test.js --watch
```

### 回调函数形式

```js
function getData (callback) {
  setTimeout(() => {
    callback({ author: 'heora' })
  }, 1000)
}

// 错误示范：这种写法不会等待定时器结束
test('async fail', () => {
  getData(data => {
    expect(data).toEqual({ author: 'heora' })
  })
})

// 正确做法
test('async success', (done) => {
  getData(data => {
    done();
    expect(data).toEqual({ author: 'heora' })
  })
})
```

### Promise 形式

```js
function getData () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ author: 'heora' })
    }, 1000)
  })
}

test('async promise1', (done) => {
  getData().then(data => {
    done();
    expect(data).toEqual({ author: 'heora' })
  })
})

test('async promise2', () => {
  return getData().then(data => {
    expect(data).toEqual({ author: 'heora' })
  })
})

test('async promise3', () => {
  // return expect(getData()).rejects.toMatch('error');
  return expect(getData()).resolves.toEqual({ author: 'heora' });
})

test('async promise4', async () => {
  try {
    const data = await getData();

    expect(data).toEqual({ author: 'heora' })
  } catch (error) {
    expect(error).toMatch('error');
  }
})

test('async promise5', async () => {
  // await expect(getData()).rejects.toMatch('error');
  await expect(getData()).resolves.toEqual({ author: 'heora' });
})
```

## Mock

### 定时器

#### 长时间处理

```js
// 针对超长时间的异步函数

describe('timer: long', () => {
  function getData () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ author: 'heora' })
      }, 10 * 1000)
    })
  }
  
  // mock 定时器
  jest.useFakeTimers();
  
  test('timer mock', () => {
    // 至少存在一次断言调用
    expect.assertions(1);
  
    getData().then(data => {
      expect(data).toEqual({ author: 'heora' })
    })
  
    // 快进所有定时器到结束
    jest.runAllTimers()
  })
});
```

#### 循环处理

```js
describe('timer: loop', () => {
  function getData () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ author: 'heora' })
        getData();
      }, 10 * 1000)
    })
  }
  
  // mock 定时器
  jest.useFakeTimers();
  
  test('timer mock', () => {
    // 至少存在一次断言调用
    expect.assertions(1);
  
    getData().then(data => {
      expect(data).toEqual({ author: 'heora' })
    })
  
    // 快进当前进行的定时器结束，不等待其它
    jest.runOnlyPendingTimers()
  })
});
```

#### 快进指定时间

```js
describe('timer: set time', () => {
  function getData () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ author: 'heora' })
      }, 10 * 1000)
    })
  }
  
  // mock 定时器
  jest.useFakeTimers();
  
  test('timer mock', () => {
    // 至少存在一次断言调用
    expect.assertions(1);
  
    getData().then(data => {
      expect(data).toEqual({ author: 'heora' })
    })
    
    jest.advanceTimersByTime(9 * 1000);
    jest.advanceTimersByTime(1 * 1000);
  })
});
```

### 函数

#### 基本用法

```js
function forEach (items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index], index);
  }
}

test('mock functions', () => {
  const items = ['js', 'ts', 'nodejs'];

  const mockFn  = jest.fn((value, index) => {
    return value + 1;
  });

  // 调用函数设置返回值会覆盖上面的实现 
  // mockFn.mockReturnValue(123);
  // 调用函数设置第一个返回值
  mockFn.mockReturnValueOnce(123);


  forEach(items, mockFn);

  console.log(mockFn.mock);

  expect(mockFn.mock.calls.length).toBe(items.length);
  expect(mockFn.mock.calls[0][0]).toBe('js');
  expect(mockFn.mock.calls[0][1]).toBe(0);
}) 
```

#### 模拟模块

例如使用 axios，不需要真实请求，可以提高测试速度。

```js
// users.json

[
  {
    "author": "yueluo"
  },
  {
    "author": "heora"
  }
]
```

```js
// user.js

import axios from "axios";

export const getAllUsers = () => {
  return axios.get('/users.json').then(res => res.data);
}
```

```js
// user.test.js

import axios from 'axios';
import { getAllUsers } from './user';
import users from './users.json';

jest.mock('axios');

test('fetch users', async () => {
  const resp = { data: users };

  axios.get.mockResolvedValue(resp);

  const data = await getAllUsers();

  expect(data).toEqual(users);
})
```

#### 模拟实现

当函数内部存在大量计算，或者功能较多时，可以使用。

```js
// foo.js

export default function () {
  console.log('foo');
}
```

```js
// foo.test.js

jest.mock('./foo');

import foo from "./foo";

foo.mockImplementation(() => 42);

test('mock implementations', () => {
  expect(foo()).toBe(42);
});
```

#### 模拟名称

```js
const myMockFn = jest
  .fn()
  .mockReturnValue('default')
  .mockImplementation(scalar => 42 + scalar)
  .mockName('add42');
```

#### 自定义匹配器

```js
// The mock function was called at least once
expect(mockFunc).toHaveBeenCalled();

// The mock function was called at least once with the specified args
expect(mockFunc).toHaveBeenCalledWith(arg1, arg2);

// The last call to the mock function was called with the specified args
expect(mockFunc).toHaveBeenLastCalledWith(arg1, arg2);

// All calls and the name of the mock is written as a snapshot
expect(mockFunc).toMatchSnapshot();
```

更多用法可以点击[这里](https://jestjs.io/docs/mock-functions)查看。

## 钩子函数

可以在测试用例执行前后做一些通用的操作。

```js
const data = {
  author: 'yueluo'
}

let user = null;

beforeAll(() => {
  console.log('before all')
})

afterAll(() => {
  console.log('after all')
})

// 每个实例运行之前
beforeEach(() => {
  user = Object.assign({}, data)
})

// 每个实例运行之后
afterEach(() => {
  user = null
})

test('test 1', () => {
  user.author = 'heora';
  expect(user.author).toBe('heora')
})

test('test 2', () => {
  expect(user.author).toBe('yueluo')
})
```

分组

> describe 内部的 beforeEach 仅对当前内部的测试用例生效

```js
describe('group', () => {
  beforeEach(() => {
    console.log('group before each')
  })

  afterEach(() => {
    console.log('group after each')
  })

  test('test1', () => {
    console.log('group test1')
  })

  test('test2', () => {
    console.log('group test2')
  })
})
```

## DOM 测试

Jest 配合 `jest-environment-jsdom` 可以做到在 nodejs 环境中模拟 DOM API。

> jsdom 不再默认内置于 jest v28 ，需要显式安装

```js
pnpm i jest-environment-jsdom -D
```

```js
/**
 * @jest-environment jsdom
 */

function renderHtml () {
  const div = document.createElement('div');

  div.innerHTML = `
    <h1>Hello World</h1>
  `

  document.body.appendChild(div);
}

test('dom testing', () => {
  renderHtml();
  expect(document.querySelector('h1').innerHTML).toBe('Hello World');
})
```

## Vue 组件测试

```js
pnpm i vue@2
```

```js
/**
 * @jest-environment jsdom
 */

import Vue from 'vue/dist/vue';

function renderVueComponent () {
  document.body.innerHTML = `
    <div id="app"></div>
  `

  new Vue({
    template: `
      <div id="app">
        <h1>{{ message }}</h1>
      </div>
    `,
    data: {
      message: 'Hello World'
    }
  }).$mount('#app');
}

test('vue testing', () => {
  renderVueComponent();
  console.log(document.body.innerHTML)
  expect(document.body.innerHTML).toMatch(/Hello World/)
})
```

## 快照测试

```js
/**
 * @jest-environment jsdom
 */

import Vue from 'vue/dist/vue';

function renderVueComponent () {
  document.body.innerHTML = `
    <div id="app"></div>
  `

  new Vue({
    template: `
      <div id="app">
        <h1>{{ message }}</h1>
      </div>
    `,
    data: {
      message: 'Hello World'
    }
  }).$mount('#app');
}

test.only('Snapshot Testing', () => {
  renderVueComponent();
  // 首次运行时，会生成快照文件
  // 下次运行测试会与快照文件进行比对，如果不一致测试失败
  expect(document.body.innerHTML).toMatchSnapshot();
})
```

快照文件（`__snapshots__/vue.test.js.snap`）：

```js
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Snapshot Testing 1`] = `
"
    <div id=\\"app\\"><h1>Hello World</h1></div>
  "
`;
```

如果模板确实有更改，我们可以更新快照。

```js
npx jest vue.test.js --updateSnapshot
```
