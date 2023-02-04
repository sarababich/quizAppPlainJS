

// Questions will be asked
const Questions = [{
    id: 0, //Best team in serie A right now?
    a: [{ text: "juventus", isCorrect: false },
        { text: "roma", isCorrect: false },
        { text: "get correct answer from database", isCorrect: true },
        { text: "ac milan", isCorrect: false }
    ]

},
{
    id: 1, //Swedens goat?
    a: [{ text: "granqvist", isCorrect: false },
        { text: "bebben", isCorrect: false },
        { text: "gunnar nordahl", isCorrect: false },
        { text: "get correct answer from database", isCorrect: true }
    ]

},
{
    id: 2, //Biggest stadium in europe?
    a: [{ text: "san siro", isCorrect: false },
        { text: "bernabeu", isCorrect: false },
        { text: "get correct answer from database", isCorrect: true },
        { text: "old trafford", isCorrect: false }
    ]

}
]

// Set start
var start = true;

// Iterate
async function iterate(id) {

    const baseUrl2 = 'http://localhost:3000/api/quiz' 
    const res = await fetch(baseUrl2,
        {
            method: 'GET'
        })
    const data = await res.json()
    console.log(data)

// Getting the result display section
var result = document.getElementsByClassName("result");
result[0].innerText = "";

// Getting the question
const question = document.getElementById("question");

// Setting the question text
question.innerText = data.quiz[id].quizQuestion;

// Getting the options
const op1 = document.getElementById('op1');
const op2 = document.getElementById('op2');
const op3 = document.getElementById('op3');
const op4 = document.getElementById('op4');

// Providing option text
op1.innerText = Questions[id].a[0].text;
op2.innerText = Questions[id].a[1].text;
op3.innerText = Questions[id].a[2].text;
op4.innerText = Questions[id].a[3].text;

// Providing the true or false value to the options
if(Questions[id].a[0].isCorrect){
    op1.innerText = data.quiz[id].quizAnswer
}
else if(Questions[id].a[1].isCorrect){
    op2.innerText = data.quiz[id].quizAnswer
}
else if(Questions[id].a[2].isCorrect){
    op3.innerText = data.quiz[id].quizAnswer
}
else if(Questions[id].a[3].isCorrect){ //There could be a tick where none is right, hence else if
    op4.innerText = data.quiz[id].quizAnswer
}

op1.value = Questions[id].a[0].isCorrect;
op2.value = Questions[id].a[1].isCorrect;
op3.value = Questions[id].a[2].isCorrect;
op4.value = Questions[id].a[3].isCorrect;

var selected = "";

// Show selection for op1

op1.addEventListener("click", () => {
    selected = op1.value;
})
op2.addEventListener("click", () => {
    selected = op2.value;
})
op3.addEventListener("click", () => {
    selected = op3.value;
})
op4.addEventListener("click", () => {
    selected = op4.value;
})
    
// Grabbing the evaluate button
const evaluate = document.getElementsByClassName("evaluate");

// Evaluate method
evaluate[0].addEventListener("click", () => {
    if (selected == "true") {
        result[0].innerHTML = "True";
        result[0].style.color = "green";
    } else {
        result[0].innerHTML = "False";
        result[0].style.color = "red";
    }
})
} //ITERATE CLOSe

if (start) {
iterate("0");
}

// Next button and method
const next = document.getElementsByClassName('next')[0];
var id = 0;

next.addEventListener("click", () => {
start = false;
if (id < Questions.length -1) {
    id++;
    iterate(id);
    console.log(id);
}

})

