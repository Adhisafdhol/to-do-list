function taskContainer(obj) {
  const taskContainer = document.createElement('div');
  taskContainer.classList.add('task');
  return taskContainer;
}

function createTaskDom(obj) {
  const container = taskContainer(obj);
  for (let key in obj) {
    container.appendChild(taskPropertyDom(obj, key));
  }

  return container;
}

function taskPropertyDom(obj, key) {
  const taskProperty = document.createElement('div');
  taskProperty.setAttribute('data-info', `${key}`);
  taskProperty.textContent = obj[key];
  
  return taskProperty;
}


function printTaskDom(dataContainer) {
  const taskListContainer = createWrapperWithClass('div', 'task-list');

  dataContainer.forEach(obj => {
      taskListContainer.appendChild(createTaskDom(obj));
  });

  return taskListContainer;
}

function printAllTAsks() {

}

function createWrapper(tag) {
  const container = document.createElement(tag);

  return container;
}

function createWrapperWithClass(tag, name) {
  const container = createWrapper(tag)
  container.classList.add(name);

  return container;
}

export {printTaskDom};