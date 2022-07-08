(()=>{"use strict";class e{constructor(e,t,s){this.description=e,this.completed=t,this.taskId=s}}class t{static getTask(){return JSON.parse(localStorage.getItem("taskArr"))||[]}static addTask(e){const s=t.getTask();s.push(e),localStorage.setItem("taskArr",JSON.stringify(s))}static updateIds(){const e=t.getTask();for(let t=0;t<e.length;t+=1)e[t].taskId=t+1;return localStorage.setItem("taskArr",JSON.stringify(e)),e}static removeTask(e){const s=t.getTask();s.forEach(((t,a)=>{t.taskId===Number(e)&&s.splice(a,1)})),localStorage.setItem("taskArr",JSON.stringify(s))}static clearComplete(){let e=t.getTask();return e=e.filter((e=>!1===e.completed)),localStorage.setItem("taskArr",JSON.stringify(e)),e}static emptyArr(){let e=t.getTask();return e=[],localStorage.setItem("taskArr",JSON.stringify(e)),e}}class s{static editTask=(e,s)=>{const a=t.getTask();e.addEventListener("input",(t=>{e.value=t.target.value,a[s.taskId-1].description=e.value,localStorage.setItem("taskArr",JSON.stringify(a))}))};static editCheck=(e,s)=>{const a=t.getTask();s.completed=e.checked,a[s.taskId-1].completed=s.completed,localStorage.setItem("taskArr",JSON.stringify(a))}}class a{static displayTask(){const e=t.getTask();t.updateIds(),e.forEach((e=>a.addTasktoList(e)))}static addTasktoList(e){const d=document.getElementById("task-list"),c=document.createElement("li");d.appendChild(c),c.className="task";const n=document.createElement("h4"),l=document.createElement("input"),r=document.createElement("input"),i=document.createElement("button");c.appendChild(n),n.textContent=e.taskId,c.appendChild(l),l.className="checkbox",l.setAttribute("type","checkbox"),l.checked=e.completed,l.addEventListener("change",(t=>{!0===l.checked?l.parentElement.classList.add("checked"):l.parentElement.classList.remove("checked"),s.editCheck(t.target,e)})),c.appendChild(r),r.className="task-desc",r.setAttribute("type","text"),r.value=e.description,r.addEventListener("click",(()=>{s.editTask(r,e)})),c.appendChild(i),i.textContent="🗑",i.className="remove-btn",i.addEventListener("click",(e=>{t.removeTask(e.target.parentElement.firstChild.textContent),a.showAlert("Task Deleted","danger"),a.deleteTask()}))}static deleteTask(){document.getElementById("task-list").innerText="",t.updateIds(),a.displayTask()}static clearFields(){document.getElementById("add-input").value=""}static showAlert(e,t){const s=document.createElement("div");s.className=`alert alert-${t}`,s.appendChild(document.createTextNode(e));const a=document.getElementById("app-container"),d=document.getElementById("app-header");a.insertBefore(s,d),setTimeout((()=>document.querySelector(".alert").remove()),1e3)}}document.addEventListener("DOMContentLoaded",a.displayTask),document.querySelector("#form-section").addEventListener("submit",(s=>{s.preventDefault();const d=document.getElementById("add-input").value,c=t.getTask().length+1;if(""===d)a.showAlert("Please fill in all fields","danger");else{const s=new e(d,!1,c);a.addTasktoList(s),a.showAlert("Task Added","success"),t.addTask(s),a.clearFields()}}));const d=document.getElementById("clear-all"),c=document.getElementById("reset-btn");d.addEventListener("click",(()=>{t.clearComplete(),a.showAlert("Tasks Deleted","danger"),a.deleteTask()})),c.addEventListener("click",(()=>{t.emptyArr(),a.showAlert("All Tasks Deleted","danger"),a.deleteTask()}))})();