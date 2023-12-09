// Рекурсія: HTML tree

function htmlTree(node) {
    let result = `<${node.tagName}`;
 
    if (node.attrs) {
        for (let [key, value] of Object.entries(node.attrs)) {
            result += ` ${key}='${value}'`;
        }
    }

    result += '>';

    if (node.children) {
        for (let child of node.children) {
            if (typeof child === 'string') {
                result += child; 
            } else {
                result += htmlTree(child); 
            }
        }
    }

    result += `</${node.tagName}>`;

    return result;
}

const table = {
    tagName: 'table',
    attrs: {
        border: "1",
    },
    children: [
        {
            tagName: 'tr',
            children: [
                {
                    tagName: "td",
                    children: ["1x1"],
                },
                {
                    tagName: "td",
                    children: ["1x2"],
                },
            ]
        },
        {
            tagName: 'tr',
            children: [
                {
                    tagName: "td",
                    children: ["2x1"],
                },
                {
                    tagName: "td",
                    children: ["2x2"],
                },
            ]
        }
    ]
};

const tableHTML = htmlTree(table);
document.write(tableHTML);

// Рекурсія: DOM tree

function domTree(parent, node) {

    const element = document.createElement(node.tagName);

    // Додавання атрибутів до елементу
    if (node.attrs) {
        Object.entries(node.attrs).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
    }

    // Додавання текстового вмісту (якщо він є)
    if (node.children && node.children.length === 1 && typeof node.children[0] === 'string') {
        element.textContent = node.children[0];
    } else if (node.children) {
        // Рекурсивно обробляємо дітей
        node.children.forEach(childNode => {
            domTree(element, childNode);
        });
    }

    parent.appendChild(element);
}

const table = {
    tagName: 'table',
    attrs: {
        border: "1",
    },
    children: [
        {
            tagName: 'tr',
            children: [
                {
                    tagName: "td",
                    children: ["1x1"],
                },
                {
                    tagName: "td",
                    children: ["1x2"],
                },
            ]
        },
        {
            tagName: 'tr',
            children: [
                {
                    tagName: "td",
                    children: ["2x1"],
                },
                {
                    tagName: "td",
                    children: ["2x2"],
                },
            ]
        }
    ]
};

domTree(document.body, table);


// Рекурсія: Deep Copy

function deepCopy(obj) {

    function copyArr(arr) {
        let res = [];
        for (let i in arr) {
            if (typeof arr[i] === 'object') {
                res.push(deepCopy(arr[i]));
            } else {
                res.push(arr[i]);
            }
        }
        return res;
    }

    function copyObj(obj) {
        let res = {};
        for (let key in obj) {
            if (typeof obj[key] === 'object') {
                if (obj[key] === null) {
                    res[key] = null;
                } else if (Array.isArray(obj[key])) {
                    res[key] = copyArr(obj[key]);
                } else {
                    res[key] = copyObj(obj[key]);
                }
            } else {
                res[key] = obj[key];
            }
        }
        return res;
    }

    if (Array.isArray(obj)) {
        return copyArr(obj);
    } else if (typeof obj === 'object' && obj !== null) {
        return copyObj(obj);
    } else {
        return obj;
    }
}

const arr = [1, "string", null, undefined, { a: 15, b: 10, c: [1, 2, 3, 4], d: undefined, e: true }, true, false]
const arr2 = deepCopy(arr) //arr2 та всі його вкладені масиви та об'єкти - інші об'єкти, які можна змінювати без ризику поміняти щось у arr
console.log(arr2);
const table2 = deepCopy(table) // Аналогічно
console.log( table2)


// Рекурсия: My Stringify

function stringify(obj) {
    function replacer(key, value) {
        if (typeof value === 'undefined') {
            return null;
        } else if (typeof value === 'function') {
            return undefined;
        }
        return value;
    }

    function processValue(value) {
        // Если значение - массив, обрабатываем каждый элемент
        if (Array.isArray(value)) {
            return '[' + value.map(processValue).join(',') + ']';
        } else if (typeof value === 'object' && value !== null) {
              // Если значение - объект, обрабатываем каждую пару ключ-значение
            const keyValuePairs = Object.keys(value)
                .map(key => `"${key}":${processValue(value[key])}`);
            return `{${keyValuePairs.join(',')}}`;
        } else {
              // Если значение не массив и не объект, используем JSON.stringify с replacer'ом
            return JSON.stringify(value, replacer);
        }
    }

    return processValue(obj);
}

const jsonString = stringify(arr); 
console.log(JSON.parse(jsonString));
const jsonString2 = stringify(table); 
console.log(JSON.parse(jsonString2));


// Рекурсія: getElementById throw

function getElementById(idToFind) {
    let foundElement = null;

    function walker(parent) {
        for (let i = 0; i < parent.children.length; i++) {
            const child = parent.children[i];

            if (child.id === idToFind) {
                foundElement = child;
                throw foundElement;
            }

            if (child.children.length > 0) {
                walker(child); 
            }
        }
    }

    try {
        walker(document.body); // Починаємо з пошуку з кореневого елемента body
    } catch (element) {
        return element; // Повертаємо знайдений елемент, який викинуто винятком
    }

    return foundElement; // Якщо елемент не знайдено, повертаємо null
}


try {
    const resultElement = getElementById("yourElementId");
    console.log("Елемент знайдено:", resultElement);
} catch (error) {
    console.log("Елемент не знайдено");
}
