import PubSub from "pubsub-js";

//constructor function to create a task
const Task = (title, description, date, priority, complete) => {
  let dateVal = createDate(date);
  return {title, description, date: dateVal, priority, complete};
};

//Check if key exist
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

function getTitle(target) {
  return target.querySelector('input[name="title"]').value;
}

function getProject(target) {
  return target.querySelector('input[name="project"]').value;
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

function submitNewTask(target) {
  const form = target.querySelector('form');
  if (checkRequiredVal(getTitle(form))) {
    storeData(Task(getTitle(form), getDescription(form), getDate(form), getPriority(form), false), createKeyName('task'));
  }

  PubSub.publish('taskUpdated');
}

function submitEditedTask(target, e) {
  const key = e.target.getAttribute('data-key');
  const form = target.querySelector('form');

  if (checkRequiredVal(getTitle(form))) {
    updateData(Task(getTitle(form), getDescription(form), getDate(target), getPriority(form), false), key);
  }

  PubSub.publish('taskUpdated');
}

function deleteTask(e) {
  const key = e.target.getAttribute('data-key'); 
  deleteData(key);

  PubSub.publish('taskUpdated');
}

function checkRequiredVal(val) {
  return val !== '';
}

//Store, complete, edit, and delete functionality
function storeData(data, name) {
  if (!isKeyExist(name)) {
  localStorage.setItem(name, JSON.stringify(data))
  }
}

function deleteData(name) {
  localStorage.removeItem(name);
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

function submitNewProject(target) {
  const form = target.querySelector('form');
  const project = getData('project');

  if (checkRequiredVal(getProject(form))) {
    project.push(getProject(form));
    updateData(project, 'project');
  }

  PubSub.publish('projectUpdated');
}

export {getAllTasks, getData, submitNewTask, submitEditedTask, deleteTask, isKeyExist, updateData, submitNewProject, storeData};