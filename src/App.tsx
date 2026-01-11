import {useState} from "react";
import Card from "./Card.tsx";
import createDeck from "./createDeck.ts";

function App() {
	const [cardNumber, setCardNumber] = useState<number>(0);
	const [cardDeck, setCardDeck] = useState<number[]>(createDeck(36));
	const [canClick, setCanClick] = useState<boolean>(true);
	const [previousNumbers, setPreviousNumbers] = useState<number[]>([]);
	
	const cardCounter = cardDeck.length;
	
	function rand(listLength: number) {
		return Math.floor(Math.random() * listLength);
	}
	
	function delayClick(time: number) {
		setCanClick(false);
		
		setTimeout(() => setCanClick(true), time);
	}
	
	function resetGame() {
		if (cardCounter == 36) {
			return;
		}
		
		setCardNumber(0);
		setCardDeck(createDeck(36));
		setPreviousNumbers([]);
		
		delayClick(500);
	}
	
	function showPreviousCard() {
		if (cardCounter >= 35) {
			return;
		}
		const currCardNumber = cardNumber;
		
		setCardDeck(cards => [...cards, currCardNumber]);
		setCardNumber(previousNumbers[previousNumbers.length - 1] ?? 0);
		
		setPreviousNumbers(previousCards => {
			previousCards.pop();
			return previousCards;
		})
		
		delayClick(3000);
	}
	
	function updateDeckAndCardNumber(randomNumber: number) {
		const currCardNumber = cardNumber;
		
		setCardNumber(randomNumber);
		setCardDeck(cards => {
			return cards.filter(num => num != randomNumber);
		})
		setPreviousNumbers(previousCards => [...previousCards, currCardNumber]);
		
		console.log("Wylosowana: ", randomNumber);
	}
	
	function rollNextCard() {
		if (cardCounter == 0) {
			return;
		}
		
		const randomIndex = rand(cardDeck.length);
		const randomNum = cardDeck[randomIndex];
		
		updateDeckAndCardNumber(randomNum);
		
		delayClick(3000);
	}
	
	const cardCounterLastDigit = Number.parseInt(String(cardCounter).at(-1) ?? "0");
	
	const textMessage = cardCounter > 0
		? `Pozostał${cardCounterLastDigit > 0
			? cardCounterLastDigit == 1
				? cardCounter == 1
					? "a"
					: "o"
				: cardCounterLastDigit < 5
					? "y"
					: "o"
			: "o"}
		 ${cardCounter}
		 kart${cardCounterLastDigit == 1
			? cardCounter == 1 ? "a" : ""
			: cardCounterLastDigit < 5
				? "y"
				: ""} eksploracji miast`
		: "Nie pozostały żadne inne karty";
	
	return (
		
		<>
			<div className={"button-start-wrapper"}>
				<button className={"go-to-app"}>
					<a href={"#info-text"}>Przejdź do gry</a>
				</button>
			</div>
			
			<div className={"main-container"} id={"main-container"}>
				<h1 className={"info-text"} id={"info-text"}>
					{textMessage}
				</h1>
				
				<button className={"reset-game"} onClick={resetGame} disabled={cardCounter == 36 || !canClick}>
					Zresetuj Rozgrywkę
				</button>
				
				<main>
					<div className={"card-wrapper"}>
						<Card cardNumber={cardNumber} rollNextCard={rollNextCard}/>
					</div>
					
					<div className={"action-buttons"}>
						<button className={"roll-next-card"} onClick={rollNextCard}
						        disabled={cardCounter == 0 || cardCounter == 36 || !canClick}>
							Wylosuj kartę
						</button>
						
						<button className={"show-previous-card"} onClick={showPreviousCard}
						        disabled={cardCounter >= 35 || !canClick}>
							Przywróć kartę
						</button>
					
					</div>
				</main>
			</div>
		</>
	
	)
}

export default App
