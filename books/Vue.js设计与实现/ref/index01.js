// let str = 'vue';
// // 无法拦截对值的修改
// str = 'vue3';

// const { reactive } = require('../vue/reactive');
// const wrap = {
//   value: 'vue'
// };
// // 可以使用 Proxy 代理 wrap，间接实现对原始值的拦截
// const name = reactive(wrap);
// // 修改值可以触发响应
// name.value = 'vue3';

const { effect } = require('../vue/effect');
const { reactive } = require('../vue/reactive');
const { ref, toRef, toRefs, proxyRefs } = require('../vue/ref');

// const refVal = ref(1);
// effect(() => {
//   // 在副作用该函数内通过 value 属性读取原始值
//   console.log(refVal.value);
// });
// refVal.value = 2;

// const refVal1 = ref(1);
// const refVal2 = reactive({ value: 2 });

{/* <template>
  <p>{{ foo }}/{{ var }} </p>
</template>
export default {
	setup () {
    const obj = reactive({ foo: 1, bar: 2 });

    setTimeout(() => {
      obj.foo = 100;
    }, 1000);

    return {
      ...obj
    };
	}
} */}

// // obj 是响应式数据
// const obj = reactive({ foo: 1, bar: 2 });
// // newObject 对象下具有 与 obj 对象同名的属性，并且每个属性值都是一个对象
// // 该对象具有一个访问器属性 value，当读取 value 的值时，其实读取的时 obj 对象下响应的属性值
// const newObj = {
//   foo: {
//     get value() {
//       return obj.foo;
//     }
//   },
//   bar: {
//     get value() {
//       return obj.bar;
//     }
//   }
// }
// effect(() => {
//   console.log(newObj.foo.value);
// });
// obj.foo = 100;

// const obj = reactive({ foo: 1, bar: 2 });
// const newObj = {
//   foo: toRef(obj, 'foo'),
//   bar: toRef(obj, 'bar')
// }
// effect(() => {
//   console.log(newObj.foo.value);
// });
// obj.foo = 100;

// const obj = reactive({ foo: 1, bar: 2 });
// const newObj = { ...toRefs(obj) };

// effect(() => {
//   console.log(newObj.foo.value);
// });

// obj.foo = 100;


// const obj = reactive({ foo: 1, bar: 2 });
// const newObj = { ...toRefs(obj) };
// console.log(newObj.foo.value); // 1
// console.log(newObj.bar.value); // 2
// const newObj2 = proxyRefs(newObj);
// console.log(newObj2.foo); // 1
// console.log(newObj2.bar); // 2
// newObj2.foo = 123;

// const obj = reactive({ foo: 1, bar: 2 });
// const newObj = proxyRefs({ ...toRefs(obj) });
// console.log(newObj.foo); // 1
// console.log(newObj.bar); // 2
// newObj.foo = 100;
// console.log(obj); // { foo: 100, bar: 2 }

const count = ref(0);
const obj = reactive({ count });

console.log(obj.count); // 
