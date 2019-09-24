let Deck = (() => {


	/**
	 * @description Deck module will generate an Array of fontawsome classes
	 * and keep it private can only by getDataCard() public method
	 * 
	 * @returns {object} Deck
	 * @returns {function} init set/reset the Deck.
	 * @returns {function} getDataCard retrieve dataCardObj using the data-index attribute from the uiCard
	*/


	/**
	 * DATA array containt all the 08 fontawsome classes which will be duplicated
	 * and shuffled to generate a deckData.
	 */
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

	const duplicateDataArr = (arr) => arr.reduce((res, current) => res.concat(current, current), [])

	const init = () => {
		deckData = duplicateDataArr(DATA);
	}


	/**
	 * @description This method will generate an object that hold cardData (fontawsome class)
	 * and DOM element generated using cardData
	 * @param {string} cardData fontawesome classes.
	 * @returns {Object} cardDataObj The object that hold fontawsome classes and the generated back face of the card
	 * @returns {string} cardDataObj.cardData Fontawesome classes.
	 * @returns {HTMLElement} cardDataObj.backFaceElement The generated Back Face DOM element. 
	 */
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
	

	/**
	 * @description This is a public method to retrieve the cardDataObj by the provided index.
	 * @param {Number} index extracted from the data attribute "data-index" from the clicked uiCard.
	 */
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
let GameUI = (() => {

	/**
	 * @description GameUI will provide methods for the UI
	 * @returns {Object} GameUI
	 * @returns {function} GameUI.init set/reset the GameUI
	 * @returns {function} GameUI.flipCard UI flip card process
	 * @returns {function} GameUI.hideCards UI hide card process for all the cards within an array.
	 * @returns {function} GameUI.validateMatch UI validate match process for all cards withing an array.
	 * @returns {function} GameUI.updateMovesCounter UI update the moves counter.
	 */


	/**
	 * @description This will hold all the card elements in an array
	 * It uses the spread parameter to convert a nodeList to an array.
	 */
	let uiCards = [...document.querySelectorAll('.card')];


	/**
	 * @description This hold the element of the move counter.
	 */
	let movesCounterElement = document.querySelector("span#moves-counter");

	/**
	 * @description This cardClickHandler created only for the intention to remove the eventListener.
	 * @param {clickEvent} event 
	 */
	const cardClickHandler = (event) => {
		GameController.selectCard(event.currentTarget);
	}

	/**
	 * @description Public method to re-set the GameUI.
	 */
	const init = () => {
		uiCards.forEach(uiCard => {
			uiCard.classList.remove('matched', 'fliped');
			uiCard.addEventListener('click', cardClickHandler);
		});
		movesCounterElement.innerText = 0;
	}

	/**
	 * @description This public method will recieve the dataCardObj from the GameController and use destructuring featur
	 * to extract the index and the back face element use them to select the uiCard, append the backFace element to
	 * and then add the flip class for it.
	 * @param {Object} cardObject Passed from GameController as a selected card.
	 * @param {number} cardObject.index index property will be used to select the uiCard from uiCards array.
	 * @param {HTMLElement} cardObject.backFaceElement BackFaceElement property contain the backface element to be appended the the uiCard element
	 */
	const flipCard = ({index, backFaceElement}) => {
		uiCard = uiCards.filter(card => card.dataset.index == index )[0];
		uiCard.appendChild(backFaceElement);
		uiCard.classList.add('fliped');
	}


	/**
	 * @description This public method will recieve the 2 selected cardObject as an array of 2 elements.
	 * For each cardObject it will use the index prop to select the uiCard from uiCards, remove the "fliped" class from it,
	 * wait some time to confirm that its totaly fliped, then delete the backFace element.
	 * @param {Array} cardsObjArr Contain a selection of 2 cardObject from GameController
	 */
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

	/**
	 * @description This public method will recieve the 2 selected cardObject as an array of 2 elements.
	 * For each cardObject it will use the index prop to select the uiCard from uiCards, remove the "fliped" class from it,
	 * add the "matched" class to it then remove the click eventListener.
	 * @param {Array} cardsObjArr Contain a selection of 2 cardObject from GameController
	 */
	const validateMatch = (cardsObjArr) => {
		cardsObjArr.forEach(cardObj => {
			let {index} = cardObj;
			let card = uiCards.filter(card => card.dataset.index == index)[0];
			
			card.classList.remove('fliped');
			card.classList.add('matched');
			card.removeEventListener('click', cardClickHandler);
		});
	}

	/**
	 * @description This will update the move counter in the UI.
	 * @param {Number} movesCounter 
	 */
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
let GameController = (() => {
	
	
	/**
	 * @description GameController module will handle most of the logic of the game.
	 * It will recieve the clicked uiCard, extract its data-index attribut, use it to get the cardDataObj from
	 * the Deck module, check if its the first or second selection, use setSelectedCardObject method, wich will
	 * save the index property in it, and save it to the appropriate position in selectedCards Array,
	 * then start the match check process.
	 * @returns {object} GameController
	 * @returns {function} GameController.selectCard public method
	 * @returns {function} GameController.init public method for set/reset the game
	 */
	
	//Array to hold the first and second cards selected
	let selectedCards = [];
	
	//Boolean to track whether it's the first or the second selection
	let hasFlipedCard;

	//Boolean to track if the board already have 2 selections, so prevent more than 2 selection
	let boardIsLocked;

	let movesCounter;
	let matchCounter;
	
	/**
	 * @description This function from https://hackernoon.com/lets-make-a-javascript-wait-function-fa3a2eb88f11
	 * @param {number} ms The wait time in milliseconds 
	 */
	const wait = ms => new Promise((r, j)=>setTimeout(r, ms));


	/**
	 * @description Set/Reset the whole Game.
	 */
	const init = () => {
		selectedCards = [];
		hasFlipedCard = false;
		boardIsLocked = false;
		movesCounter = 0;
		matchCounter = 0;
		Deck.init();
		GameUI.init();
	}

	/**
	 * @description This will use the index to grab the dataCardObject using Deck.getCardData(), add the 
	 * index prop for it and return it as cardObject
	 * @param {Number} index Extracted from the data-index attribute of the clicked uiCard.
	 * @returns {Object} cardObject
	 * @returns {string} cardObject.cardData Fontawsome classes to be used in the match test
	 * @returns {HTMLElement} cardObject.backFaceElement to be appended in the flip card process.
	 * @returns {Number} cardObject.index to be used later to call back the uiCard in show/hide/match processes.
	 */
	const setSelectedCardObject = (index) => {
		let cardObject = Deck.getCardData(index);
		cardObject.index = index;
		return cardObject;
	}

	/**
	 * @description this will reset the state after completing 2 cards selection cycle.
	 */
	const resetState = () => {
		selectedCards = [];
		hasFlipedCard = false;
		boardIsLocked = false;
	}

	/**
	 * @description Check the match of the 2 cards object stored in the selectedCards array
	 * according to the cardData proprety of each of them
	 * @returns {boolean}
	 */
	const isMatch = () => selectedCards[0].cardData === selectedCards[1].cardData;

	
	/**
	 * @description The match process, increase the match counter, validate the match in the UI
	 * check if the game completed, than resetState()
	 */
	const match = () => {
		
		matchCounter += 1;
		GameUI.validateMatch(selectedCards);
		
		if (matchCounter >= 8) {
			congratsModal.open();
		}
		resetState();
	}

	/**
	 * @description no Match process, will wait some seconds before it hide the cards in the UI
	 * and resetState()
	 */
	const noMatch = async () => {
		await wait(1500);
		GameUI.hideCards(selectedCards);
		resetState();
	}

	/**
	 * @description This will handle the selection process, it will extract the data-index attribute as index,
	 * check whether its the first selection, the second selection and block the process if its already 2 selections
	 * then trigger the check process and increase the moves counter every selection cycle of 2 cards.
	 * @param {HTMLElement} uiCard The clicked uiCard from the eventListener
	 */
	const selectCard = uiCard => {

		let index = +uiCard.dataset.index;

		//test if the board is locked (if already have 2 selected cards)
		if (boardIsLocked) return;

		//test if its not the same selected card, to prevent self match.
		if (selectedCards[0] && index === selectedCards[0].index) return;

		
		//test whether the first or second selection
		if (!hasFlipedCard) {
			
			selectedCards[0] = setSelectedCardObject(index);
			GameUI.flipCard(selectedCards[0]);
			hasFlipedCard = true;

		} else {

			selectedCards[1] = setSelectedCardObject(index);
			GameUI.flipCard(selectedCards[1]);
			hasFlipedCard = false;
			boardIsLocked = true;
			movesCounter += 1;
			GameUI.updateMovesCounter(movesCounter);
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
	GameController.init();
}


const modal = document.querySelector('#congratsModal');
const modalRepalyBtn = document.querySelector('.modal-footer #replay-btn');
const xBtn = document.querySelector('span.modal-close');

xBtn.onclick = () => congratsModal.close();


window.onclick = (event) => {
	if (event.target === modal) {
		congratsModal.close();
	}
}

modalRepalyBtn.onclick = () => {
	GameController.init();
	congratsModal.close();
};

const congratsModal = (() => {
	const close = () => {
		modal.style.display = 'none';
	};

	const open = () => {
		modal.style.display = 'block';
	}

	return {
		open,
		close
	}
})();



GameController.init();

