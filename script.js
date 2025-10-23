const dateInNumbers = document.getElementById("dateInNumbers");
const btnAdd = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const titleInput = document.getElementById("titleTask");
const descriptionInput = document.getElementById("descriptionTask");

const today = new Date();
const formattedDate = new Intl.DateTimeFormat("pt-BR").format(today);
dateInNumbers.textContent = formattedDate;

let taskBeingEdited = null;

function addTask() {
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  if (title === "" && description === "") return;

  if (taskBeingEdited) {
    const titleEl = taskBeingEdited.querySelector(".task-title");
    const descEl = taskBeingEdited.querySelector(".task-description");
    titleEl.textContent = title;
    descEl.textContent = description;
    taskBeingEdited = null;
    btnAdd.textContent = "Add task";
  } else {
    const newTask = document.createElement("li");
    newTask.classList.add("task-card");

    newTask.innerHTML = `
      <div class="task-content">
        <h3 class="task-title">${title}</h3>
        <p class="task-description">${description}</p>
      </div>
      <div class="task-buttons">
        <button class="edit-task">✎</button>
        <button class="delete-task">×</button>
      </div>
    `;

    list.appendChild(newTask);

    const deleteBtn = newTask.querySelector(".delete-task");
    deleteBtn.addEventListener("click", () => newTask.remove());

    const editBtn = newTask.querySelector(".edit-task");
    editBtn.addEventListener("click", () => editTask(newTask));
  }

  titleInput.value = "";
  descriptionInput.value = "";
}

function editTask(taskCard) {
  const titleEl = taskCard.querySelector(".task-title");
  const descEl = taskCard.querySelector(".task-description");

  titleInput.value = titleEl.textContent;
  descriptionInput.value = descEl.textContent;

  taskBeingEdited = taskCard;
  btnAdd.textContent = "Save Task";
}

btnAdd.addEventListener("click", addTask);
