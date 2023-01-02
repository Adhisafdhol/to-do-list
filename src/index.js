import 'normalize.css';
import './fonts/inter/style.css';
import './style.css';
import { todoList , todo } from './todo';
import { home } from './pages/home';
import { task } from './pages/task';

function component () {
  const content = document.getElementById('content');
  
  content.appendChild(home());

  return content;
}

document.body.appendChild(component());


