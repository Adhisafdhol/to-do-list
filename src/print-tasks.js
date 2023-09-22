import { getData } from "./todo";
import { format } from "date-fns";
import PubSub from "pubsub-js";
import { hideLabel } from "./hide-elements";

const taskDom = (obj, key) => {
  const headerWrapper = createWrapperWithClass('div', 'task-header');
  const btn = createWrapperWithClass('button', 'done');
  btn.setAttribute('data-key', `${key}`);
  const titleDom = taskPropertyDom(obj, 'title');  
  const editBtn = createWrapperWithClass('button', 'edit');
  editBtn.setAttribute('data-key', `${key}`);
  editBtn.addEventListener('click', openEditForm.bind(this, editBtn.getAttribute('data-key')));
  const deleteBtn = createWrapperWithClass('button', 'delete');
  deleteBtn.setAttribute('data-key', `${key}`);
  headerWrapper.appendChild(btn);
  headerWrapper.appendChild(titleDom);
  headerWrapper.appendChild(editBtn);
  headerWrapper.appendChild(deleteBtn);
  const descriptionDom = taskPropertyDom(obj, 'description');
  const footerWrapper = createWrapperWithClass('div', 'task-footer');
  const dateDom = taskPropertyDateDom(obj, 'date');
  const priority = taskPropertyPriorityDom(obj, 'priority');
  footerWrapper.appendChild(dateDom);
  footerWrapper.appendChild(priority);

  return [headerWrapper, descriptionDom, footerWrapper];
}

function createTaskDom(obj, key) {
  const container = createWrapperWithData('div', 'data-key', key);
  container.classList.add('task');
  
  taskDom(obj,key).forEach(item => container.appendChild(item));

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

function taskPropertyPriorityDom(obj, key) {
  const taskProperty = createWrapperWithData('div', 'data-info', key);
  taskProperty.classList.add(`${obj[key]}`);
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

//edit task 
function getObjKey(target) {
  console.log(target);
  const objKey = target.getAttribute('data-key');
  console.log(objKey);
}

function openEditForm(key) {
  const taskObj = getData(key);
  console.log(key);
  setEditFormInput(taskObj, key);
  PubSub.publish('editFormOpened');
}

function setEditFormInput(obj, key) {
  const form = document.querySelector('.edit-modal');
  const titleLabel = form.querySelector('.title label')
  const titleInput = form.querySelector('.title input');
  titleInput.value = obj[`title`];
  hideLabel(titleLabel, titleInput);
  const descriptionLabel = form.querySelector('.description label');
  const descriptionInput = form.querySelector('.description textarea');
  descriptionInput.value = obj[`description`];
  descriptionInput.textContent = obj[`description`];
  hideLabel(descriptionLabel, descriptionInput);
  const date = form.querySelector('.date input');
  const dateVal = format(new Date(obj['date']), 'yyyy-MM-dd');
  date.value = dateVal;
  const priority = form.querySelector('.priority select');
  priority.value = obj['priority'];
  const btn = document.querySelector('.submit-edit');
  btn.setAttribute('data-key', key);
}

export {printAllTasks, createWrapperWithClass, updateTaskDom};