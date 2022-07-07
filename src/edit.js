import Storage from './Storage.js';

const taskArr = Storage.getTask();
const editTask = (taskDesc, task) => {
  taskDesc.addEventListener('input', (e) => {
    taskDesc.value = e.target.value;
    taskArr[task.taskId - 1].description = taskDesc.value;
    localStorage.setItem('taskArr', JSON.stringify(taskArr));
  });
};
export default editTask;