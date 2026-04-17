const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const levelEl = document.getElementById('level');
const scoreEl = document.getElementById('score');
const targetEl = document.getElementById('target');
const timerEl = document.getElementById('timer');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalScore = document.getElementById('modalScore');
const modalBtn = document.getElementById('modalBtn');
const modalStars = document.getElementById('modalStars');
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
const startModal = document.getElementById('startModal');
const startBtn = document.getElementById('startBtn');

let musicEnabled = true;

const gridSize = 20;
const tileCount = 20;
canvas.width = gridSize * tileCount;
canvas.height = gridSize * tileCount;

let snake = [];
let snakeLength = 3;
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let foods = [];
let score = 0;
let level = 1;
let timeLeft = 60;
let gameLoop;
let timerInterval;
let foodSpawnInterval;
let isGameRunning = false;
let totalScore = 0;
let maxLevel = 5;

const foodTypes = [
    { emoji: '🍪', points: 1, name: 'cookie' },
    { emoji: '🐭', points: 3, name: 'mouse' },
    { emoji: '🐘', points: 10, name: 'elephant' }
];

function initGame() {
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];
    snakeLength = 3;
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    foods = [];
    score = 0;
    timeLeft = 60;
    
    updateUI();
    spawnFood();
}

function startGame() {
    if (isGameRunning) return;
    
    initGame();
    isGameRunning = true;
    
    gameLoop = setInterval(update, 100);
    timerInterval = setInterval(updateTimer, 1000);
    foodSpawnInterval = setInterval(spawnFood, getRandomFoodInterval());
}

function stopGame() {
    isGameRunning = false;
    clearInterval(gameLoop);
    clearInterval(timerInterval);
    clearInterval(foodSpawnInterval);
}

function getRandomFoodInterval() {
    return Math.floor(Math.random() * 2000) + 2000;
}

function spawnFood() {
    let newFood;
    let validPosition = false;
    
    while (!validPosition) {
        newFood = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount),
            type: foodTypes[Math.floor(Math.random() * foodTypes.length)]
        };
        
        validPosition = true;
        for (let segment of snake) {
            if (segment.x === newFood.x && segment.y === newFood.y) {
                validPosition = false;
                break;
            }
        }
        
        for (let food of foods) {
            if (food.x === newFood.x && food.y === newFood.y) {
                validPosition = false;
                break;
            }
        }
    }
    
    foods.push(newFood);
    
    clearInterval(foodSpawnInterval);
    foodSpawnInterval = setInterval(spawnFood, getRandomFoodInterval());
}

function update() {
    direction = { ...nextDirection };
    
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        endGame();
        return;
    }
    
    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            endGame();
            return;
        }
    }
    
    snake.unshift(head);
    
    let ate = false;
    for (let i = foods.length - 1; i >= 0; i--) {
        if (head.x === foods[i].x && head.y === foods[i].y) {
            score += foods[i].type.points;
            snakeLength++;
            foods.splice(i, 1);
            ate = true;
            updateUI();
        }
    }
    
    if (!ate) {
        snake.pop();
    }
    
    while (snake.length > snakeLength) {
        snake.pop();
    }
    
    draw();
}

function draw() {
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < snake.length; i++) {
        const gradient = ctx.createRadialGradient(
            snake[i].x * gridSize + gridSize / 2,
            snake[i].y * gridSize + gridSize / 2,
            0,
            snake[i].x * gridSize + gridSize / 2,
            snake[i].y * gridSize + gridSize / 2,
            gridSize / 2
        );
        if (i === 0) {
            gradient.addColorStop(0, '#4ade80');
            gradient.addColorStop(1, '#22c55e');
        } else {
            gradient.addColorStop(0, '#86efac');
            gradient.addColorStop(1, '#4ade80');
        }
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(
            snake[i].x * gridSize + 1,
            snake[i].y * gridSize + 1,
            gridSize - 2,
            gridSize - 2,
            5
        );
        ctx.fill();
        
        if (i === 0) {
            ctx.fillStyle = 'white';
            const eyeOffset = direction.x !== 0 ? 4 : 0;
            const eyeYOffset = direction.y !== 0 ? 4 : 0;
            ctx.beginPath();
            ctx.arc(
                snake[i].x * gridSize + gridSize / 3 + eyeOffset,
                snake[i].y * gridSize + gridSize / 3 + eyeYOffset,
                3,
                0,
                Math.PI * 2
            );
            ctx.fill();
            ctx.beginPath();
            ctx.arc(
                snake[i].x * gridSize + 2 * gridSize / 3 + eyeOffset,
                snake[i].y * gridSize + gridSize / 3 + eyeYOffset,
                3,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }
    }
    
    ctx.font = `${gridSize - 4}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let food of foods) {
        ctx.fillText(
            food.type.emoji,
            food.x * gridSize + gridSize / 2,
            food.y * gridSize + gridSize / 2
        );
    }
}

function updateTimer() {
    timeLeft--;
    timerEl.textContent = timeLeft;
    
    if (timeLeft <= 0) {
        endGame();
    }
}

function updateUI() {
    levelEl.textContent = level;
    scoreEl.textContent = score;
    targetEl.textContent = getTargetScore();
    timerEl.textContent = timeLeft;
}

function getTargetScore() {
    return 30 + (level - 1) * 10;
}

function endGame() {
    stopGame();
    totalScore = score;
    
    const target = getTargetScore();
    let passed = totalScore >= target;
    let allCleared = passed && level >= maxLevel;
    
    if (allCleared) {
        modalTitle.textContent = '🎉 恭喜通关！';
        modalStars.classList.remove('hidden');
        modalStars.textContent = '⭐⭐⭐⭐⭐';
        modalScore.textContent = `总分数: ${totalScore}`;
        modalBtn.textContent = '重新开始';
    } else if (passed) {
        modalTitle.textContent = '🎉 恭喜过关！';
        modalStars.classList.add('hidden');
        modalScore.textContent = `总分数: ${totalScore}`;
        modalBtn.textContent = '下一局';
    } else {
        modalTitle.textContent = '💔 游戏结束';
        modalStars.classList.add('hidden');
        modalScore.textContent = `总分数: ${totalScore}`;
        modalBtn.textContent = '再来一次';
    }
    
    modal.classList.remove('hidden');
}

function handleModalClick() {
    const target = getTargetScore();
    let passed = totalScore >= target;
    let allCleared = passed && level >= maxLevel;
    
    modal.classList.add('hidden');
    
    if (allCleared) {
        level = 1;
        totalScore = 0;
    } else if (passed) {
        level++;
    }
    
    startGame();
    if (musicEnabled) {
        bgMusic.volume = 0.5;
        bgMusic.play().catch(e => console.log('音乐播放失败:', e));
        musicBtn.textContent = '🔊';
    }
}

function handleStartGame() {
    startModal.classList.add('hidden');
    startGame();
    if (musicEnabled) {
        bgMusic.volume = 0.5;
        bgMusic.play().catch(e => console.log('音乐播放失败:', e));
        musicBtn.textContent = '🔊';
    }
}

document.addEventListener('keydown', (e) => {
    if (!isGameRunning) {
        return;
    }
    
    switch (e.key) {
        case 'ArrowUp':
            if (direction.y !== 1) {
                nextDirection = { x: 0, y: -1 };
            }
            break;
        case 'ArrowDown':
            if (direction.y !== -1) {
                nextDirection = { x: 0, y: 1 };
            }
            break;
        case 'ArrowLeft':
            if (direction.x !== 1) {
                nextDirection = { x: -1, y: 0 };
            }
            break;
        case 'ArrowRight':
            if (direction.x !== -1) {
                nextDirection = { x: 1, y: 0 };
            }
            break;
    }
});

startBtn.addEventListener('click', handleStartGame);

function toggleMusic() {
    musicEnabled = !musicEnabled;
    if (musicEnabled) {
        bgMusic.play().catch(e => console.log('音乐播放失败:', e));
        musicBtn.textContent = '🔊';
    } else {
        bgMusic.pause();
        musicBtn.textContent = '🔇';
    }
}

musicBtn.addEventListener('click', toggleMusic);
modalBtn.addEventListener('click', handleModalClick);

initGame();
musicBtn.textContent = '🔊';
draw();
