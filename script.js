const dateInNumbers = document.getElementById("dateInNumbers");
const btnAdd = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const input = document.getElementById("textTask");

const today = new Date();
const formattedDate = new Intl.DateTimeFormat("pt-BR").format(today);
dateInNumbers.textContent = formattedDate;

btnAdd.addEventListener("click", addTask);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

let tasks = [];
let idCounter = 1;

function addTask() {
  const task = input.value.trim();

  if (task !== "") {
    const taskId = idCounter++;
    const newTask = document.createElement("li");

    newTask.innerHTML = `
  
    <label class="task-label">
        <input type="checkbox" class="task-checkbox" data-id="${taskId}">
        <span class="task-text">${task}</span>
      </label>
      <button class="delete">Delete</button>
    
    `;

    list.appendChild(newTask);
    input.value = "";

    const taskObject = {
      id: taskId,
      title: task,
      description: "",
      isChecked: false,
      createdAt: new Date(),
    };

    tasks.push(taskObject);
    console.log(tasks);
  }
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    const li = e.target.parentElement;
    const checkbox = li.querySelector(".task-checkbox");
    const id = Number(checkbox.dataset.id);

    tasks = tasks.filter((oldTask) => oldTask.id !== id);
    li.remove();

    console.log("Removido:", id, tasks);
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("task-checkbox")) {
    const checkId = Number(e.target.dataset.id);
    const checked = e.target.checked;

    const task = tasks.find(({ id }) => id === checkId);
    if (task) task.isChecked = checked;
  }
});
