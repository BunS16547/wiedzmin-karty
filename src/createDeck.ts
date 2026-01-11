export default function createDeck(lengthDeck: number) {
	const deck = Array.from({length: lengthDeck}, (_, i) => i + 1);
	
	let shuffledDeck = shuffle(deck);
	
	for (let i = 0; i < 3; i++) {
		shuffledDeck = shuffle(shuffledDeck);
	}
	
	return shuffledDeck;
}

function shuffle(array: number[]) {
//   set the index to the arrays length
	let i = array.length;
	let j, temp;
//   create a loop that subtracts everytime it iterates through
	while (--i > 0) {
//  create a random number and store it in a variable
		j = Math.floor(Math.random() * (i + 1));
// create a temporary position from the item of the random number
		temp = array[j];
// swap the temp with the position of the last item in the array
		array[j] = array[i];
// swap the last item with the position of the random number
		array[i] = temp;
	}
	
	return array;
// return[execute] the array when it completes::don't really need the console.log but helps to check
}