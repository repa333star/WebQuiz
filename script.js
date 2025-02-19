let currentQuestion = 0;  // Номер текущего вопроса
let questionsAnswered = 0;  // Количество правильных ответов

// Массив вопросов
const questions = [
    'Какой правильный ответ для вопроса 1?',
    'Какой правильный ответ для вопроса 2?',
    'Какой правильный ответ для вопроса 3?',
    'Какой правильный ответ для вопроса 4?',
    'Какой правильный ответ для вопроса 5?',
    'Какой правильный ответ для вопроса 6?',
    'Какой правильный ответ для вопроса 7?',
    'Какой правильный ответ для вопроса 8?',
    'Какой правильный ответ для вопроса 9?',
    'Какой правильный ответ для вопроса 10?'
];

// Функция, чтобы показать вопрос
function askQuestion() {
    document.getElementById('question').style.display = 'block';
    document.getElementById('question-text').textContent = questions[currentQuestion];
}

// Функция для обработки ответа
function checkAnswer(isCorrect) {
    if (isCorrect) {
        questionsAnswered++;
        // Открываем часть картинки по мере ответов
        document.querySelector('.image').style.clipPath = `inset(0 ${100 - (questionsAnswered * 10)}% 0 0)`; 

        if (questionsAnswered === 10) {
            // После 10-го правильного ответа снимаем блюр
            document.querySelector('.image').style.filter = 'blur(0px)';
            alert('Поздравляем! Вы открыли всю картинку!');
        }
    }
    currentQuestion++;
    if (currentQuestion < 10) {
        askQuestion();  // Показываем следующий вопрос
    } else {
        document.getElementById('question').style.display = 'none';  // Скрыть вопросы после 10-го
    }
}

// Показываем первый вопрос
askQuestion();
