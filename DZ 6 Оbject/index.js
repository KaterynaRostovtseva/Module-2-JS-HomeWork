// 1// Literals

const car = {
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    color: 'silver',
};

const smartphone = {
    brand: 'Apple',
    model: 'iPhone 13',
    operatingSystem: 'iOS',
}

console.log(smartphone);

// 2// Literals expand

const car = {
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    color: 'silver',
    additionalProperty1: prompt('Введіть назву першої додаткової властивості:'),
    additionalValue1: prompt('Введіть значення для першої додаткової властивості:')
};

console.log(car);

const smartphone = {
    brand: 'Apple',
    model: 'iPhone 13',
    operatingSystem: 'iOS',
    additionalProperty2: prompt('Введіть назву другої додаткової властивості:'),
    additionalValue2: prompt('Введіть значення для другої додаткової властивості:')
}

console.log(smartphone);

// 3// Literals copy

const newProperty = prompt('Введіть назву нової властивості:');
const newValue = prompt('Введіть значення для нової властивості:');

const newObject = {
  ...car,[newProperty]: newValue,
};
console.log(newObject);

const newObj = Object.assign({}, smartphone);
newObj[newProperty] = newValue;

console.log(newObj);

// 4// Html tree

let tree = {
    "tagName": "body",
    "children": [
        {
            "tagName": "div",
            "children": [
                {
                    "tagName": "span",
                    "children": ["Enter a data please:"]
                },
                {
                    "tagName": "br"
                },
                {
                    "tagName": "input",
                    "attrs": {
                        "type": "text",
                        "id": "name"
                    }
                },
                {
                    "tagName": "input",
                    "attrs": {
                        "type": "text",
                        "id": "surname"
                    }
                }
            ]
        },
        {
            "tagName": "div",
            "children": [
                {
                    "tagName": "button",
                    "attrs": {
                        "id": "ok"
                    },
                    "children": ["OK"]
                },
                {
                    "tagName": "button",
                    "attrs": {
                        "id": "cancel"
                    },
                    "children": ["Cancel"]
                }
            ]
        }
    ]
}

const secondButton = tree.children[1].children[1].children[0];
console.log(secondButton);
const buttonText = tree['children'][1]['children'][1]['children'][0];
console.log(buttonText); 

const secondInputId = tree.children[0].children[3].attrs.id;
const secondInputId1 = tree['children'][0]['children'][3]['attrs']['id'];
console.log(secondInputId1);

// 5// Parent

tree.children.forEach(child => {
    child.parent = tree;
    if (child.children) {
      child.children.forEach(grandchild => {
        grandchild.parent = child;
      });
    }
  });

  console.log(tree);

// 6// Change OK

const newIdValue = prompt('Введіть нове значення для атрибута "id" тега "button":');

for (const div of tree.children) {
  if (div.tagName === 'div' && div.children) {
    for (const button of div.children) {
      if (button.tagName === 'button' && button.attrs && button.attrs.id === 'ok') {
        button.attrs.id = newIdValue;
        break; 
      }
    }
  }
}

console.log(tree); 

// 7// Destructure

const { children } = tree;
const [firstDiv, secondDiv] = children;
const [spanDiv] = firstDiv.children;
const [spanText] = spanDiv.children;

console.log(spanText); 

const { children } = tree;
const [, secondDiv] = children;
const { children: secondDivChildren } = secondDiv;
const [, secondButton] = secondDivChildren;
const { children: secondButtonChildren } = secondButton;
const [secondButtonText] = secondButtonChildren;
const { attrs: { id: secondButtonId } } = secondButton;

console.log(secondButtonText);

const { children } = tree;
const [firstDiv] = children;
const { children: firstDivChildren } = firstDiv;
const [, , , secondInput] = firstDivChildren;
const { attrs: { id: secondInputId2 } } = secondInput;

console.log(secondInputId2); 

// 8// Destruct array

let arr = [1, 2, 3, 4, 5, "a", "b", "c"];

const [even1, even2, odd1, odd2, odd3, ...letters] = arr;

console.log(even1, even2);
console.log(odd1, odd2, odd3);
console.log(letters);

// 9// Destruct string

let arr1 = [1, "abc"];
const [number] = arr1;
const [ , str] = arr1;
const strArr = str.split('');
const [s1, s2, s3] = strArr;
console.log(number);
console.log(s1);
console.log(s2);
console.log(s3);

// 10// Destruct 2

let obj = {
    name: 'Ivan',
    surname: 'Petrov',
    children: [
        {
            name: 'Maria'
        },
        {
            name: 'Nikolay'
        }
    ]
}

let {children: [obj1, obj2]} = obj;
let {name: name1} = obj1;
let {name: name2} = obj2;
console.log(name1, name2);

// 11// Destruct 3

let array = [1,2,3,4, 5,6,7,10];
const [a, b, ...rest] = array;
const { length } = array;

console.log(a);
console.log(b);
console.log("length:", length);

// 12// Copy delete

const smartphone = {
    brand: 'Apple',
    model: 'iPhone 13',
    operatingSystem: 'iOS',
};

const keyToRemove = prompt("Введіть ключ, який потрібно видалити:");

const { [keyToRemove]: removedKey, ...rest } = smartphone;

console.log(rest);

// 13// Currency real rate

const inputCurrency = prompt('Введіть валюту, яку ви конвертуєте:').toUpperCase();
const outputCurrency = prompt('Введіть валюту, в яку ви конвертуєте:').toUpperCase();
const amount =prompt('Введіть суму вхідної валюти:');

fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
.then(data => {

    if (typeof data.rates[inputCurrency] === "undefined" || typeof data.rates[outputCurrency] === "undefined") {
        alert("Ви ввели неправильний код валюти. Необхідно ввести код валюти у міжнародному форматі. Наприклад: USD");
    }else{
        if(inputCurrency === 'USD') {
            let exchangeRate = data.rates[`${outputCurrency}`];
            let res = (amount * exchangeRate);
            res = +res.toFixed(2);
            alert(res);
        } else {
            let currency = data.rates[`${inputCurrency}`];
            let exchangeRate = data.rates[`${outputCurrency}`];
            let currencyUSD = amount / currency;
            let res = currencyUSD * exchangeRate.toFixed(2);
            res = +res.toFixed(2);
            alert(res);
        }
    }

})
  

// 14// Currency drop down

fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
    .then(data => {
        const rates = data.rates;
        let select = "<select>";
        for(let rate in rates) {
            select += `<option value="${rate}">${rate}</option>`;
        }
        select += "</select>";
        document.write(select);
    })

//  15 // Currency table

fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
    .then(data => {
        const rates = data.rates;
        const ratesArr = Object.entries(rates);
        let   str = "<table style=' border-collapse: collapse'>";
       
        ratesArr.forEach((j, index) => {
            if(index === 0){
                str += "<tr>";
                str += "<th style='border: 1px solid black; background-color: grey'>"+"</th>"
                ratesArr.forEach((h) => {
                    str += "<th style='border: 1px solid black; background-color: grey'>"+h[0]+"</th>";
                })
                str += "</tr>";
            } 
                str += "<tr>";
                str += "<th style='border: 1px solid black; background-color: grey'>" + j[0] + "</th>";
                ratesArr.forEach((i, index) => {
                    let res;
                    if(i[0] === 'USD'){
                        res = j[1];
                    } else{
                        res = (1 / i[1])*(j[1]/1);
                        res = +res.toFixed(3);
                    }
                    str += "<td style='border: 1px solid black'>"+res+"</td>";
                })
                str += "</tr>";
        });
       
        str+= "</table>";
        document.write(str);
    })

// 16// Form

const product = {
    name: "Smartphone",
    brand: "Samsung",
    model: 'S23',
    operatingSystem: 'Android 12',
    color: "red",
    price: 599.99,
};
console.log(typeof product.name);
console.log(typeof product.brand);
console.log(typeof product. model);
console.log(typeof product.operatingSystem);
console.log(typeof product. color);
console.log(typeof product. price);
