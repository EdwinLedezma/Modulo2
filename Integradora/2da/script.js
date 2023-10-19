// Define las preguntas y las respuestas con sus valores y categorías
const questions = [
    {
        category: "Mecanica",
        question: "¿Te gusta armar y desarmar objetos mecánicos?",
        options: [
            { text: "Si", value: 2 },
            { text: "No", value: 0 },
            { text: "No se", value: 1 },
        ],
    },
    {
        category: "Calculo",
        question: "¿Te gustan las matemáticas?",
        options: [
            { text: "Júpiter", value: 10 },
            { text: "Tierra", value: 0 },
            { text: "Marte", value: 0 },
        ],
    },
    {
        category: "Cientifico",
        question: "¿Te interesa estudiar la estructura de las plantas y los animales?",
        options: [
            { text: "William Shakespeare", value: 10 },
            { text: "Charles Dickens", value: 0 },
            { text: "Jane Austen", value: 0 },
        ],
    },
    {
        category: "Expresivas",
        question: "¿Disfrutas discutiendo en clase?",
        options: [
            { text: "Júpiter", value: 10 },
            { text: "Tierra", value: 0 },
            { text: "Marte", value: 0 },
        ],
    },
    {
        category: "Persuasivas",
        question: "¿Te gusta escribir cuentos, crónicas o artículos?",
        options: [
            { text: "Júpiter", value: 10 },
            { text: "Tierra", value: 0 },
            { text: "Marte", value: 0 },
        ],
    },
    {
        category: "Organizacion",
        question: "¿Sueles mantener tus libros y cuadernos ordenados?",
        options: [
            { text: "Júpiter", value: 10 },
            { text: "Tierra", value: 0 },
            { text: "Marte", value: 0 },
        ],
    },
    // Agrega más preguntas y categorías aquí...
    {
        category: "Aptitud Mecanica",
        question: "¿Te sientes cómodo manejando herramientas y maquinaria?",
        options: [
            { text: "París", value: 10 },
            { text: "Londres", value: 0 },
            { text: "Madrid", value: 0 },
        ],
    },
    {
        category: "Calculo",
        question: "¿Te gustaría resolver problemas de aritmética?",
        options: [
            { text: "Júpiter", value: 10 },
            { text: "Tierra", value: 0 },
            { text: "Marte", value: 0 },
        ],
    },
    {
        category: "Cientifico",
        question: "¿Disfrutas haciendo experimentos en Biología, Física o Química?",
        options: [
            { text: "William Shakespeare", value: 10 },
            { text: "Charles Dickens", value: 0 },
            { text: "Jane Austen", value: 0 },
        ],
    },
    {
        category: "Expresivas",
        question: "¿Te gustaría liderar un club o sociedad?",
        options: [
            { text: "Júpiter", value: 10 },
            { text: "Tierra", value: 0 },
            { text: "Marte", value: 0 },
        ],
    },
    {
        category: "Persuasivas",
        question: "¿Te interesa la lectura?",
        options: [
            { text: "Júpiter", value: 10 },
            { text: "Tierra", value: 0 },
            { text: "Marte", value: 0 },
        ],
    },
    {
        category: "Organizacion",
        question: "¿Te gustaría encargarte de ordenar y clasificar los libros de una biblioteca?",
        options: [
            { text: "Júpiter", value: 10 },
            { text: "Tierra", value: 0 },
            { text: "Marte", value: 0 },
        ],
    },
    // Agrega más preguntas y categorías aquí...
];

// Variable para el seguimiento del juego
let currentQuestion = 0;
let totalScore = 0;

// Objeto para el seguimiento de la puntuación por categoría
const categoryScores = {};
const categoryQuestionCounts = {};

// Elementos del DOM
const userInfoForm = document.getElementById("userInfoForm");
const quizContainer = document.getElementById("quizContainer");
const nextButton = document.getElementById("nextButton");
const results = document.getElementById("results");
const scoreText = document.getElementById("score");

// Cambio: Agregamos un evento click al botón "Comenzar el Test"
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", startQuiz);

function startQuiz() {
    userInfoForm.style.display = "none"; // Oculta el formulario de información del usuario
    quizContainer.style.display = "block"; // Muestra el contenedor de preguntas
    loadQuestion(); // Carga la primera pregunta
}

function loadQuestion() {
    const questionData = questions[currentQuestion];

    // Verifica si hemos alcanzado la última pregunta
    if (currentQuestion >= questions.length) {
        showResults(); // Muestra los resultados finales
        return;
    }

    // Limpia el contenedor de preguntas
    quizContainer.innerHTML = "";

    // Crea un elemento de pregunta y muestra el texto de la pregunta junto con la categoría
    const questionElement = document.createElement("div");
    questionElement.innerHTML = `<p>Categoría: ${questionData.category}</p><p>${questionData.question}</p>`;
    quizContainer.appendChild(questionElement);

    // Crea y muestra las opciones de respuesta como radio buttons
    questionData.options.forEach((option, index) => {
        const optionElement = document.createElement("input");
        optionElement.type = "radio";
        optionElement.name = "answer";
        optionElement.value = index;

        const optionText = document.createElement("label");
        optionText.innerText = option.text;

        quizContainer.appendChild(optionElement);
        quizContainer.appendChild(optionText);
    });

    // Muestra el botón "Siguiente"
    nextButton.style.display = "block";
}

function nextQuestion() {
    // Obtén la respuesta seleccionada por el usuario
    const selectedOption = document.querySelector("input[name='answer']:checked");

    // Si no se seleccionó ninguna respuesta, muestra una alerta
    if (!selectedOption) {
        alert("Por favor, selecciona una respuesta.");
        return;
    }

    // Agrega la puntuación de la respuesta seleccionada al marcador total
    const selectedOptionIndex = parseInt(selectedOption.value);
    totalScore += questions[currentQuestion].options[selectedOptionIndex].value;

    // Agrega la puntuación de la respuesta seleccionada a la categoría correspondiente
    const category = questions[currentQuestion].category;
    if (!categoryScores[category]) {
        categoryScores[category] = 0;
        categoryQuestionCounts[category] = 0;
    }
    categoryScores[category] += questions[currentQuestion].options[selectedOptionIndex].value;
    categoryQuestionCounts[category]++;

    // Incrementa el contador de preguntas
    currentQuestion++;

    // Limpia la selección de opciones
    document.querySelector("input[name='answer']:checked").checked = false;

    // Carga la siguiente pregunta
    loadQuestion();
}

function showResults() {
    // Oculta el contenedor de preguntas y el botón "Siguiente"
    quizContainer.style.display = "none";
    nextButton.style.display = "none";

    // Muestra el contenedor de resultados
    results.style.display = "block";

    // Muestra la puntuación final
    scoreText.innerHTML = `Puntuación total: ${totalScore}`;

    // Muestra la puntuación promedio por categoría
    for (const category in categoryScores) {
        const averageScore = categoryScores[category] / categoryQuestionCounts[category];
        const categoryScoreElement = document.createElement("p");
        categoryScoreElement.innerHTML = `<strong>${category}:</strong>Promedio: ${averageScore.toFixed(2)}`;
        scoreText.appendChild(categoryScoreElement);
    }
}

// Inicia el juego cuando se hace clic en "Comenzar el Test"
startButton.addEventListener("click", startQuiz);
