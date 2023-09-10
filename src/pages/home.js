function home () {
  const homeContainer = document.createElement('div');
  homeContainer.classList.add('home-container');
  
  const mainHeader = document.createElement('div');
  mainHeader.classList.add('main-header');
  homeContainer.appendChild(mainHeader);

  const sidebarBtn = document.createElement('button');
  sidebarBtn.classList.add('sidebar-btn');
  sidebarBtn.setAttribute('type', 'button');
  mainHeader.appendChild(sidebarBtn)

  const mainHeading = document.createElement('h1');
  mainHeading.textContent = 'Task.Daily';
  mainHeader.appendChild(mainHeading);
  mainHeader.appendChild(document.createElement('span'));
  return homeContainer;
}

function sidebar() {
  const sidebar = document.createElement('nav');
  sidebar.classList.add('sidebar');

  const allTask = document.createElement('div');
  allTask.setAttribute('data-key', 'all-task');
  sidebar.appendChild(allTask);

  return sidebar;
}
export { home };