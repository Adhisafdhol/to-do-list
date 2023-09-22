function viewTaskMode(e) {
  const viewMode = e.target.getAttribute('data-key');
}

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

export {viewTaskMode, selectBtn, toggleView, showDialog, resetForm};