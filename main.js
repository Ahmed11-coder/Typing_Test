const storyBox = document.querySelector(".story");
let counter = 1;

// Get Random Story
async function getStory(url) {
    const response = await fetch(url);
    const result = await response.json();
    const getRandomInd = Math.floor(Math.random() * result.length);
    
    const storyText = result[getRandomInd].story;

    console.log(storyText);
    // Split The Story Text To Characters
    for (let i = 0; i < storyText.length; i++) {
        let char = document.createElement("span");
        if(i == 0) char.classList.add("active");
        char.innerHTML = storyText[i];
        storyBox.append(char);
        if (storyText[i] == '.') {
            storyBox.append(document.createElement("br"));
            storyBox.append(document.createElement("br"));
            i++;
        }
    }
}


// Typing Function
function Typing(e) {
    const ignoredKeys = ["Alt", "Shift", "Control", "Backspace"];
    const allChars = storyBox.childNodes;
    const currentChar = allChars[counter];

    if (ignoredKeys.includes(e.key))return;
    
    if (currentChar.textContent == e.key) {
        currentChar.classList.remove("false");
        currentChar.classList.replace("active", "true");
        if (e.key == '.') {
            counter += 2;
        }
        allChars[++counter].classList.add("active");
        storyBox.style.cssText = "border-color: green;";
        document.body.style.cssText = "box-shadow: 0 0 100px #00800050 inset";
    }
    
    if (currentChar.textContent != e.key) {
        currentChar.classList.add("false");
        storyBox.style.cssText = "border-color: red;";
        document.body.style.cssText = "box-shadow: 0 0 100px #ff000050 inset";
    }
    
}

document.addEventListener("keydown", (e) => Typing(e));


getStory("https://shortstories-api.onrender.com/stories");
