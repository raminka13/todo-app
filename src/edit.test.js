/**
 * @jest-environment jsdom
 */

import Edit from './edit.js';

function clearComplete() {
  let taskArr = Storage.getTask();
  taskArr = taskArr.filter((task) => task.completed === false);
  localStorage.setItem('taskArr', JSON.stringify(taskArr));
  return taskArr;
}

function emptyArr() {
  let taskArr = Storage.getTask();
  taskArr = [];
  localStorage.setItem('taskArr', JSON.stringify(taskArr));
  return taskArr;
}

const checkBox = document.querySelector('checkbox');

checkBox.addEventListener('change', (e) => {
  if (checkBox.checked === true) {
    checkBox.parentElement.classList.add('checked');
  } else {
    checkBox.parentElement.classList.remove('checked');
  }
  Edit.editCheck(e.target, task);
});

const clearAll = document.getElementById('clear-all');
const resetBtn = document.getElementById('reset-btn');
clearAll.addEventListener('click', () => {
  clearComplete();
});

resetBtn.addEventListener('click', () => {
  emptyArr();
});
