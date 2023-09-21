import { getData } from "./todo";
import { format } from "date-fns";

const taskDom = (obj) => {
  const headerWrapper = createWrapperWithClass('div', 'task-header');
  const btn = createWrapperWithClass('button', 'done');
  const titleDom = taskPropertyDom(obj, 'title');  
  const editBtn = createWrapperWithClass('button', 'edit');
  const deleteBtn = createWrapperWithClass('button', 'delete');
  headerWrapper.appendChild(btn);
  headerWrapper.appendChild(titleDom);
  headerWrapper.appendChild(editBtn);
  headerWrapper.appendChild(deleteBtn);
  const descriptionDom = taskPropertyDom(obj, 'description');
  const dateDom = taskPropertyDateDom(obj, 'date');

  return [headerWrapper, descriptionDom, dateDom];
}

function createTaskDom(obj, key) {
  const container = createWrapperWithData('div', 'data-key', key);
  container.classList.add('task');
  
  taskDom(obj).forEach(item => container.appendChild(item));

  return container;
}

function taskPropertyDom(obj, key) {
  const taskProperty = createWrapperWithData('div', 'data-info', key);
  taskProperty.textContent = obj[key];
  
  return taskProperty;
}

function taskPropertyDateDom(obj, key) {
  const taskProperty = createWrapperWithData('div', 'data-info', key);
  const dateVal = format(new Date(obj[key]), 'LLL d')
  taskProperty.textContent = dateVal;
  
  return taskProperty;
}

function createWrapperWithData(type, keyName, key) {
  const wrapper = document.createElement(type);
  wrapper.setAttribute(keyName, `${key}`);

  return wrapper;
}

function printAllTasks() {
  const taskListContainer = createWrapperWithClass('div', 'task-list');
  taskListContainer.setAttribute('data-view', 'all-task');
  AppendAllData('task', taskListContainer);

  return taskListContainer;
}

// update task content 
function updateTaskDom(container) {
  const toReplace = container.querySelector('.task-list');
  container.replaceChild(printAllTasks(), toReplace);
}

//appendAllData
function  AppendAllData(key, container) {
  const length = localStorage.length;
  for (let i = 0; i < length; i++) {
    let currentKey = `${key}` + `${i}`;
    container.appendChild(createTaskDom(getData(currentKey), currentKey));
  }
}

//Create wrapper container
function createWrapper(tag) {
  const container = document.createElement(tag);

  return container;
}

function createWrapperWithClass(tag, name) {
  const container = createWrapper(tag)
  container.classList.add(name);

  return container;
}

export {printAllTasks, createWrapperWithClass, updateTaskDom};