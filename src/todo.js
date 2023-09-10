const toDoList = [];

//constructor function to create a task
const task = (title, description, date) => {
  return {title, description, date};
};

//Put task in the array
function createTask(title, description, date) {
  toDoList.push(task(title, description, date));
}

export {toDoList , task};