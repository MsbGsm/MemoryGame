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
	let flipedCard = false; 		//To check if the board already have a first flipped card
	let locked = false;					//To check if the board already have 2 flipped cards
	let selectedCards = []; 		//Store 1st and 2nd selected cards
	let cards = document.querySelectorAll('.card');

	const gameInit = () => {
		cards.forEach(card => {
			card.addEventListener('click', cardClickHandler);
		});
	};

	const setFirstCard = (index) => {selectedCards[0] = index}

	const setSecondCard = (index) => {selectedCards[1] = index}
	
	const toggleFlipedCard = () => {flipedCard = !flipedCard}

	const hasFlipedCard = () => flipedCard;
	
	const getSelectedCards = () => selectedCards;

	const toggleLock = () => {locked =  !locked;}

	const isLocked = () => locked;

	const flipCard = card => {
		let index = +card.dataset.index;
		card.appendChild(backFaces[index].content);
		card.classList.add('fliped');
		toggleFlipedCard();
	};

	const hideCards = () => {
		//Hide both stored cards by flipping it over and removingt the back face.
		selectedCards.forEach(card => {
			let backFace = card.querySelector('.back');
			card.classList.remove('fliped');
			setTimeout(()=> backFace.remove(), 300);			//BugFix: prevent the back face being removed before the flip over ends.
		});
	}

	return {
		gameInit,
		flipCard,
		setFirstCard,
		setSecondCard,
		hasFlipedCard,
		getSelectedCards,
		hideCards,
		toggleLock,
		isLocked
	}
})();



const cardClickHandler = (event) => {
	let selectedCard = event.currentTarget;

	if (selectedCard === board.getSelectedCards()[0]) return;   // Test to prevent selecting the same card twice

	if (board.isLocked()) return;							// test to prevent flipping more than 2 cards

	if (!board.hasFlipedCard()) {							//check if the board already have 1st card flipped

		board.setFirstCard(selectedCard);				//Store the first selected card
		board.flipCard(selectedCard);						//Flipping the first card
		return;																	
	}

	board.setSecondCard(selectedCard);				//If already have a card flipped, it store the second card

	board.flipCard(selectedCard);							//Flipping the second card;

	board.toggleLock();
	
	setTimeout(() => {
		board.hideCards();
		board.toggleLock();
	}, 1500)
}


board.gameInit();






