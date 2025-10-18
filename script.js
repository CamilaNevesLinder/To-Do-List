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

function addTask() {
  const assignments = input.value;
  if (assignments.trim() !== "") {
    const newTask = document.createElement("li");
    newTask.innerHTML = `
        <label>
    <input type="checkbox" class="task-checkbox">
    <span class="task-text">${assignments}</span>
  </label>
  <button class="delete">Delete</button>
        `;

    list.appendChild(newTask);
    input.value = "";
  }
}

taskList.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
});
