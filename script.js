/*Main menu options*/
const menuScreen = document.querySelector(".menu-screen");
const introButton = document.querySelector(".intro");
const buttons = document.querySelectorAll(".option-buttons button");
const timerOption = document.getElementById("timer");
const timerScreen = document.querySelector(".timer-screen");
const openMainMenu = () => {
    buttons.forEach((button) => button.classList.toggle("menu-clicked"));
}
introButton.addEventListener("click", openMainMenu);
timerOption.addEventListener("click", () => {
    menuScreen.classList.toggle("closed");
    timerScreen.classList.toggle("timer-screen-opened");
})
/*Music (by using an API)*/
  
/*Timer*/
//Variables and classes here
const clockInput = document.getElementById("clock-input");
const mainTimer = document.querySelector("#clock p");
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
    //Gets the numbers and initialize the clock's hours, minutes and seconds
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
        clearInterval(intervalId);
    }
}
const startTime = () => {
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
const goBack = () => {
    menuScreen.classList.toggle("closed");
    timerScreen.classList.toggle("timer-screen-opened");
}
clockInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const getClockInput = clockInput.value; 
        clockInput.value = "";
        createTimer(getClockInput);
    }
});