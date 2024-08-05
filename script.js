/*Main menu options*/
const menuScreen = document.querySelector(".menu-screen");
const introButton = document.querySelector(".intro");
const buttons = document.querySelectorAll(".option-buttons button");
const openMainMenu = () => {
    buttons.forEach((button) => button.classList.toggle("menu-clicked"));
}
introButton.addEventListener("click", openMainMenu);
/*Music (by using an API)*/
  
/*Timer*/
const timerOption = document.getElementById("timer");
const timerScreen = document.querySelector(".timer-screen");
timerOption.addEventListener("click", () => {
    menuScreen.classList.toggle("closed");
    timerScreen.classList.toggle("timer-screen-opened");
})
const clockInput = document.getElementById("clock-input");
const mainTimer = document.querySelector("#clock p");
const clockPattern = /[0-23]:[0-59]:[0-59]/;
const checkInput = value => clockPattern.test(value);
const createTimer = (timer) => {
    if (!checkInput(timer)) {
        window.alert("Invalid time. Please follow the example pattern.");
        clockInput.value = "";
        return;
    } 
    mainTimer.value = timer;
}
clockInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const getClockInput = clockInput.value; 
        createTimer(getClockInput);
    }
})
