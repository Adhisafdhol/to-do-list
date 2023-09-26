import 'normalize.css';
import PubSub, { publish } from 'pubsub-js';
import './fonts/inter/style.css';
import './style.css';
import {submitEditedTask, submitNewTask, deleteTask, submitNewProject, deleteProject} from './todo';
import {home} from './pages/home';
import { printAllTasks , setEditFormInput, updateTaskDom} from './print-tasks';
import { selectBtn, viewTaskMode , toggleView, showDialog, resetForm, viewProjectList} from './controller';
import { createPopUpModal} from './modal-form';
import { resetFormLabel, toggleClassName } from './hide-elements';
import { updateProjectDom , updateProjectOpt} from './print-project';

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
  const modalDeleteProject = document.querySelector('.delete-project-modal');
  const mainContent = document.querySelector('.main-content');
  const projectList = document.querySelector('.project-list');
  const projectSelect = document.querySelector('.project');
  const projectEditSelect = document.querySelector('.edit-task-form .project');

  const openForm = PubSub.subscribe('formOpened', showDialog.bind(this, modalForm));
  const editFormOpened = PubSub.subscribe('editFormOpened', showDialog.bind(this, modalEditForm));
  const deleteFormOpened = PubSub.subscribe('deleteFormOpened', showDialog.bind(this, modalDeleteForm));
  const deleteProjectOpened = PubSub.subscribe('deleteProjectOpened', showDialog.bind(this, modalDeleteProject));
  const projectFormOpened = PubSub.subscribe('projectFormOpened', showDialog.bind(this, modalProjectForm));
  const showLabel = PubSub.subscribe('formOpened', resetFormLabel.bind(this,  modalForm.querySelector('form')));
  const resetFormVal = PubSub.subscribe('formOpened', resetForm.bind(this, modalForm.querySelector('form')));
  const showProjectLabel = PubSub.subscribe('projectFormOpened', resetFormLabel.bind(this,  modalProjectForm.querySelector('form')));
  const resetProjectFormVal = PubSub.subscribe('projectFormOpened', resetForm.bind(this, modalProjectForm.querySelector('form')))
  const updateTaskList = PubSub.subscribe('taskUpdated',updateTaskDom.bind(this, mainContent));
  const updateProjectList = PubSub.subscribe('projectUpdated', updateProjectDom.bind(this, projectList));
  const updateFormOption = PubSub.subscribe('projectUpdated', updateProjectOpt.bind(this, projectSelect));
  const updateEditOption = PubSub.subscribe('projectUpdated', updateProjectOpt.bind(this, projectEditSelect));

  //form submit events 
  const modalFormEl = document.querySelector('.modal > form');
  modalFormEl.addEventListener('submit', submitNewTask.bind(this, modalForm));

  const editFormEl = document.querySelector('.edit-modal > form');
  editFormEl.addEventListener('submit', submitEditedTask.bind(this, modalEditForm));

  const submitProjectEl = document.querySelector('.project-modal > form');
  submitProjectEl.addEventListener('submit', submitNewProject.bind(this, modalProjectForm));

  const deleteTaskEl = document.querySelector('.delete-modal > form');
  const deleteTaskBtn = document.querySelector('button.delete-task');
  deleteTaskEl.addEventListener('click', deleteTask.bind(this, deleteTaskBtn));

  const deleteProjectEl = document.querySelector('.delete-project-modal > form');
  const deleteProjectBtn = document.querySelector('button.submit-delete-project');
  deleteProjectEl.addEventListener('submit', deleteProject.bind(this, deleteProjectBtn));

  //Btn events elements
  const addTaskBtn = document.querySelector('button[data-key="add-task"');
  addTaskBtn.addEventListener('click', PubSub.publish.bind(this,'formOpened'));

  const viewProjectListBtn = document.querySelector('.view-projects');
  viewProjectListBtn.addEventListener('click', viewProjectList.bind(this));
 
  const addProjectBtn = document.querySelector('button.add-project');
  addProjectBtn.addEventListener('click', PubSub.publish.bind(this,'projectFormOpened'));
 
  const cancelBtn = document.querySelector('button.cancel');
  cancelBtn.addEventListener('click', PubSub.publish.bind(this, 'formClosed'));

  return content;
}

createPopUpModal();

document.body.appendChild(component());


