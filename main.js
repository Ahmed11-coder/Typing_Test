const storyBox = document.querySelector(".story");
const TimeBox = document.querySelector(".timer .time");
const Poup = document.querySelector(".poup");
const PoupTime = document.querySelector(".poup .time");
const PoupSpeed = document.querySelector(".poup .speed");
const PoupAcc = document.querySelector(".poup .acc");
const TimeBar = document.querySelector(".time-bar");
const Overlay = document.querySelector(".overlay");
const totalTime = 60;
let startGame = false;
let counter = 0;
let mistakes = 0;
let time = 60;

TimeBox.innerHTML = time;
PoupTime.innerHTML = totalTime;

// Default Background Styling
function defualt() {
    document.body.style.cssText = "box-shadow: 0 0 100px rgba(233, 199, 3, 0.5) inset";
    storyBox.style.cssText = "border-color: rgba(233, 199, 3);";
}

// Warning Background Styling
function warning() {
    document.body.style.cssText = "box-shadow: 0 0 200px rgba(36, 96, 175, 0.48) inset";
}

// Mistake Background Styling
function mistake() {
    storyBox.style.cssText = "border-color: red;";
    document.body.style.cssText = "box-shadow: 0 0 100px #ff000050 inset";
}

// Success Background Styling
function success() {
    storyBox.style.cssText = "border-color: green;";
    document.body.style.cssText = "box-shadow: 0 0 100px #00800050 inset";
}

// Get Random Story
async function getStory(url) {
    const response = await fetch(url);
    const result = await response.json();
    const getRandomInd = Math.floor(Math.random() * result.length);
    
    const storyText = result[getRandomInd].story;
    
    storyBox.textContent = "";
    // Split The Story Text To Characters
    for (let i = 0; i < storyText.length; i++) {
        let char = document.createElement("span");
        if(i == 0) char.classList.add("active");
        char.innerHTML = storyText[i];
        storyBox.append(char);
        
        // Add Break In End Of Each Statment
        if (storyText[i] == '.') {
            storyBox.append(document.createElement("br"));
            storyBox.append(document.createElement("br"));
            i++;
        }
    }
}


// Typing Function
function Typing(e) {
    // Keys That Will Be Ignore
    const ignoredKeys = ["Alt", "Shift", "Control", "Backspace"];
    const allChars = storyBox.childNodes;
    const currentChar = allChars[counter];
    
    if (ignoredKeys.includes(e.key))return;
    startGame = true;
    console.log(allChars[counter].getBoundingClientRect())
    // Make Auto Scroll
    if (allChars[counter+1].getBoundingClientRect().top >= 600) {
        storyBox.scrollBy(0, 60);
    }
    
    // Check If The Input Equal Current Character Or NOT
    if (currentChar.textContent == e.key) {
        currentChar.classList.remove("false");
        currentChar.classList.replace("active", "true");
        if (e.key == '.') {
            counter += 2;
        }
        allChars[++counter].classList.add("active");
        if (+TimeBox.textContent > 5) success();
    }
    
    if (currentChar.textContent != e.key) {
        mistakes++;
        currentChar.classList.add("false");
        if (+TimeBox.textContent > 5) mistake();
    }
}

const Timer = setInterval(TimerHandle, 1000);

// Timer
function TimerHandle() {
    console.log(time);
    TimeBox.innerHTML = time;
    TimeBar.style.cssText = `width: ${(time/totalTime)*100}%`;
    if (startGame) {
        if (time == 0) {
            clearInterval(Timer);
            document.removeEventListener("keydown", Typing);
            defualt();
            Overlay.style.cssText = "opacity: 1";
            PoupSpeed.innerHTML = `${Math.round(counter / 5 - mistakes) / (totalTime / 60)} WPM`;
            PoupAcc.innerHTML = `${100 - Math.floor((mistakes/(mistakes+counter)) * 100)}%`;
            Poup.style.cssText = 'opacity: 1;';
        }
        else {
            if (time <= 5) warning();
            time--;
        }
    }
}

document.addEventListener("keydown", Typing);


getStory("https://shortstories-api.onrender.com/stories");
