const quizData = {
    easy: [
        { question: "What is the largest planet in our solar system?", choices: ["Earth", "Jupiter", "Mars", "Venus"], correct: 1 },
        { question: "What is the capital city of Italy?", choices: ["Rome", "Paris", "Madrid", "Berlin"], correct: 0 },
        { question: "Which ocean is the deepest?", choices: ["Atlantic", "Indian", "Arctic", "Pacific"], correct: 3 },
        { question: "How many continents are there on Earth?", choices: ["5", "6", "7", "8"], correct: 2 },
        { question: "Which country is famous for the Eiffel Tower?", choices: ["Germany", "France", "Spain", "Italy"], correct: 1 },
        { question: "What is the smallest planet in our solar system?", choices: ["Mercury", "Venus", "Earth", "Mars"], correct: 0 },
        { question: "What is the capital of Japan?", choices: ["Seoul", "Tokyo", "Beijing", "Bangkok"], correct: 1 },
        { question: "Which animal is known as the 'King of the Jungle'?", choices: ["Tiger", "Lion", "Elephant", "Leopard"], correct: 1 },
        { question: "What is the national language of Canada?", choices: ["English", "French", "Spanish", "Both English and French"], correct: 3 },
        { question: "What is the boiling point of water?", choices: ["90°C", "100°C", "110°C", "120°C"], correct: 1 }
    ],
    medium: [
        { question: "Who painted the 'Starry Night'?", choices: ["Pablo Picasso", "Claude Monet", "Vincent van Gogh", "Leonardo da Vinci"], correct: 2 },
        { question: "Which planet is known as the Earth's twin?", choices: ["Mars", "Venus", "Jupiter", "Saturn"], correct: 1 },
        { question: "What is the longest river in the world?", choices: ["Amazon", "Nile", "Yangtze", "Mississippi"], correct: 1 },
        { question: "Which element has the chemical symbol 'Na'?", choices: ["Sodium", "Nitrogen", "Nickel", "Neon"], correct: 0 },
        { question: "Which country hosted the 2016 Summer Olympics?", choices: ["China", "Brazil", "UK", "Russia"], correct: 1 },
        { question: "Who wrote the play 'Romeo and Juliet'?", choices: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"], correct: 2 },
        { question: "Which planet has the most moons?", choices: ["Earth", "Mars", "Jupiter", "Saturn"], correct: 3 },
        { question: "What is the capital of Australia?", choices: ["Sydney", "Melbourne", "Canberra", "Brisbane"], correct: 2 },
        { question: "Who discovered penicillin?", choices: ["Alexander Fleming", "Marie Curie", "Albert Einstein", "Isaac Newton"], correct: 0 },
        { question: "What is the currency of Japan?", choices: ["Dollar", "Won", "Yen", "Peso"], correct: 2 }
    ],
    hard: [
        { question: "What is the smallest bone in the human body?", choices: ["Stapes", "Femur", "Radius", "Ulna"], correct: 0 },
        { question: "Which scientist proposed the theory of evolution by natural selection?", choices: ["Isaac Newton", "Albert Einstein", "Charles Darwin", "Galileo Galilei"], correct: 2 },
        { question: "What is the most abundant gas in the Earth's atmosphere?", choices: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correct: 2 },
        { question: "Who is known as the 'Father of Geometry'?", choices: ["Pythagoras", "Euclid", "Archimedes", "Aristotle"], correct: 1 },
        { question: "What is the largest desert in the world?", choices: ["Sahara", "Gobi", "Arctic", "Antarctic"], correct: 3 },
        { question: "Who wrote the novel '1984'?", choices: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "Jules Verne"], correct: 0 },
        { question: "Which element has the highest melting point?", choices: ["Iron", "Tungsten", "Gold", "Carbon"], correct: 1 },
        { question: "What is the chemical formula for table salt?", choices: ["NaCl", "KCl", "CaCl2", "MgCl2"], correct: 0 },
        { question: "Who developed the first successful polio vaccine?", choices: ["Jonas Salk", "Louis Pasteur", "Robert Koch", "Edward Jenner"], correct: 0 },
        { question: "What is the tallest mountain in the world?", choices: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"], correct: 2 }
    ]
};
let currentLevel = 'easy';
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 120; // 2 minutes for the quiz
let answers = [];

function startQuiz(level) {
    currentLevel = level;
    currentQuestionIndex = 0;
    score = 0;
    answers = [];
    document.getElementById('level-selector').style.display = 'none';
    document.getElementById('quiz-content').style.display = 'block';
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    const currentQuestion = quizData[currentLevel][currentQuestionIndex];
    document.getElementById('question').innerText = currentQuestion.question;
    const choices = document.getElementById('choices');
    choices.innerHTML = '';
    currentQuestion.choices.forEach((choice, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<input type="radio" name="choice" value="${index}"> ${choice}`;
        choices.appendChild(li);
    });

    // Retain the selected answer if the user goes back to the previous question
    if (answers[currentQuestionIndex] !== undefined) {
        document.querySelector(`input[name="choice"][value="${answers[currentQuestionIndex]}"]`).checked = true;
    }
}

function nextQuestion() {
    saveAnswer();
    if (currentQuestionIndex < quizData[currentLevel].length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

function prevQuestion() {
    saveAnswer();
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function saveAnswer() {
    const selectedOption = document.querySelector('input[name="choice"]:checked');
    if (selectedOption) {
        answers[currentQuestionIndex] = parseInt(selectedOption.value);
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time-left').innerText = formatTime(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitQuiz();
        }
    }, 1000);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function submitQuiz() {
    clearInterval(timer);
    saveAnswer();
    calculateScore();
    showResult();
}

function calculateScore() {
    quizData[currentLevel].forEach((question, index) => {
        if (answers[index] === question.correct) {
            score++;
        }
    });
}

function showResult() {
    document.getElementById('quiz-content').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('score').innerText = `${score} / 10`;

    const correctAnswersDiv = document.getElementById('correct-answers');
    correctAnswersDiv.innerHTML = '<h3>Correct Answers:</h3>';
    const ul = document.createElement('ul');
    quizData[currentLevel].forEach((question, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${question.question} <br> Your answer: ${question.choices[answers[index] !== undefined ? answers[index] : "Not answered"]}`;
        if (answers[index] !== question.correct) {
            li.innerHTML += `<br> Correct answer: ${question.choices[question.correct]}`;
            li.style.color = 'red';
        } else {
            li.style.color = 'green';
        }
        ul.appendChild(li);
    });
    correctAnswersDiv.appendChild(ul);
}
