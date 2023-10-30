// 1 // assign: evaluation

// var a = 5; 
// // - Це просто присвоєння початкового значення 5 змінній a .
// var b, c; 
// // - Оголошення двох змінних b і c.

// b = (a * 5); 
// // - Обчислення виразу a * 5 і присвоєння результату змінній b.
// // Тут дужки можна видалити, так як операції в JavaScript відбуваються в порядку пріоритету, і множення вище за присвоєння.

// b = (c = b/2);  
// // Обчислення виразу b/2 і присвоєння результату змінній c, а потім присвоєння значення c змінній b.
// // Тут також дужки можна видалити через порядок пріоритету.
// console.log(b)

var a = 5;  
var b, c;

b = a * 5;  
b = c = b / 2;
console.log(b)

// 2 // Number: age

let age = prompt("Введіть свій вік:");
let currentYear = 2023;
let birthYear = currentYear - age;
alert("Ви народились у " + birthYear + " році.");

// 3// Number: temperature

let celsius = prompt("Введіть температуру в градусах Цельсія:");
let fahrenheit = (celsius * 9/5) + 32;
alert(celsius + " градусів Цельсія дорівнюють " + fahrenheit + " градусам Фаренгейта.");

// 4 // Number: divide
let divisible =prompt("Введіть ділене:");
let divisor = prompt("Введіть дільник:");
let result = Math.floor(divisible / divisor);
alert("Результат поділу " + divisible + " на " + divisor + " націло: " + result);

// 5 // Number: currency

const amountInCurrency = prompt("Введіть суму в одній валюті:");
const rate = 37.5; 
const exchangedAmount = amountInCurrency * rate;
exchangedAmount.toFixed(2);
alert("Обмінена сума в іншій валюті: " + exchangedAmount  + "грн");

// 6// Number: RGB

let red = prompt("Введіть значення для 'red' (0-255):");
let green = prompt("Введіть значення для 'green' (0-255):");
let blue = prompt("Введіть значення для 'blue' (0-255):");
let color = "#" + Number(red).toString(16).padStart(2, "0") + Number(green).toString(16).padStart(2, "0") + Number(blue).toString(16).padStart(2, "0");

alert("Створений CSS-колір: " + color);

// 7// Number: flats

let totalFloors = prompt("Введіть кількість поверхів у будинку:");
let apartmentsPerFloor = prompt("Введіть кількість квартир на поверсі:");
let apartmentNumber = prompt("Введіть номер квартири:");
let entrance = Math.floor((apartmentNumber - 1) / (apartmentsPerFloor * totalFloors)) + 1;
let floor = Math.floor(((apartmentNumber - 1) % (apartmentsPerFloor * totalFloors)) / apartmentsPerFloor) + 1;
alert("Квартира номер " + apartmentNumber + " знаходиться у під'їзді " + entrance + " на " + floor + " поверсі.");



