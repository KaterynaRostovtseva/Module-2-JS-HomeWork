// Світлофор

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function trafficLight() {
    const trafficLightContainer = document.createElement('div');
    trafficLightContainer.id = 'trafficLightContainer';
    document.body.appendChild(trafficLightContainer);

    const greenLight = document.createElement('div');
    greenLight.classList.add('light');
    const yellowLight = document.createElement('div');
    yellowLight.classList.add('light');
    const redLight = document.createElement('div');
    redLight.classList.add('light');
    trafficLightContainer.appendChild(greenLight);
    trafficLightContainer.appendChild(yellowLight);
    trafficLightContainer.appendChild(redLight);

    while (true) {

        greenLight.style.backgroundColor = 'green';
        yellowLight.style.backgroundColor = '';
        redLight.style.backgroundColor = '';
        await delay(5000);

        greenLight.style.backgroundColor = '';
        yellowLight.style.backgroundColor = 'yellow';
        redLight.style.backgroundColor = '';
        await delay(2000);

        greenLight.style.backgroundColor = '';
        yellowLight.style.backgroundColor = '';
        redLight.style.backgroundColor = 'red';
        await delay(3000);
    }
}

trafficLight();

PedestrianTrafficLight

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function domEventPromise(element, eventName) {
    return new Promise(resolve => {
        element.addEventListener(eventName, resolve, { once: true });
    });
}

async function pedestrianTrafficLight() {

    const pedestrianTrafficLightContainer = document.createElement('div');
    pedestrianTrafficLightContainer.id = 'pedestrianTrafficLightContainer';
    document.body.appendChild(pedestrianTrafficLightContainer);

    const greenLight = document.createElement('div');
    greenLight.classList.add('pedestrianlight');
    const redLight = document.createElement('div');
    redLight.classList.add('pedestrianlight');
    pedestrianTrafficLightContainer.appendChild(greenLight);
    pedestrianTrafficLightContainer.appendChild(redLight);
    const pedestrianButton = document.createElement('button');
    pedestrianButton.innerHTML = "нажать"
    pedestrianTrafficLightContainer.appendChild(pedestrianButton);

    while (true) {

        // Зеленый свет включен, красный свет выключен
        greenLight.style.backgroundColor = 'green';
        redLight.style.backgroundColor = '';

        // Ждем нажатия кнопки
        await Promise.race([
            delay(5000),
            domEventPromise(pedestrianButton, 'click')
        ]);

        // Отключаем кнопку на задержку
        pedestrianButton.disabled = true;
        await delay(2000);
        pedestrianButton.disabled = false;

        // Красный свет включен, зеленый свет выключен
        greenLight.style.backgroundColor = '';
        redLight.style.backgroundColor = 'red';

        // Подождем некоторое время
        await delay(7000);
    }
}

pedestrianTrafficLight() 

// speedtest

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function speedtest(getPromise, count,parallel=1){
 
    const start = Date.now();

// Массив для хранения всех обещаний
  const promises = Array.from({ length: count }, getPromise);

 // Выполняем асинхронные операции параллельно
  for (let i = 0; i < count; i += parallel) {
    await Promise.all(promises.slice(i, i + parallel));
  }

  const duration = Date.now() - start;

// Рассчитываем скорость и продолжительность
  const querySpeed = count / duration;
  const queryDuration = duration / count;
  const parallelSpeed = (count / parallel) / duration;
  const parallelDuration = duration / (count / parallel);

        return {
            duration,
            querySpeed, //середня швидкість одного запиту
            queryDuration, //
            parallelSpeed,
            parallelDuration
        }
    }
    
    speedtest(() => delay(1000), 10, 10 ).then(result => console.log(result))
    // {duration: 10000, 
    // querySpeed: 0.001, //1 тисячна запита за мілісекунду
    // queryDuration: 1000, //1000 мілісекунд на один реальний запит у середньому
    // parallelSpeed: 0.01  // 100 запитів за 10000 мілісекунд
    // parallelDuration: 100 // 100 запитів за 10000 мілісекунд
    speedtest(() => fetch('http://swapi.dev/api/people/1').then(res => res.json()), 10, 5)
    .then(result => console.log(result));

    // gql

    async function gql(endpoint, query, variables) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables,
          }),
        });
      
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      
        return response.json();
      }
      
      (async () => {
        const catQuery = `
          query cats($q: String){
            CategoryFind(query: $q){
              _id name
            }
          }
        `;
        const cats = await gql("http://shop-roles.node.ed.asmer.org.ua/graphql", catQuery, { q: "[{}]" });
        console.log(cats);
      
        const loginQuery = `
          query login($login:String, $password:String){
            login(login:$login, password:$password)
          }
        `;
        const token = await gql("http://shop-roles.node.ed.asmer.org.ua/graphql", loginQuery, { login: "test457", password: "123123" });
        console.log(token);
      })();
      

    //   jwtDecode

    function jwtDecode(token) {
        try {
          if (!token) {
            return undefined;
          }
      
          const parts = token.split('.');
          if (parts.length !== 3) {
            return undefined;
          }
      
          const decoded = JSON.parse(atob(parts[1]));
          return decoded;
        } catch (error) {
          return undefined;
        }
      }
      
      
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2MzIyMDVhZWI3NGUxZjVmMmVjMWEzMjAiLCJsb2dpbiI6InRlc3Q0NTciLCJhY2wiOlsiNjMyMjA1YWViNzRlMWY1ZjJlYzFhMzIwIiwidXNlciJdfSwiaWF0IjoxNjY4MjcyMTYzfQ.rxV1ki9G6LjT2IPWcqkMeTi_1K9sb3Si8vLB6UDAGdw"
      console.log(jwtDecode(token)) 
      //{
      //  "sub": {
      //    "id": "632205aeb74e1f5f2ec1a320",
      //    "login": "test457",
      //    "acl": [
      //      "632205aeb74e1f5f2ec1a320",
      //      "user"
      //    ]
      //  },
      //  "iat": 1668272163
      //}
      
      try {
          console.log(jwtDecode())         //undefined
          console.log(jwtDecode("дічь"))   //undefined
          console.log(jwtDecode("ey.ey.ey"))   //undefined
          
          console.log('до сюди допрацювало, а значить jwtDecode не матюкався в консоль червоним кольором')
      }
      finally{
          console.log('ДЗ, мабуть, закінчено')
      }


      try {
        console.log(jwtDecode());          // undefined
        console.log(jwtDecode("дічь"));    // undefined
        console.log(jwtDecode("ey.ey.ey"));// undefined
        
        console.log('До сюди допрацювало, а значить jwtDecode не матюкався в консоль червоним кольором');

      } finally {
        console.log('ДЗ, мабуть, закінчено')
      }
      