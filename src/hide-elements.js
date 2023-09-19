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
  const input = this.querySelector(targetInput);
  input.value.length === 0?removeClassName(target, 'visually-hidden'):addClassName(target, 'visually-hidden');
}

function resetValue(target) {
  target.value = '';
}

export {hideLabel};