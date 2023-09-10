function home () {
  const homeContainer = document.createElement('div');
  homeContainer.classList.add('home-container');
  
  const mainHeader = document.createElement('div');
  mainHeader.classList.add('main-header');
  homeContainer.appendChild(mainHeader);

  const mainHeading = document.createElement('h1');
  mainHeading.textContent = 'Task.Daily';
  mainHeader.appendChild(mainHeading);
  mainHeader.appendChild(document.createElement('span'));
  return homeContainer;
}

export { home };