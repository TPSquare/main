const background1Img = document.body.querySelector('img[alt="bg1"]');
background1Img.onclick = () => (background1Img.style.opacity = 0);

const data = Array.from(await fetch(`/data.json?t=${Date.now()}`).then((res) => res.json()));
const indexElement = document.body.querySelector("#index");
const mainElement = document.body.querySelector("main");
let index = 0;
let isGameStarted = false;
let isQuestionShown = false;
window.onclick = () => {
  if (!isGameStarted || (!data.length && !isQuestionShown)) return (isGameStarted = true);
  if (!isQuestionShown) {
    indexElement.textContent = `Câu ${++index}`;
    const [question, answer] = data.shift();
    const questionChildrenHTML = createQuestionChildrenHTML(answer, question);
    mainElement.innerHTML = questionChildrenHTML;
    mainElement.style.width = `${answer.length}em`;
    isQuestionShown = true;
  } else {
    mainElement.childNodes.forEach((elm) => (elm.style.left = `${elm.getAttribute("index")}em`));
    isQuestionShown = false;
  }
};

function createQuestionChildrenHTML(answer, question) {
  const diff = answer.length - question.length;
  const coe = 1 + diff / (question.length - 1);
  const createHTML = (char, index, quesIndex) =>
    `<div index="${index}" style="left: ${quesIndex * coe}em">${char}</div>`;

  answer = answer.split("");
  question = question.split("");

  let res = "";
  let quesIndex = 0;
  const answerIndexs = answer.map((e, i) => i);

  while (question.length) {
    const char = question.shift();
    const tempIndex = answer.findIndex((c) => c === char);
    const index = answerIndexs.splice(tempIndex, 1)[0];
    answer.splice(tempIndex, 1);
    res += createHTML(char, index, quesIndex++);
  }
  return res;
}
