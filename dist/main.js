/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/TaskClass.js
class Task {
  constructor(description, completed, taskId) {
    this.description = description;
    this.completed = completed;
    this.taskId = taskId;
  }
}

;// CONCATENATED MODULE: ./src/Storage.js
class Storage {
  static getTask() {
    const taskArr = JSON.parse(localStorage.getItem('taskArr')) || [];
    return taskArr;
  }

  static addTask(task) {
    const taskArr = Storage.getTask();
    taskArr.push(task);
    localStorage.setItem('taskArr', JSON.stringify(taskArr));
  }

  static updateIds() {
    const taskArr = Storage.getTask();
    for (let i = 0; i < taskArr.length; i += 1) {
      taskArr[i].taskId = i + 1;
    }
    localStorage.setItem('taskArr', JSON.stringify(taskArr));
    return taskArr;
  }

  static removeTask(iD) {
    const taskArr = Storage.getTask();

    taskArr.forEach((task, index) => {
      if (task.taskId === Number(iD)) {
        taskArr.splice(index, 1);
      }
    });

    localStorage.setItem('taskArr', JSON.stringify(taskArr));
  }

  static clearComplete() {
    let taskArr = Storage.getTask();
    taskArr = taskArr.filter((task) => task.completed === false);
    localStorage.setItem('taskArr', JSON.stringify(taskArr));
    return taskArr;
  }

  static emptyArr() {
    let taskArr = Storage.getTask();
    taskArr = [];
    localStorage.setItem('taskArr', JSON.stringify(taskArr));
    return taskArr;
  }
}
;// CONCATENATED MODULE: ./src/edit.js


class Edit {
  static editTask = (taskDesc, task) => {
    const taskArr = Storage.getTask();
    taskDesc.addEventListener('input', (e) => {
      taskDesc.value = e.target.value;
      taskArr[task.taskId - 1].description = taskDesc.value;
      localStorage.setItem('taskArr', JSON.stringify(taskArr));
    });
  };

  static editCheck = (checkB, task) => {
    const taskArr = Storage.getTask();

    task.completed = checkB.checked;
    taskArr[task.taskId - 1].completed = task.completed;
    localStorage.setItem('taskArr', JSON.stringify(taskArr));
  }
}
;// CONCATENATED MODULE: ./src/UI.js



class UI {
  static displayTask() {
    const taskArr = Storage.getTask();

    Storage.updateIds();
    taskArr.forEach((task) => UI.addTasktoList(task));
  }

  static displayFirstTask() {
    let taskArrFirst = JSON.parse(localStorage.getItem('taskArrFirst')) || [
      { description: 'Welcome to this', completed: false, taskId: 1 },
      { description: 'Awesome App to save things TO DO', completed: false, taskId: 2 },
      { description: 'Use it wisely', completed: false, taskId: 3 },
      { description: 'Start by adding ToDo', completed: true, taskId: 4 },
    ];

    taskArrFirst.forEach((task) => UI.addTasktoList(task));
    setTimeout(() => UI.deleteTask(), 3600);
    taskArrFirst = [];
    localStorage.setItem('taskArrFirst', JSON.stringify(taskArrFirst));
  }

  static addTasktoList(task) {
    const taskCtn = document.getElementById('task-list');
    const taskLi = document.createElement('li');

    taskCtn.appendChild(taskLi);
    taskLi.className = 'task';

    const indexBox = document.createElement('h4');
    const checkBox = document.createElement('input');
    const taskDesc = document.createElement('input');
    const delTaskbtn = document.createElement('button');

    taskLi.appendChild(indexBox);
    indexBox.textContent = task.taskId;

    taskLi.appendChild(checkBox);
    checkBox.className = 'checkbox';
    checkBox.setAttribute('type', 'checkbox');
    checkBox.checked = task.completed;
    if (checkBox.checked === true) {
      checkBox.parentElement.classList.add('checked');
    } else {
      checkBox.parentElement.classList.remove('checked');
    }
    checkBox.addEventListener('change', (e) => {
      if (checkBox.checked === true) {
        checkBox.parentElement.classList.add('checked');
      } else {
        checkBox.parentElement.classList.remove('checked');
      }
      Edit.editCheck(e.target, task);
    });

    taskLi.appendChild(taskDesc);
    taskDesc.className = 'task-desc';
    taskDesc.setAttribute('type', 'text');
    taskDesc.value = task.description;
    taskDesc.addEventListener('click', () => {
      Edit.editTask(taskDesc, task);
    });

    taskLi.appendChild(delTaskbtn);
    delTaskbtn.textContent = '🗑';
    delTaskbtn.className = 'remove-btn';
    delTaskbtn.addEventListener('click', (e) => {
      // Remove Task from Storage
      Storage.removeTask(e.target.parentElement.firstChild.textContent);
      UI.showAlert('Task Deleted', 'danger');
      UI.deleteTask();
    });
  }

  static deleteTask() {
    const taskConta = document.getElementById('task-list');
    taskConta.innerText = '';
    Storage.updateIds();
    UI.displayTask();
  }

  static clearFields() {
    document.getElementById('add-input').value = '';
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.getElementById('app-container');
    const form = document.getElementById('app-header');
    container.insertBefore(div, form);

    setTimeout(() => document.querySelector('.alert').remove(), 1000);
  }
}
;// CONCATENATED MODULE: ./src/index.js





document.addEventListener('DOMContentLoaded', UI.displayFirstTask);

document.querySelector('#form-section').addEventListener('submit', (e) => {
  // Prevent submit
  e.preventDefault();

  const description = document.getElementById('add-input').value;
  const completed = false;
  const taskId = Storage.getTask().length + 1;

  // Validation
  if (description === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Start a new Task
    const task = new Task(description, completed, taskId);

    // Add Task to UI
    UI.addTasktoList(task);
    UI.showAlert('Task Added', 'success');

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
  UI.showAlert('Tasks Deleted', 'danger');
  UI.deleteTask();
});

resetBtn.addEventListener('click', () => {
  Storage.emptyArr();
  UI.showAlert('All Tasks Deleted', 'danger');
  UI.deleteTask();
});

/******/ })()
;