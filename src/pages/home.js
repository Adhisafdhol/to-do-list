function home () {
  const homeContainer = document.createElement('div');
  homeContainer.classList.add('home-container');
  homeContainer.appendChild(mainHeader());
  homeContainer.appendChild(sidebar());

  return homeContainer;
}

function mainHeader() {
  const mainHeader = document.createElement('div');
  mainHeader.classList.add('main-header');

  const sidebarBtn = document.createElement('button');
  sidebarBtn.classList.add('sidebar-btn');
  sidebarBtn.setAttribute('type', 'button');
  mainHeader.appendChild(sidebarBtn)

  const mainHeading = document.createElement('h1');
  mainHeading.textContent = 'Task.Daily';
  mainHeader.appendChild(mainHeading);
  mainHeader.appendChild(document.createElement('span'));

  return mainHeader;
}

function sidebar() {
  const sidebar = document.createElement('nav');
  sidebar.classList.add('sidebar');

  const today = document.createElement('div');
  today.setAttribute('data-key', 'today');
  today.textContent = 'Today';
  sidebar.appendChild(today);

  const next7Days = document.createElement('div');
  next7Days.setAttribute('data-key', 'next-7-days');
  next7Days.textContent = 'Next 7 Days';
  sidebar.appendChild(next7Days);

  const allTask = document.createElement('div');
  allTask.setAttribute('data-key', 'all-task');
  allTask.textContent = 'All Tasks';
  sidebar.appendChild(allTask);

  return sidebar;
}
export { home };