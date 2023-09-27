import { toggleClassName } from "./hide-elements";
import PubSub from "pubsub-js";
import { printTodayTasks } from "./print-today-task";
import { printAllTasks } from "./print-all-task";
import { printProjectTasks } from "./print-by-project";

function selectBtn(e) {
  removeSidebarSelectedBtn();
  e.target.parentElement.classList.add('selected');
}

function removeSidebarSelectedBtn() {
  const sidebarBtnList = document.querySelectorAll('.sidebar > ul > li');
  sidebarBtnList.forEach(li => removeSelected(li, 'selected'));
}

function removeSelected(target, name) {
  target.classList.remove(name);
}

function toggleView(target) {
  target.classList.toggle('hidden');
}

function showDialog(target) {
  target.showModal();
}

function resetForm(target) {
  target.reset();
}

function viewProjectList(e) {
  const mainProjectList = document.querySelector('.main-project-list');
  toggleClassName(mainProjectList, 'visually-hidden');
  toggleClassName(e.target, 'project-on-view');
}

function viewTodayTask(container) {
  changeView(container, printTodayTasks);
}

function viewAllTask(container) {
  changeView(container, printAllTasks);
}

function viewProjectTask(target) {
  const container = document.querySelector('.main-content');
  changeProjectView(container, target, printProjectTasks);
}

function changeProjectView(container, target, func) {
  const toReplace = container.querySelector('.task-list');
  container.replaceChild(func(target), toReplace);

  PubSub.publish('viewChanged', func);
}

function changeView(container, func) {
  const toReplace = container.querySelector('.task-list');
  container.replaceChild(func(), toReplace);

  PubSub.publish('viewChanged', func);
}

export {selectBtn, toggleView, showDialog, resetForm, viewProjectList, viewTodayTask, viewAllTask, viewProjectTask};