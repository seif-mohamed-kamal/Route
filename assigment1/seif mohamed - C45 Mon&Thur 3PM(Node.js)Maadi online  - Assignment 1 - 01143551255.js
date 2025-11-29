// //Q1
// let s = "123";
// let x = parseInt(s);
// x += 7;
// console.log(x);

// //Q2
// function checkValue(value) {
//   if (!value) {
//     return "Invalid";
//   }
//   return value;
// }
// console.log(checkValue(0));

// //Q3
// for (let i = 1; i < +10; i++) {
//   if (i % 2 == 0) continue;
//   console.log(i);
// }

// //Q4
// let numbers = [1, 2, 3, 4, 5];
// let evenNumbers = numbers.filter((number) => number % 2 === 0);
// console.log(evenNumbers);

// //Q5
// let arr1 = [1, 2, 3];
// let arr2 = [4, 5, 6];
// let arr3 = arr1.concat(arr2);
// console.log(arr3);

// //Q6
// function getDayOfWeek(num) {
//   switch (num) {
//     case 1:
//       return "Sunday";
//     case 2:
//       return "Monday";
//     case 3:
//       return "Tuesday";
//     case 4:
//       return "Wednesday";
//     case 5:
//       return "Thursday";
//     case 6:
//       return "Friday";
//     case 7:
//       return "Saturday";
//     default:
//       return "Invalid number";
//   }
// }
// console.log(getDayOfWeek(2));

// //Q7
// let strings = ["a", "ab", "abc"];
// let lengths = strings.map((str) => str.length);
// console.log(lengths);

// //Q8
// function checkDivisible(num) {
//   if (num % 3 == 0 && num % 5 == 0) {
//     return "Divisible by both";
//   } else {
//     return "Not divisible by both";
//   }
// }
// console.log(checkDivisible(15));

// //Q9
// const square = (num) => num * num;
// console.log(square(5));

// //Q10
// function formatPerson({ name, age }) {
//   return `${name} is ${age} years old`;
// }
// const person = { name: "John", age: 25 };
// console.log(formatPerson(person));

// //Q11
// function sum(...data) {
//   // console.log(data);
//   let ans = 0;
//   for (let i = 0; i < data.length; i++) {
//     ans += data[i];
//   }
//   return ans;
// }
// console.log(sum(1, 2, 3, 4, 5, 6));

// //Q12
// function success() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("Success");
//     }, 3000);
//   });
// }
// success().then((message) => console.log(message));

// //Q13
// function Max(arr) {
//   let ans = -Number.MAX_VALUE;
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] > ans) {
//       ans = arr[i];
//     }
//   }
//   return ans;
// }
// console.log(Max([1, 3, 7, 2, 4]));
// console.log(Max([-1, -3, -7, -2, -4]));

// // Q14
// function getKey(obj) {
//   const keys = [];
//   for (const [key, value] of Object.entries(obj)) {
//     keys.push(key);
//   }
//   return keys;
// }
// const person = { name: "seif", age: 20 };
// console.log(getKey(person));

// //Q15
// function splits(string) {
//   return string.split(" ");
// }
// console.log(splits("The quick brown fox"));

//ESAY QUESTION
// 1 - forEach vs for...of
//     forEach ->
//         1 - return all element almost at the same time
//         2 - cannot use break or continue or return
//         3 - slower because it calls a callback each time
//         4 - cannot d0 blocking
//     for...of ->
//         1 - loop all item but not at the same time
//         2 - use break, continue, and return.
//         3 - can d0 blocking
//         4 - faster because it avoids callback

// 2 - Hoisting and TRZ
//     Hoisting -> JavaScript moves variable and function declarations to the top of their scope before the code runs.
//      {
//         console.log(x); // print undefind
//         var x = 20;
//     }
//     TDZ -> let and const are hoisted but not initialized leads to ReferenceError
//     {
//         console.log(c); // ReferenceError
//         let c = 20;
//     }

// 3 - == vs ===
//     == -> check the value
//     === -> check the value and the type

// 4 - try-catch
//     try-catch -> used to handle errors
//     try block -> run Code or throw an error
//     catch block -> Runs if an error occurs
//     * without them the program will crush

// 5 -
//     type conversion -> data type is converted into another data type by the programmer
//         let str = "123";
//         let num = Number(str);
//         console.log(num + 7); // 130

//     type coercion -> data type is automatically converted into another data type by a compiler at the compiler time
//         console.log("5" + 10); // "510" concatination
//         console.log("20" - 5); // 15    summition
