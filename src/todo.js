import PubSub from "pubsub-js";

const toDoList = [];

//constructor function to create a task
const Task = (title, description, date, priority) => {
  let dateVal = createDate(date);
  return {title, description, date: dateVal, priority};
};

//Put task in the array
function createTask(title, description, date, priority) {
  toDoList.push(Task(title, description, date, priority));
}

function isKeyExist(name) {
  const key = !!localStorage.getItem(name);

  return key;
}

function createDate(date) {
  let dateVal = (date === '')?new Date().toLocaleDateString():new Date(date).toLocaleDateString();

  return dateVal;
}

function createKeyName(name) {
  let key;
  const length = localStorage.length;
  for (let i = 0; i < length + 1; i++) {
    let currentKey = `${name}`+`${i}`;
    if (!localStorage.getItem(currentKey)) {
      key = currentKey;
    }
  }

  return key;
}

function formValue(target) {
  const form = target.querySelector('form');

  if (checkRequiredVal(getTitle(form))) {
    storeData(Task(getTitle(form), getDescription(form), getData(form), getPriority(form)), createKeyName('task'));
  }
  getAllTasks('task');
}

function getTitle(target) {
  return target.querySelector('input[name="title"]').value;
}

function getDescription(target) {
  return target.querySelector('textarea').value;
}

function getDate(target) {
  return target.querySelector('input[name="date"]').value;
}

function getPriority(target) {
  return target.querySelector('select').value;
}

function formEditVal(target, e) {
  const key = e.target.getAttribute('data-key');
  const form = target.querySelector('form');

  if (checkRequiredVal(getTitle(form))) {
    updateData(Task(getTitle(form), getDescription(form), getDate(target), getPriority(form)), key);
  }

  PubSub.publish('editSubmitted');
}
function checkRequiredVal(val) {
  return val !== '';
}

function storeData(data, name) {
  if (!isKeyExist(name)) {
  localStorage.setItem(name, JSON.stringify(data))
  }
}

function updateData(data, name) {
  localStorage.setItem(name, JSON.stringify(data))
}

function  getAllTasks(key) {
  const length = localStorage.length;
  for (let i = 0; i < length; i++) {
    let currentKey = `${key}` + `${i}`;
    getData(currentKey);
  }
}

function getData(key) {
  return JSON.parse(localStorage.getItem(`${key}`));
}

function editObject() {

}

export {Task, toDoList, formValue, getAllTasks, getData, formEditVal};