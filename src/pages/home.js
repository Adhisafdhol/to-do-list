import {createWrapperWithClass} from "../print-tasks";
import { printAllTasks } from "../print-all-task";
import { createPopUpModal, createEditPopUpModal, createDeletePopUpModal, createProjectPopUp, createDeleteProjectModal } from "../modal-form";
import { createProjectDom, printAllProject } from "../print-project";
import { printProjectTasks } from "../print-by-project";

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
  content.appendChild(createProjectPopUp());
  content.appendChild(createDeleteProjectModal());

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

  const allTask = document.createElement('li');
  const allTaskBtn = createButton('view-task', 'All tasks');
  allTaskBtn.classList.add('on-view');
  allTask.appendChild(allTaskBtn);
  sidebarList.appendChild(allTask);

  const projects = createWrapperWithClass('div', 'project-list');
  const projectHeaderContainer = createWrapperWithClass('div', 'project-header');
  const viewProjectsBtn = createWrapperWithClass('button', 'view-projects');
  projectHeaderContainer.appendChild(viewProjectsBtn);
  const projectHeader = document.createElement('div');
  projectHeader.textContent = 'Projects';
  projectHeaderContainer.appendChild(projectHeader);
  const addProjectsBtn = createWrapperWithClass('button', 'add-project');
  projectHeaderContainer.appendChild(addProjectsBtn);
  projects.appendChild(projectHeaderContainer);
  projects.appendChild(printAllProject());
  sidebar.appendChild(projects);

  return sidebar;
}

function mainContent() {
  const mainContent = document.createElement('main');
  mainContent.classList.add('main-content');
  mainContent.appendChild(printAllTasks());
  mainContent.appendChild(createAddTaskBtn());

  return mainContent;
}

//create add task button
function createAddTaskBtn() {
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
  button.setAttribute('data-key', dataKey.split(' ').join('-').toLowerCase());
  button.setAttribute('type', 'button');
  button.textContent = dataKey;

  return button;
}

export { home };