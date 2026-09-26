let dimension = 150;
let imgStart = Math.floor(Math.random() * 100) + 1;
let firstCard = null;
let secondCard = null;
let timerDisplay = document.getElementById('timer');
let resultDisplay = document.getElementById('result');
let lockBoard = false;
const monMain = document.querySelector('main');
const boutonRestart=document.getElementById('restart');
let moves = 0;
let matchedCount = 0;
let seconds = 0;
let timerInterval = null;

boutonRestart.addEventListener('click', () => initGame());

let images = [];
for (let i = imgStart; i <= imgStart + 7; i++) {
    images.push(`https://picsum.photos/seed/${i}/${dimension}/${dimension}`);
}

let cards = [...images, ...images];

function shuffle(array) {
    
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function formatTime(sec) {
    return `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;
}

function startTimer() {
   
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        seconds++;
        if (timerDisplay) timerDisplay.textContent = formatTime(seconds); 
    }, 1000);
}

function initGame() {
   
    if (monMain) monMain.innerHTML = '';
    
    clearInterval(timerInterval);
    lockBoard = false;
    firstCard = null;
    secondCard = null;
    moves = 0;
    matchedCount = 0;
    seconds = 0;
    if (timerDisplay) timerDisplay.textContent = formatTime(seconds);
    timerInterval = null;

    shuffle(cards);
    cards.forEach((imgURL) => {
        let nouvelElement = document.createElement('div');
        nouvelElement.classList.add('card');
        nouvelElement.dataset.url = imgURL;
        nouvelElement.setAttribute('role', 'button');
        nouvelElement.setAttribute('tabindex', '0');
        
     
        nouvelElement.addEventListener('click', () => {
            
            
                handleCardClick(nouvelElement);
            
            
            });
        nouvelElement.addEventListener('animationend', () => {
            nouvelElement.classList.remove('flip-horizontal-bottom');
        });
        if (monMain) monMain.appendChild(nouvelElement);
    });
}

function checkVictory() {
   
    if (matchedCount === images.length) {
        clearInterval(timerInterval);
        if (resultDisplay) resultDisplay.textContent = `Vous avez gagné en ${moves} coups !`;
    }
}

function handleCardClick(card) {
    
    if (!timerInterval) startTimer();

    
    if (lockBoard || card === firstCard || card.classList.contains('match')) {
        return;
    }
    card.classList.add('flip-horizontal-bottom');
    setTimeout(()=>{
        card.innerHTML = `<img src="${card.dataset.url}" alt="image de la carte" style="border-radius:20px; pointer-events: none; width: 100%; height: 100%;">`;
    },400);
    

    if (firstCard === null) {
        firstCard = card;
    } else {
        secondCard = card;
        lockBoard = true;
        moves++;
        checkMatch();
    }
}

function checkMatch() {
    
    if (firstCard.dataset.url === secondCard.dataset.url) {
        firstCard.classList.add('match');
        secondCard.classList.add('match');
        matchedCount++;
        resetBoard(); 
        checkVictory();
    } else {
        setTimeout(() => {
            firstCard.innerHTML = '';
            secondCard.innerHTML = '';
            resetBoard(); 
        }, 800);
    }
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

initGame();