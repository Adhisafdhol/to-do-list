const toDoList = [];

function showAllTasks() {

}

//constructor function to create a task
const Task = (title, description, date, priority) => {
  return {title, description, date, priority};
};

//Put task in the array
function createTask(title, description, date, priority) {
  toDoList.push(Task(title, description, date, priority));
}

createTask('finish to-do project', 'Finish the odin to-do project soon', '16/08/99', 'high');

export {Task, toDoList};