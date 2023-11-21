// // 1 makeProfileTimer

function makeProfileTimer() {
    const start = performance.now();

    return function () {
        const end = performance.now();
        return end - start;
    };
}

const timer = makeProfileTimer();
alert('Вимірюємо час роботи цього alert');
alert(`Час виконання: ${timer()} мс`);

const timer2 = makeProfileTimer();
prompt('');
alert(`Час роботи двох alert та одного prompt: ${timer()} мс`);
alert(`Час роботи prompt та попереднього alert: ${timer2()} мс`);


// // 2 makeSaver

function makeSaver(func) {
    let result;
    let isCalculated = false;

    return function () {
        if (!isCalculated) {
            result = func();
            isCalculated = true;
        }
        return result;
    };
}

let saver = makeSaver(Math.random);
let value1 = saver();
let value2 = saver();
alert(`Random: ${value1} === ${value2}`); 


let saver2 = makeSaver(() => {
    // console.log('виклик збереженої функції');
    return [null, undefined, false, '', 0, Math.random()][Math.floor(Math.random() * 6)];
});
let value3 = saver2();
let value4 = saver2();
alert(`Values: ${value3 === value4}`); 


let namePrompt = prompt.bind(window, 'Як тебе звуть?');
let nameSaver = makeSaver(namePrompt);
alert(`Привіт! Prompt ще не було!`);
alert(`Привіт ${nameSaver()}. Щойно запустився prompt, перший та останній раз`);
alert(`Слухай, ${nameSaver()}, го пити пиво. Адже prompt був лише один раз`);

// // 3 myBind

function myBind(defaultValueFunction, thisContext, paramsArray) {
    return function (...args) {
        const processedArgs = [];
        let defaultValueIndex= 0;
        for(let i = 0; i < paramsArray.length || defaultValueIndex < args.length; i++){
            if(paramsArray[i] === undefined){
                processedArgs.push(args[defaultValueIndex]);
                defaultValueIndex++;
            }else{
                processedArgs.push(paramsArray[i]);
            }
        }
        return defaultValueFunction.apply(thisContext, processedArgs);
    };
}

let pow5 = myBind(Math.pow, Math, [, 5]);
console.log(pow5(2)); // => 32, Math.pow(2, 5)
console.log(pow5(4)); // => 1024, Math.pow(4, 5)

let cube = myBind(Math.pow, Math, [, 3]);
console.log(cube(3)); // => 27, Math.pow(3, 3)


let chessMin = myBind(Math.min, Math, [, 4, , 5, , 8, , 9]);
console.log(chessMin(-1, -5, 3, 15)); // => -5, Math.min(-1, 4, -5, 5, 3, 8, 15, 9)


let zeroPrompt = myBind(prompt, window, [undefined, "0"]);
let someNumber = zeroPrompt("Введіть число");
console.log(someNumber); // Введіть число: (покаже prompt і отримає введене значення)


const bindedJoiner = myBind((...params) => params.join(''), null, [, 'b', , , 'e', 'f']);
console.log(bindedJoiner('a', 'c', 'd')); // === 'abcdef'
console.log(bindedJoiner('1', '2', '3')); // === '1b23ef'

// 4 checkResult

function checkResult(original, validator) {
    function wrapper(...params) {
        let result;
        do {
            result = original(...params);
        } while (!validator(result));
        return result;
    }

    return wrapper;
}

const numberPrompt = checkResult(prompt, x => !isNaN(+x));
let number = +numberPrompt("Введите число", "0");


const gamePrompt = checkResult(prompt, x => ['камень', 'ножницы', 'бумага'].includes(x.toLowerCase()));
const turn = gamePrompt("Введите одно из следующих слов: 'камень', 'ножницы', 'бумага'");


// Функція, яка повертає випадкове число від 0.5 до 1
const RandomHigh = checkResult(() => Math.random(), x => x >= 0.5 && x <= 1);
let num = +RandomHigh();
console.log(`Результат: ${num}`);

// Функція, яка викликає confirm доти, доки користувач не натисне OK
const AlwaysSayYes = checkResult(() => confirm("Погоджуєтеся?"), x => x === true);
AlwaysSayYes();
alert("Користувач сказав так!");

// Функція, яка викликає prompt доти, доки користувач не введе щось в поле
const respectMe = checkResult(() => prompt("Введіть щось"), x => x !== null && x.trim() !== '');
let userInput = respectMe();
alert(`Користувач ввів: ${userInput}`);
