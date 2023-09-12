import 'normalize.css';
import './fonts/inter/style.css';
import './style.css';
import {toDoList , Task} from './todo';
import {home} from './pages/home';
import { printAllTasks } from './print-tasks';

function component () {
  const content = document.getElementById('content');
  content.appendChild(home());
  return content;
}

printAllTasks(toDoList);

document.body.appendChild(component());


