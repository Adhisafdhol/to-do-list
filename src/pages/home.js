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

  const sidebarList = document.createElement('ul');
  sidebar.appendChild(sidebarList);

  const today = document.createElement('li');
  today.setAttribute('data-key', 'today');
  today.textContent = 'Today';
  sidebarList.appendChild(today);

  const next7Days = document.createElement('li');
  next7Days.setAttribute('data-key', 'next-7-days');
  next7Days.textContent = 'Next 7 Days';
  sidebarList.appendChild(next7Days);

  const allTask = document.createElement('li');
  allTask.setAttribute('data-key', 'all-task');
  allTask.textContent = 'All Tasks';
  sidebarList.appendChild(allTask);

  return sidebar;
}
export { home };