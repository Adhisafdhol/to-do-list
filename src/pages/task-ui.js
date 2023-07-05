import { createBasicElm, createInput, createLabel} from '../dom-js/dom-js';

function taskUi () {
  const taskUi = createBasicElm('form', 'task-ui', null);
  taskUi.action = '*';
  taskUi.method = 'post';

  const dateContainer = document.createElement('div');
  const descrptContainer = document.createElement('div');
  const prioContainer = document.createElement('div');

  const title = createBasicElm('div', 'title', null);
  const titleLabel = createLabel('title', 'title')
  const titleInput = createInput('title', 'text', 'title');
  title.appendChild(titleLabel);
  title.appendChild(titleInput);

  
  const date = createBasicElm('div', 'date', null);
  const dateLabel = createLabel('date', 'date')
  const dateInput = createInput('date', 'date', 'date');
  date.appendChild(dateLabel);
  date.appendChild(dateInput);
  dateContainer.appendChild(date);


  const descrpt = createBasicElm('div', 'descrpt', null);
  const descrptLabel = createLabel('descrpt', 'description');
  const descrptInput = createInput('descrpt', 'text', 'description');
  descrpt.appendChild(descrptLabel);
  descrpt.appendChild(descrptInput);
  descrptContainer.appendChild(descrpt);

  const prio = createBasicElm('div', 'prio', null);
  const selectPrio = document.createElement('select');
  selectPrio.name = 'prio';
  prio.appendChild(selectPrio);

  const optionLow = document.createElement('option');
  optionLow.value = 'low';
  optionLow.textContent = 'Low';
  selectPrio.appendChild(optionLow);

  const optionMedium = document.createElement('option');
  optionMedium.value = 'medium';
  optionMedium.textContent = 'Medium';
  selectPrio.appendChild(optionMedium);

  const optionHigh = document.createElement('option');
  optionHigh.value = 'high';
  optionHigh.textContent = 'high';
  selectPrio.appendChild(optionHigh);

  prioContainer.appendChild(prio);

  taskUi.appendChild(title);
  taskUi.appendChild(date);
  taskUi.appendChild(descrpt);
  taskUi.appendChild(prio);
  return taskUi;
}

export{taskUi};