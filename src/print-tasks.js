const taskDom = (obj) => {
  const headerWrapper = createWrapperWithClass('div', 'task-header');
  const btn = createWrapperWithClass('button', 'done');
  const titleDom = taskPropertyDom(obj, 'title');
  const editBtn = createWrapperWithClass('button', 'edit');
  const deleteBtn = createWrapperWithClass('button', 'delete');
  headerWrapper.appendChild(btn);
  headerWrapper.appendChild(titleDom);
  headerWrapper.appendChild(editBtn);
  headerWrapper.appendChild(deleteBtn);
  const dateDom = taskPropertyDom(obj, 'date');

  return [headerWrapper, dateDom];
}

function createTaskDom(obj) {
  const container = createWrapperWithClass('div', 'task');
  taskDom(obj).forEach(item => container.appendChild(item));

  return container;
}

function taskPropertyDom(obj, key) {
  const taskProperty = document.createElement('div');
  taskProperty.setAttribute('data-info', `${key}`);
  taskProperty.textContent = obj[key];
  
  return taskProperty;
}

function printAllTasks(dataContainer) {
  const taskListContainer = createWrapperWithClass('div', 'task-list');

  dataContainer.forEach(obj => {
      taskListContainer.appendChild(createTaskDom(obj));
  });

  return taskListContainer;
}

//Create wrapper container
function createWrapper(tag) {
  const container = document.createElement(tag);

  return container;
}

function createWrapperWithClass(tag, name) {
  const container = createWrapper(tag)
  container.classList.add(name);

  return container;
}

export {printAllTasks, createWrapperWithClass};