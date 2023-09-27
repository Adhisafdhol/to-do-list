import PubSub from "pubsub-js";
import { initiateKey } from "./print-all-task";

//constructor function to create a task
const Task = (title, description, date, priority, complete, project, dateCreated) => {
  let dateVal = createDate(date);
  return {title, description, date: dateVal, priority, complete, project, dateCreated};
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
  return target.querySelector('.priority select').value;
}

function getProjectVal(target) {
  return target.querySelector('.project select').value;
}

function submitNewTask(target) {
  const form = target.querySelector('form');
  approveForm(form);
  PubSub.publish('taskUpdated');
}

function approveForm(target) {
  if (checkRequiredVal(getTitle(target))) {
    storeData(Task(getTitle(target), getDescription(target), getDate(target), getPriority(target), false, getProjectVal(target), new Date()), createKeyName('task'));
  }
}

function submitEditedTask(target) {
  const form = target.querySelector('form');
  const btn = target.querySelector('.submit-edit');
  const key = btn.getAttribute('data-key');
  approveEditedTask(form, key)
  PubSub.publish('taskUpdated');
}

function approveEditedTask(target, key) {
  const date = getData(key).dateCreated;
  if (checkRequiredVal(getTitle(target))) {
    updateData(Task(getTitle(target), getDescription(target), getDate(target), getPriority(target), false, getProjectVal(target), date), key);
  }
}

function deleteTask(target) {
  const key = target.getAttribute('data-key'); 
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
  
  if(project) {
    updateProjectArray(form, project)
  } else {
    initiateProject(form);
  }

}

function updateProjectArray(form, project) {
  if (checkRequiredVal(getProject(form))) {
    project.push(getProject(form));
    updateData(project, 'project');
    PubSub.publish('projectUpdated');
  }
}

function initiateProject(form) {
  storeData([getProject(form)], 'project');
  PubSub.publish('projectUpdated');
}


function findAllProjectTasks(name, key) {
  const length = localStorage.length;
  let keys = initiateKey();

  for (let i = 0; keys < length; i++) {
    let currentKey = `${key}` + `${i}`;
    if(isKeyExist(currentKey)) {
      if (compareTaskProject(getData(currentKey), name)) {
        deleteData(currentKey);
      }
      keys += 1;
    }
  }  
  PubSub.publish('taskUpdated');
}

function compareTaskProject(obj, toCompare) {
  return obj['project'] === toCompare;
}

function deleteProject(target) {
  const key = target.getAttribute('data-key');
  updateProjectData(key);
  findAllProjectTasks(key, 'task');
  //deleteData(key);

  PubSub.publish('projectUpdated');
}

function updateProjectData(key) {
  const project = getData('project');
  const index = project.indexOf(key);
  project.splice(index, 1);
  updateData(project, 'project') 
}
export {getAllTasks, getData, submitNewTask, submitEditedTask, deleteTask, isKeyExist, updateData, submitNewProject, storeData, deleteProject};