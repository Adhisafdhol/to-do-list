import { da } from "date-fns/locale";

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
    console.log(currentKey);
    if (!localStorage.getItem(currentKey)) {
      key = currentKey;
    }
  }

  return key;
}

function formValue(target) {
  const form = target.querySelector('form');
  const title = form.querySelector('input[name="title"]').value;
  const description = form.querySelector('textarea').value;
  const date = form.querySelector('input[name="date"]').value;
  const priority = form.querySelector('select').value;

  if (checkRequiredVal(title)) {
    storeData(Task(title, description, date, priority), createKeyName('task'));
  }

  getAllTasks('task');
}

function checkRequiredVal(val) {
  return val !== '';
}

function storeData(data, name) {
  if (!isKeyExist(name)) {
  localStorage.setItem(name, JSON.stringify(data))
  }
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

export {Task, toDoList, formValue, getAllTasks, getData};