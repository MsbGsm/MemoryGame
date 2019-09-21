'use strict';


let data = [
	'fas fa-gem',
	'fas fa-paper-plane',
	'fa fa-anchor',
	'fa fa-bolt',
	'fa fa-cube',
	'fa fa-leaf',
	'fa fa-bicycle',
	'fa fa-bomb',
];

// Duplicating data
let cardsData = data.reduce((res, current) => res.concat([current, current]), []);

// This will generate BackFaces objects containing data proprety that we used to check card match
// and content property that contain cards back face node elements that we need to add to the dom later.
const backFacesGenerator = (array) => {
	return array.map(data => {
		let backEl = document.createElement('div');
		let contentEl = document.createElement('i');
		backEl.className = 'back';
		contentEl.className = data;
		backEl.appendChild(contentEl);
		
		return {
			data,
			content: backEl
		};
	})
}

const board = (() => {
	//shuffle goes here
	let backFaces = backFacesGenerator(cardsData);
	let hasFlipedCard = false;
	let locked = false;
	let cards = document.querySelectorAll('.card');

	const gameInit = () => {
		cards.forEach(card => {
			card.addEventListener('click', cardClickHandler);
		});
	}

	const flipCard = card => {
		let index = +card.dataset.index;
		card.appendChild(backFaces[index].content);
		card.classList.add('fliped');
	};


	return {
		gameInit,
		flipCard,
	}
})();

const cardClickHandler = (event) => {
	let clickedCard = event.currentTarget;
	board.flipCard(clickedCard);
}


board.gameInit();






