// 1// Temperature

const fahrenheit = (celsius) =>
    (celsius * 9 / 5) + 32;

// 2// RGB

const rgbToHex = (red, green, blue) =>
    "#" + red.toString(16).padStart(2, '0') + green.toString(16).padStart(2, '0') + blue.toString(16).padStart(2, '0');

// 3// Flats

const findEntranceAndFloor = (apartmentNumber, totalFloors, apartmentsPerFloor) => {
    let entrance = Math.ceil(apartmentNumber / (totalFloors * apartmentsPerFloor));
    let floor = Math.ceil((apartmentNumber - (entrance - 1) * totalFloors * apartmentsPerFloor) / apartmentsPerFloor);
    return { entrance, floor };
}

// 4// Credentials

const capitalize = () => {
    let name = prompt("Введіть ваше ім'я:");
    let surname = prompt("Введіть ваше прізвище:");
    let fatherName = prompt("Введіть ваше по батькові:");
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    surname = surname.charAt(0).toUpperCase() + surname.slice(1).toLowerCase();
    fatherName = fatherName.charAt(0).toUpperCase() + fatherName.slice(1).toLowerCase();
    const fullName = `${surname} ${name} ${fatherName}`;

    return { name, surname, fatherName, fullName };
}

// 5// New line

const newLine = () => {
    let input = prompt("Введіть рядок, використовуючи '\\n' як маркери нового рядка:");
    let lines = input.split('\\n');
    let multiLineText = lines.join('\n');
    return multiLineText;
}

// 6 // Prompt OR

const promptText = prompt("Введіть свій вік:", "");
const defaultValue = "Помилка: Ви не ввели вік або натиснули 'Скасувати'."
const promptWithDefault = (promptText, defaultValue) => {

    if (promptText === null || promptText === "" || isNaN(promptText)) {
        return defaultValue;
    } else {
        const currentYear = 2023;
        const birthYear = currentYear - promptText;
        return `Ви народились у  ${birthYear} році.`;
    }
}


// 7 // Login And Password

let correctLogin = prompt("Введіть логін:");
let correctpassword = prompt("Введіть пароль:");
const LoginAndPassword = (correctLogin, correctpassword)=> {

if (correctLogin === "admin" || correctpassword === "qwerty") {
    
        return("Ласкаво просимо, admin!");
    } else {
        return("Логін або пароль невірний. Спробуйте ще раз.");
    }
} 

// 8 // For Table

const createHTMLTable = (tableData) => {
    let str = "<table style='border-collapse: collapse'>";
  
    for (const [i, rowData] of tableData.entries()) {
      str += "<tr>";
      for (const cellData of rowData) {
        if (i === 0) {
          str += "<th style='border: 1px solid black; background-color: grey'>" + cellData + "</th>";
        } else {
          str += "<td style='border: 1px solid black'>" + cellData + "</td>";
        }
      }
      str += "</tr>";
    }
  
    str += "</table>";
    return str;
  }
  
  const multiplicationTable = [
    [0, 0, 0, 0, 0],
    [0, 1, 2, 3, 4],
    [0, 2, 4, 6, 8],
    [0, 3, 6, 9, 12],
    [0, 4, 8, 12, 16]
  ];
  
  const tableHTML = createHTMLTable(multiplicationTable);
  
  document.write(tableHTML);
  

// 9 // Filter Lexics

const filterWords = (inputString, forbiddenWords) => {
    const words = inputString.split(" ");
    const filteredWords = words.filter(word => !forbiddenWords.includes(word));
    return filteredWords.join(" ");
  };

10 // Currency Table

const currencyTable = () => {
    fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
    .then(data => {
        const rates = data.rates;
        const ratesArr = Object.entries(rates);
        const tableHTML= createHTMLTable(ratesArr);
        document.write(tableHTML);
    })

}

// 11 // Form

const product = {
    name: "Smartphone",
    brand: "Samsung",
    model: 'S23',
    operatingSystem: 'Android 12',
    color: "red",
    price: 599.99,
};

const formObject = (object) =>{
    let formHTML = "<form>";

    for (const key in object) {
       if (object.hasOwnProperty(key)) {
        formHTML += `<label>${key}:</label>`;
        formHTML += `<input type="text" name="${key}" value="${object[key]}">`;
      }
    }
  
    formHTML += "</form>";
    document.write(formHTML);
  
  }
  formObject(product);


// 12 // Array of objects sort

let persons = [
    {name: "Іван", age: 17},
    {name: "Марія", age: 35},
    {name: "Олексій", age: 73},
    {name: "Яків", age: 12},
]

const sortObj = (arr, key, bool) => {
    let sortedObj;
    const age = (a,b) => a.age>b.age ? 1 : -1;
    const nameSortDecrease = (a,b) => a.name<b.name ? 1 : -1;
    const nameSortIncrease = (a,b) => a.name>b.name ? 1 : -1;
    if(key === 'age') {
        sortedObj = arr.sort(age);
    }
    else if(key === 'name' ) {
        if(bool === true || bool === undefined) {
            sortedObj = arr.sort(nameSortIncrease);
        }
        else if(bool === false) {
            sortedObj = arr.sort(nameSortDecrease);
        }
        
    }
    return sortedObj;
}  

sortObj(persons, "age"); //сортує за віком за зростанням
sortObj(persons, "name", false); //сортує на ім'я за спаданням


// 13 // Table

const persons = [
    {
        name: 'Марія',
        fatherName: 'Іванівна',
        surname: 'Іванова',
        sex: 'female'
    },
    {
        name: 'Миколай',
        fatherName: 'Іванович',
        surname: 'Іванов',
        age: 15
    },
    {
        name: 'Петро',
        fatherName: 'Іванович',
        surname: 'Іванов',
        married: true
    },
];


function displaySortedTable(data, sortBy, sortOrder) {
    let sortedData = [...data];
    sortedData = sortedData.map(i => {
        if(i.sex === undefined) {
            i.sex = '';
        }
        if(i.age === undefined) {
            i.age = null;
        }
        if(i.married === undefined) {
            i.married = null;
        }
        return i;
    })

    let sortedRes;
    const sortDecrease = (a,b) => {
        if (a[sortBy] < b[sortBy]) {
            return 1 ;
        }
        if (a[sortBy] > b[sortBy]) {
            return -1 ;
        }
        return 0;
    }
    const sortIncrease = (a,b) => {
        if (a[sortBy] > b[sortBy]) {
            return 1 ;
        }
        if (a[sortBy] < b[sortBy]) {
            return -1 ;
        }
        return 0;
    }
    if(sortOrder === true || sortOrder === undefined) {
        sortedRes = sortedData.sort(sortIncrease);
    }
    else if(sortOrder === false) {
        sortedRes = sortedData.sort(sortDecrease);
    }
    
    const columns = [];
    sortedRes.forEach(person => {
        for (const key in person){
            if (!columns.includes(key)) {
                columns.push(key);
            }
        }
    
    });

    let tableHTML = '<table border="1">';
    tableHTML += '<tr>';
    columns.forEach(column => {
        tableHTML += `<th>${column}</th>`;
    });

    tableHTML += '</tr>';

    sortedRes.forEach(person => {
        tableHTML += '<tr>';
        columns.forEach(column => {
            tableHTML += `<td>${person[column] || ''}</td>`;
        });
        tableHTML += '</tr>';
    });

    tableHTML += '</table>';

    document.write(tableHTML);

}
displaySortedTable(persons, 'sex', true)

14 // Divide (завдання зроблене у HTML)
15 // Calc Func

const calcFunc = (number1, number2)=> {
    let result= (number1 + number2)  / 2;
    return(result);
}
const average = calcFunc(10,2);
console.log(average);

// /16 / Calc Live (завдання зроблене у HTML)