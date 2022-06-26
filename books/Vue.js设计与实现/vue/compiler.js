// 辅助函数，用于判断是否是字母
function isAlpha(char) {
  return char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z'
}

// 接收模板字符串作为参数，并将模板切割为 Token 返回
function tokenzie(str) {
  // 状态机的当前状态：初始状态
  let currentState = State.initial
  // 缓存字符
  const chars = []
  // 生成的 Token 会存储到 tokens 数组中，并作为函数的返回值返回
  const tokens = []
  
  // 使用 while 循环开启自动机
  while (str) {
    const char = str[0]

    // switch 匹配当前状态
    switch (currentState) {
      case State.initial: // 初始状态
        // 遇到字符 <
        if (char === '<') {
          // 1. 状态机切换到标签开启状态
          currentState = State.tagOpen
          // 2. 消费字符 <
          str = str.slice(1)
        } else if (isAlpha(char)) {
          // 1. 遇到字母，切换到文本状态
          currentState = State.text
          // 2. 将当前字母缓存到 chars 数组
          chars.push(char)
          // 3. 消费当前字符
          str = str.slice(1)
        }
        break;
      case State.tagOpen: // 标签开始状态
        if (isAlpha(char)) {
          // 1. 遇到字母，切换到标签名称状态
          currentState = State.tagName
          // 2. 将当前字符缓存到 chars 数组
          chars.push(char)
          // 3. 消费当前字符
          str = str.slice(1)
        } else if (char === '/') {
          // 1. 遇到字符 /，切换到结束标签状态
          currentState = State.tagEnd
          // 2. 消费字符 /
          str = str.slice(1)
        }
        break;
      case State.tagName: // 标签名称状态
        if (isAlpha(char)) {
          // 1. 遇到字母，保持状态不变，缓存当前字符到 chars 数组
          chars.push(char)
          // 2. 消费当前字符
          str = str.slice(1)
        } else if (char === '>') {
          // 1. 遇到字符 >，切换到初始状态
          currentState = State.initial
          // 2. 创建一个标签 Token，并添加到 tokens 数组中
          // tip：cahrs 数组中缓存的字符就是标签名称
          tokens.push({
            type: 'tag',
            name: chars.join('')
          })
          // 3. 清空已消费的 chars 数组
          chars.length = 0
          // 4. 消费当前字符 >
          str = str.slice(1)
        }
        break;
      case State.text: // 文本状态
        if (isAlpha(char)) {
          // 1. 遇到字母，保持状态不变，缓存当前字符到 chars 数组
          chars.push(char)
          // 2. 消费当前字符
          str = str.slice(1)
        } else if (char === '<') {
          // 1. 遇到字符 < ，切换到标签开始状态
          currentState = State.tagOpen
          // 2. 从文本状态 --> 标签开始状态，此时应该创建文本 Token，并添加到 Token 数组中
          // tip: cahrs 数组中缓存的字符就是文本内容
          tokens.push({
            type: 'text',
            content: chars.join('')
          })
          // 3. 清空已消费的 chars 数组
          chars.length = 0
          // 4. 消费当前字符 <
          str = str.slice(1)
        }
        break;
      case State.tagEnd: // 标签结束状态
        if (isAlpha(char)) {
          // 1. 遇到字母，切换到结束标签名称状态
          currentState = State.tagEndName
          // 2. 将当前字符缓存到 chars 数组
          chars.push(char)
          // 3. 消费当前字符
          str = str.slice(1)
        }
        break;
      case State.tagEndName: // 结束表明名称状态
        if (isAlpha(char)) {
          // 1. 遇到字母，保持状态不变，缓存当前字符到 chars 数组
          chars.push(char)
          // 2. 消费当前字符
          str = str.slice(1)
        } else if (char === '>') {
          // 1. 遇到字母 >，切换到初始状态
          currentState = State.initial
          // 2. 从结束标签名称状态 --> 初始状态，应该保存结束标签名称 Token
          // tip: cahrs 数组中缓存的字符就是标签名称
          tokens.push({
            type: 'tagEnd',
            name: chars.join('')
          })
          // 3. 清空已消费的 chars 数组
          chars.length = 0
          // 4. 消费当前字符 >
          str = str.slice(1)
        }
        break;
    }
  }

  // 返回 tokens
  return tokens
}

// parse 函数接收模板作为参数
function parse(str) {
  // 首先对模板进行标记化，得到 tokens
  const tokens = tokenzie(str)
  //  创建 Root 根节点
  const root = {
    type: 'Root',
    children: []
  }
  // 创建 elementStack 栈
  const elementStack = [root]

  // 开启 while 循环扫描 tokens
  while (tokens.length) {
    // 获取当前栈顶节点作为父节点 parent
    const parent = elementStack[elementStack.length - 1]
    // 当前扫描的 Token
    const t = tokens[0]

    switch (t.type) {
      case 'tag':
        // 如果当前 Token 是开始标签，创建 Element 类型的 AST 节点
        const elementNode = {
          type: 'Element',
          tag: t.name,
          children: []
        }
        // 将其添加到父级节点的 children 中
        parent.children.push(elementNode)
        // 将当前节点压入栈
        elementStack.push(elementNode)
        break;
      case 'text':
        // 如果当前 Token 是文本，创建 Text 类型的 AST 节点
        const textNode = {
          type: 'Text',
          content: t.content
        }
        // 将其添加到父节点的 children 中
        parent.children.push(textNode)
        break;
      case 'tagEnd':
        // 遇到结束标签，将栈顶节点弹出
        elementStack.pop()
        break;
    }

    // 消费已扫描过的 token
    tokens.shift()
  }

  // 返回 ast
  return root
}

module.exports = {
  parse
}