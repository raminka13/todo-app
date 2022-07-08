/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://todo-app/./src/style.css?");

/***/ }),

/***/ "./src/Storage.js":
/*!************************!*\
  !*** ./src/Storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Storage)\n/* harmony export */ });\nclass Storage {\n  static getTask() {\n    const taskArr = JSON.parse(localStorage.getItem('taskArr')) || [];\n    return taskArr;\n  }\n\n  static addTask(task) {\n    const taskArr = Storage.getTask();\n    taskArr.push(task);\n    localStorage.setItem('taskArr', JSON.stringify(taskArr));\n  }\n\n  static updateIds() {\n    const taskArr = Storage.getTask();\n    for (let i = 0; i < taskArr.length; i += 1) {\n      taskArr[i].taskId = i + 1;\n    }\n    localStorage.setItem('taskArr', JSON.stringify(taskArr));\n    return taskArr;\n  }\n\n  static removeTask(iD) {\n    const taskArr = Storage.getTask();\n\n    taskArr.forEach((task, index) => {\n      if (task.taskId === Number(iD)) {\n        taskArr.splice(index, 1);\n      }\n    });\n\n    localStorage.setItem('taskArr', JSON.stringify(taskArr));\n  }\n\n  static clearComplete() {\n    let taskArr = Storage.getTask();\n    taskArr = taskArr.filter((task) => task.completed === false);\n    localStorage.setItem('taskArr', JSON.stringify(taskArr));\n    return taskArr;\n  }\n\n  static emptyArr() {\n    let taskArr = Storage.getTask();\n    taskArr = [];\n    localStorage.setItem('taskArr', JSON.stringify(taskArr));\n    return taskArr;\n  }\n}\n\n//# sourceURL=webpack://todo-app/./src/Storage.js?");

/***/ }),

/***/ "./src/TaskClass.js":
/*!**************************!*\
  !*** ./src/TaskClass.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Task)\n/* harmony export */ });\nclass Task {\n  constructor(description, completed, taskId) {\n    this.description = description;\n    this.completed = completed;\n    this.taskId = taskId;\n  }\n}\n\n//# sourceURL=webpack://todo-app/./src/TaskClass.js?");

/***/ }),

/***/ "./src/UI.js":
/*!*******************!*\
  !*** ./src/UI.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UI)\n/* harmony export */ });\n/* harmony import */ var _Storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Storage.js */ \"./src/Storage.js\");\n/* harmony import */ var _edit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit.js */ \"./src/edit.js\");\n\n\n\nclass UI {\n  static displayTask() {\n    const taskArr = _Storage_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getTask();\n\n    _Storage_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].updateIds();\n    taskArr.forEach((task) => UI.addTasktoList(task));\n  }\n\n  static addTasktoList(task) {\n    const taskCtn = document.getElementById('task-list');\n    const taskLi = document.createElement('li');\n\n    taskCtn.appendChild(taskLi);\n    // taskLi.addEventListener('mouseover', () => {\n    //   taskLi.classList.add('active');\n    // });\n    // taskLi.addEventListener('mouseout', () => {\n    //   taskLi.classList.remove('active');\n    // });\n    taskLi.className = 'task';\n\n    const indexBox = document.createElement('h4');\n    const checkBox = document.createElement('input');\n    const taskDesc = document.createElement('input');\n    const delTaskbtn = document.createElement('button');\n\n    taskLi.appendChild(indexBox);\n    indexBox.textContent = task.taskId;\n\n    taskLi.appendChild(checkBox);\n    checkBox.className = 'checkbox';\n    checkBox.setAttribute('type', 'checkbox');\n    checkBox.checked = task.completed;\n    checkBox.addEventListener('change', (e) => {\n      if (checkBox.checked === true) {\n        checkBox.parentElement.classList.add('checked');\n      } else {\n        checkBox.parentElement.classList.remove('checked');\n      }\n      _edit_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].editCheck(e.target, task);\n    });\n\n    taskLi.appendChild(taskDesc);\n    taskDesc.className = 'task-desc';\n    taskDesc.setAttribute('type', 'text');\n    taskDesc.value = task.description;\n    taskDesc.addEventListener('click', () => {\n      _edit_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].editTask(taskDesc, task);\n    });\n\n    taskLi.appendChild(delTaskbtn);\n    delTaskbtn.textContent = '🗑';\n    delTaskbtn.className = 'remove-btn';\n    delTaskbtn.addEventListener('click', (e) => {\n      // Remove Task from Storage\n      _Storage_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].removeTask(e.target.parentElement.firstChild.textContent);\n      UI.deleteTask();\n    });\n  }\n\n  static deleteTask() {\n    const taskConta = document.getElementById('task-list');\n    taskConta.innerText = '';\n    _Storage_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].updateIds();\n    UI.displayTask();\n  }\n\n  static clearFields() {\n    document.getElementById('add-input').value = '';\n  }\n}\n\n//# sourceURL=webpack://todo-app/./src/UI.js?");

/***/ }),

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Edit)\n/* harmony export */ });\n/* harmony import */ var _Storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Storage.js */ \"./src/Storage.js\");\n\n\nclass Edit {\n  static editTask = (taskDesc, task) => {\n    const taskArr = _Storage_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getTask();\n    taskDesc.addEventListener('input', (e) => {\n      taskDesc.value = e.target.value;\n      taskArr[task.taskId - 1].description = taskDesc.value;\n      localStorage.setItem('taskArr', JSON.stringify(taskArr));\n    });\n  };\n\n  static editCheck = (checkB, task) => {\n    const taskArr = _Storage_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getTask();\n\n    task.completed = checkB.checked;\n    taskArr[task.taskId - 1].completed = task.completed;\n    localStorage.setItem('taskArr', JSON.stringify(taskArr));\n  }\n}\n\n//# sourceURL=webpack://todo-app/./src/edit.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n/* harmony import */ var _TaskClass_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TaskClass.js */ \"./src/TaskClass.js\");\n/* harmony import */ var _UI_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UI.js */ \"./src/UI.js\");\n/* harmony import */ var _Storage_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Storage.js */ \"./src/Storage.js\");\n\n\n\n\n\ndocument.addEventListener('DOMContentLoaded', _UI_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].displayTask);\n\ndocument.querySelector('#form-section').addEventListener('submit', (e) => {\n  // Prevent submit\n  e.preventDefault();\n\n  const description = document.getElementById('add-input').value;\n  const completed = false;\n  const taskId = _Storage_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getTask().length + 1;\n\n  // Validation\n  if (description === '') {\n    alert('Please fill in all fields');\n  } else {\n    // Start a new Task\n    const task = new _TaskClass_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](description, completed, taskId);\n\n    // Add Task to UI\n    _UI_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].addTasktoList(task);\n\n    // Add Task to LocalStorage\n    _Storage_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].addTask(task);\n\n    // Clear fields\n    _UI_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].clearFields();\n  }\n});\n\nconst clearAll = document.getElementById('clear-all');\nconst resetBtn = document.getElementById('reset-btn');\nclearAll.addEventListener('click', () => {\n  _Storage_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].clearComplete();\n  _UI_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].deleteTask();\n});\n\nresetBtn.addEventListener('click', () => {\n  _Storage_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].emptyArr();\n  _UI_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].deleteTask();\n});\n\n\n//# sourceURL=webpack://todo-app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;