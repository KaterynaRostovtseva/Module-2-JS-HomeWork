// // Confirms

const answers = [
    confirm("Питання 1: Вам подобається ця гра?"),
    confirm("Питання 2: Ви готові грати ще?"),
    confirm("Питання 3: Ви знаєте правила гри?")
];

alert(answers);

// // Prompts

const questions = [
    "Яке ваше ім'я?",
    "Де ви живете?",
    "Який ваш улюблений кольор?"
];

const answer = [];

answer[0] = prompt(questions[0]);
answer[1] = prompt(questions[1]);
answer[2] = prompt(questions[2]);

// alert(answer);

// // Item access

const userInput = prompt("Введіть індекс у масиві:");
const myArray = [10, 20, 30, 40, 50];
const index = myArray[userInput]

alert(index);

const userInput1 = prompt("Введіть індекс у масиві:");
const userInput2 = prompt("Введіть значення для цього індексу:");
let arr = [];
arr[userInput1] =userInput2;
alert(arr);

// // Multiply table

const multiplicatTab = [
    [0,0,0,0,0],
    [0,1,2,3,4],
    [0,2,4,6,8],
    [0,3,6,9,12],
    [0,4,8,12,16]
];

  console.log(multiplicatTab[3][3]);

// //   Multiply table slice

const multiplicationTable1 = [
    [0, 0, 0, 0, 0],
    [0, 1, 2, 3, 4],
    [0, 2, 4, 6, 8],
    [0, 3, 6, 9, 12],
    [0, 4, 8, 12, 16]
];
let array = multiplicationTable1.slice(1);
for( let i = 0; i <= array.length-1; i++){
    array[i] = array[i].slice(1);
}
console.log(array);

// // IndexOf Word

let usInp = prompt("Введіть рядок із кількох слів:");
let word1 = prompt("Введіть потрібне слово:");
let arr = usInp.split(" ");
let res = arr.indexOf(word1);

alert(res);

// // Reverse

const userInputArr = [];

for (let i = 1; i <= 5; i++) {
    const userInp = prompt("Введіть значення:");
    userInputArr.push(userInp);
}
const reversedArr = [];
for (let i = 1; i <= 5; i++) {
    let item = userInputArr.pop();
    reversedArr.push(item)
}
console.log(reversedArr);

// // Reverse 2

const revArr = [];
for (let i = 1; i <= 5; i++) {
    let item = reversedArr.shift();
    revArr.unshift(item)
}

console.log(revArr);

// // Copy

const multiplicationTable5 = [
    [0,0,0,0,0],
    [0,1,2,3,4],
    [0,2,4,6,8],
    [0,3,6,9,12],
    [0,4,8,12,16]
];

const multiplicationTable2 = multiplicationTable5.slice(0);
console.log(multiplicationTable2);

// Deep Copy

const multiplicationTable3 = JSON.parse(JSON.stringify(multiplicationTable5));
console.log(multiplicationTable3);

// // Array Equals

let arr = [1,2,3];
let arr2 = arr;

console.log(arr2);

// Flat

const multiplicatTab = [
    [0,0,0,0,0],
    [0,1,2,3,4],
    [0,2,4,6,8],
    [0,3,6,9,12],
    [0,4,8,12,16]
];

const multiplicationTable4 = [];

for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    multiplicationTable4.push(multiplicatTab[i][j]);
  }
}

console.log(multiplicationTable4);

// // Destruct

const inputStrings = prompt("Введіть рядок:");
const [firstChar, , , , fifthChar, , , , ninthChar] = inputStrings;

console.log(firstChar);
console.log(fifthChar);
console.log(ninthChar);

// // Destruct default

const inputStr = prompt("Введіть рядок:");
const [secondChar = "!", , fourthChar = "!", fifthChar1 = "!"] = inputStr;

console.log(secondChar);
console.log(fourthChar);
console.log(fifthChar1);

// // Multiply table rest

const multiplicationTab = [
    [0, 0, 0, 0, 0],
    [0, 1, 2, 3, 4],
    [0, 2, 4, 6, 8],
    [0, 3, 6, 9, 12],
    [0, 4, 8, 12, 16]
];

const [ [...rest1], [...rest2], [...rest3], [...rest4]] = multiplicationTab;
const resArray = [...rest1, ...rest2, ...rest3, ...rest4].filter(element => element !== 0);


console.log(resArray);

// // For Alert

const names1 =  ["John", "Paul", "George", "Ringo"];
for (const name of names1) {
     alert(`Hello, ${name}`)
}

// // For Select Option

const currencies1 = ["USD", "EUR", "GBP", "UAH"]
let   str1 = "<select>"
for (const currency of currencies1){
  str1 += `<option value="${currency}">${currency}</option>`; 
}
str1 += "</select>"
document.write(str1);

// // For Table Horizontal

const names2 = ["John", "Paul", "George", "Ringo"]
let   str2 = "<table><tr>"
for (const name of names2){
    str2 +="<td>" + name + "</td>"; ;
}
str2 += "</tr></table>"
document.write(str2);

// // For Table Vertical

const names = ["John", "Paul", "George", "Ringo"];
let string = "<table>";

for (const name of names) {
    string += `<tr><td>${name}</td></tr>`;
}

string += "</table>";
document.write(string);

// // For Table Letters

const currencies = ["USD", "EUR", "GBP", "UAH"];
let   str5 = "<table style=' border-collapse: collapse'>";
str5 += "<tr>";
str5 += "<th style='border: 1px solid black; background-color: grey'>";
str5 += "</th>";
str5 += "<th style='border: 1px solid black; background-color: grey'>";
str5 += "</th>";
str5 += "<th style='border: 1px solid black; background-color: grey'>";
str5 += "</th>";
str5 += "</tr>";
for (const currency of currencies){ 
    str5 += "<tr>";
    for (const letter of currency){ 
        str5 += "<td style='border: 1px solid black'>" + letter + "</td>";
        console.log(letter)
    }
    str5 += "</tr>";
}
str5 += "</table>";
document.write(str5);

// // For Multiply Table

const multiplicationTable = [
    [0, 0, 0, 0, 0],
    [0, 1, 2, 3, 4],
    [0, 2, 4, 6, 8],
    [0, 3, 6, 9, 12],
    [0, 4, 8, 12, 16]
];
let   str = "<table style=' border-collapse: collapse'>";

for (const [i, indexNum] of multiplicationTable.entries()){ 
    str += "<tr>";
    if(i === 0) {
        for (const num of indexNum){ 
            str += "<th style='border: 1px solid black; background-color: grey'>" + num + "</th>";
        }
    } else {
        for (const num of indexNum){ 
            str += "<td style='border: 1px solid black'>" + num + "</td>";
        }
    }
    str += "</tr>";
}
str+= "</table>";
document.write(str);

// // Function Capitalize

const capitalize = str => {
    let result = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    return result
}
  
  console.log(capitalize("cANBerRa")); 
  
// // //   Map Capitalize

const inputString = prompt("Введіть рядок:");
const words = inputString.split(" "); 
const capitalizedWords = words.map((word) => capitalize(word)); 

const resultString = capitalizedWords.join(" "); 

console.log(resultString);

// // Filter Lexics

const user = prompt("Введіть рядок:");
const words1 = user.split(" ");

const forbiddenWords = ['eee', "неприпустиме2", "неприпустиме3", 'rrr']; 
const censorWords = word => forbiddenWords.includes(word) ? false : true;

const filteredWords = words1.filter(censorWords); 
console.log (filteredWords)

const resString = filteredWords.join(" "); 

console.log(resString); 

// // Beep Lexics

const input = prompt("Введіть рядок:");
const word = input.split(" ");

const forWord = ["заборонене1", "заборонене2", "заборонене3"]; 

const censorWords1 = word => forWord.includes(word) ? "BEEP" : word;

const censoredWords = word.map(censorWords1); 

const resultStr = censoredWords.join(" ");

console.log(resultStr); 


// // Reduce HTML

const currencie = ["USD", "EUR", "GBP", "UAH"];
const selectString = currencie.reduce((accumulator, currency) => {
  return accumulator + `<option value="${currency}">${currency}</option>`;
}, "<select>") + "</select>";

document.write(selectString); 

// // For Brackets Hell Check

const line = prompt();
const bracketsStack = [];
let i = 0;

for (const character of line) {
  if (character === '[' || character === '{' || character === '(') {
    bracketsStack.push({ character, index: i });
  } else if (character === ']' || character === '}' || character === ')') {
    if (bracketsStack.length === 0) {
      console.log(`Помилка: Немає відкриваючої дужки для '${character}' на позиції ${i}`);
      break;
    }
    const lastOpeningBracket = bracketsStack.pop();
    if (
      (character === ']' && lastOpeningBracket.character !== '[') ||
      (character === '}' && lastOpeningBracket.character !== '{') ||
      (character === ')' && lastOpeningBracket.character !== '(')
    ) {
      console.log(`Помилка: Неспівпадіння дужок '${lastOpeningBracket.character}' та '${character}' на позиції ${lastOpeningBracket.index}`);
      break;
    }
  }
  i++;
}

if (bracketsStack.length > 0) {
  const lastUnclosedBracket = bracketsStack.pop();
  console.log(`Помилка: Немає відповідної закриваючої дужки для '${lastUnclosedBracket.character}' на позиції ${lastUnclosedBracket.index}`);
} else if (i === line.length) {
  console.log("У рядку помилок немає. Усі дужки парні.");
}


