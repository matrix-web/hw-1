import { diffDates, diffToHtml } from "./datecalc.js";
import { renderTimerResult, runTimerCompleted, timerResultHTML } from "./timer.js";
import { changeClasses, formatError } from "./utils/utils.js";

const dateCalcForm = document.querySelector("#datecalc");
const timerForm = document.querySelector("#timer-form");
const dateCalcResult = document.querySelector("#datecalc__result");
const tabs = document.querySelector("#tabs");
const calcElement = document.querySelector("#calc");
const timerElement = document.querySelector("#timer");

timerForm.addEventListener("submit", handleTimer);
dateCalcForm.addEventListener("submit", handleCalcDates);
tabs.addEventListener("click", toggleTabs);
toggleTabs();

let isStartTimer = false;
let timerId = null;
let lostTime = null;


function toggleTabs(event) {
  const tabType = event?.target?.dataset.type ?? "calucator";
  switch(tabType) {
    case "calucator":
      changeClasses(timerElement, calcElement);
    break;
    case "timer": 
      changeClasses(calcElement, timerElement);
    break;
  }
}

function handleTimer(event) {
  event.preventDefault();
  let { minutes } = event.target.elements;
  const timerMilliseconds = +minutes.value * 60 * 1000
  let timerTime = lostTime ?? timerMilliseconds;
  const end = Date.now() + timerTime;

  if (!timerId && !isStartTimer) {
    isStartTimer = true;
    timerId = setInterval(() => {
      lostTime = end - Date.now();
    
      if (lostTime < 0) {
        runTimerCompleted();
        clearInterval(timerId);
      }

      renderTimerResult(timerResultHTML(lostTime));
    }, 1000);
  } else {
    isStartTimer = false;
    clearInterval(timerId);
    timerId = null;
  }

}


function handleCalcDates(event) {
  event.preventDefault();
  dateCalcResult.innerHTML = "";

  let { firstDate, secondDate } = event.target.elements;
  firstDate = firstDate.value, secondDate = secondDate.value;

  if (firstDate && secondDate) {
    const diff = diffDates(firstDate, secondDate);
    dateCalcResult.insertAdjacentHTML("beforeend", diffToHtml(diff));
  } else {
    dateCalcResult.insertAdjacentElement("beforeend", formatError("Для расчета промежутка необходимо заполнить оба поля"))
  }
}