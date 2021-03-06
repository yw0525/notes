import TinyReact from './TinyReact';

// const VirtualDOM = (
//   <div className="container">
//     <h1>Hello React</h1>
//     <h2 data-test="test">test</h2>
//     <div>
//       嵌套 <div>嵌套 1.1</div>
//     </div>
//     <h3>观察，将要改变值</h3>
//     { 2 == 1 && <div>2 == 1</div> }
//     { 2 == 2 && <div>2 == 2</div> }
//     <span>这是一段内容</span>
//     <button onClick={() => alert('你好')}>点击</button>
//   </div>
// )

// TinyReact.render(
//   VirtualDOM,
//   document.getElementById('root')
// )

// function Demo () {
//   return <div>&hearts;</div>;
// }

// function Heart (props) {
//   return (
//     <div>
//       { props.title }
//       <Demo />
//     </div>
//   );
// }

// TinyReact.render(
//   <Heart title="Hello React" />,
//   document.getElementById('root')
// )



// class Alert extends TinyReact.Component {
//   constructor (props) {
//     super(props);
//   }

//   render () {
//     return (
//       <div>
//         <p>Hello React.</p>
//         <p>
//           { this.props.name }
//           { this.props.age }
//         </p>
//       </div>
//     )
//   }
// }

// TinyReact.render(
//   <Alert name="月落" age="23" />,
//   document.getElementById('root')
// );




// const VirtualDOM = (
//   <div className="container">
//     <h1>Hello React</h1>
//     <h2 data-test="test">test</h2>
//     <div>
//       嵌套 <div>嵌套 1.1</div>
//     </div>
//     <h3>观察，将要改变值</h3>
//     { 2 == 1 && <div>2 == 1</div> }
//     { 2 == 2 && <div>2 == 2</div> }
//     <span>这是一段内容</span>
//     <button onClick={() => alert('你好')}>点击</button>
//   </div>
// )

// const ModifyVirtualDOM = (
//   <div className="container">
//     <h1>Hello React</h1>
//     <h2 data-test="test-modity">test</h2>
//     <div>
//       嵌套 <div>嵌套 1.1</div>
//     </div>
//     <h3>值被改变了</h3>
//     { 2 == 1 && <div>2 == 1</div> }
//     { 2 == 2 && <div>2 == 2</div> }
//     <span>这是一段被修改过的内容</span>
//     <button onClick={() => alert('你好，Modity。')}>点击</button>
//   </div>
// )

// TinyReact.render(
//   VirtualDOM,
//   document.getElementById('root')
// )

// setTimeout(() => {
//   TinyReact.render(
//     ModifyVirtualDOM,
//     document.getElementById('root')
//   )
// }, 2 * 1000);




// const VirtualDOM = (
//   <div className="container">
//     <h1>Hello React</h1>
//     <h2 data-test="test">test</h2>
//     <div>
//       嵌套 <div>嵌套 1.1</div>
//     </div>
//     <h3>观察，将要改变值</h3>
//     { 2 == 1 && <div>2 == 1</div> }
//     { 2 == 2 && <div>2 == 2</div> }
//     <span>这是一段内容</span>
//     <button onClick={() => alert('你好')}>点击</button>
//   </div>
// )

// const ModifyVirtualDOM = (
//   <div className="container">
//     <h2 data-test="test-modity">test</h2>
//     <div>
//       嵌套 <div>嵌套 1.1</div>
//     </div>
//     <h6>值被改变了</h6>
//     { 2 == 1 && <div>2 == 1</div> }
//     { 2 == 2 && <div>2 == 2</div> }
//     <span>这是一段被修改过的内容</span>
//   </div>
// )

// TinyReact.render(
//   VirtualDOM,
//   document.getElementById('root')
// )

// setTimeout(() => {
//   TinyReact.render(
//     ModifyVirtualDOM,
//     document.getElementById('root')
//   )
// }, 2 * 1000);



// class Alert extends TinyReact.Component {
//   constructor (props) {
//     super(props);

//     this.state = {
//       title: 'Default Titie'
//     }
//     this.handeClick = this.handeClick.bind(this);
//   }

//   handeClick () {
//     this.setState({
//       title: 'Change Title'
//     });
//   }

//   render () {
//     return (
//       <div>
//         <p>Hello React.</p>
//         <p>
//           { this.props.name }
//           { this.props.age }
//         </p>
//         <p>{ this.state.title }</p>
//         <button onClick={this.handeClick}>Change Title</button>
//       </div>
//     )
//   }
// }

// TinyReact.render(
//   <Alert name="月落" age="23" />,
//   document.getElementById('root')
// );




// class Alert extends TinyReact.Component {
//   constructor (props) {
//     super(props);

//     this.state = {
//       title: 'Default Titie'
//     }
//     this.handeClick = this.handeClick.bind(this);
//   }

//   handeClick () {
//     this.setState({
//       title: 'Change Title'
//     });
//   }

//   componentWillReceiveProps (nextProps) {
//     console.log('componentWillReceiveProps', nextProps);
//   }

//   componentWillUpdate () {
//     console.log('componentWillUpdate');
//   }

//   componentDidUpdate () {
//     console.log('componentDidUpdate');
//   }

//   render () {
//     return (
//       <div>
//         <p>Hello React.</p>
//         <p>
//           { this.props.name }
//           { this.props.age }
//         </p>
//         <p>{ this.state.title }</p>
//         <button onClick={this.handeClick}>Change Title</button>
//       </div>
//     )
//   }
// }

// class Title extends TinyReact.Component {
//   constructor (props) {
//     super(props);
//   }

//   render () {
//     return (
//       <div>{ this.props.title }</div>
//     );
//   }
// }

// TinyReact.render(
//   <Alert name="月落" age="23" />,
//   document.getElementById('root')
// );

// setTimeout(() => {
//   TinyReact.render(
//     <Alert name="月落" age="23" />,
//     // <Title title="我是标题" />,
//     document.getElementById('root')
//   );
// }, 2000);




// class Title extends TinyReact.Component {
//   constructor (props) {
//     super(props);
//   }

//   render () {
//     return (
//       <div>{ this.props.title }</div>
//     );
//   }
// }

// class DemoRef extends TinyReact.Component {
//   constructor (props) {
//     super(props);
//     this.handleClick = this.handleClick.bind(this);
//   }

//   handleClick () {
//     console.log(this.input.value);
//     console.log(this.alert);
//   }

//   componentDidMount () {
//     console.log('componentDidMount');
//   }

//   render () {
//     return (
//       <div>
//         <input type="text" ref={ input => this.input = input} />
//         <button onClick={ this.handleClick }>按钮</button>
//         <Title
//           title="title"
//           ref={ alert => this.alert = alert }
//         />
//       </div>
//     )
//   }
// }

// TinyReact.render(<DemoRef />, document.getElementById('root'));




class KeyDemo extends TinyReact.Component {
  constructor (props) {
    super(props);
    
    this.state = {
      persons: [
        {
          id: 1,
          name: '张三'
        },
        {
          id: 2,
          name: '李四'
        },
        {
          id: 3,
          name: '王五'
        },
        {
          id: 4,
          name: '赵六'
        },
      ]
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    this.setState({
      persons: [
        {
          id: 1,
          name: '张三'
        },
        {
          id: 2,
          name: '李四'
        },
        {
          id: 3,
          name: '王五'
        }
      ]
    })
  }

  render () {
    return (
      <div>
        <ul>
          {
            this.state.persons.map(person => (
              <li key={ person.id }>{ person.name }</li>
            ))
          }
        </ul>
        <button onClick={ this.handleClick }>改变</button>
      </div>
    )
  }
}

TinyReact.render(<KeyDemo />, document.getElementById('root'));