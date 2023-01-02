function createBasicElm (type, className, textContent) {
  const element = document.createElement(type);

  if (className !== null) {
    element.classList.add(className);
  }

  if (textContent !== null) {
    element.textContent = textContent;
  }
  return element;
}

export{createBasicElm}