import 'normalize.css';
import './fonts/inter/style.css';
import './style.css';
import {toDoList , Task} from './todo';
import {home} from './pages/home';
import { printAllTasks } from './print-tasks';
import { selectBtn, viewTaskMode , toggleView, showDialog} from './controller';
import { createPopUpModal } from './modal-form';


function component () {
  const content = document.getElementById('content');
  content.appendChild(home());

  const sidebar = document.querySelector('.sidebar');
  const viewTaskBtn = document.querySelectorAll('button.view-task');
  viewTaskBtn.forEach(button => button.addEventListener('click', viewTaskMode));

  const sidebarBtn = document.querySelector('.sidebar-btn');
  sidebarBtn.addEventListener('click', toggleView.bind(sidebarBtn, sidebar));

  const modalForm = document.querySelector('.modal');

  const addTaskBtn = document.querySelector('button[data-key="add-task"');
  addTaskBtn.addEventListener('click', showDialog.bind(addTaskBtn, modalForm));
 
  return content;
}

createPopUpModal();

document.body.appendChild(component());


