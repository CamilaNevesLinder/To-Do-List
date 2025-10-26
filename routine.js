document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".taskInput");
  const addBtn = document.querySelector(".addBtn");
  const daySelect = document.getElementById("daySelect");
  const dayBoxes = document.querySelectorAll(".dayBox");

  // segurança: avisa no console se algum elemento não foi encontrado
  if (!input) console.warn("Input .taskInput não encontrado no DOM.");
  if (!addBtn) console.warn("Button .addBtn não encontrado no DOM.");
  if (!daySelect) console.warn("Select #daySelect não encontrado no DOM.");
  if (!dayBoxes || dayBoxes.length === 0)
    console.warn("Nenhum .dayBox encontrado no DOM.");

  let editMode = false;
  let currentTask = null;

  function addTask() {
    if (!input || !daySelect) return;

    const taskText = input.value.trim();
    const selectedDay = daySelect.value;

    // impede adicionar sem texto ou sem escolher dia
    if (taskText === "" || selectedDay === "") return;

    // se estiver editando, atualiza a tarefa
    if (editMode && currentTask) {
      currentTask.querySelector("span").textContent = taskText;
      editMode = false;
      currentTask = null;
      if (addBtn) addBtn.textContent = "Add";
      input.value = "";
      return;
    }

    // encontra o card do dia selecionado
    const dayBox = Array.from(dayBoxes).find((box) => {
      const titleEl = box.querySelector(".dayTitle");
      return titleEl && titleEl.textContent.trim() === selectedDay;
    });
    if (!dayBox) return;

    const list = dayBox.querySelector(".taskList");
    if (!list) return;

    // cria a tarefa
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

    // adiciona à lista
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
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
