// // 'use strict';

// // console.log('varX');
// // // console.log('letx');
// // // console.log('constx');

//  outerFUnction();

//  var varx =1;
//  let letx =2;
//  const constx =3;

//  function AddDecl(a,b) {
//      return a + b;
//  }

// const AddExpr = function(a,b) {
//      return a + b;
//  };
//  const AddArrow = (a,b) => a + b;


const person = {
    name: 'jonas',
    greet: function() {
       console.log(`Hello I am  ${this.name}`);
    },
};

person.greet();

const anotherPerson = { name: 'cham'};

anotherPerson.greet = person.greet;

anotherPerson.greet();