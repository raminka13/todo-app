import './style.css';
import Task from './TaskClass.js';
import UI from './UI.js';
import Storage from './Storage.js';

document.addEventListener('DOMContentLoaded', UI.displayTask);

document.querySelector('#form-section').addEventListener('submit', (e) => {
  // Prevent submit
  e.preventDefault();

  const description = document.getElementById('add-input').value;
  const completed = document.createElement('input').checked;
  const taskId = Storage.getTask().length + 1;

  // Validation
  if (description === '') {
    alert('Please fill in all fields');
  } else {
    // Start a new Task
    const task = new Task(description, completed, taskId);

    // Add Task to UI
    UI.addTasktoList(task);

    // Add Task to LocalStorage
    Storage.addTask(task);

    // Clear fields
    UI.clearFields();
  }
});

document.querySelector('#task-list').addEventListener('click', (e) => {
  // Remove Task from Storage
  UI.deleteTask(e.target);
  Storage.removeTask(e.target.parentElement.firstChild.textContent);
  UI.displayTask();
});
