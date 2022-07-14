/**
 * @jest-environment jsdom
 */

document.body.innerHTML = (`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>dom.window.document</title>
</head>
<body>
<div id="app-container">
<div id="app-header">
    <h4>Today's To Do</h4>
    <span id="reset-btn">⟳</span>
</div>
<form id="form-section" action="submit">
    <input type="text" placeholder="Add to your list..." id="add-input">
    <button id="form-btn" type="submit">⏎</button>
</form>
<ul id="task-list">
    <li class="task">
        <h4>1</h4>
        <input class="checkbox" type="checkbox">
        <input class="task-desc" type="text">
        <button class="remove-btn">🗑</button>
    </li>
</ul>
<button type="button" id="clear-all">Clear all completed</button>
</div>
</body>
</html>`);

const taskArr = [
  {
    description: 'Task 1',
    completed: false,
    taskId: 1,
  },
  {
    description: 'Task 2',
    completed: true,
    taskId: 2,
  },
];
localStorage.setItem('taskArr', JSON.stringify(taskArr));

function clearComplete() {
  let taskArr = JSON.parse(localStorage.getItem('taskArr')) || [];
  taskArr = taskArr.filter((task) => task.completed === false);
  localStorage.setItem('taskArr', JSON.stringify(taskArr));
  return taskArr;
}

function emptyArr() {
  let taskArr = JSON.parse(localStorage.getItem('taskArr')) || [];
  taskArr = [];
  localStorage.setItem('taskArr', JSON.stringify(taskArr));
  return taskArr;
}

function editTask(taskDesc, task) {
  const taskArr = JSON.parse(localStorage.getItem('taskArr')) || [];
  taskDesc.value = taskArr[0].description;
  taskArr[task.taskId - 1].description = taskDesc.value;
  localStorage.setItem('taskArr', JSON.stringify(taskArr));
}

function editCheck(checkB, task) {
  const taskArr = JSON.parse(localStorage.getItem('taskArr')) || [];

  task.completed = checkB.checked;
  taskArr[task.taskId - 1].completed = task.completed;
  localStorage.setItem('taskArr', JSON.stringify(taskArr));
}

const taskDesc = document.querySelector('.task-desc');

taskDesc.addEventListener('click', () => {
  const taskArr = JSON.parse(localStorage.getItem('taskArr')) || [];
  editTask(taskDesc, taskArr[0]);
});

const checkBox = document.querySelector('.checkbox');

checkBox.addEventListener('change', (e) => {
  const taskArr = JSON.parse(localStorage.getItem('taskArr')) || [];
  if (checkBox.checked === true) {
    checkBox.parentElement.classList.add('checked');
  } else {
    checkBox.parentElement.classList.remove('checked');
  }
  editCheck(e.target, taskArr[0]);
});

const clearAll = document.getElementById('clear-all');
const resetBtn = document.getElementById('reset-btn');
clearAll.addEventListener('click', () => {
  clearComplete();
});

resetBtn.addEventListener('click', () => {
  emptyArr();
});

describe('Edit Functions', () => {
  it('Checkbox state false should change and be saved in localStorage', () => {
    checkBox.click();
    expect(checkBox.checked).toBeTruthy();
  });

  it('Checkbox state true should change and be saved in localStorage', () => {
    checkBox.click();
    expect(checkBox.checked).toBeFalsy();
  });

  it('Inpul field should change and be saved in localStorage', () => {
    taskDesc.click();
    taskDesc.value = 'Hello';
    localStorage.setItem('taskArr', JSON.stringify(taskArr));
    expect(taskDesc.value).toBe('Hello');
  });

  it('Inpul field should change and be saved in localStorage', () => {
    taskDesc.click();
    taskDesc.value = 'Shahira';
    localStorage.setItem('taskArr', JSON.stringify(taskArr));
    expect(taskDesc.value).toBe('Shahira');
  });
});

describe('Delete Completed - Reset All', () => {
  it('Delete Completed Button should delete completed task', () => {
    clearAll.click();
    const taskArr = JSON.parse(localStorage.getItem('taskArr'));
    expect(taskArr.length).toBe(1);
  });

  it('task Arr should be empty', () => {
    resetBtn.click();
    const taskArr = JSON.parse(localStorage.getItem('taskArr'));
    expect(taskArr).toStrictEqual([]);
  });
});