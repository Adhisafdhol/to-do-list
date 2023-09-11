import 'normalize.css';
import './fonts/inter/style.css';
import './style.css';
import {toDoList , Task} from './todo';
import {home} from './pages/home';
import { printTaskDom } from './print-tasks';

function component () {
  const content = document.getElementById('content');
  content.appendChild(home());
  return content;
}

printTaskDom(toDoList);

document.body.appendChild(component());


