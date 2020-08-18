const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log('Number is :', randomNum);
function getRandomNumber() {
	return Math.floor(Math.random() * 100) + 1; // from 1 to 100
}

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

//Start recognition and game

recognition.start();

//Speak result

recognition.addEventListener('result', onSpeek);

//End SR service
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', (e) => {
	if (e.target.id == 'play-again') {
		window.location.reload();
	}
});

//capture user speek
function onSpeek(e) {
	const message = e.results[0][0].transcript;
	writeMessage(message);
	checkNumber(message);
}

//write what user speaks
function writeMessage(message) {
	msgEl.innerHTML = `<div> 
    
    <span class="box">${message}</span> 
    </div>`;
}

//Check message for the current number

function checkNumber(msg) {
	const num = +msg;

	//check if valid number
	if (Number.isNaN(num)) {
		msgEl.innerHTML = `<div> That is not a valid number :( </div> `;
		return;
	}

	//check range

	if (num > 100 || num < 1) {
		msgEl.innerHTML = `<div>Number must be between 1 and 100 </div>`;

		return;
	}

	//check number

	if (num === randomNum) {
		document.body.innerHTML = `<h2>Congrats! You have guessed the number  <br> <br>
        It was ${num} </h2>
		<h3> You are a CHAMPION!! Greet yourself with this song :) `;
		document.body.style.backgroundColor = '#69f04a';
		setTimeout(() => {
			window.open('https://www.youtube.com/watch?v=Y963o_1q71M', '_blank') ||
				window.location.replace('https://www.youtube.com/watch?v=Y963o_1q71M');
		}, 3000);
	} else if (num > randomNum) {
		msgEl.innerHTML += `<div>GO LOWER </div>`;
		document.body.style.backgroundColor = 'red';

		setTimeout(() => {
			document.body.style.backgroundColor = '#fff';
		}, 2000);
	} else {
		msgEl.innerHTML += `<div> GO HIGHER </div>`;
		document.body.style.backgroundColor = 'red';

		setTimeout(() => {
			document.body.style.backgroundColor = '#fff';
		}, 2000);
	}
}
