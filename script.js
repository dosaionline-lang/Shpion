const words = {
    science: ["Адронный коллайдер", "Черная дыра", "ДНК", "Периодическая таблица", "Гравитация", "Квантовый компьютер"],
    entertainment: ["Диснейленд", "Кинематограф", "Рок-концерт", "Цирк", "Караоке", "Виртуальная реальность"],
    places: ["Эйфелева башня", "Великая Китайская стена", "Пирамиды Гизы", "Статуя Свободы", "Колизей", "Лувр"]
};

let players = [];
let currentIndex = 0;
let timerInterval;

function startGame() {
    const count = document.getElementById('playerCount').value;
    const cat = document.getElementById('category').value;
    const selectedWord = words[cat][Math.floor(Math.random() * words[cat].length)];
    
    // Создаем массив ролей
    players = new Array(parseInt(count)).fill(selectedWord);
    const spyIndex = Math.floor(Math.random() * count);
    players[spyIndex] = "🕵️ ТЫ ШПИОН!";

    currentIndex = 0;
    document.getElementById('setup').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');
    updateTurn();
}

function revealCard() {
    const card = document.getElementById('card');
    if (!card.classList.contains('is-flipped')) {
        document.getElementById('roleText').innerText = players[currentIndex];
        card.classList.add('is-flipped');
        document.getElementById('nextBtn').classList.remove('hidden');
    }
}

function nextPlayer() {
    currentIndex++;
    const card = document.getElementById('card');
    card.classList.remove('is-flipped');
    document.getElementById('nextBtn').classList.add('hidden');

    if (currentIndex < players.length) {
        updateTurn();
    } else {
        showTimer();
    }
}

function updateTurn() {
    document.getElementById('playerTurn').innerText = `Игрок ${currentIndex + 1}, смотри карточку`;
}

function showTimer() {
    document.getElementById('game').classList.add('hidden');
    document.getElementById('timerScreen').classList.remove('hidden');
    startTimer(300); // 5 минут
}

function startTimer(duration) {
    let timer = duration, minutes, seconds;
    timerInterval = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        document.getElementById('timer').textContent = minutes + ":" + seconds;
        if (--timer < 0) clearInterval(timerInterval);
    }, 1000);
}

function resetGame() {
    clearInterval(timerInterval);
    document.getElementById('timerScreen').classList.add('hidden');
    document.getElementById('setup').classList.remove('hidden');
}
