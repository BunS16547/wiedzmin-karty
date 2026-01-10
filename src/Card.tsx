export default function Card({cardNumber}: { cardNumber: number }) {
	const cardPathPlaceholder = `${import.meta.env.BASE_URL}karty/karta-X.png`;
	const cardPath = cardPathPlaceholder.replace("X", String(cardNumber));
	const cardAlt = "karta-wiedzmin-" + cardNumber;
	
	return (
		<div className={"card"}>
			<div className={"card-image-wrapper"}>
				{
					cardNumber == 0
						? (
							<h1>
								Rozpocznij Rozgrywkę
							</h1>
						)
						: (
							<img src={cardPath} alt={cardAlt}/>
						
						)
				}
			</div>
		</div>
	);
};

