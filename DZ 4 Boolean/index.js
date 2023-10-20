// 1// Number: odd

let userInput = prompt("Введіть число:");
if (!isNaN(userInput)) {
    let number = Number(userInput);
    if (number % 2 === 0) {
        alert("Це парне число.");
    } else {
        alert("Це непарне число.");
    }
} else {
    alert("Введене значення не є числом.");
}

// 2// String: lexics

let userText = prompt("Введіть текст:");
if (userText.indexOf("некоректне1") !== -1 ||
    userText.indexOf("некоректне2") !== -1 ||
    userText.indexOf("некоректне3") !== -1) {
    alert("Текст містить некоректне слово.");
} else {
    alert("Текст коректний.");
}

// // 3// Boolean

let answer1 = confirm("Чи подобається вам цей продукт?");
let answer2 = confirm("Чи бажаєте ви підписатися на нашу розсилку?");
if (answer1) {
    alert("Ви відповіли 'так' на перше питання.");
} else {
    alert("Ви відповіли 'ні' на перше питання.");
}

if (answer2) {
    alert("Ви відповіли 'так' на друге питання.");
} else {
    alert("Ви відповіли 'ні' на друге питання.");
}

// // 4// Boolean: if

let genderResponse = confirm("Ви жінка? (OK - так, Cancel - ні)");
let subscribeResponse = confirm("Бажаєте підписатися на нашу розсилку? (OK - так, Cancel - ні)");
if (genderResponse) {
    alert("Ви жінка.");
} else {
    alert("Ви чоловік.");
}

if (subscribeResponse) {
    alert("Ви підписалися на нашу розсилку.");
} else {
    alert("Ви відмовилися від підписки на розсилку.");
}

// 5// Comparison: sizes

let europeanSize = prompt("Введіть розмір в європейській системі (наприклад,  40, 42, 44 і т.д.):");
let usSize;

if (europeanSize >= 39 && europeanSize <= 40) {
    usSize = "6";
} else if (europeanSize >= 40 && europeanSize <= 42) {
    usSize = "8";
} else if (europeanSize >= 42 && europeanSize <= 44) {
    usSize = "10";
} else {
    usSize = "Не вдалося визначити відповідний розмір в американській системі.";
}

alert("Ваш розмір в американській системі: " + usSize);

// 6// Ternary

let isMale = confirm("Ви чоловік? (OK - так, Cancel - ні)");
let genderMessage = isMale ? "Ви чоловік" : "Ви жінка";
alert(genderMessage);

// 7// Training

// bool type cast
!!2(true)
!!0(false)
!!1(true)
// or
2 || 1(2)
2 || 0(2)
//and
2 && 1(1)
1 && 2(2)
0 && 2(0)
// or and and difference
0 || 1 || 2(1)
0 && 1 && 2(0)
2 || 1 || 0(2)
2 && 1 && 0(0)
confirm('left') || confirm('right')(left - true)
confirm('left') && confirm('right')(true)
//null, undefined, so on
null || 2(2)
undefined && 1(undefined)
alert("Hello") && confirm('Are you sexy?'); (undefined)
alert("Hello") || confirm('Are you drunk?'); (true)
    //brackets and complex expressions
    (undefined || 2) && (3 || 0)(3)
        (2 && 1) || (null && 0)(1)
            (2 > 1) && "greater"(greater)
            (2 < 1) && null(false)
null && (2 < 1)(null)
// ternary operator
1 ? "one" : "not one"('one')
0 ? "zero" : "not zero"('not zero')
"0" ? "\"zero\"" : "not `zero`"('"zero"')
parseInt("0") ? 'true' : 'false'('false')
    ("" || 2) && (3 || "3.5") || (4 && 5)(3)
        (-1 + 1) && "zero"(0)
"-1" + 1 && "oups"('oups')
    (typeof null === 'object') ? "null is object" : "null is null"('null is object')
// ternary && ||
Math.random() < 0.5 && 'less' || 'more'('more')
    (a = Math.random()) < 0.5 && 'less: ' + a || 'more: ' + a('less: 0.37995712496487233')
    //in for array
    [2, 3, 5, 7, 11].indexOf(7) > -1 ? 'prime' : 'not found'('prime')

// 8// Prompt: or

let age = prompt("Введіть свій вік:");
let currentYear = 2023;
if (age === null || age === "" || isNaN(age)) {
    alert("Помилка: Ви не ввели вік або натиснули 'Скасувати'.");
} else {
    let birthYear = currentYear - age;
    alert("Ви народились у " + birthYear + " році.");
}

// 9// Confirm: or this days

let isShopping = confirm("Ви хочете піти на шопінг?");
isShopping || alert("Ти - бяка.");

// 10// Confirm: if this days

let shoppingResponse = confirm("Шопінг? (OK - так, Cancel - ні)");
if (!shoppingResponse) {
    alert("Ти - бяка.");
}

// 11// Default: or

let lastName = prompt("Введіть ваше прізвище:") || "Іванов";
let firstName = prompt("Введіть ваше ім'я:") || "Іван";
let middleName = prompt("Введіть ваше по батькові:") || "Іванович";
alert("Ваше ПІБ: " + lastName + " " + firstName + " " + middleName);

// 12// Default: if

let lastName1 = prompt("Введіть ваше прізвище:");
if (!lastName1) {
    lastName1 = "Іванов";
}

let firstName1 = prompt("Введіть ваше ім'я:");
if (!firstName1) {
    firstName1 = "Іван";
}

let middleName1 = prompt("Введіть ваше по батькові:");
if (!middleName1) {
    middleName1 = "Іванович";
}

alert("Ваше ПІБ: " + lastName1 + " " + firstName1 + " " + middleName1);

// 13// Login and password

let login = prompt("Введіть логін:");
if (login === "admin") {
    let password = prompt("Введіть пароль:");
    if (password === "qwerty") {
        alert("Ласкаво просимо, admin!");
    } else {
        alert("Пароль невірний. Спробуйте ще раз.");
    }
} else {
    alert("Логін невірний. Спробуйте ще раз.");
}


// 14// Currency exchange

const currency = prompt("Введіть валюту (наприклад, USD або EUR):").toUpperCase();
const isBuying = confirm("Ви бажаєте купити валюту?");
let rate;

if (currency === "USD") {
    rate = isBuying ? 27.5 : 27.0;
} else if (currency === "EUR") {
    rate = isBuying ? 32.0 : 31.5;
} else {
    alert("Ви ввели непідтримувану валюту.");
}

if (rate) {
    let amount = parseFloat(prompt("Введіть суму на обмін:"));
    if (!isNaN(amount)) {
        let result = isBuying ? amount / rate : amount * rate;
        alert("Результат обміну: " + result.toFixed(2) + " " + currency);
    } else {
        alert("Ви ввели некоректну суму.");
    }
}

// 15// Scissors

const userChoice = prompt("Виберіть: 0 - камінь, 1 - ножиці, 2 - папір");
const computerChoice = Math.floor(Math.random() * 3);

if (userChoice === computerChoice) {
    alert("Нічия!");
} else if (
    (userChoice === 0 && computerChoice === 1) ||
    (userChoice === 1 && computerChoice === 2) ||
    (userChoice === 2 && computerChoice === 0)
) {
    alert("Ви переможець!");
} else {
    alert("Комп'ютер переміг.");
}


