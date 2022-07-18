import './style.css';
import Task from './TaskClass.js';
import UI from './UI.js';
import Storage from './Storage.js';

document.addEventListener('DOMContentLoaded', UI.displayFirstTask);

document.querySelector('#form-section').addEventListener('submit', (e) => {
  // Prevent submit
  e.preventDefault();

  const description = document.getElementById('add-input').value;
  const completed = false;
  const taskId = Storage.getTask().length + 1;

  // Validation
  if (description === '') {
    UI.showAlert('Please fill in all fields', 'danger', 1500);
  } else {
    // Start a new Task
    const task = new Task(description, completed, taskId);

    // Add Task to UI
    UI.addTasktoList(task);
    UI.showAlert('Task Added', 'success', 1500);

    // Add Task to LocalStorage
    Storage.addTask(task);

    // Clear fields
    UI.clearFields();
  }
});

const clearAll = document.getElementById('clear-all');
const resetBtn = document.getElementById('reset-btn');
clearAll.addEventListener('click', () => {
  Storage.clearComplete();
  UI.showAlert('Tasks Deleted', 'danger', 1500);
  UI.deleteTask();
});

resetBtn.addEventListener('click', () => {
  Storage.emptyArr();
  UI.showAlert('All Tasks Deleted', 'danger', 1500);
  UI.deleteTask();
});
