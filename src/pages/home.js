import { add } from "date-fns";
import { printAllTasks, createWrapperWithClass} from "../print-tasks";
import { toDoList } from "../todo";
import { viewTaskMode } from "../controller";

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
  const todayBtn = createButton('view-task', 'Today');
  today.appendChild(todayBtn);
  sidebarList.appendChild(today);
  today.addEventListener('click', () => console.log('hi'))

  const next7Days = document.createElement('li');
  const next7DaysBtn = createButton('view-task', 'Next 7 Days');
  next7Days.appendChild(next7DaysBtn);
  sidebarList.appendChild(next7Days);
  next7DaysBtn.addEventListener('click', () => console.log('hi'))

  const allTask = document.createElement('li');
  const allTaskBtn = createButton('view-task', 'All tasks');
  allTask.appendChild(allTaskBtn);
  sidebarList.appendChild(allTask);
  allTaskBtn.addEventListener('click', () => console.log('hi'))

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

function createButton(name, dataKey) {
  const button = createWrapperWithClass('button', name)
  button.setAttribute('data-key', dataKey.toLowerCase());
  button.setAttribute('type', 'button');
  button.textContent = dataKey;

  return button;
}

export { home };