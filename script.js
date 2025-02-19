let currentQuestion = 0;  // Номер текущего вопроса
let questionsAnswered = 0;  // Количество правильных ответов
let wrongAnswers = [];  // Массив для хранения неправильных ответов
let userChoices = [];  // Массив для хранения выбора пользователя

// Массив вопросов с вариантами ответов
const questions = [
    {
        question: 'Когда у нас все началось? :)',
        answers: ['23 декабря 2011', '24 декабря 2011', '21 декабря 2012', '1 января 2012'],
        correct: 0  // Индекс правильного ответа
    },
    {
        question: 'Что за фильм мы тогда смотрели?',
        answers: ['Iron man', 'Iron man 2 часть', 'Шерлок', 'Шерлок 2 часть'],
        correct: 3
    },
    {
        question: 'Наш Первый поцелуй',
        answers: ['31 декабря 2011', '31 декабря 2012', '1 января 2011', '1 января 2012'],
        correct: 3
    },
    {
        question: 'А когда я тебе сделал предложение? это было смешно и сонно и квестово',
        answers: ['17 октября 2013', '17 октября 2014', '23 декабря 2014', '14 февраля 2014'],
        correct: 1
    },
    {
        question: 'А когда мы с тобой первый раз на море поехали вместе?',
        answers: ['Май 2012', 'Июнь 2013', 'Июль 2014', 'Октябрь 2015'],
        correct: 0
    },
    {
        question: 'А когда за границу первый раз сгоняли?',
        answers: ['Март 2013', 'Апрель 2014', 'Август 2013', 'Апрель 2013'],
        correct: 3
    },
    {
        question: 'А когда мы на западную в горы ездили отдыхать?',
        answers: ['Июнь 2014', 'Июль 2015', 'Август 2013', 'Июнь 2015'],
        correct: 3
    },
    {
        question: 'А с малым когда мы первый раз ездили отдыхать?',
        answers: ['Июль 2017', 'Июнь 2017', 'Октябрь 2016', 'Май 2017'],
        correct: 2
    },
    {
        question: 'Ок. А когда мы с малым первый раз в Европу поехали?',
        answers: ['Май 2017', 'Июнь 2017', 'Ноябрь 2017', 'Июль 2017'],
        correct: 3
    },
    {
        question: 'Тот самый день на острове Майтон(Тайланд)?',
        answers: ['1 Января 2018', '14 Февраля 2018', '23 Декабря 2017', '22 Января 2018'],
        correct: 3
    }
];

// Функция для отображения вопроса и вариантов ответа
function askQuestion() {
    const questionData = questions[currentQuestion];
    document.getElementById('question').style.display = 'block';
    document.getElementById('question-text').textContent = questionData.question;
	
	    // Стили для выделения текста вопроса
    const questionElement = document.getElementById('question-text');
    questionElement.style.color = 'black';  // Белый цвет текста
    questionElement.style.textShadow = '2px 2px 5px rgba(255, 255, 255, 0.7)';  // Белая тень для текста
    questionElement.style.fontSize = '24px';  // Увеличенный размер шрифта


    const answersContainer = document.getElementById('answers');
    answersContainer.innerHTML = '';  // Очищаем контейнер с предыдущими ответами

    questionData.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.onclick = () => checkAnswer(index, answer);
        answersContainer.appendChild(button);
    });

    // Скрываем сообщение об ошибке
    document.getElementById('wrong-answer-message').style.display = 'none';
}

// Функция для проверки ответа
function checkAnswer(selectedIndex, selectedAnswer) {
    const correctIndex = questions[currentQuestion].correct;

    // Записываем выбор пользователя
    userChoices.push({ question: questions[currentQuestion].question, answer: selectedAnswer });


    if (selectedIndex === correctIndex) {
        questionsAnswered++;
        // Открываем часть картинки по мере ответов
        document.querySelector('.image').style.clipPath = `inset(0 ${100 - (questionsAnswered * 10)}% 0 0)`; 

        if (questionsAnswered === 10) {
            // После 10-го правильного ответа снимаем блюр
            document.querySelector('.image').style.filter = 'blur(0px)';
            document.getElementById('quiz-text').style.display = 'none';  // Убираем надпись
            alert('Поздравляем! Вы открыли всю картинку!');
        }

        // Переход к следующему вопросу
        currentQuestion++;
        if (currentQuestion < 10) {
            setTimeout(() => {
                askQuestion();  // Показываем следующий вопрос
            }, 1000); // Пауза перед следующим вопросом
        } else {
            document.getElementById('question').style.display = 'none';  // Скрываем вопросы после 10-го
            //sendStatistics();  // Отправляем статистику в Telegram
			finishQuiz();
        }
    } else {
        // Записываем неправильный ответ в массив
        wrongAnswers.push({ question: questions[currentQuestion].question, answer: selectedAnswer });

        // Показываем сообщение о неправильном ответе
        document.getElementById('wrong-answer-message').style.display = 'block';
    }
}

function finishQuiz() {
    let quizElement = document.querySelector('.quiz');
    let imageElement = document.querySelector('.image');

    quizElement.style.opacity = '0';
    quizElement.style.transform = 'translate(-50%, -60%)';
    
    setTimeout(() => {
        quizElement.style.display = 'none'; // Полностью скрываем после анимации
    }, 500);

    imageElement.style.filter = 'blur(0px)'; // Убираем блюр после завершения викторины
}

// Показываем первый вопрос
askQuestion();
