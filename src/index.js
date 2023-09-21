import 'normalize.css';
import PubSub, { publish } from 'pubsub-js';
import './fonts/inter/style.css';
import './style.css';
import {toDoList , Task, formValue} from './todo';
import {home} from './pages/home';
import { printAllTasks , updateTaskDom} from './print-tasks';
import { selectBtn, viewTaskMode , toggleView, showDialog, resetForm} from './controller';
import { createPopUpModal } from './modal-form';
import { resetFormLabel } from './hide-elements';


function component () {
  const content = document.getElementById('content');
  content.appendChild(home());

  const sidebar = document.querySelector('.sidebar');
  const viewTaskBtn = document.querySelectorAll('button.view-task');
  viewTaskBtn.forEach(button => button.addEventListener('click', viewTaskMode));

  const sidebarBtn = document.querySelector('.sidebar-btn');
  sidebarBtn.addEventListener('click', toggleView.bind(sidebarBtn, sidebar));

  const modalForm = document.querySelector('.modal');
  const mainContent = document.querySelector('.main-content');

  const openForm = PubSub.subscribe('formOpened', showDialog.bind(this, modalForm));
  const showLabel = PubSub.subscribe('formOpened', resetFormLabel.bind(this,  modalForm.querySelector('form')));
  const closeForm = PubSub.subscribe('formOpened', resetForm.bind(this, modalForm.querySelector('form')))
  const submitForm = PubSub.subscribe('formSubmitted', formValue.bind(this, modalForm));
  const updateTaskList = PubSub.subscribe('formSubmitted',updateTaskDom.bind(this, mainContent));

  const addTaskBtn = document.querySelector('button[data-key="add-task"');
  addTaskBtn.addEventListener('click', PubSub.publish.bind(this,'formOpened'));
 
  const cancelBtn = document.querySelector('button.cancel');
  cancelBtn.addEventListener('click', PubSub.publish.bind(this, 'formClosed'));

  const submitBtn = document.querySelector('button.submit');
  submitBtn.addEventListener('click', PubSub.publish.bind(this, 'formSubmitted'));
  

  return content;
}

createPopUpModal();

document.body.appendChild(component());


