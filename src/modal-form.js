import { createWrapperWithClass } from "./print-tasks";

function createModal() {
  return createWrapperWithClass('dialog', 'modal');
}

function createForm() {
  return document.createElement('form');
}

//Create input elements
function createInputEl(className, type, id, name, text, placeholder) {
  const container = createWrapperWithClass('div', className);
  container.appendChild(createLabel(id, text));
  container.appendChild(createInput(type, id, name, placeholder));
  container.appendChild(document.createElement('span'));

  return container
}

function createRequiredInputEl(className, type, id, name, text, placeholder) {
  const container = createInputEl(className, type, id, name, text, placeholder);
  container.replaceChild(createRequiredInput(type, id, name, text, placeholder), container.querySelector('input'));
 
  return container;
}

function createLabel(forVal, text) {
  const label = document.createElement('label');
  label.setAttribute('for', forVal);
  label.textContent = text;

  return label;
}

function createInput(type, id, name, placeholder) {
  const input = document.createElement('input');
  input.type = type;
  input.id = id;
  input.name = name
  input.placeholder = placeholder;

  return input;
}

function createRequiredInput(type, id, name, placeholder) {
  const container = createInput(type, id, name, placeholder);
  container.required = true;
  
  return container;
}

//create text area

function createTextArea(name) {
  const textArea = document.createElement('textarea');
  textArea.name = name

  return textArea;
}

//create a popup modal dialog
function createPopUpModal() {
  const container = createModal();
  const form = createForm();
  container.appendChild(form);
  const titleInput = createRequiredInputEl('title', 'text', 'title', 'title', 'Title', ' ');
  const descriptionInput = createTextArea('description');
  const dateInput = createRequiredInputEl('date', 'date', 'date', 'date', 'Date', ' ');
  form.appendChild(titleInput);
  form.appendChild(descriptionInput);
  form.appendChild(dateInput);

  return container;
}

export {createPopUpModal};