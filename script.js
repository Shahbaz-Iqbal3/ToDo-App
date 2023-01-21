window.onload = async () => {
    displayTask()
}
const input = document.getElementById("input")
const btn = document.getElementById("btn")
const clearBtn = document.getElementById("clearBtn")
const doneBtn = document.querySelectorAll(".done-btn")
const removeBtn = document.querySelectorAll(".remove-btn")
const taskList = document.querySelector(".tasklist")

btn.addEventListener("click", addTask);
input.addEventListener("keyup", (e) => { if (e.key == "Enter") addTask() })
// CREATE FUNCTION FOR ADDING TASK
function addTask() {
    if (input.value != "") {
        addTaskToLS();
        addTaskToList()
    } else {
        alert("Please enter a task")
    }
}

// Add task to Task List
function addTaskToList() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }
    tasks.forEach((task, index, tasks) => {
        if (index == tasks.length - 1) {
            taskList.innerHTML += `
        <div class="task-item">
            <div class="item-index-content">
                <div class="item-index">${index + 1}</div>
                <div class="item-content">${task}</div>
            </div>
            <div class="item-controls">
                <img src="remove.png" alt="remove" class="remove-btn">
                <img src="accept.png" alt="done" class="done-btn">
            </div>
        </div>`
        }
        deleteReady()
    });

}
// SAVE TASK TO LOCAL STORAGE
function addTaskToLS() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }
    tasks.push(input.value);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
}
// DISPLAY TASK
function displayTask() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }
    tasks.forEach(function (task, index) {

        taskList.innerHTML += `
        <div class="task-item">
            <div class="item-index-content">
                <div class="item-index">${index + 1}</div>
                <div class="item-content">${task}</div>
            </div>
            <div class="item-controls">
                <img src="remove.png" alt="remove" class="remove-btn">
                <img src="accept.png" alt="done" class="done-btn">
            </div>
        </div>`
        deleteReady()
    })

}

// DELETE A TASK

function deleteReady() {
    const removeBtn = document.querySelectorAll(".remove-btn")
    const doneBtn = document.querySelectorAll(".done-btn")
    doneBtn.forEach((e, index) => {
        e.addEventListener("click", () => {
            completeTask(index)
        })
    })
    removeBtn.forEach((e, index) => {
        e.addEventListener("click", () => {
            deleteTask(index)
        });
    })
}
function completeTask(index) {
   const taskContent = document.querySelectorAll(".item-content")
   taskContent[index].style.textDecoration = "line-through";
}
function deleteTask(index) {
    let tasks;
    const del = confirm("You are about to delete this task");

    if (del == true) {
        if (localStorage.getItem("tasks") === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem("tasks"))
        }
    }
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskList.innerHTML = "";
    displayTask();
}

// Clear Tasks
clearBtn.addEventListener("click", clearTask);

function clearTask() {
    const delTasks = confirm("Delete all tasks");
    if (delTasks == true) {
        localStorage.clear();
        taskList.innerHTML = `<div class="task-item">
        <div class="item-index-content">
            <div class="item-index">0</div>
            <div class="item-content">your Task will be added here</div>
        </div>
        <div class="item-controls">
            <img src="remove.png" alt="remove" class="remove-btn">
            <img src="accept.png" alt="done" class="done-btn">
        </div>
    </div>`
        displayTask();
        deleteReady()
    }
}
