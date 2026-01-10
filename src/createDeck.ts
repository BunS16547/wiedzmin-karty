export default function createDeck(lengthDeck: number) {
	return Array.from({length: lengthDeck}, (_, i) => i + 1);
}