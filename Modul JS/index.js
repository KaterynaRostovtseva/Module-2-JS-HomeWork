function createStore(reducer) {
  let state = reducer(undefined, {}) //стартовая инициализация состояния, запуск редьюсера со state === undefined
  let cbs = []                     //массив подписчиков

  const getState = () => state            //функция, возвращающая переменную из замыкания
  const subscribe = cb => (cbs.push(cb),   //запоминаем подписчиков в массиве
    () => cbs = cbs.filter(c => c !== cb)) //возвращаем функцию unsubscribe, которая удаляет подписчика из списка

  const dispatch = action => {
    if (typeof action === 'function') { //если action - не объект, а функция
      return action(dispatch, getState) //запускаем эту функцию и даем ей dispatch и getState для работы
    }
    const newState = reducer(state, action) //пробуем запустить редьюсер
    if (newState !== state) { //проверяем, смог ли редьюсер обработать action
      state = newState //если смог, то обновляем state
      for (let cb of cbs) cb() //и запускаем подписчиков
    }
  }

  return {
    getState, //добавление функции getState в результирующий объект
    dispatch,
    subscribe //добавление subscribe в объект
  }
}

function combineReducers(reducers) {
  function totalReducer(state = {}, action) {
    const newTotalState = {}
    for (const [reducerName, reducer] of Object.entries(reducers)) {
      const newSubState = reducer(state[reducerName], action);
      if (newSubState !== state[reducerName]) {
        newTotalState[reducerName] = newSubState;
      }
    }
    if (Object.keys(newTotalState).length) {
      return { ...state, ...newTotalState }
    }
    return state
  }
  return totalReducer
}

function promiseReducer(state = {}, { type, name, status, payload, error }) {
  if (type === 'PROMISE') {
    return {
      ...state,
      [name]: { status, payload, error }
    }
  }
  return state
}

const actionPending = (name) => ({ type: 'PROMISE', status: 'PENDING', name });
const actionFulfilled = (name, payload) => ({ type: 'PROMISE', status: 'FULFILLED', name, payload });
const actionRejected = (name, error) => ({ type: 'PROMISE', status: 'REJECTED', name, error });

const actionPromise = (name, promise) =>
  async dispatch => {
    dispatch(actionPending(name)) //сигнализируем redux, что промис начался
    try {
      const payload = await promise //ожидаем промиса
      dispatch(actionFulfilled(name, payload))//сигнализируем redux, что промис успешно выполнен
      return payload//в месте запуска store.dispatch с этим thunk можно так же получить результат промиса
    }
    catch (error) {
      dispatch(actionRejected(name, error))//в случае ошибки - сигнализируем redux, что промис несложился
    }
  }

function authReducer(state = {}, { type, token }) {
  if (type === 'AUTH_LOGIN') {
    const payload = jwtDecode(token);
    if (payload) {
      return { token, payload }
    }
  }
  if (type === 'AUTH_LOGOUT') {
    return {}
  }
  return state;
};

function jwtDecode(token) {
  try {
    let tokenParts = token.split('.')[1];
    let tokenJSON = atob(tokenParts);
    let normalToken = JSON.parse(tokenJSON);
    return normalToken;
  }
  catch (e) {
  }
};

const cartReducer = (state = {}, action) => {
  // Додавання товару
  if (action.type === 'CART_ADD') {
    return {
      ...state,
      [action.good._id]: {
        count: (state[action.good._id]?.count || 0) + action.count,
        good: action.good,
      },
    }
  }
  //Обробка установки кількості товару в корзину
  if (action.type === 'CART_SET') {
    if (action.count <= 0) {
      const { [action.good._id]: deletedItem, ...newState } = state;
      return newState;
    }
    return {
      ...state,
      [action.good._id]: {
        count: action.count,
        good: action.good,
      },
    };
  }
  //   Зменшення кількості товару
  if (action.type === 'CART_SUB') {
    if (state[action.good._id]) {
      const newCount = state[action.good._id].count - action.count;

      if (newCount <= 0) {
        const { [action.good._id]: removedItem, ...newState } = state;
        return newState;
      }

      return {
        ...state,
        [action.good._id]: {
          count: newCount,
          good: action.good,
        },
      };
    }

    return state;
  }
  //   Видалення товару
  if (action.type === 'CART_DEL') {
    if (!state[action.good._id]) {
      return state;
    }

    const newState = { ...state };
    delete newState[action.good._id];
    return newState;
  }
  //   Очищення кошика
  if (action.type === 'CART_CLEAR') {
    return {};
  }

  return state;
};

const actionCartAdd = (good, count = 1) => ({ type: 'CART_ADD', count, good });
const actionCartSub = (good, count = 1) => ({ type: 'CART_SUB', count, good });
const actionCartDel = (good) => ({ type: 'CART_DEL', good });
const actionCartSet = (good, count = 1) => ({ type: 'CART_SET', count, good });
const actionCartClear = () => ({ type: 'CART_CLEAR' });


function localStoredReducer(reducer, localStorageKey) {
  function wrapperReducer(state, action) {
    if (state === undefined) {
      try {
        const storedState = localStorage.getItem(localStorageKey);
        if (storedState !== null) {
          return JSON.parse(storedState);
        }
      } catch (e) {
        console.error('Помилка аналізу даних localStorage:', e);
      }
    }
 
    const newState = reducer(state, action);
    localStorage.setItem(localStorageKey, JSON.stringify(newState));
    return newState;
  }

  return wrapperReducer;
}

const url = 'http://shop-roles.node.ed.asmer.org.ua/graphql';
const gql = getGQL(url);

function getGQL(url) {
  return async function gql(query, variables = {}) {
    try {
      const headers = {}
      const token = store.getState().auth.token;
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          ...headers
        },
        body: JSON.stringify({ query, variables }),
      });
      const { data, errors } = await response.json();

      if (errors) {
        throw new Error(errors[0].message);
      }

      return data[Object.keys(data)[0]];
    } catch (error) {
      console.error('Помилка запиту GraphQL:', error);
      throw error;
    }
  }
};

const reducers = {
  promise: promiseReducer, //допилить много имен для многих промисо
  auth: localStoredReducer(authReducer, 'authToken'), //часть предыдущего ДЗ
  cart: localStoredReducer(cartReducer, 'cart'), //часть предыдущего ДЗ
}
const totalReducer = combineReducers(reducers);

const store = createStore(totalReducer);
store.subscribe(() => console.log(store.getState()));

// Запит на перелiк кореневих категорій
const rootCategories = () =>
  gql(`query categories ($q:String) {
        CategoryFind(query:$q){
            _id name
        }
    }`, { q: JSON.stringify([{ parent: null }]) });

const actionRootCategories = () =>
  actionPromise('rootCategories', rootCategories());

store.subscribe(() => {
  const rootCats = store.getState().promise.rootCategories?.payload;
  if (rootCats) {
    aside.innerHTML = ''
    for (let { _id, name } of rootCats) {
      const a = document.createElement('a')
      a.innerText = name
      a.href = `#/category/${_id}`
      aside.append(a)
    }
  }
});

store.dispatch(actionRootCategories());

//  Запит для отримання однієї категорії з товарами та картинками
const categoryById = _id => //добавьте сюда подкатегории и родителя - пригодятся
  gql(`query catById($qCat:String){
              CategoryFindOne(query:$qCat){
                _id name
                parent {
                  _id name
                }
                subCategories {
                  name _id parent {
                    _id name
                  }
                }
                goods{
                  _id name price images{
                    url
                  } 
                }
              }  
            }`, { qCat: JSON.stringify([{ _id }]) });

const actionCategoryById = _id =>
  actionPromise('catById', categoryById(_id));

store.subscribe(() => {
  const [, route] = location.hash.split('/');
  if (route !== 'category') return;

  const { status, payload, error } = store.getState().promise.catById || {};
  const main = document.getElementById('main');
  main.innerHTML = '';

  if (status === 'PENDING') {
    const loadingImage = document.createElement('img');
    loadingImage.src = 'https://cdn.dribbble.com/users/63485/screenshots/1309731/infinite-gif-preloader.gif';
    loadingImage.alt = 'Зачекайте';
    main.appendChild(loadingImage);
  }

  if (status === 'FULFILLED') {
    const { name, goods } = payload;

    const categoryTitle = document.createElement('h1');
    categoryTitle.textContent = name;
    main.appendChild(categoryTitle);

    if (Array.isArray(goods)) {
      for (const { _id, name, price, images } of goods) {
        const goodsContainer = document.createElement('div');
        goodsContainer.classList.add('goodsContainer');

        const imageLink = document.createElement('div');
        imageLink.href = `#/good/${_id}`;

        const goodImage = document.createElement('img');
        goodImage.classList.add('imgGood');
        goodImage.src = `http://shop-roles.node.ed.asmer.org.ua/${images[0].url}`;
        goodImage.alt = name;

        const goodDetailsLink = document.createElement('a');
        goodDetailsLink.href = `#/good/${_id}`;

        const goodName = document.createElement('div');
        goodName.classList.add('good');

        const nameLink = document.createElement('a');
        nameLink.href = `#/good/${_id}`;
        nameLink.textContent = name;
        goodName.appendChild(nameLink);

        const priceElement = document.createElement('div');
        priceElement.classList.add('priceElement');
        priceElement.textContent = `${price} грн.`;

        const detailsLink = document.createElement('a');
        detailsLink.href = `#/good/${_id}`;

        const detailsButton = document.createElement('button');
        detailsButton.classList.add('btn');
        detailsButton.textContent = 'Детальніше';

        detailsLink.appendChild(detailsButton);
        goodDetailsLink.appendChild(goodImage);
        goodDetailsLink.appendChild(goodName);
        goodsContainer.appendChild(goodDetailsLink); 
        goodsContainer.appendChild(priceElement); 
        goodsContainer.appendChild(detailsLink);
        imageLink.appendChild(goodsContainer); 
        main.appendChild(imageLink);
      }
    } else {
      const noGoodsMessage = document.createElement('h2');
      noGoodsMessage.textContent = 'В цій категорії немає товарів';
      main.appendChild(noGoodsMessage);
    }
  }

  if (status === 'REJECTED') {
    const errorMessage = document.createElement('div');
    errorMessage.textContent = 'Помилка';
    main.appendChild(errorMessage);
  }
});

// Запит на отримання товару з описом та картинками
const goodById = _id =>
  gql(`query goodById($goodId:String) {
				GoodFindOne(query:$goodId) {
				    _id name price description images {
				          url
				        } categories{
                  _id name
                }
				    }
				}`, { goodId: JSON.stringify([{ _id }]) })

const actionGoodById = _id =>
  actionPromise('goodById', goodById(_id));


store.subscribe(() => {
  const [, route] = location.hash.split('/');
  if (route !== 'good') return

  const { status, payload, error } = store.getState().promise.goodById || {};
  const main = document.getElementById('main'); 

  main.innerHTML = '';

  if (status === 'PENDING') {
    const loadingImage = document.createElement('img');
    loadingImage.classList.add('imgGood');
    loadingImage.src = 'https://cdn.dribbble.com/users/63485/screenshots/1309731/infinite-gif-preloader.gif';
    loadingImage.alt = 'Зачекайте';
    main.appendChild(loadingImage);
  }

  if (status === 'FULFILLED') {
    const { _id, name, categories, description, price, images } = payload;

    const goodTable = document.createElement('div');
    goodTable.className = 'goodTable';

    const categoryLink = document.createElement('a');
    categoryLink.href = `#/category/${categories[0]._id}`;

    const categorySpan = document.createElement('span');
    categorySpan.className = 'goodCategory';
    categorySpan.textContent = `Категорія: ${categories[0].name}`;

    categoryLink.appendChild(categorySpan);
    goodTable.appendChild(categoryLink);

    const h1Element = document.createElement('h1');
    h1Element.textContent = name;
    goodTable.appendChild(h1Element);

    const imgElement = document.createElement('img');
    imgElement.classList.add('imgGood');
    imgElement.src = `http://shop-roles.node.ed.asmer.org.ua/${images[0].url}`;
    imgElement.alt = name;

    if (images.length <= 1) {
      goodTable.appendChild(imgElement);

      const goodDescription = document.createElement('div');
      goodDescription.className = 'goodDescription';
      goodDescription.textContent = description;
      goodTable.appendChild(goodDescription);

      const priceAndButton = document.createElement('div');
      priceAndButton.className = 'priceAndButton';

      const h2Element = document.createElement('h2');
      h2Element.textContent = `${price} грн`;
      priceAndButton.appendChild(h2Element);

      const buyGoodButton = document.createElement('button');
      buyGoodButton.id = 'buyGoodButton';
      buyGoodButton.className = 'btn';
      buyGoodButton.textContent = 'Купити';
      buyGoodButton.onclick = () => {
        store.dispatch(actionCartAdd({ _id, name, price, images }, 1));
      };

      priceAndButton.appendChild(buyGoodButton);
      goodTable.appendChild(priceAndButton);
    } else {
      const imgViewerElement = document.createElement('img');
      imgViewerElement.id = 'photoIMG';
      imgViewerElement.classList.add('imgGood');
      imgViewerElement.src = `http://shop-roles.node.ed.asmer.org.ua/${images[0].url}`;
      imgViewerElement.alt = name;

      const nextPhotoButton = document.createElement('button');
      nextPhotoButton.id = 'nextPhotoButton';
      nextPhotoButton.className = 'btn';
      nextPhotoButton.textContent = 'Наступне фото';
      let goodPhotoIndex = 0;
      nextPhotoButton.onclick = () => {
        goodPhotoIndex++;
        if (goodPhotoIndex >= images.length) goodPhotoIndex = 0;
        imgViewerElement.src = `http://shop-roles.node.ed.asmer.org.ua/${images[goodPhotoIndex].url}`;
      };

      goodTable.appendChild(imgViewerElement);
      goodTable.appendChild(document.createElement('br'));
      goodTable.appendChild(nextPhotoButton);

      const goodDescription = document.createElement('div');
      goodDescription.className = 'goodDescription';
      goodDescription.textContent = description;
      goodTable.appendChild(goodDescription);

      const priceAndButton = document.createElement('div');
      priceAndButton.className = 'priceAndButton';

      const h2Element = document.createElement('h2');
      h2Element.textContent = `${price} грн`;
      priceAndButton.appendChild(h2Element);

      const buyGoodButton = document.createElement('button');
      buyGoodButton.id = 'buyGoodButton';
      buyGoodButton.className = 'btn';
      buyGoodButton.textContent = 'Купити';
      buyGoodButton.onclick = () => {
        store.dispatch(actionCartAdd({ _id, name, price, images }, 1));
      };

      priceAndButton.appendChild(buyGoodButton);
      goodTable.appendChild(priceAndButton);
    }

    main.appendChild(goodTable);
  }

  if (status === 'REJECTED') {
    const errorMessage = document.createElement('div');
    errorMessage.textContent = 'Помилка';
    main.appendChild(errorMessage);
  }
});


//кошик
const cartIcon = document.getElementById('cartIcon');
cartIcon.onclick = function () {
  store.subscribe(drawCart);
};

// кількість товарів в кошику
store.subscribe(counterPainter);

let quantityCounter = document.getElementById('quantity');
function counterPainter() {
  let counter = 0;
  let data = store.getState();
  for (let [key, value] of Object.entries(data.cart)) {
    counter += value.count;
  }
  quantityCounter.innerText = counter;
  return quantityCounter;
};

store.subscribe(drawCart);

function drawCart() {
  const [, route] = location.hash.split('/');
  if (route !== 'cart') return
  main.innerHTML = ` `;
  let finalSum = 0;
  const cartGoods = store.getState().cart || {};

  if (Object.entries(cartGoods).length) {
    const headerH1 = document.createElement("h1");
    headerH1.innerText = `У кошику:`;
    main.append(headerH1);

    for (const [key, value] of Object.entries(cartGoods)) {
      const goodbox = document.createElement("div");
      main.append(goodbox);

      const goodImage = document.createElement("img");
      goodImage.classList.add('imgGood');
      goodImage.src = `http://shop-roles.node.ed.asmer.org.ua/${value.good.images[0].url}`;
      goodImage.alt = `${value.good.name}`;
      goodbox.append(goodImage);

      const descriptionContainer = document.createElement("div");
      goodbox.append(descriptionContainer);

      const nameGood = document.createElement("p");
      nameGood.innerHTML = `<b>Товар:</b> ${value.good.name}`;
      descriptionContainer.append(nameGood);

      const countGood = document.createElement("p");
      countGood.innerHTML = `<b>Кількість:</b> ${value.count}`;
      descriptionContainer.append(countGood);

      const priceGood = document.createElement("p");
      finalSum += value.good.price * value.count;
      priceGood.innerHTML = `<b>До сплати:</b> ${value.good.price * value.count}`;
      descriptionContainer.append(priceGood);

      const buttonContainer = document.createElement("div");
      goodbox.append(buttonContainer);

      const plusButton = document.createElement("button");
      plusButton.innerText = `Збільшити`;
      plusButton.onclick = () => {
        store.dispatch(actionCartAdd(cartGoods[key].good));
      }
      buttonContainer.append(plusButton);

      const minusButton = document.createElement("button");
      minusButton.innerText = `Зменшити`;
      minusButton.onclick = () => {
        store.dispatch(actionCartSub(cartGoods[key].good));
      }
      buttonContainer.append(minusButton);

      const deleteButton = document.createElement("button");
      deleteButton.innerText = `Видалити`;
      deleteButton.onclick = (() => {
        store.dispatch(actionCartDel(cartGoods[key].good));
      })
      buttonContainer.append(deleteButton);
    }

    const finalCost = document.createElement("span");
    finalCost.innerHTML = `<b>Всього до сплати: </b>${finalSum} грн`;
    main.append(finalCost);

    if (store.getState().auth.payload) {
      const EndButtonContainer = document.createElement("div");
      main.append(EndButtonContainer);

      const clearCart = document.createElement("button");
      clearCart.innerText = "Очистити кошик";
      clearCart.onclick = (() => {
        store.dispatch(actionCartClear());
      })
      EndButtonContainer.append(clearCart);

      const orederCart = document.createElement("button");
      orederCart.innerText = "Оформити замовлення";
      orederCart.onclick = () => {
        store.dispatch(actionFullOrder());
      }
      EndButtonContainer.append(orederCart);

    } else {
      const descriptionContainerEnd = document.createElement("div");
      descriptionContainerEnd.innerHTML = `<h2>Увійдіть (зареєструйтесь), щоб замовити товари</h2>`;
      main.append(descriptionContainerEnd);
    }
  } else {
    const emptyCartH1 = document.createElement("h1");
    emptyCartH1.innerText = "Кошик порожній";
    main.append(emptyCartH1);
  }
}


// Запит на логін
const actionLogin = (login, password) =>
  actionPromise('login', gql(`query log($login:String, $password:String) {
					  login(login:$login, password:$password)
					}`, { login, password }));

// Запит на реєстрацію
const actionRegister = (login, password) =>
  actionPromise('register', gql(`mutation register($login:String, $password:String) {
												  UserUpsert(user:{login:$login, password:$password}) {
												    _id login createdAt
												  }
												}`, { login, password }));

const actionAuthLogin = token => ({ type: 'AUTH_LOGIN', token });
const actionAuthLogout = () => ({ type: 'AUTH_LOGOUT' });

const actionFullLogin = (login, password) => async dispatch => {
  try {
      let token = await dispatch(actionLogin(login, password));
      console.log(JSON.stringify(token));

      if (jwtDecode(token)) {
          dispatch(actionAuthLogin(token));
          window.history.go(-1);
      } else {
          displayErrorMessage('Логін або пароль не вірний!');
      }
  } catch (error) {
      displayErrorMessage('Помилка: ' + error.message);
  }
};

// Функція для відображення повідомлення про помилку 
const displayErrorMessage = (message) => {
  const errorMessageElement = document.createElement('div');
  errorMessageElement.textContent = message;
  errorMessageElement.style.color = 'red';
  errorMessageElement.style.marginTop = '10px';

  main.appendChild(errorMessageElement);

  setTimeout(() => {
      main.removeChild(errorMessageElement);
  }, 3000);
};

const actionFullRegister = (login, password) => async dispatch => {
  try {
      const user = await dispatch(actionRegister(login, password));
      return user
  } catch (error) {
      console.error("Помилка реєстрації:", error);
      return displayErrorMessage('Реєстрація не вдалася');
  }
};

function Password(parent) {
  this.parent = parent;

  this.passwordInput = document.createElement('input');
  this.passwordInput.type = 'password';
  this.passwordInput.placeholder = 'Пароль';
  parent.appendChild(this.passwordInput);

  this.passwordInput.addEventListener('input', () => {
    if (this.onChange) {
      this.onChange(this.passwordInput.value);
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

function LoginForm(parent) {
  const usernameInput = document.createElement('input');
  usernameInput.type = 'text';
  usernameInput.placeholder = 'Логин';

  const password = new Password(parent);  

  this.loginButton = document.createElement('button');
  this.loginButton.disabled = true;

  this.loginButtonState = function () {
      let btn = this.loginButton;
      usernameInput.addEventListener('input', function (event) {
          btn.disabled = (usernameInput.value == '' || password.getValue() === '');
      });
      password.passwordInput.addEventListener('input', function (event) {
          btn.disabled = (password.getValue() === '' || usernameInput.value == '');
      });
  };

  this.register = () => {
      this.loginButton.addEventListener('click', event => {
        const login = usernameInput.value;
        const pas = password.getValue();
        store.dispatch(actionFullRegister(login, pas));
      });
    };
  
    this.login = () => {
      this.loginButton.addEventListener('click', event => {
        const login = usernameInput.value;
        const pas = password.getValue();
        store.dispatch(actionFullLogin(login, pas));
      });
    };

  const checkboxContainer = document.createElement('div')
  const inputCheck = document.createElement('input');
  inputCheck.type = 'checkbox';
  checkboxContainer.appendChild(inputCheck)

  const toggleLabel = document.createElement('label');
  toggleLabel.innerText = 'Показати пароль';
  checkboxContainer.appendChild(toggleLabel)

  inputCheck.addEventListener('change', () => {
      password.setOpen(inputCheck.checked);
      toggleLabel.innerText = inputCheck.checked ? 'Скрити пароль' : 'Показати пароль';
  });

  parent.appendChild(usernameInput);
  parent.appendChild(password.passwordInput);
  parent.append(checkboxContainer);
  parent.appendChild(this.loginButton);
}

const userBlock = () => {
  const authSection = document.getElementById('authSection'); 

  authSection.innerHTML = '';

  const buttonLogout = document.createElement('button');
  buttonLogout.textContent = 'Вийти';
  buttonLogout.onclick = () => {
    store.dispatch(actionAuthLogout());
    window.location.href = '/';
  };

  const buttonLogin = document.createElement('a');
  buttonLogin.href = '#/login';
  const loginButton = document.createElement('button');
  loginButton.id = 'loginBut';
  loginButton.textContent = 'Увійти';
  buttonLogin.appendChild(loginButton);

  const buttonRegister = document.createElement('a');
  buttonRegister.href = '#/register';
  const registerButton = document.createElement('button');
  registerButton.id = 'registerButton';
  registerButton.textContent = 'Реєстрація';
  buttonRegister.appendChild(registerButton);

  const authContent = document.createElement('div');
  if (store.getState().auth.token) {
    const userLink = document.createElement('a');
    userLink.href = '#/orderhistory';
    userLink.innerHTML = `Вітаю - <br> ${store.getState().auth.payload.sub.login}`;
    document.body.appendChild(userLink);

    authContent.appendChild(userLink);
    authContent.appendChild(document.createElement('div').appendChild(buttonLogout));
  } else {
    authContent.appendChild(document.createElement('div').appendChild(buttonLogin));
    authContent.appendChild(document.createElement('div').appendChild(buttonRegister));
  }

  authSection.appendChild(authContent);
};

userBlock();
store.subscribe(userBlock);

// Запит оформлення замовлення 
const gqlOrderHistory = (orderGoods) =>
  gql(`
    mutation newOrder($orderGoods: [OrderGoodInput]) {
      OrderUpsert(order: { orderGoods: $orderGoods }) {
        _id
        createdAt
        total
      }
    }
  `, { "orderGoods": orderGoods });

const actionOrder = (orderGoods) =>
  actionPromise('order', gqlOrderHistory(orderGoods));


// обробка замовлення
const actionFullOrder = () =>
  async (dispatch, getState) => {
    const orderGoods = [];

    for (let key in getState().cart) {
      const { count, good } = getState().cart[key];
      const { _id } = good;
      let order = { count, good: { _id } };
      orderGoods.push(order);
    }
    const orderInfo = { orderGoods };

    if (await dispatch(actionOrder(orderGoods))) {
      dispatch(actionCartClear());
    }
  };

// Запит історії замовлень
const orders = () =>
  gql(`query myOrders {
				  OrderFind(query:"[{}]"){
				    _id total orderGoods{
				      price count total good{
				        _id name images{
				          url
				        }
				      }
				    }
				  }
				}`, {});
orders().then(res => console.log(res))

const actionOrders = () =>
  actionPromise('myOrders', orders());

store.subscribe(() => {
  const [, route] = location.hash.split('/');
  if (route !== 'orderhistory') return;

  const { status, payload, error } = store.getState().promise.myOrders;
  console.log(store.getState().promise.myOrders?.payload);

  if (status === 'FULFILLED' && payload) {
    const main = document.getElementById('main');
    main.innerHTML = '';

    const heading = document.createElement('h2');
    heading.innerText = 'Історія замовлень';
    main.append(heading);

    const table = document.createElement('table');
    table.style.border = '1px solid black';
    table.style.borderSpacing = '0';

    let orderIndex = 1;
    for (const orderGoods of payload) {
      if (orderGoods.orderGoods.length === 0) continue;

      const trOrder = document.createElement('tr');
      const tdOrder = document.createElement('td');
      tdOrder.colSpan = '100%'; 
      tdOrder.innerText = `Замовлення ${orderIndex++}`;
      tdOrder.style.fontWeight = '700';
      tdOrder.style.border = '1px solid black';
      tdOrder.style.backgroundColor = '#eee'; 

      trOrder.append(tdOrder);
      table.append(trOrder);

      const headerTr = document.createElement('tr');
      headerTr.style.border = '1px solid black';

      const headerInfo = Object.keys(orderGoods.orderGoods[0]);
      headerInfo.forEach(element => {
        const thTable = document.createElement('th');
        thTable.innerText = element;
        thTable.style.padding = '10px';
        thTable.style.border = '1px solid black';
        headerTr.append(thTable);
      });

      table.append(headerTr);

      for (const keys of orderGoods.orderGoods) {
        const trTable = document.createElement('tr');
        trTable.style.border = '1px solid black';

        const tableInfo = Object.values(keys);
        tableInfo.forEach(element => {
          const tdTable = document.createElement('td');
          tdTable.style.border = '1px solid black';
          tdTable.style.padding = '10px';

          if (typeof element === 'object') {
            const { name } = element;
            tdTable.innerText = name;
          } else {
            tdTable.innerText = element;
          }

          trTable.append(tdTable);
        });

        table.append(trTable);
      }
    }

    main.append(table);
  }
});

window.onhashchange = () => {
  const [, route, _id] = location.hash.split('/');

  const routes = {
    category() {
      store.dispatch(actionCategoryById(_id));
    },
    good() {
      store.dispatch(actionGoodById(_id));
    },
    login() {
      main.innerHTML = '';
      const loginForm = new LoginForm(main);
      loginForm.loginButton.innerText = 'Увійти';
      loginForm.loginButtonState();
      loginForm.login();
    },
    register() {
      main.innerHTML = '';
      const registerForm = new LoginForm(main);
      registerForm.loginButton.innerText = 'Зареєструватися';
      registerForm.loginButtonState();
      registerForm.register();
    },
    cart() {
      drawCart();
    },
    orderhistory() {
      store.dispatch(actionOrders());
    }
  }

  if (route in routes) {
    routes[route]()
  }
}

window.onhashchange();































