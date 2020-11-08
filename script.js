//get element selections: 
const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")
const encourageStatement = document.getElementById("encouragement")

//allows questions to suffle: 
let shuffledQuestions, currentQuestionIndex



//event type based on element type
startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})



// function that begins the game
function startGame() {
    //console.log("started");
    startButton.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove("hide")
    setNextQuestion()
}

//this function sets what the next question will be: 
function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

//this function makes the question actually project on the dom
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button") //i may be able to project text instead of creating a new button element. 
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            // this line sets a data attribute to our button 
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button) //if I do project the text on the existing elements as commented on line 38 , I'll need to modify this line too. 
    })
}

//this sets all of the visible components back to their original settings
function resetState() {
    nextButton.classList.add("hide")
     while (answerButtonsElement.firstChild) {
         answerButtonsElement.removeChild(answerButtonsElement.firstChild)
     }
 }


//function that selects the answer
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove("hide")
    }
}

//I have to modify this to instead of modifying the class - display a message that the answer was or was not correct. 

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
        //encourageStatement.innerHTML = "Yay correct is answer!"
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}


//sets questions arrays
const questions = [
    {
        question: "The Simpsons originally appeared as a short on what TV show?",
        answers: [
            { text: "The Tracy Ullman Show", correct: true },
            { text: "SNL", correct: false },
            { text: "Family Guy", correct: false },
            { text: "NPR", correct: false }
        ]
    },
    {
        question: "Who founded Springfield?",
        answers: [
            { text: "Mayor Quimby", correct: false },
            { text: "Jebediah Springfield", correct: true },
            { text: "Homer Simpson", correct: false },
            { text: "Super Intendant Chalmers", correct: false }

        ]
    },
    {
        question: "Which of the following is not a Bart Simpson catch-phrase?",
        answers: [
            { text: "Eat My Shorts!", correct: false },
            { text: "Don't have a cow, man!", correct: false },
            { text: "Ha-Ha!", correct: true },
            { text: "Aye, caramba!", correct: false }
        ]
    },
    {
        question: "What kind of beer is usually served at Moe's Tavern?",
        answers: [
            { text: "Budwiser", correct: false },
            { text: "Bush", correct: false },
            { text: "Duff", correct: true },
            { text: "Corona", correct: false }
        ]
    }
]

// questions[0].answers[0].text;


// var person = {
//     firstName: "Hannah",
//     lastName: "Folk",
//     eat: function () {
//         // Object Dot Notation
//         var sentence = this.firstName + " " + this.lastName + " eats.";
//         console.log(sentence);
//     }
// }

// person.eat();

// var person2 = {
//     firstName: "Christian",
//     lastName: "Romero",
// }
// function eat() {
//     console.log(person2.firstName + " " + person2.lastName + " eats.")
// }

// eat();
// display the start quiz button and intro paragraphs
// then the user will click on the start quiz button
// when that happens, erase the landing page and move to the first question
// show the question and the answers
// when the user clicks on the answers, show them right or wrong and move to the second question