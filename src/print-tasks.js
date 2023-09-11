function taskContainer(obj) {
  const taskContainer = document.createElement('div');
  taskContainer.classList.add('task');
  taskContainer.setAttribute('data-index', `${obj.index}`);
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
  dataContainer.forEach(obj => {
      createTaskDom(obj);
  });
}

export {printTaskDom};