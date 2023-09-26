import { getData } from "./todo";
import { hideLabel } from "./hide-elements";
import { format } from "date-fns";

function openEditForm(key) {
  const taskObj = getData(key);
  setEditFormInput(taskObj, key);
  PubSub.publish('editFormOpened');
}

function openDeleteForm(key) {
  const taskObj = getData(key);
  setDeleteForm(key);
  PubSub.publish('deleteFormOpened');
}

function openDeleteProjectForm(key) {
  //const taskObj = getData(key);
  setDeleteProjectForm(key);
  console.log(key);
  PubSub.publish('deleteProjectOpened');
}

function setEditFormInput(obj, key) {
  const form = document.querySelector('.edit-modal');
  const titleLabel = form.querySelector('.title label')
  const titleInput = form.querySelector('.title input');
  titleInput.value = obj[`title`];
  hideLabel(titleLabel, titleInput);
  const descriptionLabel = form.querySelector('.description label');
  const descriptionInput = form.querySelector('.description textarea');
  descriptionInput.value = obj[`description`];
  descriptionInput.textContent = obj[`description`];
  hideLabel(descriptionLabel, descriptionInput);
  const date = form.querySelector('.date input');
  const dateVal = format(new Date(obj['date']), 'yyyy-MM-dd');
  date.value = dateVal;
  const priority = form.querySelector('.priority select');
  priority.value = obj['priority'];
  const btn = document.querySelector('.submit-edit');
  btn.setAttribute('data-key', key);
}

//Change the delete form data key to match the selected data
function setDeleteForm(key) {
  const form = document.querySelector('.delete-modal');
  const deleteBtn = form.querySelector('.delete-task');
  deleteBtn.setAttribute('data-key', key);
}

function setDeleteProjectForm(key) {
  const form = document.querySelector('.delete-project-modal');
  const deleteBtn = form.querySelector('.submit-delete-project');
  deleteBtn.setAttribute('data-key', key);
}

export {openDeleteForm, openEditForm, openDeleteProjectForm}