// ;(function () {
//   var Compute = function () {  }

//   Compute.prototype = {
//     plus: function (a, b) {
//       return a + b;
//     },
//     minus: function (a, b) {
//       return a - b;
      
//     },
//     mul: function (a, b) {
//       return a * b;
//     },
//     div: function (a, b) { 
//       return a / b;
//     }
//   }

//   window.Compute = Compute;
// })();

// var compute = new Compute();

// var res = compute.div(10, 5);
// console.log(res);


// Professor.prototype = {
//   name: 'Mr. Zhang',
//   tSkill: 'JAVA'
// }
// function Professor () { }

// var professor = new Professor();

// Teacher.prototype = professor;
// function Teacher () {
//   this.name = 'Mr. Wang';
//   this.mSkill = 'JS/JQ';
// }

// var teacher = new Teacher();

// Student.prototype = teacher;
// function Student () {
//   this.name = 'Mr. Li';
//   this.pSkill = 'HTML/CSS';
// }
// var student = new Student();

// console.log(student);

// Teacher.prototype.wife = 'Ms. Liu';
// function Teacher (name, mSkill) {
//   this.name = name;
//   this.mSkill = mSkill;
// }
// function Student (name, mSkill, age, major) {
//   Teacher.apply(this, [name, mSkill]);
//   this.age = age;
//   this.major = major;
// }
// var student = new Student(
//   'Mr. Zhang',
//   'JS/JQ',
//   18,
//   'Computer'
// );
// console.log(student);


// function Teacher () {
//   this.name = 'Mr. Li';
//   this.tSkill = 'JAVA';
// }

// Teacher.prototype = {
//   pSkill: 'JS/JQ'
// }

// var teacher = new Teacher();
 
// function Student () {
//   this.name = 'Mr. Wang';
// }

// Student.prototype = Teacher.prototype;
// Student.prototype.age = 18;

// var student = new Student();
// console.log(student);


// function Teacher () {
//   this.name = 'Mr. Li';
//   this.tSkill = 'JAVA';
// }

// Teacher.prototype = {
//   pSkill: 'JS/JQ'
// }

// var teacher = new Teacher();

// function Student () {
//   this.name = 'Mr. Wang';
// }

// function Buffer () { }
// Buffer.prototype = Teacher.prototype;
// var buffer = new Buffer();
// Student.prototype = buffer;

// var student = new Student();
// console.log(student);


// /**
//  * 
//  * @param {*} Target ????????? 
//  * @param {*} Origin ????????????
//  */
// function inherit (Target, Origin) {
//   function Buffer() {}
//   Buffer.prototype = Origin.prototype;
//   Target.prototype = new Buffer();
//   Target.prototype.constructor = Target; // ???????????????
//   Target.prototype.super_class = Origin; // ???????????????
// }

// Teacher.prototype = {
//   skill: 'JS/JQ'
// };
// function Teacher () {}
// function Student () {}
// inherit(Student, Teacher);
// var student = new Student();
// console.log(student);

// var inherit =  (function () {
//   var Buffer = function () {}
//   return function (Target, Origin) {
//     Buffer.prototype = Origin.prototype;
//     Target.prototype = new Buffer();
//     Target.prototype.constructor = Target;
//     Target.prototype.super_class = Origin;
//   }
// })();


// var initProgrammer = (function () {
//   var Programmer = function () {}
//   Programmer.prototype = {
//     name: '?????????',
//     tool: '?????????',
//     work: '??????????????????',
//     duration: '10?????????',
//     say: function () {
//       console.log(
//         '????????????' + this.myName + this.name + '?????????????????????' + 
//         this.tool + this.work + '??????????????????' + this.duration + 
//         '???????????????????????????' + this.lang.toString() + '???'
//       );
//     }
//   }

//   function FrontEnd () {}
//   function BackEnd () {}

//   inherit(FrontEnd, Programmer);
//   inherit(BackEnd, Programmer);

//   FrontEnd.prototype.lang = ['HTML', 'CSS', 'JavaScript'];
//   FrontEnd.prototype.myName = '??????';

//   BackEnd.prototype.lang = ['Node', 'Java', 'SQL'];
//   BackEnd.prototype.myName = '??????';

//   return {
//     FrontEnd: FrontEnd,
//     BackEnd: BackEnd
//   }
// })();

// var frontEnd = new initProgrammer.FrontEnd();
// var backEnd = new initProgrammer.BackEnd();
// frontEnd.say();
// backEnd.say();