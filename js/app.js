let Deck = (() => {

	const DATA = [
		'fas fa-gem',
		'fas fa-paper-plane',
		'fa fa-anchor',
		'fa fa-bolt',
		'fa fa-cube',
		'fa fa-leaf',
		'fa fa-bicycle',
		'fa fa-bomb'
	];

	let deckData;

	const backFaceObjectGenerator = (cardData) => {
		let backFaceElement = document.createElement('div');
		let contentElement = document.createElement('i');
		backFaceElement.className = 'back';
		contentElement.className = cardData;
		backFaceElement.appendChild(contentElement);

		return {
			cardData,
			backFaceElement
		};
	}

	const duplicateDataArr = (arr) => arr.reduce((res, current) => res.concat(current, current), [])
	

	const init = () => {
		deckData = duplicateDataArr(DATA);
	}

	const getCardData = index => {
		return backFaceObjectGenerator(deckData[index]);
	}
	
	return {
		init,
		getCardData
	}	
})();




//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
let gameUI = (() => {
	let uiCards = [...document.querySelectorAll('.card')];

	let movesCounterElement = document.querySelector("span#moves-counter");

	const cardClickHandler = (event) => {
		gameController.selectCard(event.currentTarget);
	}

	const init = () => {
		uiCards.forEach(uiCard => {
			uiCard.classList.remove('matched', 'fliped');
			uiCard.addEventListener('click', cardClickHandler);
		});

		movesCounterElement.innerText = 0;
	}


	const flipCard = ({index, backFaceElement}) => {
		uiCard = uiCards.filter(card => card.dataset.index == index )[0];
		uiCard.appendChild(backFaceElement);
		uiCard.classList.add('fliped');
	}



	const hideCards = (cardsObjArr) => {
		cardsObjArr.forEach(cardObj => {
			let {index} = cardObj;
			let card = uiCards.filter(card => card.dataset.index == index )[0];
			let backFace = card.querySelector('.back');
			card.classList.remove('fliped');
			setTimeout(() => {
				backFace.remove();
			}, 300);
		});
	}


	const validateMatch = (cardsObjArr) => {
		cardsObjArr.forEach(cardObj => {
			let {index} = cardObj;
			let card = uiCards.filter(card => card.dataset.index == index)[0];
			
			card.classList.remove('fliped');
			card.classList.add('matched');
			card.removeEventListener('click', cardClickHandler);
		});
	}

	const updateMovesCounter = (movesCounter) => {
		movesCounterElement.innerText = movesCounter;
	}

	return {
		init,
		flipCard,
		hideCards,
		validateMatch,
		updateMovesCounter
	}

})();




//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
let gameController = (() => {
	
	let selectedCards;
	let hasFlipedCard;
	let boardIsLocked;
	let movesCounter;
	let matchCounter;

	
	
	
	const wait = ms => new Promise((r, j)=>setTimeout(r, ms));

	const init = () => {
		selectedCards = [];
		hasFlipedCard = false;
		boardIsLocked = false;
		movesCounter = 0;
		matchCounter = 0;
		Deck.init();
		gameUI.init();


	}

	const setSelectedCardObject = (index) => {
		let cardObject = Deck.getCardData(index);
		cardObject.index = index;
		return cardObject;
	}

	const resetSelection = () => {
		selectedCards = [];
		hasFlipedCard = false;
		boardIsLocked = false;
	}

	const isMatch = () => selectedCards[0].cardData === selectedCards[1].cardData;

	const match = () => {
		matchCounter += 1;
		gameUI.validateMatch(selectedCards);
		if (matchCounter >= 8) {
			console.log('Game Completed Successfully!')
		}
		resetSelection();
	}

	const noMatch = async () => {
		await wait(1500);
		gameUI.hideCards(selectedCards);
		resetSelection();
	}


	const selectCard = uiCard => {

		let index = +uiCard.dataset.index;

		if (selectedCards[0] && index === selectedCards[0].index) return;

		if (boardIsLocked) return;

		if (!hasFlipedCard) {
			
			selectedCards[0] = setSelectedCardObject(index);
			gameUI.flipCard(selectedCards[0]);
			hasFlipedCard = true;

		} else {

			selectedCards[1] = setSelectedCardObject(index);
			gameUI.flipCard(selectedCards[1]);
			hasFlipedCard = false;
			boardIsLocked = true;
			movesCounter += 1;
			gameUI.updateMovesCounter(movesCounter);
			isMatch() ? match() : noMatch();
			
		}
	
	}

	return {
		selectCard,
		init
	}
})();



const gameReset = () => {
	let confirmation = confirm("Do you really want to reset the game?");
	if (!confirmation) return;
	gameController.init();
}



gameController.init();

