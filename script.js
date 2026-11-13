"use strict";

const STORAGE_KEY = "littlelist-tasks";

const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");
const emptyTitle = document.querySelector("#empty-title");
const emptyMessage = document.querySelector("#empty-message");
const appMessage = document.querySelector("#app-message");
const totalCount = document.querySelector("#total-count");
const completedCount = document.querySelector("#completed-count");
const pendingCount = document.querySelector("#pending-count");
const listCount = document.querySelector("#list-count");
const filterButtons = document.querySelectorAll(".filter-button");

let tasks = loadTasks();
let activeFilter = "all";

renderTasks();

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskName = taskInput.value.trim();
  if (!taskName) {
    taskInput.focus();
    return;
  }

  tasks.unshift({
    id: createTaskId(),
    text: taskName,
    completed: false
  });

  taskInput.value = "";
  taskInput.focus();
  appMessage.textContent = "";
  saveAndRender();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    renderTasks();
  });
});

function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (!savedTasks) {
      return [];
    }

    const parsedTasks = JSON.parse(savedTasks);
    if (!Array.isArray(parsedTasks)) {
      throw new Error("Saved task data is not a list.");
    }

    return parsedTasks.filter((task) => (
      task
      && typeof task.id === "string"
      && typeof task.text === "string"
      && typeof task.completed === "boolean"
    ));
  } catch (error) {
    console.error("Could not load saved tasks:", error);
    appMessage.textContent = "Saved tasks could not be loaded. You can still add new tasks.";
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    appMessage.textContent = "";
  } catch (error) {
    console.error("Could not save tasks:", error);
    appMessage.textContent = "Your changes could not be saved in this browser.";
  }
}

function saveAndRender() {
  saveTasks();
  renderTasks();
}

function createTaskId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getVisibleTasks() {
  if (activeFilter === "completed") {
    return tasks.filter((task) => task.completed);
  }

  if (activeFilter === "pending") {
    return tasks.filter((task) => !task.completed);
  }

  return tasks;
}

function renderTasks() {
  const visibleTasks = getVisibleTasks();
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  totalCount.textContent = String(tasks.length);
  completedCount.textContent = String(completedTasks);
  pendingCount.textContent = String(pendingTasks);
  listCount.textContent = String(visibleTasks.length);
  taskList.replaceChildren();

  visibleTasks.forEach((task) => {
    taskList.append(createTaskElement(task));
  });

  const isEmpty = visibleTasks.length === 0;
  emptyState.hidden = !isEmpty;
  taskList.hidden = isEmpty;

  if (tasks.length === 0) {
    emptyTitle.textContent = "Your list is a blank canvas";
    emptyMessage.textContent = "Add a task above and make today yours.";
  } else if (activeFilter === "completed") {
    emptyTitle.textContent = "Nothing completed just yet";
    emptyMessage.textContent = "Finished tasks will show up here.";
  } else if (activeFilter === "pending") {
    emptyTitle.textContent = "All caught up!";
    emptyMessage.textContent = "There are no pending tasks. Enjoy the moment.";
  }
}

function createTaskElement(task) {
  const row = document.createElement("li");
  row.className = "task-row";
  row.classList.toggle("is-completed", task.completed);

  const main = document.createElement("div");
  main.className = "task-main";

  const checkbox = document.createElement("input");
  checkbox.className = "task-checkbox";
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.setAttribute("aria-label", `Mark "${task.text}" as ${task.completed ? "pending" : "completed"}`);
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveAndRender();
  });

  const text = document.createElement("span");
  text.className = "task-text";
  text.textContent = task.text;

  main.append(checkbox, text);

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const editButton = createIconButton("✎", `Edit "${task.text}"`, "icon-button");
  editButton.addEventListener("click", () => {
    showEditForm(row, task);
  });

  const deleteButton = createIconButton("×", `Delete "${task.text}"`, "icon-button delete-button");
  deleteButton.addEventListener("click", () => {
    tasks = tasks.filter((savedTask) => savedTask.id !== task.id);
    saveAndRender();
  });

  actions.append(editButton, deleteButton);
  row.append(main, actions);
  return row;
}

function createIconButton(symbol, label, className) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.textContent = symbol;
  button.setAttribute("aria-label", label);
  return button;
}

function showEditForm(row, task) {
  row.replaceChildren();

  const form = document.createElement("form");
  form.className = "edit-form";

  const input = document.createElement("input");
  input.className = "edit-input";
  input.type = "text";
  input.maxLength = 160;
  input.value = task.text;
  input.setAttribute("aria-label", "Edit task");
  input.required = true;

  const saveButton = document.createElement("button");
  saveButton.className = "small-button";
  saveButton.type = "submit";
  saveButton.textContent = "Save";

  const cancelButton = document.createElement("button");
  cancelButton.className = "small-button";
  cancelButton.type = "button";
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", renderTasks);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const updatedText = input.value.trim();
    if (!updatedText) {
      input.focus();
      return;
    }

    task.text = updatedText;
    saveAndRender();
  });

  form.append(input, saveButton, cancelButton);
  row.append(form);
  input.focus();
  input.select();
}
