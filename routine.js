document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".taskInput");
  const addBtn = document.querySelector(".addBtn");
  const daySelect = document.getElementById("daySelect");
  const dayBoxes = document.querySelectorAll(".dayBox");

  let editMode = false;
  let currentTask = null;

  function addTask() {
    if (!input || !daySelect) return;

    const taskText = input.value.trim();
    const selectedDay = daySelect.value;

    if (taskText === "" || selectedDay === "") return;

    if (editMode && currentTask) {
      currentTask.querySelector("span").textContent = taskText;
      editMode = false;
      currentTask = null;
      if (addBtn) addBtn.textContent = "Add";
      input.value = "";
      return;
    }

    const dayBox = Array.from(dayBoxes).find((box) => {
      const titleEl = box.querySelector(".dayTitle");
      return titleEl && titleEl.textContent.trim() === selectedDay;
    });
    if (!dayBox) return;

    const list = dayBox.querySelector(".taskList");
    if (!list) return;

    const li = document.createElement("li");
    li.classList.add("taskItem");

    const span = document.createElement("span");
    span.textContent = taskText;

    // botão editar
    const editBtn = document.createElement("button");
    editBtn.textContent = "edit";
    editBtn.classList.add("editBtn");
    editBtn.type = "button";
    editBtn.addEventListener("click", () => {
      input.value = span.textContent;
      daySelect.value = selectedDay;
      currentTask = li;
      editMode = true;
      if (addBtn) addBtn.textContent = "Save";
      input.focus();
    });

    // botão deletar
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✘";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.type = "button";
    deleteBtn.addEventListener("click", () => li.remove());

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btnContainer");
    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(btnContainer);
    list.appendChild(li);
    input.value = "";
  }

  // botão adicionar — só registra se existe
  if (addBtn) addBtn.addEventListener("click", addTask);

  // tecla Enter — usar keydown é mais confiável que keypress
  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addTask();
      }
    });
  }
});
