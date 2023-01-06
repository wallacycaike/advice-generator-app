async function getAdvice() {
  const url = "https://api.adviceslip.com/advice";
  const response = await fetch(url);
  const advice = await response.json();
  return advice.slip;
}

function showAdviceContent(adviceSlip) {
  const adviceId = document.querySelector("#advice-id");
  adviceId.textContent = `ADVICE #${adviceSlip.id}`;

  const adviceText = document.querySelector("#advice-text");
  adviceText.textContent = `"${adviceSlip.advice}"`;
}

const adviceBtn = document.querySelector(".advice-button");
const spinner = document.querySelector(".loader");
const advice = document.querySelector(".advice");
const divider = document.querySelector("picture");
function showAdvice() {
  advice.classList.remove("visible");
  divider.classList.remove("visible");
  adviceBtn.classList.remove("visible");
  spinner.classList.add("visible");

  setTimeout(async () => {
    await getAdvice()
      .then((advice) => {
        showAdviceContent(advice);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        spinner.classList.remove("visible");
        advice.classList.add("visible");
        divider.classList.add("visible");
        adviceBtn.classList.add("visible");
      });
  }, 1000);
}

function start() {
  getAdvice();
  showAdvice();
}

adviceBtn.addEventListener("click", () => {
  start();
});

start();
