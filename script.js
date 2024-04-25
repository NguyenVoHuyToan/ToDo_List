let todo = JSON.parse(localStorage.getItem("todo")) || [];

const todoInput = document.getElementById("inputField");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteTask = document.getElementById("deleteButton");

document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addToDo);
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addList();
    }
  });
  deleteTask.addEventListener("click", deleteAll);
  displayTask();
});

function addToDo() {
  const newTask = todoInput.value.trim();
  if (newTask !== "") {
    todo.push({
      text: newTask,
      disabled: false,
    });
    saveToLocalStorage();
    todoInput.value = "";
    displayTask();
  }
}

function displayTask() {
  todoList.innerHTML = "";
  todo.forEach((item, index) => {
    const newParagrap = document.createElement("p");
    newParagrap.innerHTML = `
            <div class="todo-container">
                <input type="checkbox" class="todo-checkbox" id="input-${index}" ${
      item.disabled ? "checked" : ""
    }>
                <p id="todo-${index}" class="${
      item.disabled ? "disabled" : ""
    }" onclick="editTask(${index})">${item.text}</p>
            </div>
        `;
    newParagrap
      .querySelector(".todo-checkbox")
      .addEventListener("change", () => toggleTask(index));
    todoList.appendChild(newParagrap);
  });
  todoCount.textContent = todo.length;
}

function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage();
  displayTask();
}
function editTask(index) {
  const todoItem = document.getElementById(`todo-${index}`);
  const currentText = todo[index].text;
  const inputElement = document.createElement("input");

  inputElement.value = currentText;
  todoItem.replaceWith(inputElement);
  inputElement.focus();

  inputElement.addEventListener("blur", function () {
    const updatedText = inputElement.value.trim();
    if (updatedText) {
      todo[index].text = updatedText;
      saveToLocalStorage();
    }
    displayTask();
  });
}

function deleteAll() {
  todo = [];
  saveToLocalStorage();
  displayTask();
}

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}
