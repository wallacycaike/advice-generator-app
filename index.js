function showAdvice(adviceSlip) {
  const loadingMessage = document.querySelector(".loading-message");
  document.querySelector(".advice").removeChild(loadingMessage);

  const adviceId = document.querySelector("#advice-id");
  adviceId.textContent = `ADVICE #${adviceSlip.id}`;

  const adviceText = document.querySelector("#advice-text");
  adviceText.textContent = `"${adviceSlip.advice}"`;
}

function showLoadingMessage() {
  const loadingMessage = document.createElement("span");
  loadingMessage.classList.add("loading-message");
  loadingMessage.textContent = "Loading advice...";

  document.querySelector(".advice").append(loadingMessage);
}

async function getAdvice() {
  showLoadingMessage();
  avoidSpam();

  const url = "https://api.adviceslip.com/advice";
  const response = await fetch(url);
  const adviceSlip = await response.json();

  showAdvice(adviceSlip.slip);
}

const adviceBtn = document.querySelector(".advice-button");
function avoidSpam() {
  adviceBtn.classList.add("disabled");
  setTimeout(() => {
    adviceBtn.classList.remove("disabled");
  }, 2000);
}

adviceBtn.addEventListener("click", () => {
  getAdvice();
});

getAdvice();
