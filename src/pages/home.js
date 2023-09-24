import { add } from "date-fns";
import { printAllTasks, createWrapperWithClass} from "../print-tasks";
import { toDoList } from "../todo";
import { viewTaskMode } from "../controller";
import { createPopUpModal, createEditPopUpModal, createDeletePopUpModal } from "../modal-form";
import { getAllTasks } from "../todo";

function home () {
  const homeContainer = document.createElement('div');
  homeContainer.classList.add('home-container');

  const content = document.createElement('div');
  content.classList.add('content');

  homeContainer.appendChild(mainHeader());
  homeContainer.appendChild(content);
  content.appendChild(sidebar());
  content.appendChild(mainContent());
  content.appendChild(createPopUpModal());
  content.appendChild(createEditPopUpModal());
  content.appendChild(createDeletePopUpModal());

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
  sidebar.classList.add('hidden');
  sidebar.classList.add('sidebar');

  const sidebarList = document.createElement('ul');
  sidebar.appendChild(sidebarList);

  const today = document.createElement('li');
  const todayBtn = createButton('view-task', 'Today');
  today.appendChild(todayBtn);
  sidebarList.appendChild(today);

  const next7Days = document.createElement('li');
  const next7DaysBtn = createButton('view-task', 'Next 7 Days');
  next7Days.appendChild(next7DaysBtn);
  sidebarList.appendChild(next7Days);

  const allTask = document.createElement('li');
  const allTaskBtn = createButton('view-task', 'All tasks');
  allTaskBtn.classList.add('on-view');
  allTask.appendChild(allTaskBtn);
  sidebarList.appendChild(allTask);

  const projects = createWrapperWithClass('div', 'project');
  const projectHeaderContainer = createWrapperWithClass('div', 'project-header');
  const viewProjectsBtn = createWrapperWithClass('button', 'view-projects');
  projectHeaderContainer.appendChild(viewProjectsBtn);
  const projectHeader = document.createElement('div');
  projectHeader.textContent = 'Projects';
  projectHeaderContainer.appendChild(projectHeader);
  const addProjectsBtn = createWrapperWithClass('div', 'add-project');
  projectHeaderContainer.appendChild(addProjectsBtn);
  projects.appendChild(projectHeaderContainer);
  sidebar.appendChild(projects);

  return sidebar;
}

function mainContent() {
  const mainContent = document.createElement('main');
  mainContent.classList.add('main-content');
  mainContent.appendChild(printAllTasks());
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
  button.setAttribute('data-key', dataKey.split(' ').join('-'))
  button.setAttribute('type', 'button');
  button.textContent = dataKey;

  return button;
}

export { home };