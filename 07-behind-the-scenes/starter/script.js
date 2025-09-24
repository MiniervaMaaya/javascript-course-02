// // // // //  'use strict';

// // // // // // // console.log('varX');
// // // // // // // // console.log('letx');
// // // // // // // // console.log('constx');

// // // // // //  outerFUnction();

// // // // // //  var varx =1;
// // // // // //  let letx =2;
// // // // // //  const constx =3;

// // // // // //  function AddDecl(a,b) {
// // // // // //      return a + b;
// // // // // //  }

// // // // // // const AddExpr = function(a,b) {
// // // // // //      return a + b;
// // // // // //  };
// // // // // //  const AddArrow = (a,b) => a + b;


// // // // // // const person = {
// // // // // //     name: 'jonas',
// // // // // //     greet: function() {
// // // // // //        console.log(`Hello I am  ${this.name}`);
// // // // // //     },
// // // // // // };

// // // // // // person.greet();

// // // // // // const anotherPerson = { name: 'cham'};

// // // // // // anotherPerson.greet = person.greet;

// // // // // // anotherPerson.greet();

// // // // // // const greetFunction = person.greet;

// // // // // // greetFunction();


// // // // // const obj = {
// // // // //     name: 'Object',
// // // // //     regularMethod: function() {
// // // // //         console.log('Regular Method:', this.name);
// // // // //     },
// // // // //     arrowMethod: () => {
// // // // //         console.log('Arrow Method:', this.name);
// // // // //     },
// // // // // }

// // // // // obj.regularMethod();

// // // // // obj.arrowMethod();

// // // // const timer ={
// // // //     name: 'TImer',
// // // //     start: function () {
// // // //         console.log('  ${this.name} started....');
// // // //         const self = this;

// // // //         setTimeout(function() {
// // // //             console.log('1 second passed');
// // // //             console.log('$(this.name) stopped');
// // // //         }, 1000);
// // // //     }
   
// // // // };


// // // // timer.start();


// // // const functionTypes = {
// // //     regularFunction: function() {
// // //         console.log(' Arguments length:', arguments.length);
// // //         console.log(' Frist argument: ', arguments);

// // //     }
// // // };
 
// // // arrowFunctions: ()  => {
// // //     console.log('arugments');
// // //     console.log('arrow function called');
// // // modernFunction: (...args) => {
// // //     console.log('Args length:', args.length);
// // //     console.log('First argument:', args[0]);
// // // }
// // // }

// // // functionTypes.regularFunction('hello', 'world')
// // // // functionTypes.arrowFunctions('test');
// // // functionTypes.modernFunction('modern', 'approach');

// // let age = 30;

// // let oldAge = age;

// // age = 31;

// // console.log('age:', age);
// // console.log('oldAge:', oldAge);

// // const me = { name:'Cham', age: 22}

// // const friend = me;

// // friend.name = 'dana';
// // friend.age = 24;

// // console.log('Me:', me);
// // console.log('Friend:', friend);

// const original = {
//     name: 'Cham',
//     age: 22,
//     hobbies: ['coding', 'music'],
// };

// const shallowCopy ={...original };

// shallowCopy.name = 'Dana';

// console.log('original nam:', original.name);
// console.log('Copy name:', shallowCopy.name);

// shallowCopy.hobbies.push('reading');

// console.log('Original hobbies:', original.hobbies);
// console.log('Copy hobbies:', shallowCopy.hobbies);

const deepOriginal = {
    name: 'Charlie',
    age: 26,
   address: { city: 'Paris', country: 'France' },
    hobbies: ('travel', 'Photography'),

}

const deepCopy = structuredClone(deepOriginal);

deepCopy.address.ciity = 'London';
deepCopy.hobbies.push('eating');