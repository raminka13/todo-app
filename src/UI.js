import Storage from './Storage.js';

export default class UI {
  static displayTask() {
    const taskArr = Storage.getTask();
    Storage.updateIds();
    taskArr.forEach((task) => UI.addTasktoList(task));
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

    taskLi.appendChild(taskDesc);
    taskDesc.setAttribute('type', 'text');
    taskDesc.value = task.description;

    taskLi.appendChild(delTaskbtn);
    delTaskbtn.textContent = '⋮';
    delTaskbtn.className = 'remove-btn';
  }

  static deleteTask(el) {
    if (el.classList.contains('remove-btn')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.getElementById('add-input').value = '';
  }
}