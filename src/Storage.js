export default class Storage {
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
}
