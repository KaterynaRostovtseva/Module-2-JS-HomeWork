// 1 blocks

let a = 10
{
    let b = 20

    {
        let c = 30

        b++
        a *= 10
        //a=100, b=21, c=30
    }
    {
        let c = 50
        b += 500
        //a=100, b=521, c=50
    }
    {
        const a = 100500
        const d = "value"
        // a=100500, b=521, d="value" 

        {
            let a = -50
            b = 1000
            // a = -50, b = 1000, d="value"
        }
        // a= 100500, b= 1000 d='value'
    }
    // a=100, b= 1000
}

// a= 100

// 2 comparison if

var age = +prompt("Сколько вам лет?", "");

if (age < 0) {
    alert("Отрицательный возраст?");
}
else if (age < 18) {
    alert("школьник");
}
else if (age > 18 && age < 30) {
    alert("молодеж");
}
else if (age > 30 && age < 45) {
    alert("зрелость");
}
else if (age > 45 && age < 60) {
    alert("закат");
}
else if (age > 60) {
    alert("как пенсия?");
}


// 3 switch: sizes

let europeanSize = "L"
let usSize;

switch (europeanSize) {
    case "S":
        usSize = "XS";
        break;
    case "M":
        usSize = "S";
        break;
    case "L":
        usSize = "M";
        break;
    case "XL":
        usSize = "L";
        break;
    case "XXL":
        usSize = "XL";
        break;
    default:
        usSize = "Неизвестный размер";
        break;
}

console.log("Размер в американской системе: " + usSize);


// 4 switch: if

const color = prompt("Введите цвет", "");
if (color === "red") {
    document.write("<div style='background-color: red;'>красный</div>");
    document.write("<div style='background-color: black;'>черний</div>");
}
else if (color === "black") {
    document.write("<div style='background-color: black;'>черний</div>");
}
else if (color === "blue") {
    document.write("<div style='background-color: blue;'>синий</div>");
    document.write("<div style='background-color: green;'>зеленый</div>");
}
else if (color === "green") {
    document.write("<div style='background-color: green;'>зеленый</div>");
}
else {
    document.write("<div style='background-color: gray;'>Я не понял</div>");
}

// 5 noswitch

const noSwitch = (key, cases, defaultKey = 'default') => {

    if (key in cases)
        cases[drink]()
    else
        cases.default()
}

const drink = prompt("Что вы любите пить")
noSwitch(drink, {
    воду: () => console.log('Самый здоровый выбор!'),
    чай() {
        console.log('Вкусная и полезная штука. Не переусердствуйте с сахаром')
    },
    "пиво": () => console.log('Хорошо летом, да в меру'),
    виски: function () {
        console.log('Да вы, батенька, эстет! Не забудьте лед и сигару')
    },
    default() {
        console.log('шото я не понял')
    }
})

// 6 closure calc

fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json()).then(res => res.json())
    .then(data => {
        const rates = data.rates;
        const container = document.body;

        for (let currency in rates) {
            const button = document.createElement('button')
            button.innerText = currency
            button.onclick = () => {
                const amount = prompt('Введите сумму в ' + currency + ':');
                if (amount !== null) {
                    const convertedAmount = parseFloat(amount) / rates[currency];
                    alert(`Сумма в USD: ${convertedAmount.toFixed(2)}`);
                }
            }
            container.appendChild(button);
        }
    })

// 7 closure calc 2

const fromSelect = document.getElementById('from');
const toSelect = document.getElementById('to');
const rateDiv = document.getElementById('rate');
const resultDiv = document.getElementById('result');
const amountInput = document.getElementById('amount');

fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
    .then(data => {
        const rates = data.rates;

        for (let currency in rates) {
            const fromOption = document.createElement('option');
            fromOption.innerText = currency;
            fromSelect.appendChild(fromOption);

            const toOption = document.createElement('option');
            toOption.innerText = currency;
            toSelect.appendChild(toOption);
        }

        fromSelect.onchange = update;
        toSelect.onchange = update;
        amountInput.oninput = update;

        function update() {
            const fromCurrency = fromSelect.value;
            const toCurrency = toSelect.value;
            const exchangeRate = rates[toCurrency] / rates[fromCurrency];
            rateDiv.innerText = `Курс: 1 ${fromCurrency} = ${exchangeRate.toFixed(4)} ${toCurrency}`;

            const inputAmount = parseFloat(amountInput.value) || 0;
            const resultAmount = inputAmount * exchangeRate;
            resultDiv.innerText = `Результат: ${resultAmount.toFixed(2)} ${toCurrency}`;
        }

        update();
    })

// 8 countries and cities

const countriesSelect = document.getElementById('countries');
const citiesSelect = document.getElementById('cities');


fetch('https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/master/countries.min.json').then(res => res.json())
    .then(data => {

        for (const country in data) {
            const option = document.createElement('option');
            option.value = country;
            option.innerText = country;
            countriesSelect.appendChild(option);
        }


        countriesSelect.onchange = () => {
            const selectedCountry = countriesSelect.value;
            const cities = data[selectedCountry] || [];


            citiesSelect.innerHTML = '';


            for (const city of cities) {
                const option = document.createElement('option');
                option.value = city;
                option.innerText = city;
                citiesSelect.appendChild(option);
            }
        };
    })