import { add } from "date-fns";
import { printAllTasks, printTaskDom } from "../print-tasks";
import { toDoList } from "../todo";

function home () {
  const homeContainer = document.createElement('div');
  homeContainer.classList.add('home-container');
  homeContainer.appendChild(mainHeader());
  homeContainer.appendChild(sidebar());
  homeContainer.appendChild(mainContent());

  return homeContainer;
}

function mainHeader() {
  const mainHeader = document.createElement('div');
  mainHeader.classList.add('main-header');

  const sidebarBtn = document.createElement('button');
  sidebarBtn.classList.add('sidebar-btn');
  sidebarBtn.setAttribute('type', 'button');
  mainHeader.appendChild(sidebarBtn)

  const mainHeading = document.createElement('h1');
  mainHeading.textContent = 'Task.Daily';
  mainHeader.appendChild(mainHeading);
  mainHeader.appendChild(document.createElement('span'));

  return mainHeader;
}

function sidebar() {
  const sidebar = document.createElement('nav');
  sidebar.classList.add('sidebar');

  const sidebarList = document.createElement('ul');
  sidebar.appendChild(sidebarList);

  const today = document.createElement('li');
  const todayBtn = document.createElement('button');
  todayBtn.classList.add('view-task');
  todayBtn.setAttribute('data-key', 'today');
  todayBtn.setAttribute('type', 'button');
  todayBtn.textContent = 'Today';
  today.appendChild(todayBtn);
  sidebarList.appendChild(today);

  const next7Days = document.createElement('li');
  const next7DaysBtn = document.createElement('button');
  todayBtn.classList.add('view-task');
  next7DaysBtn.setAttribute('data-key', 'next-7-days');
  next7DaysBtn.setAttribute('type', 'button');
  next7DaysBtn.textContent = 'Next 7 Days';
  next7Days.appendChild(next7DaysBtn);
  sidebarList.appendChild(next7Days);

  const allTask = document.createElement('li');
  const allTaskBtn = document.createElement('button');
  todayBtn.classList.add('view-task');
  allTaskBtn.setAttribute('data-key', 'all-task');
  allTaskBtn.setAttribute('type', 'button');
  allTaskBtn.textContent = 'All Tasks';
  allTask.appendChild(allTaskBtn);
  sidebarList.appendChild(allTask);

  return sidebar;
}

function mainContent() {
  const mainContent = document.createElement('main');
  mainContent.classList.add('main-content');
  mainContent.appendChild(printAllTasks(toDoList));
  mainContent.appendChild(addTask());

  return mainContent;
}

function addTask() {
  const btnContainer = document.createElement('div');
  btnContainer.classList.add('add-task-container');
  const addTaskBtn = document.createElement('button');
  addTaskBtn.textContent = 'Add task';
  addTaskBtn.setAttribute('data-key', 'add-task');
  addTaskBtn.setAttribute('type', 'button');
  btnContainer.appendChild(addTaskBtn);

  return btnContainer;
}

export { home };