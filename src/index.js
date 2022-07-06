import './style.css';

const taskArr = [
  {
    description: 'Buy Milk',
    completed: true,
    index: 1,
  },
  {
    description: 'Buy Eggs',
    completed: false,
    index: 2,
  },
  {
    description: 'Buy Orange Juice',
    completed: false,
    index: 3,
  },
];

function addTasktoList(task) {
  const taskCtn = document.getElementById('task-list');
  const taskLi = document.createElement('li');

  taskCtn.appendChild(taskLi);
  taskLi.className = 'task';

  const checkBox = document.createElement('input');
  const taskDesc = document.createElement('p');
  const delTaskbtn = document.createElement('button');

  taskLi.appendChild(checkBox);
  checkBox.className = 'checkbox';
  checkBox.setAttribute('type', 'checkbox');
  checkBox.checked = task.completed;

  taskLi.appendChild(taskDesc);
  taskDesc.textContent = task.description;

  taskLi.appendChild(delTaskbtn);
  delTaskbtn.textContent = '🗑';
}

taskArr.forEach(addTasktoList);