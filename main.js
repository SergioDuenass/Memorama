const memoramaGrid = document.getElementById('memorama-grid');
const cards = [];

const images = [
    'imagen-1.png',
    'imagen-2.png',
    'imagen-3.png',
    'imagen-4.png',
    'imagen-5.png',
    'imagen-6.png',
    'imagen-7.png',
    'imagen-8.png',
    'imagen-9.png',
    'imagen-10.png',
];

// Duplicar la matriz de imágenes
const doubledImages = images.concat(images);

let flippedCards = [];
let matchedCards = [];

function createCard(image) {
    const card = document.createElement('div');
    card.classList.add('memorama-card');
    const img = document.createElement('img');
    img.src = `imagenes/${image}`;
    card.appendChild(img);
    card.addEventListener('click', () => flipCard(card));
    return card;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function flipCard(card) {
    if (flippedCards.length < 2 && !flippedCards.includes(card) && !matchedCards.includes(card)) {
        card.querySelector('img').style.display = 'block';
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            setTimeout(checkForMatch, 1000);
        }
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.querySelector('img').src === card2.querySelector('img').src) {
        matchedCards.push(card1, card2);
        if (matchedCards.length === doubledImages.length * 2) {
            setTimeout(() => alert('¡Has ganado!'), 500);
        }
    } else {
        card1.querySelector('img').style.display = 'none';
        card2.querySelector('img').style.display = 'none';
    }
    flippedCards = [];
}

// Mezclar las imágenes duplicadas
shuffle(doubledImages);

// Crear una tarjeta para cada imagen duplicada
doubledImages.forEach(image => {
    const card = createCard(image);
    memoramaGrid.appendChild(card);
});
