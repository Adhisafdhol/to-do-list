import { deleteTask, getData, updateData} from "./todo";
import { format } from "date-fns";
import PubSub from "pubsub-js";
import {toggleClassName} from "./hide-elements";
import { isKeyExist } from "./todo";
import { openDeleteForm , openEditForm} from "./form-controller";

const taskDom = (obj, key) => {
  const headerWrapper = createWrapperWithClass('div', 'task-header');
  const btn = createCompleteBtn(key, obj);
  const titleDom = getTitleDom(obj);
  //Create delete Button and its functionality
  const deleteBtn = createDeleteBtn(key);
  headerWrapper.appendChild(btn);
  headerWrapper.appendChild(titleDom);
  //Create edit button and its functionality
  initiateEditBtn(obj, key, headerWrapper)
  headerWrapper.appendChild(deleteBtn);
  const descriptionDom = taskPropertyDom(obj, 'description', 'div');
  descriptionDom.classList.add('hidden');
  const footerWrapper = createWrapperWithClass('div', 'task-footer');
  const dateDom = taskPropertyDateDom(obj, 'date');
  const expandTaskBtn = createExpandBtn(key);
  const priority = taskPropertyPriorityDom(obj, 'priority');
  footerWrapper.appendChild(dateDom);
  footerWrapper.appendChild(expandTaskBtn);
  footerWrapper.appendChild(priority);

  return [headerWrapper, descriptionDom, footerWrapper];
}

function createTaskDom(obj, key) {
  const container = createWrapperWithData('div', 'data-key', key);
  container.setAttribute('data-complete', `${obj['complete']}`);
  container.classList.add('task');
  
  taskDom(obj,key).forEach(item => container.appendChild(item));

  return container;
}

function taskPropertyDom(obj, key, type) {
  const taskProperty = createWrapperWithData(type, 'data-info', key);
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

function createBtnClassWithData(className, keyName, key) {
  const btn = createWrapperWithClass('button', className);
  btn.setAttribute(keyName, `${key}`);

  return btn
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

//Change the completion task property
function changeTaskStatus(key) {
  const taskObj = getData(key);
  changeObjProperty(taskObj, 'complete', toggleComplete(taskObj['complete']));
  updateData(taskObj, key);
  updateTaskStatusDom(taskObj, key);
}

function toggleComplete(val) {
  return val===false?true:false;
}

function changeObjProperty(obj, property, value) {
  obj[property] = value;
}

//Change task completion status 
function updateTaskStatusDom(obj, key) {
  const taskDom = document.querySelector(`.task[data-key="${key}"]`);
  const deleteBtn = taskDom.querySelector(`.delete`);
  taskDom.setAttribute('data-complete', `${obj['complete']}`);
  const titleDom = taskDom.querySelector('[data-info="title"');
  const btn = taskDom.querySelector(`button[data-complete]`);
  btn.setAttribute('data-complete', `${obj['complete']}`);
  const editBtn = taskDom.querySelector(`button.edit`);
  domTitleToggle(obj, titleDom);
  editBtnToggle(key, findParent(deleteBtn), deleteBtn, editBtn);
}

function domTitleToggle(obj, el) {
  const newEL = obj['complete']?strikeTitle(obj):taskPropertyDom(obj, 'title', 'div');
  replaceElement(findParent(el), newEL, el);
}

function getTitleDom(obj) {
  return obj['complete']?strikeTitle(obj):taskPropertyDom(obj, 'title', 'div');
}

function strikeTitle(obj) {
  return taskPropertyDom(obj, 'title', 's');
}

function replaceElement(parent, newChild, child) {
  parent.replaceChild(newChild, child);
}

function findParent(dom) {
  return dom.parentElement;
}

function initiateEditBtn(obj, key, parent) {
  if(!obj['complete']) {
    parent.appendChild(createEditBtn(key));
  }
}
function editBtnToggle(key, parent, target, el) {
  el===null?parent.insertBefore(createEditBtn(key), target):removeEl(el);
}

function removeEl(el) {
  el.remove();
}

function createEditBtn(key) {
  const editBtn = createBtnClassWithData('edit', 'data-key', key);
  editBtn.addEventListener('click', openEditForm.bind(this, editBtn.getAttribute('data-key')));

  return editBtn;
}

function createCompleteBtn(key, obj) {
  const btn = createBtnClassWithData('done', 'data-key', key);
  btn.setAttribute('data-complete', `${obj['complete']}`);
  btn.addEventListener('click', changeTaskStatus.bind(this, btn.getAttribute('data-key')));

  return btn;
}

function createDeleteBtn(key) {
  const deleteBtn = createBtnClassWithData('delete', 'data-key', key)
  deleteBtn.addEventListener('click', openDeleteForm.bind(this, deleteBtn.getAttribute('data-key')));

  return deleteBtn;
}

function createExpandBtn(key) {
  const btn = createBtnClassWithData('expand', 'data-key', key)
  btn.addEventListener('click', expandTask.bind(this, btn.getAttribute('data-key')));
 
  return btn;
}

function expandTask(task) {
  const dom = document.querySelector(`.task[data-key="${task}"`);
  const descriptionDom = dom.querySelector('[data-info="description"]')
  toggleTaskView(descriptionDom);
}

function toggleTaskView(target) {
  toggleClassName(target, 'hidden');
  toggleClassName(findParent(target), 'detail-open');
}

export {createWrapperWithClass, createTaskDom};