function toggleClassName(target, name) {
  target.classList.toggle(name);
}

function addClassName(target, name) {
  target.classList.add(name);
}

function removeClassName(target, name) {
  target.classList.remove(name);
}

function hideLabel(target, targetInput) {
  targetInput.value.length === 0?removeClassName(target, 'visually-hidden'):addClassName(target, 'visually-hidden');
}

function resetFormLabel(form) {
  const labels = form.querySelectorAll('label');
  labels.forEach(label => resetLabel(label));
}

function resetLabel(target) {
  target.classList.remove('visually-hidden');
}

function resetSelectedBtn() {
  const btn = document.querySelectorAll('.sidebar .on-view');
  btn.forEach(el => removeClassName(el, 'on-view'));
}

function changeOnViewBtn(target) {
  resetSelectedBtn();
  addClassName(target, 'on-view')
}

export {hideLabel, resetFormLabel, toggleClassName, changeOnViewBtn};