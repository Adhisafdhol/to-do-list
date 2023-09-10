import 'normalize.css';
import './fonts/inter/style.css';
import './style.css';
import {toDoList , task} from './todo';
import {home} from './pages/home';

function component () {
  const content = document.getElementById('content');
  content.appendChild(home());
  return content;
}

document.body.appendChild(component());


