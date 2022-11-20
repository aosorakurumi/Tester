var json = JSON.parse(localStorage.getItem(localStorage.getItem('Queue')))
console.log(localStorage.getItem('Queue'))

var NUMBER_OF_QUESTIONS = Object.keys(json.set).length

//numbers for grouping
var queueQuestion = [];
const ansField = document.getElementById("userAns");

//size of queue
const queueSize = 5

function shuffleArray(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function readTextFile(file) {
    var allText
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    return allText
}

function jsonNotEmpty(){
    NUMBER_OF_QUESTIONS = Object.keys(json.set).length
    if (NUMBER_OF_QUESTIONS == 0){
        return false
    } else {
        return true
    }
}

function queueNotEmpty(){
    if (queueQuestion.length == 0){
        return false
    } else {
        return true
    }
}

function addQueue(){
    console.log('queuerefresh')
    while ((queueQuestion.length < queueSize && jsonNotEmpty())){
        NUMBER_OF_QUESTIONS = Object.keys(json.set).length

        var index = 0
        var num = Math.floor(Math.random() * NUMBER_OF_QUESTIONS)

        queueQuestion.push(json.set[num])
        delete json.set[num]
        json.set = json.set.filter(function(n){return n; });

        index++;
    }
}

//replace question and accept answer
function secondEnter(questionObject, index){
    var enterPressed = 0;
    return new Promise((resolve) => {
        console.log(queueQuestion)
        window.onkeypress = function (e) {
            var keyCode = (e.keyCode || e.which);

            if (keyCode === 13) {
                if (enterPressed === 0) {
                    enterPressed++;
                    if (ansField.value == questionObject.Answer){
                        delete queueQuestion[index]
                        queueQuestion = queueQuestion.filter(function(n){return n; });
                        ansField.style.backgroundColor = 'green'
                        console.log('correct')
                    } else {            
                        shuffleArray(queueQuestion)
                        console.log('shuffled') 
                        ansField.style.backgroundColor = 'red'
                        document.getElementById('ans').textContent = questionObject.Answer;
                    }

                } else if (enterPressed === 1) {
                    console.log('a')
                    resolve()

                }
            }
        };
    })
}

async function testHandling(index) {
    var questionObject = queueQuestion[index]
    document.getElementById('question').textContent = questionObject.Question;
    document.getElementById('ans').textContent = ""
    ansField.value = ''
    ansField.style.backgroundColor = 'white'

    await secondEnter(questionObject, index)
}

async function queueHandling(){
    while (queueNotEmpty()){
        await testHandling(0);
    }    
}

async function main() {
    while(jsonNotEmpty()){
        addQueue()
        await queueHandling();
    }

    alert('done')
    window.location.href = '/HtmlFiles/index.html'
}    

main()



