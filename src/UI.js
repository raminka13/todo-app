import Storage from './Storage.js';
import Edit from './edit.js';

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
    // taskLi.addEventListener('mouseover', () => {
    //   taskLi.classList.add('active');
    // });
    // taskLi.addEventListener('mouseout', () => {
    //   taskLi.classList.remove('active');
    // });
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
}