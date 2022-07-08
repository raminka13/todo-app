import Storage from './Storage.js';

export default class Edit {
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