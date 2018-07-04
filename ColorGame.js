var squares = document.querySelectorAll(".square");
var body = document.getElementsByTagName("body")[0];
var rgbDisplay = document.querySelector("#rgbDisplay");
var message = document.getElementById("message");
var resetBtn = document.querySelector("div button");
var modeBtn = document.querySelectorAll(".mode")
var h1 = document.querySelector("h1");

var randomColor = [];
var n;
var selectedColor;

hardMode();

resetBtn.addEventListener("click",function(){
    selectedColor = gameInitialisation(n);
})

for (i=0; i<modeBtn.length; i++){
    modeBtn[i].addEventListener("click",function(){
        if (this.textContent==='Easy'){
            easyMode();
        }
        else if(this.textContent==='Hard'){
            hardMode();
        }
        else if(this.textContent==='Extreme'){
            extremeMode();
        }
    })
}


function gameInitialisation(n){
    randomColors = randomColorGenerator(n);

    for (i=0; i<n; i++){
        squares[i].style.backgroundColor = randomColors[i];
    }
    for (i=n; i<squares.length; i++){
        squares[i].style.backgroundColor = body.style.backgroundColor;
    }
    var selectedColor = randomColorSelector(randomColors);
    rgbDisplay.textContent = selectedColor;
    h1.style.backgroundColor = 'steelblue';
    message.textContent ='';
    resetBtn.textContent = 'New Game'
    clickAssign(n,selectedColor)
    return selectedColor
}

function clickAssign(n,selectedColor){
    for (i=0; i<n; i++){
        squares[i].addEventListener("click",winCondition)
    }
    for (i=n; i<squares.length; i++){
        squares[i].removeEventListener("click",winCondition);
    }
}


function easyMode(){
    n=3;
    selectedColor = gameInitialisation(n);
    modeBtn[2].classList.remove('active');
    modeBtn[1].classList.remove('active');
    modeBtn[0].classList.add('active');
}

function hardMode(){
    n=6;
    selectedColor = gameInitialisation(n);
    modeBtn[2].classList.remove('active');
    modeBtn[1].classList.add('active');
    modeBtn[0].classList.remove('active');
}

function extremeMode(){
    n=9;
    selectedColor = gameInitialisation(n);
    modeBtn[2].classList.add('active');
    modeBtn[1].classList.remove('active');
    modeBtn[0].classList.remove('active');
}

function gameWin(){
    message.textContent = 'Correct!';
    resetBtn.textContent = 'Play Again?'
    for (i=0; i<n; i++){
        squares[i].style.backgroundColor = selectedColor;
    }
    h1.style.backgroundColor = selectedColor;
}

function gameTryAgain(wrongSquare){
    message.textContent = 'Try Again';
    wrongSquare.style.backgroundColor = body.style.backgroundColor;
}

function winCondition(){
    this.style.backgroundColor===selectedColor ? gameWin():gameTryAgain(this);
}

function randomColorGenerator(n){
    var randColor = [];
    for (i=0; i<n; i++){
        var R = Math.round(Math.random()*256 - 0.5);
        var G = Math.round(Math.random()*256 - 0.5);
        var B = Math.round(Math.random()*256 - 0.5);
        randColor[i] = 'rgb(' + R + ', ' + G + ', ' + B + ')'
    }
    return randColor
}

function randomColorSelector(colors){
    randomIndex=Math.round(Math.random()*(colors.length) -0.5);
    return colors[randomIndex]
}