import './App.css'
import {useState} from "react";
import Card from "./Card.tsx";
import createDeck from "./createDeck.ts";

function App() {
	const [cardNumber, setCardNumber] = useState<number>(0);
	const [cardDeck, setCardDeck] = useState<number[]>(createDeck(36));
	const [canClick, setCanClick] = useState<boolean>(true);
	
	const cardCounter = cardDeck.length;
	
	function delayClick(time: number) {
		setCanClick(false);
		
		setTimeout(() => setCanClick(true), time);
	}
	
	function rand(listLength: number) {
		return Math.floor(Math.random() * listLength);
	}
	
	function removeCardFromDeck(numberToRemove: number) {
		setCardDeck(rolledNums => {
			return rolledNums.filter(num => num != numberToRemove);
		})
	}
	
	function resetCards() {
		
		setCardNumber(0);
		setCardDeck(createDeck(36));
		delayClick(2000);
	}
	
	function lowerCardCounter(randomNumber: number) {
		setCardNumber(randomNumber);
		removeCardFromDeck(randomNumber);
		
		console.log("Wylosowana: ", randomNumber);
	}
	
	function rollNumber() {
		if (cardCounter == 0) {
			return;
		}
		
		const randomIndex = rand(cardDeck.length);
		const randomNum = cardDeck[randomIndex];
		
		lowerCardCounter(randomNum);
		delayClick(3000);
	}
	
	const textMessage = cardCounter > 0
		? `Pozostał${cardCounter == 1 ? "a" : cardCounter < 5 ? "y" : "o"} ${cardCounter} kart${cardCounter == 1 ? "a" : cardCounter < 5 ? "y" : ""} eksploracji miast`
		: "Nie pozostały żadne inne karty";
	
	// 30, 9, 6, 4, 8, 6, 9
	
	return (
		<div className={"main-container"}>
			<div className={"absolute-text"}>
				{textMessage}
			</div>
			
			<main>
				<div className={"card-wrapper"}>
					<Card cardNumber={cardNumber}/>
				</div>
				
				<div className={"action-buttons"}>
					<button className={"roll-card"} onClick={rollNumber} disabled={cardCounter == 0 || !canClick}>
						Wylosuj Kartę
					</button>
					
					<button className={"reset"} onClick={resetCards} disabled={cardCounter == 36 || !canClick}>
						Zresetuj Grę
					</button>
				
				</div>
			</main>
		</div>
	)
}

export default App
