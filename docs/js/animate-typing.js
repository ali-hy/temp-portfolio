/*
 * Use on an element (preferably a span) by giving it a class of "animate-typing"
 * Use the data-text attribute to set the different strings you would like to cycle between, i.e. "abc|123|xyz"
 * Change the variable typingCycleDelimiter to change the delimiter (default delimiter: |)
 * */

const typingCycleDelimiter = "|";
const typingTargets = document.querySelectorAll(".animate-typing");

/***
 * @param {HTMLElement} element
 * @param {number} numOfStrings
 */
function animateBackspace(element, numOfStrings) {
  if (element.innerText.length > 0) {
    element.innerText = element.innerText.slice(0, -1);
    setTimeout(animateBackspace, 50, element, numOfStrings);
    return;
  }

  element.dataset.currentText = String(
    (parseInt(element.dataset.currentText) + 1) % numOfStrings
  );
  startTyping(element);
}

/***
 * @param {HTMLElement} element
 * @param {number} pos
 */
function animateTyping(element, pos = 0) {
  const targetText = element.dataset.text.split(typingCycleDelimiter);
  const currentText = parseInt(element.dataset.currentText);
  let innerText = element.innerText;

  if (pos >= targetText[currentText].length) {
    element.classList.remove("typing");
    setTimeout(() => {
      element.classList.add("typing");
      animateBackspace(element, targetText.length);
    }, 1500);
  } else {
    element.innerText = targetText[currentText].slice(0, pos + 1);
    setTimeout(animateTyping, 100, element, pos + 1);
  }
}

/***
 * @param {HTMLElement} element
 */
function startTyping(element) {
  setTimeout(() => {
    element.classList.add("typing");
    animateTyping(element);
  }, 500);
}

typingTargets.forEach(startTyping);
