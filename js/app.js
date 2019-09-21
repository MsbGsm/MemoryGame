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
	let selectedIndexs = []
	let cards = document.querySelectorAll('.card');

	const gameInit = () => {
		cards.forEach(card => {
			card.addEventListener('click', cardClickHandler);
		});
	};

	const setFirstIndex = (index) => {
		selectedIndexs[0] = index;
	}

	const setSecondIndex = (index) => {
		selectedIndexs[1] = index;
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

	const getSelectedIndexs = () => selectedIndexs;

	

	return {
		gameInit,
		flipCard,
		setFirstIndex,
		setSecondIndex,
		hasFlipedCard,
		getSelectedIndexs
	}
})();


const cardClickHandler = (event) => {
	let selectedCard = event.currentTarget;
	
	if (!board.hasFlipedCard()) {

		board.setFirstIndex(+selectedCard.dataset.index);

	} else {

		board.setSecondIndex(+selectedCard.dataset.index);
	
	}
	
	board.flipCard(selectedCard)

	console.log(board.getSelectedIndexs());
}


board.gameInit();






