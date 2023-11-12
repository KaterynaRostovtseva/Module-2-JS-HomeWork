// 1 while confirm

let confirmed = false;

while (!confirmed) {
  confirmed = confirm("Натисніть OK для завершення циклу, або Скасувати для продовження.");
}

alert("Користувач натиснув OK. Цикл завершено.");

// 2 array fill

let myArray = [];

while (true) {
  let userInput = prompt("Введіть елемент для додавання до масиву:");
  if (userInput === null || userInput === "") {
    break; 
  }

  myArray.push(userInput);
}

console.log("Результат:", myArray);

// 3 array fill nopush

let myArray = [];
let index = 0;
while (true) {
  let userInput = prompt("Введіть елемент для додавання до масиву:");
  if (userInput === null || userInput === "") {
    break; 
  }

  myArray[index] = userInput;
  index++;
}

console.log("Результат:", myArray);

// 4 infinite probability

let i = 0;

while (true) {
    i++;

    if (Math.random() > 0.9) {
      break; 
    }
    alert(`Вам набридло за ${i} разів.`)
  }
alert("Кількість ітерацій: " + i)

// 5 empty loop

do {

}
while (prompt("Натисніть OK для завершення циклу, або Скасувати для продовження.") === null)

// 6 progression sum

let n = prompt("До якого числа будемо рахувати?");
    if(!isNaN(n)){
        let sum = 0
        for(let i = 1; i <= n; i += 3){
            sum += i
        }
        alert(`За попередньою інформацією, сума арефметичної прогресії від 1 до ${n} з кроком 3 дорівнює числу: ${sum}`);
    }else{
        alert('Ви помилились при вводі даних');
    }    

// 7 chess one line

let str = prompt("Введіть довжину рядка");
let result = " ";
for(let i = 0; i < str; i++)
i % 2 === 1 ? result += " " : result += "#";
alert("Довжина рядка:\n" + result);

// 8 numbers

let result = " ";
for(let i= 0; i < 10; i++){
    for(let j= 0; j < 10; j++){
    result += j;
    }
    result += "\n";
}

console.log(result);


// 9 chess

let rows = 10; 
let columns = 13; 
let chessboard = "";

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < columns; j++) {
    if ((i + j) % 2 === 0) {
      chessboard += ".";
    } else {
      chessboard += "#";
    }
  }
  chessboard += "\n";
}

console.log(chessboard);


// 10 cubes

let n = prompt("Введіть кількість кубів?");
const result = [];
for(let i = 0; i < n; i++){
    result[i] = Math.pow(i, 3)
}
alert(`Масив кубів:\n${result}`);

// 11 multiply table

const rows = 10;
const columns = 10;
const multiplicationTable = [];

for (let i = 1; i <= rows; i++) {
  multiplicationTable[i] = [];
  for (let j = 1; j <= columns; j++) {
    multiplicationTable[i][j] = i * j;
  }
}

for (let i = 1; i <= rows; i++) {
  for (let j = 1; j <= columns; j++) {
    console.log(`${i} * ${j} = ${multiplicationTable[i][j]}`);
  }
}

// 12 read array of objects

function readArrayOfObjects() {
    const objects = [];

    while (true) {
      const object = {};
      let continueEntering = true;

      while (continueEntering) {
        const key = prompt("Введіть ключ для об'єкта:");
        if (key === null) {
          continueEntering = false;
          break;
        }

        const value = prompt("Введіть значення для ключа:");
        object[key] = value;
      }

      objects.push(object);

      const shouldContinue = confirm("Бажаєте продовжити введення об'єктів?");
      if (!shouldContinue) {
        break;
      }
    }

    return objects;
  }

  const arrayOfObjects = readArrayOfObjects();
  console.log("Масив об'єктів:", arrayOfObjects);


// 13 Ромбік

let size = 11;
let row = '';
let center = Math.floor(size / 2);

for (let x = 0; x < size; x++) {
  for (let y = 0; y < size; y++) {
    if (x <= center) {
      if (y >= center - x && y <= center + x)
        row += "#";
      else
        row += ".";
    } else {
      if (y >= center + x - size + 1 && y <= center - x + size - 1)
        row += "#";
      else
        row += ".";
    }
  }
  console.log(row);
  row = '';
}


// 14 DOM: multiply table

const rows = 9;
const columns = 9;

const multiplicationTable = document.createElement("table");
multiplicationTable.style.borderCollapse = "collapse";
multiplicationTable.style.margin = "20px";

for (let i = 1; i <= rows; i++) {
    const row = document.createElement("tr");

    for (let j = 1; j <= columns; j++) {
        const cell = document.createElement("td");
        cell.innerText = i * j;
        cell.style.border = "1px solid black";
        cell.style.padding = "10px"
        row.appendChild(cell);

// 15 DOM: highlight cell + // 16 DOM: Highlight cross

        cell.addEventListener("mouseover", () => {
            cell.style.backgroundColor= "yellow";
            highlightedRow = i;
            highlightedCol = j;
            highlightedRowAndColumn();
          });
    
          cell.addEventListener("mouseout", () => {
            cell.style.backgroundColor= "";
          });
    }

    multiplicationTable.appendChild(row);
}

document.body.appendChild(multiplicationTable);


// 16 DOM: Highlight cross

let highlightedRow = null;
let highlightedCol = null;

function highlightedRowAndColumn() {
 
    if (highlightedRow !== null && highlightedCol !== null) {
        for (let i = 1; i <= rows; i++) {
            const row = multiplicationTable.rows[i - 1];
            if (i === highlightedRow) {
                row.style.backgroundColor = "green";
            } else {
                row.style.backgroundColor = "";
            }

            for (let j = 1; j <= columns; j++) {
                const cell = row.cells[j - 1];
                if (j === highlightedCol) {
                    cell.style.backgroundColor = "green";
                } else {
                    cell.style.backgroundColor = "";
                }
            }
        }
    }
}





