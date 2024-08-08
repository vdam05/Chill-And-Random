/*Main menu options*/
const menuScreen = document.querySelector(".menu-screen");
const introButton = document.querySelector(".intro");
const buttons = document.querySelectorAll(".option-buttons button");
const timerOption = document.getElementById("timer");
const timerScreen = document.querySelector(".timer-screen");
const wordOption = document.getElementById("words");
const wordScreen  = document.querySelector(".words-screen");
const cutscene = document.getElementById("cutscene");
const openMainMenu = () => {
    buttons.forEach((button) => button.classList.toggle("menu-clicked"));
}
/*For cutscenes*/
const cutsceneFunction = (callback) => {
    cutscene.classList.toggle("cutscene-animated");
    setTimeout(callback, 1500);
    setTimeout(() => {
        cutscene.classList.toggle("cutscene-animated");
    }, 3000);
}
const goBack = (screen) => {
    cutsceneFunction(() => {
        openMainMenu();
        menuScreen.classList.toggle("closed");
        screen.classList.toggle("opened");
    })
}
/**/ 
introButton.addEventListener("click", openMainMenu);
timerOption.addEventListener("click", () => {
   cutsceneFunction(() => {
    menuScreen.classList.toggle("closed");
    timerScreen.classList.toggle("opened");
   })
});
wordOption.addEventListener("click", () => {
    cutsceneFunction(() => {
        menuScreen.classList.toggle("closed");
        wordScreen.classList.toggle("opened");
        wordScreen.style.justifyContent = "start";
    });
})

/*Music (by using an API)*/

/*Timer*/
//Variables and classes here
const clockInput = document.getElementById("clock-input");
const mainTimer = document.querySelector("#clock p");
const stopMusic = document.getElementById("stop-music");
const startButton = document.getElementById("start-clock");
const stopButton = document.getElementById("stop-clock");
const resetButton = document.getElementById("reset-clock");
let isRunning = false;
class TimeObject {
    constructor(hours = 0, minutes = 0, seconds = 0) {
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }
    checkZero() {
        return this.hours === 0 && this.minutes === 0 && this.seconds === 0;
    }
    setTime(miliseconds) {
        if (miliseconds < 0) {
            return new Error("Miliseconds cannot be negative");
        }
        this.hours = Math.floor((miliseconds / (1000*60*60) % 24));
        this.minutes = Math.floor((miliseconds / (1000*60) % 60));
        this.seconds = Math.floor((miliseconds / 1000) % 60);
    }
    getMiliseconds() {
        const hours = currentTime.hours * 60 * 60 * 1000;
        const minutes = currentTime.minutes * 60 * 1000;
        const seconds = currentTime.seconds * 1000;
        return hours + minutes + seconds;
    }
    copyTime(timeObj) {
        if (!timeObj instanceof TimeObject) {
            throw new Error("Not a TimeObject to copy");
        }
        this.hours = timeObj.hours;
        this.minutes = timeObj.minutes;
        this.seconds = timeObj.seconds;
    }
    toString() {
        const toTwoDigits = (value) => {
            return value.padStart(2,"0");
        }
       return `${toTwoDigits(String(this.hours))}:${toTwoDigits(String(this.minutes))}:${toTwoDigits(String(this.seconds))}`;
    }
    splitAndInitialize(timer) {
        const timeArray = timer.split(":");
        this.hours = Number(timeArray[0]);
        this.minutes = Number(timeArray[1]);
        this.seconds = Number(timeArray[2]);
    }
}
let currentTime = new TimeObject();
let resettedTime = new TimeObject();
let clockIntervalId = 0;
const clockPattern = /^([0-1]\d|2[0-4]):([0-5]\d):([0-5]\d)$/; //Regex for numbers only work single digit so have to do it this way
//Main functions 
const checkInput = value => clockPattern.test(value);
const checkZero = string => string === "00:00:00";
const disableButton = (...buttons) => {
    buttons.forEach((button) => {
        button.style.opacity = "0.5";
        button.disabled = true;
    })
}
const enableButton = (...buttons) => {
    buttons.forEach((button) => {
        button.style.opacity = "1";
        button.disabled = false;
    })
}
const createTimer = (timer) => {
    if (!checkInput(timer)) {
        window.alert("Invalid time. Please follow the example pattern.");
        return;
    } 
    mainTimer.textContent = timer;
    currentTime.splitAndInitialize(timer);
    resettedTime.splitAndInitialize(timer);
}
const updateTime = () => {
    //Start is the total time in miliseconds
    let start = currentTime.getMiliseconds();
    if (start > 0) {
        start -= 1000;
        currentTime.setTime(start);
        mainTimer.textContent = currentTime.toString();
    } else {
        clearInterval(clockIntervalId);
        enableButton(startButton);
    }
}
const startTime = () => {
    if (currentTime.checkZero()) {
        window.alert("No clock entered yet");
        return;
    }
    if (!isRunning) {
        isRunning = true;
        disableButton(startButton);
        enableButton(stopButton);
        clockIntervalId = setInterval(updateTime, 1000);
    } else {
        window.alert("Clock is already running!");
    }
}
const stopTime = () => {
    if (currentTime.checkZero()) {
        window.alert("No clock entered yet");
        return;
    }
    if (isRunning) {
        isRunning = false;
        disableButton(stopButton);
        enableButton(startButton);
        clearInterval(clockIntervalId);
    } else {
        window.alert("No clock is running yet!");
    }
}
const resetTime = () => {
    enableButton(startButton, stopButton);
    clearInterval(clockIntervalId);
    isRunning = false;
    currentTime.copyTime(resettedTime);
    mainTimer.textContent = currentTime;
}
clockInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const getClockInput = clockInput.value; 
        clockInput.value = "";
        createTimer(getClockInput);
    }
});
/*Synonyms with an API*/
const inputWord = document.getElementById("insert-word");
const inputButton = document.getElementById("insert-word-button");
const output = document.getElementById("word-output");
const errorDialog = document.getElementById("error-dialog");
const wordCheck = (word) => {
    const wordPattern = /^[a-z]+$/gi;
    return wordPattern.test(word);
}
//TBA async function
async function fetchWord (word) {
    const fetchedWord = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                      .then((res) => res.json()).catch((error) => console.error(error));
    console.log(fetchedWord);
}
inputButton.addEventListener("click", () => {
    const wordInputted = inputWord.value;
    inputWord.value = "";
    if (wordCheck(wordInputted)) {
        fetchWord(wordInputted);
    } else {
        errorDialog.showModal();
        setTimeout(() => {
            errorDialog.close();
        }, 4000);
    }
});