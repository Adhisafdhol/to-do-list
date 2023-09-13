import 'normalize.css';
import './fonts/inter/style.css';
import './style.css';
import {toDoList , Task} from './todo';
import {home} from './pages/home';
import { printAllTasks } from './print-tasks';
import { selectBtn, viewTaskMode , toggleView} from './controller';


function component () {
  const content = document.getElementById('content');
  content.appendChild(home());

  const sidebar = document.querySelector('.sidebar');
  const viewTaskBtn = document.querySelectorAll('button.view-task');
  viewTaskBtn.forEach(button => button.addEventListener('click', viewTaskMode));

  const sidebarBtn = document.querySelector('.sidebar-btn');
  sidebarBtn.addEventListener('click', toggleView.bind(sidebarBtn, sidebar));

  return content;
}

document.body.appendChild(component());


