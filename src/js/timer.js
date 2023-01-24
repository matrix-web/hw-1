const timerResult = document.querySelector("#timerResult");

export const renderTimerResult = (html) => {
  timerResult.innerHTML = html
}

export const runTimerCompleted = () => {
  const audio = document.createElement("audio");
  const audioSrc = "./assets/audio/classic.mp3";

  audio.src = audioSrc;
  audio.play();
}

export const timerResultHTML = (lostTime) => {
  const timeString = new Date(lostTime).toLocaleTimeString("ru-RU", {
    minute: "2-digit",
    second: "2-digit"
  });

  return `<span>${timeString}</span>`
}