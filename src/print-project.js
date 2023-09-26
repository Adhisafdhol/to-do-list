import { createWrapperWithClass } from "./print-tasks";
import { deleteProject, getData } from "./todo";
import { createSelect, createOption } from "./modal-form";
import { openDeleteProjectForm } from "./form-controller";

function checkProjectView() {
  return document.querySelector('.project-on-view')?true:false;
}

function printAllProject() {
  const projectListContainer = createWrapperWithClass('ul', 'main-project-list');
  projectListContainer.setAttribute('data-view', 'all-project');

  if (!checkProjectView()) {
    projectListContainer.classList.add('visually-hidden');
  }
  
  appendAllProject(projectListContainer);

  return projectListContainer;
}

function  appendAllProject(container) {
  const project = getData('project');

  if(project) {
    iterateProjectDom(container, project)
  }
}

function iterateProjectDom(container, project) {
  for (let i = 0; i < project.length; i++) {
      let currentKey = project[i];
      container.appendChild(createProjectDom(currentKey));
    }
}

function createProjectDom(obj) {
  const project = createWrapperWithClass('li', `project-dom`);
  const projectBtn = createWrapperWithClass('button', 'project-btn')
  projectBtn.textContent = obj;
  project.setAttribute('data-project', `${obj}`);
  projectBtn.setAttribute('data-project', `${obj}`);
  const projectDeleteBtn = createWrapperWithClass('button', 'delete-project')
  projectDeleteBtn.setAttribute('data-project', `${obj}`);
  projectDeleteBtn.addEventListener('click', openDeleteProjectForm.bind(this, projectDeleteBtn.getAttribute('data-project')));
  project.appendChild(projectBtn);
  project.appendChild(projectDeleteBtn);

  return project;
}

function updateProjectDom(container) {
  const toReplace = container.querySelector('.main-project-list');
  replaceElement(container, printAllProject(), toReplace);
}

function replaceElement(container , newEl, toReplace) {
  container.replaceChild(newEl, toReplace);
}

function isName(objName, name) {
  return objName===name?true:false;
}

//Project select elements
function printAllProjectOpt() {
  const projectSelectContainer = createSelect('project', 'project');;
  appendAllProjectOpt(projectSelectContainer);

  return projectSelectContainer;
}

function  appendAllProjectOpt(container) {
  const project = getData('project');

  if(project) {
    iterateProjectOpt(container, project);
  }
}

function iterateProjectOpt(container, project) {
  for (let i = 0; i < project.length; i++) {
    let currentKey = project[i];
    if (!isName(currentKey,'inbox')) {
      container.appendChild(createProjectOpt(currentKey));
    }
  }
}

function createProjectOpt(obj) {
  const project = createOption(obj, obj);
  project.textContent = obj;
  project.setAttribute('data-project', `${obj}`);

  return project;
}

function updateProjectOpt(container) {
  const toReplace = container.querySelector('select');
  replaceElement(container, printAllProjectOpt(), toReplace);
}

export { updateProjectDom , updateProjectOpt, printAllProject, createProjectDom, printAllProjectOpt}