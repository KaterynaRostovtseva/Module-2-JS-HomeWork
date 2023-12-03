// Person Constructor

function Person(name, surname) {

    this.name = name;
    this.surname = surname;

    this.getFullName = function () {
        if (this.fatherName) {
            return `${this.name} ${this.fatherName} ${this.surname}`;
        } else {
            return `${this.name} ${this.surname}`;
        }
    }
}
const a = new Person("Вася", "Пупкін")
const b = new Person("Ганна", "Іванова")
const c = new Person("Єлизавета", "Петрова")

console.log(a.getFullName()) // Василь Пупкін
a.fatherName = 'Іванович' 
console.log(a.getFullName()) // Василь Іванович Пупкін
console.log(c.getFullName()) //Єлизавета Петрова
console.log(b.getFullName()) // Ганна Іванова


// Person Prototype

function Person(name, surname) {

    this.name = name;
    this.surname = surname;

Person.prototype.getFullName = function () {
    if (this.fatherName) {
        return `${this.name} ${this.fatherName} ${this.surname}`;
    } else {
        return `${this.name} ${this.surname}`;
    }
}
}

const a = new Person("Вася", "Пупкін")
const b = new Person("Ганна", "Іванова")
const c = new Person("Єлизавета", "Петрова")

console.log(a.getFullName()) // Василь Пупкін
a.fatherName = 'Іванович' 
console.log(a.getFullName()) // Василь Іванович Пупкін
console.log(c.getFullName()) //Єлизавета Петрова
console.log(b.getFullName()) // Ганна Іванова



// Store // Перероблений конструктор в попередньому ДЗ по кіоску працює


function Store(reducer){
    let state       = reducer(undefined, {}) //стартова ініціалізація стану, запуск редьюсера зі state === undefined
    let cbs         = []                     //масив пiдписникiв

    const getState  = () => state            //функція, що повертає змінну із замикання
    const subscribe = cb => (cbs.push(cb),   //запам'ятовуємо пiдписника у масиві
                             () => cbs = cbs.filter(c => c !== cb)) //повертаємо функцію unsubscribe, яка видаляє пiдписника зі списку

    const dispatch  = action => { 
        const newState = reducer(state, action) //пробуємо запустити редьюсер
        if (newState !== state){ //перевіряємо, чи зміг ред'юсер обробити action
            state = newState //якщо зміг, то оновлюємо state 
            for (let cb of cbs)  cb() //та запускаємо пiдписникiв
        }
    }

    return {
        getState, //додавання функції getState в результуючий об'єкт
        dispatch,
        subscribe //додавання subscribe в об'єкт
    }
}


// Password

function Password(parent, open) {
    this.parent = parent;
   
    this.passwordInput = document.createElement('input');
    this.passwordInput.type = 'password';
    parent.appendChild(this.passwordInput);

    this.passwordInput.addEventListener('input', () => {
        if (this.onChange) {
            this.onChange(this.passwordInput.value);
        }
    });

  
    const inputCheck = document.createElement('input');
    inputCheck.type = 'checkbox';
    parent.append(inputCheck);

    const toggleLabel = document.createElement('label');
    toggleLabel.innerText = 'Показати пароль';
    parent.append(toggleLabel);


    inputCheck.addEventListener('change', () => {
        this.passwordInput.type = inputCheck.checked ? 'text' : 'password';
        toggleLabel.innerText = inputCheck.checked ? 'Скрити пароль' : 'Показати пароль';
        if (this.onOpenChange) {
            this.onOpenChange(inputCheck.checked);
        }
    });


    this.setValue = function (value) {
        this.passwordInput.value = value;
    };

    this.getValue = function () {
        return this.passwordInput.value;
    };

    this.setOpen = function (isOpen) {
        this.passwordInput.type = isOpen ? 'text' : 'password';
    };

    this.getOpen = function () {
        return this.passwordInput.type === 'text';
    };

    this.setStyle = function (style) {
        Object.assign(this.passwordInput.style, style);
    };

}

let p = new Password(document.body, true);

p.onChange = data => console.log('Пароль змінено:', data);
p.onOpenChange = open => console.log('Видимість пароля змінено:', open);

p.setValue('qwerty');
console.log(p.getValue());

p.setOpen(false);
console.log(p.getOpen());



// // // LoginForm

function LoginForm(parent) {
    const password = new Password(parent, true)
   
    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.placeholder = 'Логін';

    const loginButton = document.createElement('button');
    loginButton.innerText = 'Увійти';
    loginButton.disabled = true; // Початково вимикаємо кнопку

    loginButton.addEventListener('click', () => {
        const login = usernameInput.value;
        const pas = password.getValue();
       console.log (`Логін: ${login}, Пароль: ${pas}`);
    });
   
     this.loginButtonState = function() {
        usernameInput.addEventListener('input', function(event) {
            loginButton.disabled = (usernameInput.value == '' || password.getValue() === '');
        });
        password.passwordInput.addEventListener('input', function(event) {
            loginButton.disabled = (password.getValue() === '' || usernameInput.value == '');
          }); 
       
    };

    parent.appendChild(usernameInput);
    parent.appendChild(loginButton);

}
let loginForm = new LoginForm(document.body, true);
loginForm.loginButtonState()


// LoginForm Constructor

function LoginFormConstructor(parent) {
    const password = new Password(parent, true)
   
    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.placeholder = 'Логін';

    const loginButton = document.createElement('button');
    loginButton.innerText = 'Увійти';
    loginButton.disabled = true; // Початково вимикаємо кнопку

    loginButton.addEventListener('click', () => {
        const login = usernameInput.value;
        const pas = password.getValue();
       console.log (`Логін: ${login}, Пароль: ${pas}`);
    });
   
     this.loginButtonState = function() {
        usernameInput.addEventListener('input', function(event) {
            loginButton.disabled = (usernameInput.value == '' || password.getValue() === '');
        });
        password.passwordInput.addEventListener('input', function(event) {
            loginButton.disabled = (password.getValue() === '' || usernameInput.value == '');
          }); 
       
    };

    parent.appendChild(usernameInput);
    parent.appendChild(loginButton);

    this.getUsername = function () {
        return usernameInput.value;
    };

    this.setUsername = function (value) {
        usernameInput.value = value;
    };

}
let loginFormConstructor = new LoginFormConstructor(document.body, true);
loginFormConstructor.loginButtonState()


// Password Verify

function PasswordVerify(parent, open) {
    this.passwordInput = new Password(parent, open);
    
    const passwordInput2 = document.createElement('input');
    passwordInput2.type = 'password';

    const comparePasswords = () => {
        const password1 = this.passwordInput.getValue();
        const password2 = passwordInput2.value;

        if (password1 === password2) {
            this.passwordInput.setStyle({ border: ''});
            passwordInput2.style.border = '';
        } else {
            this.passwordInput.setStyle({ border: '2px solid red' });
            passwordInput2.style.border = '2px solid red';
        }
    };

    this.passwordInput.setValue('qwerty');
    passwordInput2.value = 'qwerty';

    this.passwordInput.onChange = comparePasswords;
    this.passwordInput.onOpenChange = (isOpen) => {
        if (isOpen) {
            // Если пароль в открытом состоянии, скрываем второй ввод
            parent.removeChild(passwordInput2);
        } else {
            // Если пароль в скрытом состоянии, показываем второй ввод
            parent.appendChild(passwordInput2);
        }
    };

    passwordInput2.addEventListener('input', comparePasswords);

    if (this.passwordInput.getOpen()) {
        parent.removeChild(passwordInput2);
    }


    parent.appendChild(this.passwordInput.passwordInput);
    parent.appendChild(passwordInput2);
    
}

const passwordVerify = new PasswordVerify(document.body, true);
