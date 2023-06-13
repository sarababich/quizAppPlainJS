function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

const ul = document.getElementById('quiz');


const url = 'http://localhost:3000/api/quiz';

//const url = 'data/data.json';
fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        console.log(data.quizQuestion);
        let question = data.quizQuestion;
        return quizQuestion.map(function(question)
        {
            let li = createNode('li');
            li.innerHTML = question.quizQuestion;
            append(ul, li);
        })
    })



    .catch(function(error) {
        console.log(error);
    });
