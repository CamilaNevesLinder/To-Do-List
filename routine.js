document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".boxRoutine");

  boxes.forEach((box) => {
    const input = box.querySelector(".taskInput");
    const addBtn = box.querySelector(".addBtn");
    const list = box.querySelector(".taskList");

    function addTask() {
      const taskText = input.value.trim();
      if (taskText === "") return;

      const li = document.createElement("li");

      const span = document.createElement("span");
      span.textContent = taskText;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "✘";
      deleteBtn.classList.add("deleteBtn");

      deleteBtn.addEventListener("click", () => {
        li.remove();
      });

      li.appendChild(span);
      li.appendChild(deleteBtn);
      list.appendChild(li);
      input.value = "";
    }

    addBtn.addEventListener("click", addTask);

    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addTask();
      }
    });
  });
});
