const dateInNumbers = document.getElementById("dateInNumbers");
const btnAdd = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const input = document.getElementById("textTask");

const today = new Date();
const formattedDate = new Intl.DateTimeFormat("pt-BR").format(today);
dateInNumbers.textContent = formattedDate;

btnAdd.addEventListener("click", addTask);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTask();
});

let tasks = [];
let idCounter = 1;

function addTask() {
  const task = input.value.trim();
  if (task === "") return;

  const taskId = idCounter++;
  const newTask = document.createElement("li");

  newTask.innerHTML = `
   <div class="task-main">
  <label class="task-label">
    <input type="checkbox" class="task-checkbox" data-id="${taskId}">
    <span class="task-text">${task}</span>
  </label>
  <button class="delete">Delete</button>
</div>

    <div class="description-wrapper">
      <input type="text" class="description" placeholder="description">
      <p class="description-text"></p>
    </div>
  `;

  list.appendChild(newTask);
  input.value = "";

  const descriptionInput = newTask.querySelector(".description");
  const descriptionText = newTask.querySelector(".description-text");

  descriptionInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const note = descriptionInput.value.trim();
      if (note === "") return;

      const taskObj = tasks.find((t) => t.id === taskId);
      if (taskObj) taskObj.description = note;

      descriptionText.innerHTML = `
        ${note} 
        <span class="edit-description" style="cursor:pointer; margin-left:8px;">✎</span>
        <span class="delete-description" style="cursor:pointer; margin-left:4px;">×</span>
      `;

      descriptionInput.value = "";
    }
  });

  descriptionText.addEventListener("click", function (e) {
    const taskObj = tasks.find((t) => t.id === taskId);
    if (!taskObj) return;

    // Editar
    if (e.target.classList.contains("edit-description")) {
      descriptionInput.value = taskObj.description;
      descriptionInput.focus();
      descriptionText.textContent = "";
    }

    if (e.target.classList.contains("delete-description")) {
      descriptionText.textContent = "";
      if (taskObj) taskObj.description = "";
    }
  });

  const taskObject = {
    id: taskId,
    title: task,
    createdAt: new Date(),
    description: "",
  };
  tasks.push(taskObject);
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    const li = e.target.closest("li");
    const checkbox = li.querySelector(".task-checkbox");
    const id = Number(checkbox.dataset.id);

    tasks = tasks.filter((t) => t.id !== id);
    li.remove();
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
