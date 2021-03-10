
// Create or select needed elements
const templateElm = document.querySelector("#template");
const formsElm = document.querySelector("#forms");
const resultElm = document.querySelector("#results");
const selectorsElm = document.querySelector("#selectors");
const listElm = document.querySelector("#list");
const body = document.querySelector('body');
const sound = new Audio("./sounds/PS5click.mp3")

function playSound() {
    sound.currentTime = 0;
    sound.play();
}


function clearElements() {
    templateElm.innerHTML = "";
    formsElm.innerHTML = "";
    resultElm.innerHTML = "";
    listElm.innerHTML = "";
}
// get pseudorandom between min and max
function getRndInteger(min, max) {
    playSound();
    return Math.floor(Math.random() * (max - min)) + min;
}

function buttonMaker(text, doWhenClicked) {
    const button = document.createElement('button');
    button.setAttribute("id", "buttons");
    button.setAttribute("class", "gridItem")
    button.setAttribute("onClick", doWhenClicked);
    button.innerText = text.toString();
    return button;
}

function showWinner(obj) {
    playSound();
    clearElements();
    const ul = document.createElement('ul');
    ul.setAttribute("class", "winnerList");
    listElm.appendChild(ul);
    obj.sort((a,b) => a.value - b.value);

    //Show participants in winning order
    console.log(obj.length);
    for (let i = 0; i < obj.length; i++) {
        let li = document.createElement('li');
        li.setAttribute("class", "winnerListItem");
        console.log(obj[i].name)
        li.innerHTML = obj[i].name;
        ul.appendChild(li);
    }
}

function numbersPage() {
    playSound();
    clearElements();
    const buttonOne = buttonMaker("Draw between 1-2", "GetRandomBetweenNumbers(2)");
    const buttonTwo = buttonMaker("Draw between 1-10", "GetRandomBetweenNumbers(10)");
    const buttonThree = buttonMaker("Draw between 1-100", "GetRandomBetweenNumbers(100)");
    const buttonFore = buttonMaker("Draw between A - B", "GetRandomBetweenUserGiven()");
    templateElm.append(buttonOne, buttonTwo, buttonThree, buttonFore);
}

function dicesPage() {
    playSound();
    clearElements();
    const buttonOne = buttonMaker("1D4", "GetRandomBetweenNumbers(4)");
    const buttonTwo = buttonMaker("1D6", "GetRandomBetweenNumbers(6)");
    const buttonThree = buttonMaker("1D8", "GetRandomBetweenNumbers(8)");
    const buttonFore = buttonMaker("1D10", "GetRandomBetweenNumbers(10)");
    const buttonFive = buttonMaker("1D12", "GetRandomBetweenNumbers(12)");
    const buttonSix = buttonMaker("1D20", "GetRandomBetweenNumbers(20)");
    templateElm.append(buttonOne, buttonTwo, buttonThree, buttonFore, buttonFive, buttonSix);
}

function pickWinnerPage() {
    playSound();
    clearElements();
    buttonIsActive = false;
    participants = [];
    const form = document.createElement("form");
    form.setAttribute("id", "participantForm")

    const name = document.createElement("input");
    name.setAttribute("id", "nameInput");
    name.setAttribute("type", "text");
    name.setAttribute("name", "nameData");
    name.setAttribute("placeholder", "ADD PARTICIPANT");

    const button = buttonMaker("DRAW WINNER", `showWinner(participants)`);
    
    form.appendChild(name);
    formsElm.appendChild(form);
    const ul = document.createElement('ul');
    ul.setAttribute("id", "liststyle");
    listElm.appendChild(ul);


    form.addEventListener('submit', (event) => {
        playSound();
        event.preventDefault();
        const formData = new FormData(form);
        const name = formData.get('nameData');
        const value = Math.random();
        const obj = {
            "name": name,
            "value": value
        }
        participants.push(obj);
        form.reset();
        let li = document.createElement('li');
        li.setAttribute("class", "listItem");
        ul.appendChild(li);
        li.innerHTML = name;
        if (participants.length >= 2 && buttonIsActive === false) {
            buttonIsActive = true;
            resultElm.appendChild(button);
        }
    })
}

// get pseudorandom values for common random picks (like 1-10 and 1-100)
function GetRandomBetweenNumbers(max) {
    playSound();
    let min = 1;
    const resultNumber = getRndInteger(min, max + 1);
    resultElm.innerText = `${resultNumber}`; 
}

// Return pseudorandom from user given range - form is dynamically created
function GetRandomBetweenUserGiven() {
    playSound();
    clearElements();

    const form = document.createElement("form");
    form.setAttribute("id", "numbersForm");
    //form.setAttribute("method", "get");

    const firstNumber = document.createElement("input");
    firstNumber.setAttribute("id", "numbersInput");
    firstNumber.setAttribute("type", "number");
    firstNumber.setAttribute("name", "firstNumber");
    firstNumber.setAttribute("placeholder", "A");

    const secondNumber = document.createElement("input");
    secondNumber.setAttribute("id", "numbersInput");
    secondNumber.setAttribute("type", "number");
    secondNumber.setAttribute("name", "secondNumber")
    secondNumber.setAttribute("placeholder", "B");
    
    const button = document.createElement("button");
    button.setAttribute("id", "numbersInput");
    button.innerHTML = "DRAW";

    form.appendChild(firstNumber);
    form.appendChild(secondNumber);
    form.appendChild(button);

    formsElm.appendChild(form);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        playSound();
        const formData = new FormData(form);
        const min = Number.parseInt(formData.get('firstNumber'));
        const max = Number.parseInt(formData.get('secondNumber'));

        const resultNumber = getRndInteger(min, max + 1);
        resultElm.innerText = `${resultNumber}`; 
    })
}