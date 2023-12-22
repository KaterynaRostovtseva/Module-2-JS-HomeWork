// function jsonPost(url, data)
// {
//     return new Promise((resolve, reject) => {
//         var x = new XMLHttpRequest();   
//         x.onerror = () => reject(new Error('jsonPost failed'))
//         // x.setRequestHeader('Content-Type', 'application/json');
//         x.open("POST", url, true);
//         x.send(JSON.stringify(data))

//         x.onreadystatechange = () => {
//             if (x.readyState == XMLHttpRequest.DONE && x.status == 200){
//                 resolve(JSON.parse(x.responseText))
//                 console.log(JSON.parse(x.responseText))
//             }
//             else if (x.status != 200){
//                 reject(new Error('status is not 200'))
//             }
//         }
//     })
// }

let nextMessageId = 0;

// Замінені нутрощі jsonPost на код, який використовує fetch замість XMLHttpRequest.
function jsonPost(url, data) {
	return new Promise((resolve, reject) => {
		fetch(url, {
			method: 'POST',
			// headers: {
			//     'Content-Type': 'application/json',
			// },
			body: JSON.stringify(data),
		})
			.then(response => {
				console.log(response)
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then(jsonData => {
				resolve(jsonData);
			})
			.catch(error => {
				reject(error);
			});
	});
}

jsonPost("http://students.a-level.com.ua:10012", { func: 'addMessage', nick: "Katy", message: 'hello' })

// Функція для відправки повідомлення
async function sendMessage(nick, message) {
	const response = await jsonPost("http://students.a-level.com.ua:10012", { func: 'addMessage', nick: nick, message: message });
	nextMessageId = response.nextMessageId;
}
// Функція отримує повідомлення і малює їх у DOM
async function getMessages() {
	const response = await jsonPost("http://students.a-level.com.ua:10012", { func: 'getMessages', messageId: nextMessageId });
	const messageContainer = document.getElementById('messageContainer');

	response.data.forEach(message => {
		const div = document.createElement('div');
		div.classList.add('message');

		const timestamp = new Date(message.timestamp);
		const formattedTimestamp = `${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`;

		div.innerHTML = `<strong>${message.nick}:</strong> ${message.message} (${formattedTimestamp})`;
		messageContainer.appendChild(div);
	});

	if (response.data.length > 0) {
		nextMessageId = response.nextMessageId;
	}
}

// Функція запуск по кнопці.
async function sendAndCheck() {
	const nick = document.getElementById('nick').value;
	const message = document.getElementById('message').value;
	await sendMessage(nick, message);
	await getMessages();
}

function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkLoop() {
	while (true) {
		await getMessages();
		await delay(5000); // перевірка кожні 5 секунд
	}
}

getMessages();
checkLoop();



// SWAPI Links

async function fetchAndReplaceLinks(url) {
	try {
		const response = await fetch(url);
		const data = await response.json();

		// Функція для рекурсивного обходу об'єкта та заміни посилань
		async function processObject(obj) {
			const promises = [];

			for (const key in obj) {
				if (obj.hasOwnProperty(key)) {
					const value = obj[key];

					if (value && typeof value === 'string' && value.indexOf('http') === 0) {
						// Заміна посилань на завантажені об'єкти
						promises.push(
							fetch(value)
								.then(response => response.json())
								.then(replacement => {
									obj[key] = replacement;
								})
						);
					} else if (value && typeof value === 'object') {
						// Рекурсивний обхід вкладених об'єктів
						promises.push(processObject(value));
					}
				}
			}

			// Чекаємо завершення всіх запитів та обробки вкладених об'єктів
			await Promise.all(promises);
		}

		// Рекурсивно обробляємо посилання в об'єкті
		await processObject(data);

		return data;
	} catch (error) {
		throw new Error(`Error fetching data from ${url}: ${error.message}`);
	}
}

const swapiLinks = 'https://swapi.dev/api/people/20';

fetchAndReplaceLinks(swapiLinks)
	.then(yodaWithLinks => {
		// Виведення в консоль JSON-рядка
		console.log(JSON.stringify(yodaWithLinks, null, 4))
		// (console.log(yodaWithLinks))
	})


// // domEventPromise

function domEventPromise(element, eventName) {
	function executor(resolve) {
		function eventHandler(e) {

			element.removeEventListener(eventName, eventHandler);
			resolve(e);
		}

		element.addEventListener(eventName, eventHandler);
	}

	return new Promise(executor);
}

document.addEventListener('DOMContent', function () {
	const button = document.createElement('button');
	button.textContent = 'Click me';
	button.id = 'myButton';
	document.body.appendChild(button);

	domEventPromise(button, 'click').then(e => console.log('Event "click" happens', e));
});



