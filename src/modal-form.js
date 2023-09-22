import { createWrapperWithClass } from "./print-tasks";
import { hideLabel } from "./hide-elements";

function createModal() {
  return createWrapperWithClass('dialog', 'modal');
}

function createForm(id, action, method) {
  const form = document.createElement('form');
  form.setAttribute('id', id);
  form.action = action;
  form.method = method;

  return form;
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
  container.replaceChild(createRequiredInput(type, id, name, placeholder), container.querySelector('input'));
 
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

function createButton(name, text) {
  const btn = createWrapperWithClass('button', name);
  btn.textContent = text;

  return btn;
}

function createCloseBtn(name, text) {
  const btn = createButton(name, text);
  btn.formNoValidate = true;

  return btn;
}
//create text area

function createTextArea(id, className, name, forVal, text) {
  const container = createWrapperWithClass('div', className,)
  container.appendChild(createLabel(forVal, text));
  const textArea = document.createElement('textarea');
  textArea.id = id;
  container.appendChild(textArea);

  textArea.name = name

  return container;
}

function createSelect(id, name) {
  const select = document.createElement('select');
  select.id = id;
  select.name = name;

  return select;
}

function createOption(value, text) {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = text;

  return option;
}

//create a popup modal dialog
function createPopUpModal() {
  const container = createModal();
  const form = createForm('task-form', '*', 'dialog');
  container.appendChild(form);

  const formEl = createWrapperWithClass('div', 'main-input');
  form.appendChild(formEl);
  //Title input element
  const titleInput = createRequiredInputEl('title', 'text', 'title', 'title', 'Task name', ' ');
  titleInput.addEventListener('input', hideLabel.bind(titleInput, titleInput.querySelector('label'), titleInput.querySelector('input')));
  //description input element
  const descriptionInput = createTextArea('description', 'description', 'description', 'description', 'description');
  descriptionInput.addEventListener('input', hideLabel.bind(descriptionInput, descriptionInput.querySelector('label'), descriptionInput.querySelector('textarea')));
  descriptionInput.setAttribute('row', '10');
  descriptionInput.placeholder = ' ';

  const dateInput = createInputEl('date', 'date', 'date', 'date', 'Due-date', ' ');

  //create select
  const selectContainer = createWrapperWithClass('div', 'priority');
  const selectLabel = createLabel('priority', 'Priority');
  const select = createSelect('priority', 'priority');
  const selectOpt1 = createOption('low', 'Low');
  const selectOpt2 = createOption('medium', 'Medium');
  const selectOpt3 = createOption('high', 'High');
  select.appendChild(selectOpt1);
  select.appendChild(selectOpt2);
  select.appendChild(selectOpt3);
  selectContainer.appendChild(selectLabel);
  selectContainer.appendChild(select);

  //create button 
  const btnContainer = createWrapperWithClass('div', 'btn-container')
  const closeBtn = createCloseBtn('cancel', 'Cancel');
  const submitBtn = createButton('submit', 'Add task');

  formEl.appendChild(titleInput);
  formEl.appendChild(descriptionInput);
  formEl.appendChild(dateInput);
  formEl.appendChild(selectContainer);
  form.appendChild(btnContainer);
  btnContainer.appendChild(closeBtn);
  btnContainer.appendChild(submitBtn);
  
  return container;
}

function createEditPopUpModal() {
  const modal = createPopUpModal();
  modal.classList.add('edit-modal');
  modal.classList.remove('modal');
  const form = modal.querySelector('form');
  form.setAttribute('id', 'edit-task-form');
  form.classList.remove('task-form');
  form.classList.add('edit-task-form');
  const cancelBtn = modal.querySelector('.cancel');
  cancelBtn.classList.add('cancel-edit');
  cancelBtn.classList.remove('cancel');
  const editTaskBtn = modal.querySelector('.submit');
  editTaskBtn.textContent = 'Edit task'
  editTaskBtn.classList.remove('submit');
  editTaskBtn.classList.add('submit-edit');
  
  return modal;
}

export {createPopUpModal, createEditPopUpModal};