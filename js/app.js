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
	let flipedCard = false;
	let locked = false;
	let selectedCards = [];
	let cards = document.querySelectorAll('.card');

	const gameInit = () => {
		cards.forEach(card => {
			card.addEventListener('click', cardClickHandler);
		});
	};

	const setFirstCard = (index) => {
		selectedCards[0] = index;
	}

	const setSecondCard = (index) => {
		selectedCards[1] = index;
	}
	
	const toggleFlipedCard = () => {
		flipedCard = !flipedCard;
	}

	const hasFlipedCard = () => flipedCard;	

	const flipCard = card => {
		let index = +card.dataset.index;
		card.appendChild(backFaces[index].content);
		card.classList.add('fliped');
		toggleFlipedCard();
	};

	const getSelectedIndexs = () => selectedCards;

	const hideCards = () => {
		selectedCards.forEach(card => {
			let backFace = card.querySelector('.back');
			card.classList.remove('fliped');
			backFace.remove();
		});
	}

	return {
		gameInit,
		flipCard,
		setFirstCard,
		setSecondCard,
		hasFlipedCard,
		getSelectedIndexs,
		hideCards
	}
})();


const cardClickHandler = (event) => {
	let selectedCard = event.currentTarget;
	
	if (!board.hasFlipedCard()) {
		board.setFirstCard(selectedCard);
		board.flipCard(selectedCard);
		return;
	}

	board.setSecondCard(selectedCard);
	board.flipCard(selectedCard);
	
	setTimeout(() => {
		board.hideCards();
	}, 1500)
}


board.gameInit();






