// fetch basic

function displayingJsonTable(DOMElement, JsonData) {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    for (const key in JsonData) {
        let row = document.createElement('tr');
        const cellKey = document.createElement('td');
        const cellValue = document.createElement('td');

        cellKey.textContent = key;
        cellValue.textContent = JsonData[key];

        row.appendChild(cellKey);
        row.appendChild(cellValue);
        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    DOMElement.appendChild(table);
}

fetch('https://swapi.dev/api/people/1/')
    .then(res => res.json())
    .then(luke => {
        console.log(luke);
        const container = document.getElementById('tableContainer');
        displayingJsonTable(container,luke);
    });

// fetch improved

function displayingJsonTable(DOMElement, JsonData) {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    for (const key in JsonData) {
        let row = document.createElement('tr');
        const cellKey = document.createElement('td');
        const cellValue = document.createElement('td');

        cellKey.textContent = key;

        if (typeof JsonData[key] === 'string' && JsonData[key].includes('https://swapi.dev/api/')) {
            const button = document.createElement('button');
            button.textContent = 'fetch Data';
            button.addEventListener('click', () => {
                fetch(JsonData[key])
                    .then(res => res.json())
                    .then(data => {
                        displayingJsonTable(cellValue, data);
                    });
            });

            cellValue.appendChild(button);

        } else if (Array.isArray(JsonData[key])) {
            displayingJsonTable(cellValue, JsonData[key]);
        } else if (typeof JsonData[key] === 'object') {
            displayingJsonTable(cellValue, JsonData[key]);
        }else {
            cellValue.textContent = JsonData[key];
        }

        row.appendChild(cellKey);
        row.appendChild(cellValue);
        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    DOMElement.appendChild(table);
}

fetch('https://swapi.dev/api/people/1/')
    .then(res => res.json())
    .then(luke => {
        console.log(luke);
        const container = document.getElementById('tableContainer');
        displayingJsonTable(container, luke);
    });

// race

function myFetch(url) {
    return fetch(url)
      .then(response => response.json());
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const apiUrl = 'https://swapi.dev/api/people/1/';
  const delayTime = Math.random() * 1000; // Випадковий час затримки (в межах 0-1000 мс)

  Promise.race([myFetch(apiUrl), delay(delayTime)])
    .then(result => {
      if (result === undefined) {
        console.log(`Запит на API відповів швидше`);
      } else {
        console.log(`Затримка відповіла швидше`);
      }
    })
    .catch(error => console.error('Помилка:', error));


// Promisify: confirm

function confirmPromise(text) {
    return new Promise((resolve, reject) => {
        const result = confirm(text);
        if (result) {
            resolve();
        } else {
            reject();
        }
    })
}

confirmPromise('Проміси це складно?')
    .then(() => console.log('не так вже й складно'))
    .catch(() => console.log('respect за посидючість і уважність'));

// Promisify: prompt

function promptPromise(text) {
    return new Promise((resolve, reject) => {
        const userInput = prompt(text);

        if (userInput === null) {
          reject(); // Користувач вибрав "Cancel"
        } else {
          resolve(userInput); // Користувач ввів текст і натиснув "OK"
        }

    });
  }

  promptPromise("Як тебе звуть?")
    .then(name => console.log(`Тебе звуть ${name}`))
    .catch(() => console.log('Ну навіщо морозитися, нормально ж спілкувалися'));


// Promisify: LoginForm

function LoginForm(parent) {
    this.parent = parent;

    this.passwordInput = document.createElement('input');
    this.passwordInput.type = 'password';
    this.passwordInput.placeholder = 'Пароль';

    this.usernameInput = document.createElement('input');
    this.usernameInput.type = 'text';
    this.usernameInput.placeholder = 'Логин';

    this.loginButton = document.createElement('button');
    this.loginButton.innerText = 'Войти';
    this.loginButton.disabled = true;

    this.loginButtonState = function () {
        this.usernameInput.addEventListener('input', () => {
            this.loginButton.disabled = this.usernameInput.value === '' || this.passwordInput.value === '';
        });

        this.passwordInput.addEventListener('input', () => {
            this.loginButton.disabled = this.passwordInput.value === '' || this.usernameInput.value === '';
        });
    };

    parent.appendChild(this.passwordInput);
    parent.appendChild(this.usernameInput);
    parent.appendChild(this.loginButton);
}

function loginPromise(parent) {
  
    function executor(resolve, reject) {
        const form = new LoginForm(parent);
        form.loginButtonState();

        form.loginButton.addEventListener('click', () => {
            const login = form.usernameInput.value;
            const password = form.passwordInput.value;
            resolve({
                login: login,
                password: password,
            });
        });
    };

    return new Promise(executor)
}

loginPromise(document.body)
    .then(({ login, password }) => {
        console.log(`Ви ввели логін ${login} та пароль ${password}`);
    });

