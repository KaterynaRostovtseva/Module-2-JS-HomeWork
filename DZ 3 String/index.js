// 1// String: greeting

let name = prompt("Введіть ваше ім'я:");
alert("Привіт, " + name + "!");

// 2// String: gopni4ek

let inputString = prompt("Введіть рядок:");
let words = inputString.split(',');
let resultString = words.join(', блін.');
alert(resultString);

// 3// String: capitalize

let strCap = "cANBerRa"
let resultStr = strCap.charAt(0).toUpperCase() + strCap.slice(1).toLowerCase();

console.log(resultStr) //Canberra

// 4// String: word count

let str = "Порахуйте кількість слів у цьому рядку.";
let wordsArray = str.split(' ');
let wordCount = wordsArray.length;

console.log("Кількість слів у рядку: " + wordCount);

// 5// String: credentials

let firstName = prompt("Введіть ваше ім'я:");
let lastName = prompt("Введіть ваше прізвище:");
let middleName = prompt("Введіть ваше по батькові:");
firstName = firstName.trim().charAt(0).toUpperCase() + firstName.trim().slice(1).toLowerCase();
lastName = lastName.trim().charAt(0).toUpperCase() + lastName.trim().slice(1).toLowerCase();
middleName = middleName.trim().charAt(0).toUpperCase() + middleName.trim().slice(1).toLowerCase();

console.log("ПІБ: " + firstName + " " + lastName + " " + middleName);

// 6// String: beer

let str2 = "Було жарко. Василь пив пиво вприкуску з креветками";
let result1 = str2.split('пиво').join('чай');

console.log(result1); // "Було жарко. Василь пив чай вприкуску з креветками"

// 7// String: no tag

let str1 = "якийсь текст, в якому є один тег <br /> і всяке інше";
let startIndex = str1.indexOf("<");
let endIndex = str1.indexOf(">");
let result = str1.slice(0, startIndex) + str1.slice(endIndex + 1);

console.log(result); // "якийсь текст, в якому є один тег  і всяке інше"

// 8// String: big tag

let string = "якийсь текст, в якому є один тег <br /> і всяке інше";
let startIndex1 = string.indexOf("<");
let endIndex1 = string.indexOf(">");
let tag = string.slice(startIndex1, endIndex1 + 1);
let upperCaseTag = tag.toUpperCase();
let res = string.slice(0, startIndex1) + upperCaseTag + string.slice(endIndex1 + 1);

console.log(res); // "якийсь текст, в якому є один тег <BR /> і всяке інше"

// 9// String: new line

let input = prompt("Введіть рядок, використовуючи '\\n' як маркери нового рядка:");
let lines = input.split('\\n'); // Розділити рядок за допомогою '\\n'
let multiLineText = lines.join('\n'); // Об'єднати рядки з новими рядками

console.log(multiLineText);

// 10// String: youtube

// Оголосити константу з регулярним виразом для пошуку ідентифікатора відео на YouTube
const youtubeRegExp = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;

// Попросити користувача ввести текст із посиланням на YouTube
let userText = prompt("Введіть текст із посиланням на YouTube:");

// Використовувати регулярний вираз, щоб знайти ідентифікатор відео
let match = userText.match(youtubeRegExp);

  // Отримати ідентифікатор відео з масиву
let videoId = match[1];

  // Створити рядок з HTML кодом вбудовування відео на YouTube
let embeddedVideoHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;

  // Відправити HTML код вбудовування відео на сторінку
document.write(embeddedVideoHTML);

