function createStore(reducer){
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



const initialState = {
    products: [
      { id: 'product1', quantity: 16, price: 4725 },
      { id: 'product2', quantity: 5, price: 4500 },
      { id: 'product3', quantity: 8, price: 4700 },
      { id: 'product4', quantity: 18, price: 4225 },
      { id: 'product5', quantity: 5, price: 3725 },
      { id: 'product6', quantity: 10, price: 3525 },
    ],
    cash: 0,
  };
  

//   створення об'єкта action (actionCreator)
const BUY_PRODUCT = 'BUY_PRODUCT';
const buyProduct = (product, quantity, money) => ({
    type: "BUY_PRODUCT",
    payload: { product, quantity, money },
});

function reducer(state, action) {
    if (!state){ //початкове прибирання в кіоску:
        return initialState;
    }
    const { product, quantity, money } = action.payload;
    
    if (action.type === 'BUY_PRODUCT'){
        let selectedProduct = state.products.find(i => i.id === product);
        let sum = selectedProduct.price * quantity;
       
        if(quantity <= selectedProduct.quantity && money >= sum){
            return {
                products: state.products.map((p) =>
                    p.id === product ? { ...p, quantity: p.quantity - quantity } : p
                ),
                cash: state.cash + selectedProduct.price * quantity
            }
            
        } else{ 
            alert('У вас недостатньо коштів, або немає в наявності необхідної кількості!')
            return state;
        }
    }
}   


const store = createStore(reducer);


function buyButtonClick() {
    const productSelect = document.getElementById('productSelect');
    let selectedProduct = productSelect.options[productSelect.selectedIndex].value;
    const quantityInput = document.getElementById('quantityInput');
    let selectedQuantity = Number(quantityInput.value);
    let moneyInput = document.getElementById('moneyInput');
    let money = Number(moneyInput.value);
    store.dispatch(buyProduct(selectedProduct, selectedQuantity, money));  
    let cash = store.getState().cash;
    let title = document.getElementById('cash');
    let tr = document.getElementById(selectedProduct);
    let td = tr.childNodes[3];
    let changeQuantity = store.getState().products.find((i => i.id === selectedProduct))
    title.innerHTML = `Касса: ${cash} грн.`;
    td.innerHTML = `${changeQuantity.quantity}`;
}

