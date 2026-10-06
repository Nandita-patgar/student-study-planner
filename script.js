let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    const priority = document.getElementById("priority").value;

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
    text: taskText,
    priority: priority,
    completed: false
};

    tasks.push(task);

    taskInput.value = "";

    saveTasks();
    displayTasks();
}

function displayTasks() {
    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span onclick="completeTask(${index})"
      style="cursor: pointer; ${task.completed ? 'text-decoration: line-through; color: gray;' : ''}">
    ${task.text} - ${task.priority}
</span>

            <button onclick="deleteTask(${index})">
                Delete
            </button>
        `;

        taskList.appendChild(li);
    });

    updateCount();
}

function completeTask(index) {
    tasks[index].completed = !tasks[index].completed;

    saveTasks();
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);

    saveTasks();
    displayTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCount() {
    const pending = tasks.filter(task => !task.completed).length;
    const completed = tasks.filter(task => task.completed).length;

    document.getElementById("pendingCount").textContent = pending;
    document.getElementById("completedCount").textContent = completed;
}

displayTasks();