import { createBasicElm } from '../dom-js/dom-js';

function home () {
  const home = createBasicElm('div', 'home', null);

  const button = createBasicElm('button', 'add', null);

  home.appendChild(sidebar());
  home.appendChild(taskList());
  home.appendChild(button);
  return home;
}

function sidebar() {
  const sidebar = createBasicElm('div', 'sidebar', null)
  const yourTasks = createBasicElm('div', null, 'Dashboard');
  const allTasks = createBasicElm('div', null, 'All Tasks')

  sidebar.appendChild(yourTasks);
  sidebar.appendChild(allTasks);
  
  return sidebar;
}

function taskList() {
  const taskList = createBasicElm('div', 'task-list', null);

  const taskName = createBasicElm('h1', 'header', 'All Tasks');

  taskList.appendChild(taskName);

  return taskList;
}

export { home };