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
  const taskListContainer = document.createElement('div');
  taskListContainer.classList.add('task-list');

  dataContainer.forEach(obj => {
      taskListContainer.appendChild(createTaskDom(obj));
  });

  return taskListContainer;
}

export {printTaskDom};