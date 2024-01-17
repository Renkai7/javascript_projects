const quoteContainer = document.querySelector("#quote-container");
const btnGenerate = document.querySelector("#generate-button");

const narutoQuotes = [
	"I'm not gonna run away, I never go back on my word! That's my nindo: my ninja way!",
	"Believe it!",
	"When you have to save someone you care about, you must not let anything stand in your way.",
	"I don't want to conquer anything. I just think the guy with the most freedom in this whole ocean...he's the Pirate King!",
	"A person grows up when he's able to overcome hardships. Protection is important, but there are some things that a person must learn on his own.",
];

const generateRandomQuote = function () {
	quoteContainer.innerHTML = "";
	const randomNum = Math.floor(Math.random() * narutoQuotes.length);
	const quote = narutoQuotes[randomNum];
	const html = `<h2><q> ${quote} </q></h2>`;
	quoteContainer.insertAdjacentHTML("beforeend", html);
};

const init = function () {
	generateRandomQuote();
};

init();

btnGenerate.addEventListener("click", generateRandomQuote);
