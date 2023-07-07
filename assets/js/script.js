document.addEventListener("DOMContentLoaded", () => {
    let cards = [
        {
            name: "cheeseburger",
            img: "assets/images/cheeseburger.png"
        },
        {
            name: "hotdog",
            img: "assets/images/hotdog.png"
        },
        {
            name: "ice-cream",
            img: "assets/images/ice-cream.png"
        },
        {
            name: "milkshake",
            img: "assets/images/milkshake.png"
        },
        {
            name: "pizza",
            img: "assets/images/pizza.png"
        }
    ];
    // duplicate
    cards = [...cards, ...cards];

    const cardsChoosen = [];
    const cardsChoosenId = [];
    const cardsWon = [];

    const grid = document.querySelector(".grid");
    const displayScore = document.querySelector("#score");

    cards.sort(() => 0.5 - Math.random());

    createBoard();

    function createBoard() {
        for (let i = 0; i < cards.length; i++) {
            const card = document.createElement("img");
            card.setAttribute("src", "assets/images/blank.png");
            card.setAttribute("data-id", i);
            card.addEventListener("click", flipCard);
            grid.appendChild(card);
        }
    }

    function checkForMatch() {
        const cardImgs = document.querySelectorAll("img");
        const optionOneId = cardsChoosenId[0];
        const optionTwoId = cardsChoosenId[1];
        if (cardsChoosen[0] === cardsChoosen[1]) {
            alert("You found a match");
            cardImgs[optionOneId].setAttribute("src", "assets/images/white.png");
            cardImgs[optionTwoId].setAttribute("src", "assets/images/white.png");
            cardsWon.push(cardsChoosen); 
        } else {
            cardImgs[optionOneId].setAttribute("src", "assets/images/blank.png");
            cardImgs[optionTwoId].setAttribute("src", "assets/images/blank.png");
            alert("Sorry, try again");
        }
        cardsChoosen.splice(0);
        cardsChoosenId.splice(0);
        displayScore.textContent = cardsWon.length;
        if (cardsWon.length === cards.length / 2) {
            displayScore.textContent = "Good you found all cards.";
        }
    }

    function flipCard() {
        const cardId = this.getAttribute("data-id");
        cardsChoosen.push(cards[cardId].name);
        cardsChoosenId.push(cardId);
        this.setAttribute("src", cards[cardId].img);
        if (cardsChoosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }
})