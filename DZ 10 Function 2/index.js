// 1 Arrow to Functions


// function celsiusToFahrenheit(celsius) {
//   return (celsius * 9 / 5) + 32 + " F";
// }
// let res = celsiusToFahrenheit(36);
// console.log(res);


// function rgbToHex(red, green, blue) {
//     return "#" + red.toString(16).padStart(2, '0') + green.toString(16).padStart(2, '0') + blue.toString(16).padStart(2, '0');
// }
// let res = rgbToHex(255, 255, 255);
// console.log(res);

// function findEntranceAndFloor(apartmentNumber, totalFloors, apartmentsPerFloor){
//     let entrance = Math.ceil(apartmentNumber / (totalFloors * apartmentsPerFloor));
//     let floor = Math.ceil((apartmentNumber - (entrance - 1) * totalFloors * apartmentsPerFloor) / apartmentsPerFloor);
//     return { entrance, floor };
// }
// let res = findEntranceAndFloor(59, 9, 4);
// console.log(res);


// let correctLogin = prompt("Введіть логін:");
// let correctPassword = prompt("Введіть пароль:");
// function LoginAndPasswordCheck(correctLogin, correctPassword) {

// if (correctLogin === "admin" || correctPassword === "qwerty") {

//         return("Ласкаво просимо, admin!");
//     } else {
//         return("Логін або пароль невірний. Спробуйте ще раз.");
//     }
// } 
// alert(LoginAndPasswordCheck(correctLogin, correctPassword));


// function filterWords(inputString, forbiddenWords) {
//     const words = inputString.split(" ");
//     const filteredWords = words.filter(word => !forbiddenWords.includes(word));
//     return filteredWords.join(" ");
//   };

// let res = filterWords("Привет, мир", ['бляха', 'муха', "пляшка", "шабля"]);
// console.log(res);



// function capitalize() {
//     let name = prompt("Введіть ваше ім'я:");
//     let surname = prompt("Введіть ваше прізвище:");
//     let fatherName = prompt("Введіть ваше по батькові:");

//     name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
//     surname = surname.charAt(0).toUpperCase() + surname.slice(1).toLowerCase();
//     fatherName = fatherName.charAt(0).toUpperCase() + fatherName.slice(1).toLowerCase();

//     const fullName = `${surname} ${name} ${fatherName}`;

//     const result = { name, surname, fatherName, fullName };

//     console.log(result);

//     return result;
// }

// capitalize();

// // 2 createPerson

// function createPerson(name, surname){
// return{
//     name,
//     surname,
//     getFullName(){
//         if (this.fatherName) {
//             return `${this.name} ${this.fatherName} ${this.surname}`;
//         } else {
//             return `${this.name} ${this.surname}`;
//         }
//     }
// };
// }
// const a = createPerson("Вася", "Пупкін")
// const b = createPerson("Ганна", "Іванова")
// const c = createPerson("Єлизавета", "Петрова")

// console.log(a.getFullName()) //Вася Пупкін
// a.fatherName = 'Іванович'    
// console.log(a.getFullName()) //Вася Іванович Пупкін
// console.log(b.getFullName()) //Ганна Іванова
// console.log(c.getFullName()) //Єлизавета Петрова


// // 3 createPersonClosure

// function createPersonClosure(name, surname) {
//     let age;
//     let fatherName;

//     function getName() {
//         return name;
//     }

//     function getSurname() {
//         return surname;
//     }

//     function getFatherName() {
//         return fatherName;
//     }

//     function getAge() {
//         return age;
//     }

//     function getFullName() {
//         return `${name} ${surname} ${fatherName}`;
//     }

//     function isValidName(value) {
//         return typeof value === 'string' && value.length > 0;
//     }

//     function isValidAge(value) {
//         return typeof value === 'number' && value >= 0 && value <= 100;
//     }

//     function setName(newName) {
//         if (isValidName(newName)) {
//             name = newName.charAt(0).toUpperCase() + newName.slice(1);
//             name = newName;
//         }
//         return name;
//     }

//     function setSurname(newSurname) {
//         if (isValidName(newSurname)) {
//             surname = newSurname.charAt(0).toUpperCase() + newSurname.slice(1);
//             surname = newSurname;
//         }
//         return surname;
//     }

//     function setFatherName(newFatherName) {
//         if (isValidName(newFatherName)) {
//             fatherName = newFatherName.charAt(0).toUpperCase() + newFatherName.slice(1);
//             fatherName = newFatherName;
//         }
//         return fatherName;
//     }

//     function setAge(newAge) {
//         if (isValidAge(newAge)) {
//             age = newAge;
//         }
//         return age;
//     }

//     function setFullName(fullName) {
//         const parts = fullName.split(' ');
//         if (parts.length === 3) {
//             setName(parts[0]);
//             setSurname(parts[1]);
//             setFatherName(parts[2]);
//         }
//     }
//     return {
//         getName,
//         getSurname,
//         getFatherName,
//         getAge,
//         getFullName,
//         setName,
//         setSurname,
//         setFatherName,
//         setAge,
//         setFullName,
//     };
// }

// const a = createPersonClosure("Вася", "Пупкін");
// const b= createPersonClosure("Ганна", "Іванова");

// console.log(a.getName()); // Вася
// a.setAge(15);
// console.log(a.getAge()); // 15
// a.setAge(150);
// console.log(a.getAge()); // 15 (залишає попереднє значення, оскільки 150 - некоректне)

// b.setFullName("Петрова Ганна Миколаївна");
// console.log(b.getFatherName()); // Миколаївна


// // 4 createPersonClosureDestruct


// function createPersonClosureDestruct({
//     name = "",
//     surname = "",
//     fatherName = "",
//     age = 0
// } = {}) {

//     function getName() {
//         return name;
//     }

//     function getSurname() {
//         return surname;
//     }

//     function getFatherName() {
//         return fatherName;
//     }

//     function getAge() {
//         return age;
//     }

//     function getFullName() {
//         return `${name} ${surname} ${fatherName}`;
//     }

//     function isValidName(value) {
//         return typeof value === 'string' && value.length > 0;
//     }

//     function isValidAge(value) {
//         return typeof value === 'number' && value >= 0 && value <= 100;
//     }

//     function setName(newName) {
//         if (isValidName(newName)) {
//             name = newName.charAt(0).toUpperCase() + newName.slice(1);
//             name = newName;
//         }
//         return name;
//     }

//     function setSurname(newSurname) {
//         if (isValidName(newSurname)) {
//             surname = newSurname.charAt(0).toUpperCase() + newSurname.slice(1);
//             surname = newSurname;
//         }
//         return surname;
//     }

//     function setFatherName(newFatherName) {
//         if (isValidName(newFatherName)) {
//             fatherName = newFatherName.charAt(0).toUpperCase() + newFatherName.slice(1);
//             fatherName = newFatherName;
//         }
//         return fatherName;
//     }

//     function setAge(newAge) {
//         if (isValidAge(newAge)) {
//             age = newAge;
//         }
//         return age;
//     }

//     function setFullName(fullName) {
//         const parts = fullName.split(' ');
//         if (parts.length === 3) {
//             setName(parts[0]);
//             setSurname(parts[1]);
//             setFatherName(parts[2]);
//         }
//     }
//     return {
//         getName,
//         getSurname,
//         getFatherName,
//         getAge,
//         getFullName,
//         setName,
//         setSurname,
//         setFatherName,
//         setAge,
//         setFullName,
//     };
// }

// const a = createPersonClosureDestruct(createPerson("Вася Пупкін"));
// const b = createPersonClosureDestruct({ name: 'Миколай', age: 75 });

// console.log(a.getFullName()); // Вася Пупкін
// console.log(b.getName(), b.setAge()); // Миколай 75


// // 5 isSorted

// function isSorted(...args) {
//     if (args.length <= 1) {
//         return true;
//     }

//     for (let i = 1; i < args.length; i++) {
//         if (typeof args[i] !== 'number' || args[i] <= args[i - 1]) {
//             return false;
//         }
//     }

//     return true;
// }

// console.log(isSorted(1, 2, 3, 4)); // true
// console.log(isSorted(1, 3, 2, 4)); // false

// // 6 Test isSorted

// let myArray = [];

// while (true) {
//   let userInput = prompt("Введіть елемент для додавання до масиву:");
//   if (userInput === null || userInput === "") {
//     break; 
//   }

//   myArray.push(Number(userInput));
// }

// // console.log("Результат:", myArray);

// function isSorted(arr) {
//     if (arr.length <= 1) {
//         return true;
//     }

//     for (let i = 1; i < arr.length; i++) {
//         if (typeof arr[i] !== 'number' || arr[i] <= arr[i - 1]) {
//             return false;
//         }
//     }

//     return true;
// }

//   if (isSorted(myArray)) {
//     console.log("Масив відсортований");
//   } else {
//     console.log("Масив не відсортований");
//   }


// //  7 personForm

// let person;

//     function createPersonClosure(name, surname) {
//          person = {
//             name: name,
//             surname: surname,
//             fatherName: "",
//             age: 0,
    
//             getName() {
//                 return this.name;
//             },
    
//             getSurname() {
//                 return this.surname;
//             },
    
//             getFatherName() {
//                 return this.fatherName;
//             },
    
//             getAge() {
//                 return this.age;
//             },
    
//             getFullName() {
//                 return `${this.name} ${this.surname} ${this.fatherName}`;
//             },
    
//             isValidName(value) {
//                 return typeof value === 'string' && value.trim().length > 0;
//             },
    
//             isValidAge(value) {
//                 return typeof value === 'number' && value >= 0 && value <= 100;
//             },
    
//             setName(newName) {
//                 if (this.isValidName(newName)) {
//                     this.name = newName.charAt(0).toUpperCase() + newName.slice(1);
//                 }
//                 return this.name;
//             },
    
//             setSurname(newSurname) {
//                 if (this.isValidName(newSurname)) {
//                     this.surname = newSurname.charAt(0).toUpperCase() + newSurname.slice(1);
//                 }
//                 return this.surname;
//             },
    
//             setFatherName(newFatherName) {
//                 if (this.isValidName(newFatherName)) {
//                     this.fatherName = newFatherName.charAt(0).toUpperCase() + newFatherName.slice(1);
//                 }
//                 return this.fatherName;
//             },
    
//             setAge(newAge) {
//                 if (this.isValidAge(newAge)) {
//                     this.age = newAge;
//                 }
//                 return this.age;
//             },
    
//             setFullName(fullName) {
//                 const parts = fullName.split(' ');
//                 if (parts.length === 3) {
//                     this.setName(parts[0]);
//                     this.setSurname(parts[1]);
//                     this.setFatherName(parts[2]);
//                 }
//             }
//         };
    
//         return person;
//     }


// function personForm(parent, person) {

//     const nameInput = document.createElement('input');
//     const surnameInput = document.createElement('input');
//     const fatherNameInput = document.createElement('input');
//     const ageInput = document.createElement('input');
//     const fullNameInput = document.createElement('input');

//     parent.appendChild(nameInput);
//     parent.appendChild(surnameInput);
//     parent.appendChild(fatherNameInput);
//     parent.appendChild(ageInput);
//     parent.appendChild(fullNameInput);

//     nameInput.value = person.getName();
//     surnameInput.value = person.getSurname();
//     fatherNameInput.value = person.getFatherName();
//     ageInput.value = person.getAge();
//     fullNameInput.value = person.getFullName();

//     nameInput.oninput = () => {
//         person.setName(nameInput.value);
//         nameInput.value = person.getName();
//     };

//     surnameInput.oninput = () => {
//         person.setSurname(surnameInput.value);
//         surnameInput.value = person.getSurname();
//     };

//     fatherNameInput.oninput = () => {
//         person.setFatherName(fatherNameInput.value);
//         fatherNameInput.value = person.getFatherName();
//     };

//     ageInput.oninput = () => {
//         const age = parseInt(ageInput.value, 10);
//         person.setAge(age);
//         ageInput.value = person.getAge();
//     };

//     fullNameInput.oninput = () => {
//         person.setFullName(fullNameInput.value);
//         fullNameInput.value = person.getFullName();
//     };
// }

// const b = createPersonClosure("Ганна", "Іванова");
// b.setAge(15)
// b.setFullName("Петрова Ганна Миколаївна")
// // console.log(b)

// personForm(document.body, person);


// 8 getSetForm

function getSetForm(parent, getSet) {
    const inputs = {}; 

    const updateInputs = () => {
        for (const field in inputs) {
            const getMethodName = `get${field}`;
            const setMethodName = `set${field}`;
            const input = inputs[field];

            if (getSet.hasOwnProperty(getMethodName) && getSet.hasOwnProperty(setMethodName)) {
               
                input.value = getSet[getMethodName]();

          
                input.oninput = () => {
                    const newValue = input.value;
                    getSet[setMethodName](newValue);
                    input.value = getSet[getMethodName]();
                    updateInputs(); 
                };
            } else {
              
                input.disabled = true;
            }
        }
    };

    for (const getSetName in getSet) {
        if (typeof getSet[getSetName] === 'function') {
            const isGet = getSetName.startsWith('get');
            const fieldName = getSetName.slice(3);

            if (isGet) {
                const input = document.createElement('input');
                input.placeholder = fieldName;
                parent.appendChild(input);

                inputs[fieldName] = input;
            }
        }
    }

    updateInputs();
}


let car;
{
    let brand = 'BMW', model = 'X5', volume = 2.4;
    car = {
        getBrand() {
            return brand;
        },
        setBrand(newBrand) {
            if (newBrand && typeof newBrand === 'string') {
                brand = newBrand;
            }
            return brand;
        },
        getModel() {
            return model;
        },
        setModel(newModel) {
            if (newModel && typeof newModel === 'string') {
                model = newModel;
            }
            return model;
        },
        getVolume() {
            return volume;
        },
        setVolume(newVolume) {
            newVolume = +newVolume;
            if (newVolume && newVolume > 0 && newVolume < 20) {
                volume = newVolume;
            }
            return volume;
        },
        getTax() {
            return volume * 100;
        }
    };
}

getSetForm(document.body, car);

