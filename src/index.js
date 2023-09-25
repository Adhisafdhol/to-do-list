import 'normalize.css';
import PubSub, { publish } from 'pubsub-js';
import './fonts/inter/style.css';
import './style.css';
import {submitEditedTask, submitNewTask, deleteTask, submitNewProject} from './todo';
import {home} from './pages/home';
import { printAllTasks , setEditFormInput, updateTaskDom} from './print-tasks';
import { selectBtn, viewTaskMode , toggleView, showDialog, resetForm} from './controller';
import { createPopUpModal, createEditPopUpModal } from './modal-form';
import { resetFormLabel } from './hide-elements';

function component () {
  const content = document.getElementById('content');
  content.appendChild(home());

  const sidebar = document.querySelector('.sidebar');
  const viewTaskBtn = document.querySelectorAll('button.view-task');
  viewTaskBtn.forEach(button => button.addEventListener('click', viewTaskMode));

  const sidebarBtn = document.querySelector('.sidebar-btn');
  sidebarBtn.addEventListener('click', toggleView.bind(sidebarBtn, sidebar));

  const modalProjectForm = document.querySelector('.project-modal');
  const modalForm = document.querySelector('.modal');
  const modalEditForm = document.querySelector('.edit-modal');
  const modalDeleteForm = document.querySelector('.delete-modal');
  const mainContent = document.querySelector('.main-content');

  const openForm = PubSub.subscribe('formOpened', showDialog.bind(this, modalForm));
  const editFormOpened = PubSub.subscribe('editFormOpened', showDialog.bind(this, modalEditForm));
  const deleteFormOpened = PubSub.subscribe('deleteFormOpened', showDialog.bind(this, modalDeleteForm));
  const projectFormOpened = PubSub.subscribe('projectFormOpened', showDialog.bind(this, modalProjectForm));
  const showLabel = PubSub.subscribe('formOpened', resetFormLabel.bind(this,  modalForm.querySelector('form')));
  const resetFormVal = PubSub.subscribe('formOpened', resetForm.bind(this, modalForm.querySelector('form')));
  const showProjectLabel = PubSub.subscribe('projectFormOpened', resetFormLabel.bind(this,  modalProjectForm.querySelector('form')));
  const resetProjectFormVal = PubSub.subscribe('projectFormOpened', resetForm.bind(this, modalProjectForm.querySelector('form')))
  const updateTaskList = PubSub.subscribe('taskUpdated',updateTaskDom.bind(this, mainContent));
  //const updateProjectList = PubSub.subscribe('taskUpdated',updateProjectDom.bind(this, ));

  const addTaskBtn = document.querySelector('button[data-key="add-task"');
  addTaskBtn.addEventListener('click', PubSub.publish.bind(this,'formOpened'));
 
  const addProjectBtn = document.querySelector('button.add-project');
  addProjectBtn.addEventListener('click', PubSub.publish.bind(this,'projectFormOpened'));
 
  const cancelBtn = document.querySelector('button.cancel');
  cancelBtn.addEventListener('click', PubSub.publish.bind(this, 'formClosed'));

  const submitBtn = document.querySelector('button.submit');
  submitBtn.addEventListener('click', submitNewTask.bind(this, modalForm));

  const submitEditBtn = document.querySelector('button.submit-edit');
  submitEditBtn.addEventListener('click', submitEditedTask.bind(this, modalEditForm));

  const deleteTaskBtn = document.querySelector('button.delete-task');
  deleteTaskBtn.addEventListener('click', deleteTask);

  const submitProjectBtn = document.querySelector('button.submit-project');
  //submitProjectBtn.addEventListener('click', submitNewProject.bind(this, modalProjectForm));

  return content;
}

createPopUpModal();

document.body.appendChild(component());


