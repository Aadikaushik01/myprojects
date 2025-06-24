
   //   const number1 = document.querySelector("#number1");
    // const number2 = document.querySelector("#number2");
    // const result = document.querySelector("#result");
    // const button = document.querySelector("#button");

    // button.addEventListener("click", function() {
    //   const a = Number(number1.value);
    //   const b = Number(number2.value);
    //   const sum = a + b;
    //   result.value = sum;
    // });


//Arrays
// let arr=[40,50,60,70];
// let arr1=[10,0,20,30,1,20];
//    //let len= arr.length;

// //function for print any array with pera meters

// function printdata(elemnt , index , array){
//     console.log("Print called", elemnt , index , array);
// }

// function showdata(item , index , array){
//     console.log("Print showdata function", item , index , array);
// }
   
//    //callback function

//       function printArray(array, callback){
//       for(i=0;i<array.length;i++)
//       callback(array[i], i , array );
//       }


// //function calll
// printArray(arr,printdata);

// printArray(arr1, showdata);



//  foreach map , filter 

// function printdata(elemnt , index , array){


// }
// // arr.forEach(printdata);    
// let arr=[1,2,2,3,1];
// let arr2=[1,0,8,7,9,];
// function printarr(item , index , array){
//     console.log(item , index , array);

// }
// // arr.forEach(printarr);
// arr2.forEach(function printarray(item , index , array){
//    if(item%2==0){
//     console.log(item*2);

//    }
// })

// arr2.forEach(printarr);

// let arr=[1,2,3,4,5,6];
// let result=arr.filter(function (item){
//     if(item%2==0){
//         return true;
//     }
//     else return false; 
// });






// let result = arr.map(function (item ){
//     return 1 ;
// })
// console.log(result);
// // arr.forEach(function(item){
// //     if(item%2==0){
// //         result.push(item);
// //     }
// // });
// // console.log(result);



// REMOVE DUPLICATE




// let arr = [1,2,3,4,3,2,1,1,5,4];
// let arr2=[];
//  arr.filter(function(item){
//     for(let i = 0 ; i < arr2.length ; i++){
//         if(arr[i] == item){
//             return false;
//         }
//     }
//     arr2.push(item);
//     return true ; 
// });
// console.log(arr2);
 
//SECOND LARGEST
//we do it with map or filter also 

// let arr =[2,3,5,6,7,8,9];
// let first  = -Infinity  ;
// let second = -Infinity ;
// let index ;
// arr.filter(function (item , i , array ){
//     if(item > first){
//         second = first ;
//         first = item;
//     }
//     else if (item > second && item <first )
  
//     item = second ;

// });
//     console.log(first);
//     console.log(second);


// let arr=[1,1,2,2,8,6,7,5,9,8,6,];
// let arr2=[];
// //let result=[];
// arr.map(function(item){
//     if(item%2 == 0){
//     arr2.push(item);
//     }
//     else{
//     console.log("&odd number",item);
//     }
// });
// console.log( "&even number ",arr2);
//console.log(result);

//ASIGNMENT

//second largest . 1

// let arr=[1,2,3,4,6,7,6,7,8,9,];
// let second= -Infinity ;
// first = -Infinity;
// let index ;
// arr.forEach(function(item){

//   if(item > first){
//     second = first ;
//     first = item ;
//   }
//   else if(item > second && item < first){
//     second = item;
//   }

// });
// console.log(second);

//REMOVE DUPLICATES       2 

// let arr = [1,3,4,5,43,4,3,22,3,4,5];
// let arr2=[];
// arr.filter(function (item , i , array){
//   for(let i = 0 ; i<arr2.length ; i++){
//     if(array[i] == item){
//       return true ;
//     }
   
//   }
//    arr2.push(item);
// });
// console.log(arr2);

 //EVEN AND ODD NUMBER  3 

//  let arr=[2,4,5,6,7,8,88,9,66,5,55,44,33,2];
//  let odd =[];
//  let even = [];
//  arr.map(function (item){
//   if(item%2==0){
//     even.push(item);
//   }else{
//     odd.push(item);
//   }

//  });
//  console.log("even num is" , even);
//  console.log(odd);

// REVERSE AN ARRAY 

// let arr = [1,2,3,4,5,6,7,8,9];
// let arr2 = []; 
// for(let i = arr.length ; i >= 0 ; i--){
            
//   arr2.push(i);

           
// }console.log(arr2);

//PRINT 10 NUMBERS 

// let arr=[1,2,3,4,5,6,7,8,9,8];

// arr.forEach(function (item ,index , array){
//     for(let i = 0 ; i <array.length ; i++){

//     }
//     console.log(item);

// });

//Find minimum and maximum in a array

// let arr=[1,2,3,4,5,6,7 ,8];
// let maximum = -Infinity ;
// let minimum =   Infinity ;
//  arr.forEach(function(item , index ,array){ 
// for(let i = 0 ; i <arr.length ; i++){
//   if(item > maximum){
//            maximum = item ;
//   }

//   if(item <minimum){
//     minimum = item ;
//   }

// }});console.log(maximum);
// console.log(minimum);


// sum of all elements using reduse 

// let numbers = [10, 20, 30, 40];

// let total = numbers.reduce((starting, current) => starting + current );

// console.log(total);

// let number = [1,2,3,4,3,21];
// let sum = 0 ;

// number.forEach(function(item , index, array){
             
//              for(let i = 0 ; i < number.length ; i++){
//              }
//                 sum = sum + item ;

// });
// console.log(sum);




// let wrods = ["hello" , "how" , "are" , "you"] ;
// let combine = wrods.reduce((statring , current) => statring + " " + current);
// console.log(combine);
// let input = prompt("hello sahil bhai");

//SORTT ARRAY USING FUNCTION

// let numbers1 = [10, 5, 8, 1, 7];
// let numbers2 = [20, 3, 15, 6, 9];
// let Asc = sortArray(numbers1, 'asc');
// let Des = sortArray(numbers2, 'des');


// function sortArray(array, order) {
//   if (order =='asc') {
//     return array.sort(function(a, b) {
//       return a - b;
//     });
//   } else if (order =='des') {
//     return array.sort(function(a, b) {
//       return b - a;
//     });
//   }
//    else {
//     return;
//   }
// }
// console.log(Asc);   
// console.log(Des);


//MERGE TWO ARRAY  and remove duplicates

// let arr=[6,66, 6,3,,32,44,3,32,,22,11];
// let arr2 = [ 1,3,4,5,6,6,99,98,110,89];
// let result = [];
// let final = [];
// arr.forEach(function (item){ 
//             result.push(item)
// });
// arr2.forEach(function (item){
//             result.push(item)
// });
// result.filter(function(item , index ,array) {
//     let count=0;
//     for(let i =0 ; i< index ; i++){
//                if(final[i] == item){
//                 count=1;
//                }
// }
// if(count==0){
//    final.push(item);
// }
// });

// console.log(final);


//TWO ARRAY ARE EQUAL ELEMENT WISE

// for(let i = 0 ; i < arr1.length ; i++){
//     for(let j =0 ; j < arr2.length ; j++){
//            if(arr1[i] == arr2[j]){
//             count = 1 ;
//           }
//         else{
//             count = 0 ;
//         }
//     }
    
// }
// if(count == 1 ){
//     console.log("wise");
// }else{
//     console.log("not wise");
// }

//new   <---------------->
        //  if(arr1.length!=arr2.length){
        //     console.log("Not Wise");
        //  }     
        //   else{
        //     for(let i=0; i<arr1.length; i++){
        //         if(arr[i]!=arr[j]){
        //             count=1;
        //         }
        //     }
        //            if(count==0){
        //         console.log("wise");
        //             }
        //              else{
        //                 console.log("Not Wise");

        //    }
        // }
    
// let input = document.getElementById("input");
// let button = document.getElementById("button");
// let container = document.querySelector(".cont");

// button.addEventListener("click", function(){
//        let newdiv = document.createElement("div");
//        newdiv.innerText = input.value;        

//       let btn = document.createElement("button");
//         btn.innerText = "edit"; 
//        let Delete  = document.createElement("button") ;
//        Delete.innerText = "delete"; 
//         newdiv.appendChild(btn);


//         Delete.addEventListener("click" , function(){

//                container.removeChild(newdiv);
//         });

//         btn.addEventListener("click" , function(){
//                 input.value = newdiv.childNodes[0].nodeValue;
//                   input.value="";

//         });



//        newdiv.appendChild(Delete);
//        container.appendChild(newdiv);
//        input.value = "";


// });



//method1 

// let btns = document.querySelectorAll(".btn");
// let input  = document.querySelector("#input");
// btns.forEach(function(item){
// item.addEventListener("click" , gavevalue);
// })

// function gavevalue(e){
// input.value  = input.value+e.target.innerText;
// }

//method 2 

// let input = document.querySelector("#input");
// let button1=document.querySelector("#button1");
// let button2=document.querySelector("#button2");
// let button3=document.querySelector("#button3");
// let button4=document.querySelector("#button4");
// let button5=document.querySelector("#button5");
// let button6=document.querySelector("#button6");
// let button7=document.querySelector("#button7");
// let button8=document.querySelector("#button8");
// let button9=document.querySelector("#button9");
// let button0=document.querySelector("#button0");

// button1.addEventListener("click",function(){
// input.value= input.value+ button1.innerText;
// })
// button2.addEventListener("click",function(){
// input.value= input.value+ button2``.innerText;
// })

//method 3 
let input = document.querySelector("#input");
let div1 = document.querySelector("#cont");

function createNumberButtons() {
    for (let i = 0; i <= 9; i++) {
        let btn = document.createElement("button");
        btn.innerText = i;
        btn.addEventListener("click", printValue);
        div1.appendChild(btn);
    }
}

function createOperatorButtons() {
    let operators = ["+", "-", "*", "/"];
    operators.forEach(function (op) {
        let btn = document.createElement("button");
        btn.innerText = op;
        btn.addEventListener("click", printValue);
        div1.appendChild(btn);
    });
}

function createEqualButton() {
    let equalBtn = document.createElement("button");
    equalBtn.innerText = "=";
    equalBtn.addEventListener("click", calculate);
    div1.appendChild(equalBtn);
}


function printValue(e) {
    input.value += e.target.innerText;
}

function calculate() {
    try {
        input.value = eval(input.value); 
    } catch (err) {
        input.value = "Error";
    }
}

// Initialize calculator
createNumberButtons();
createOperatorButtons();
createEqualButton();
createClearButton();



