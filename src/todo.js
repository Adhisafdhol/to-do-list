const toDoList = [];

function showAllTasks() {

}

//constructor function to create a task
const Task = (title, description, date, index) => {
  return {title, description, date, index};
};

//Put task in the array
function createTask(title, description, date, index) {
  toDoList.push(Task(title, description, date, index));
}

createTask('finish to-do project', 'Finish the odin to-do project soon', '16/08/99', 1);

export {Task, toDoList};