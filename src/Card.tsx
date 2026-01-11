interface Props {
	cardNumber: number,
	isPreviousCard?: boolean,
	rollNextCard?: () => void
}

export default function Card({cardNumber, rollNextCard, isPreviousCard = false}: Props) {
	const cardPathPlaceholder = `${import.meta.env.BASE_URL}karty/karta-X.png`;
	const cardPath = cardPathPlaceholder.replace("X", String(cardNumber));
	const cardAlt = "karta-wiedzmin-" + cardNumber;
	
	return (
		isPreviousCard && cardNumber !== 0 || !isPreviousCard
			? (
				<div className={"card"}>
					<div className={"card-image-wrapper"}>
						{
							cardNumber == 0
								? (
									<button onClick={rollNextCard}>
										Rozpocznij Rozgrywkę
									</button>
								)
								: (
									<img src={cardPath} alt={cardAlt}/>
								
								)
						}
					</div>
				</div>
			)
			: null
	);
};

