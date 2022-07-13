const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const dom = new JSDOM(`<!DOCTYPE html>
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
<ul id="task-list"></ul>
<button type="button" id="clear-all">Clear all completed</button>
</div>
</body>
</html>`);

const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key];
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key) {
      delete store[key];
    },
  };
})();
Object.defineProperty(dom.window, 'localStorage', {
  value: localStorageMock,
});

const taskArr = [
  {
    description: 'Task 1',
    completed: false,
    taskId: 1,
  },
];
localStorageMock.setItem('taskArr', JSON.stringify(taskArr));

function removeTask(iD) {
  const taskArr = JSON.parse(localStorageMock.getItem('taskArr')) || [];

  taskArr.forEach((task, index) => {
    if (Number(task.taskId) === Number(iD)) {
      taskArr.splice(index, 1);
    }
  });
  localStorageMock.setItem('taskArr', JSON.stringify(taskArr));
}

function addTasktoList(task) {
  const taskCtn = dom.window.document.getElementById('task-list');
  const taskLi = dom.window.document.createElement('li');

  taskCtn.appendChild(taskLi);
  taskLi.className = 'task';

  const indexBox = dom.window.document.createElement('h4');
  const checkBox = dom.window.document.createElement('input');
  const taskDesc = dom.window.document.createElement('input');
  const delTaskbtn = dom.window.document.createElement('button');

  taskLi.appendChild(indexBox);
  indexBox.textContent = task.taskId;

  taskLi.appendChild(checkBox);
  checkBox.className = 'checkbox';
  checkBox.setAttribute('type', 'checkbox');
  checkBox.checked = task.completed;

  taskLi.appendChild(taskDesc);
  taskDesc.className = 'task-desc';
  taskDesc.setAttribute('type', 'text');
  taskDesc.value = task.description;

  taskLi.appendChild(delTaskbtn);
  delTaskbtn.textContent = '🗑';
  delTaskbtn.className = 'remove-btn';
}

dom.window.document.getElementById('form-section').addEventListener('submit', (e) => {
  // Prevent submit
  e.preventDefault();

  taskArr.forEach((task) => addTasktoList(task));
});

describe('UI DOM manipulation', () => {
  const inputForm = dom.window.document.querySelector('#add-input');
  const addBtn = dom.window.document.getElementById('form-btn');
  const taskLi = dom.window.document.querySelector('#task-list');

  inputForm.value = 'Task 1';
  addBtn.click();

  it('should add an li inside the ul ', () => {
    expect(taskLi.innerHTML).toBe('<li class="task"><h4>1</h4><input class="checkbox" type="checkbox"><input class="task-desc" type="text"><button class="remove-btn">🗑</button></li>');
  });

  it('the value of the imput should be Task 1', () => {
    expect(inputForm.value).toBe('Task 1');
  });
});

describe('Remove Task from Storage', () => {
  const removeBtn = dom.window.document.querySelector('.remove-btn');

  removeBtn.addEventListener('click', (e) => {
    // Remove Task from Storage
    removeTask(e.target.parentElement.firstChild.textContent);
  });
  removeBtn.click();
  const taskArray = JSON.parse(localStorageMock.getItem('taskArr'));

  it('task Arr should be empty', () => {
    expect(taskArray).toStrictEqual([]);
  });
});