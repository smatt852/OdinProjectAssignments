// DISPLAY.JS displays tasks and projects in lists and forms in content div

import {
  getTasks,
  getProjects,
  saveTask,
  addProject,
  storeTasks,
  storeProjects,
  removeDeletedProject,
} from "./readWrite.js";
export {
  displayTasks,
  makeNewTaskForm,
  displayProjects,
  displayTodayTasks,
  sortFunction,
};

// put tasks in date order
function sortFunction(a, b) {
  const dateA = new Date(a.deadline).getTime();
  const dateB = new Date(b.deadline).getTime();
  return dateA > dateB ? 1 : -1;
}

// display a list of tasks, each with a delete and edit button
function displayTasks() {
  document.getElementById("allTasks").classList.add("active");
  const content = document.getElementById("content");
  content.innerHTML = "";
  const taskListElement = document.createElement("div");

  // create a list item for each task
  const taskList = getTasks();
  taskList.sort(sortFunction);
  for (let i = 0; i < taskList.length; i++) {
    const taskLi = document.createElement("li");
    taskLi.id = i;

    // add delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("noButton");
    deleteButton.innerHTML = "delete";
    deleteButton.onclick = function (element) {
      const num1 = this.parentElement.id;
      taskList.splice(num1, 1);
      storeTasks(taskList);
      displayTasks();
    };

    // add edit button
    const editButton = document.createElement("button");
    editButton.classList.add("noButton");
    editButton.innerHTML = "edit";
    editButton.onclick = function (element) {
      const num2 = this.parentElement.id;
      openEditForm(num2);
    };

    // add the task info
    const task = taskList[i];
    let name = task.taskName;
    name = name.toUpperCase();
    taskLi.innerHTML = `${task.deadline}&nbsp&nbsp${name}&nbsp${task.details}&nbsp<i>${task.project}</i>`;
    if (task.complete === "complete") {
      taskLi.classList.add("complete");
    }
    if (task.urgent === "urgent") {
      taskLi.classList.add("urgent");
    }

    // put it all together and append it to the content div
    taskLi.appendChild(deleteButton);
    taskLi.appendChild(editButton);
    taskListElement.appendChild(taskLi);
  }
  taskListElement.classList.add("tasks");
  content.appendChild(taskListElement);
}

// make the form to add a task
function makeNewTaskForm(index, edit) {
  document.getElementById("content").innerHTML = "";
  const form = document.createElement("form");

  const taskNameInput = document.createElement("input");
  taskNameInput.setAttribute("type", "text");
  taskNameInput.required = "true";
  taskNameInput.setAttribute("id", "taskName");
  taskNameInput.setAttribute("placeholder", "Task");
  taskNameInput.setAttribute("autocomplete", "off");
  taskNameInput.classList.add("input");
  form.appendChild(taskNameInput);

  const inputBox = document.createElement("div");
  inputBox.classList.add("inputBox");

  const deadlineInput = document.createElement("input");
  deadlineInput.setAttribute("type", "date");
  deadlineInput.setAttribute("id", "deadline");
  deadlineInput.setAttribute("autocomplete", "off");
  deadlineInput.placeholder = "Deadline";
  deadlineInput.classList.add("input");
  deadlineInput.classList.add("dateInput");
  inputBox.appendChild(deadlineInput);

  const completeInput = document.createElement("select");
  completeInput.setAttribute("id", "complete");
  completeInput.classList.add("input");
  completeInput.setAttribute("autocomplete", "off");
  completeInput.setAttribute("placeholder", "Complete or Not");
  const opt = ["not complete", "complete"];
  let options = "";
  opt.map((op, i) => {
    options += `<option value="${op}" id="${i}" style="border-radius: 5px;"">${op}</option>`;
  });
  completeInput.innerHTML = options;
  inputBox.appendChild(completeInput);

  const urgentInput = document.createElement("select");
  urgentInput.setAttribute("id", "urgent");
  urgentInput.classList.add("input");
  urgentInput.setAttribute("autocomplete", "off");
  urgentInput.setAttribute("placeholder", "Urgent or Normal");
  const opt2 = ["normal", "urgent"];
  let options2 = "";
  opt2.map((op, i) => {
    options2 += `<option value="${op}" id="${i}" style="border-radius: 5px;"">${op}</option>`;
  });
  urgentInput.innerHTML = options2;
  inputBox.appendChild(urgentInput);
  form.appendChild(inputBox);

  const detailsInput = document.createElement("input");
  detailsInput.setAttribute("type", "textarea");
  detailsInput.setAttribute("id", "details");
  detailsInput.setAttribute("placeholder", "Details");
  detailsInput.setAttribute("autocomplete", "off");
  detailsInput.setAttribute("style", "cols:200; rows:3;");
  detailsInput.classList.add("input");
  form.appendChild(detailsInput);

  const projectInput = document.createElement("select");
  projectInput.setAttribute("id", "project");
  projectInput.classList.add("input");
  projectInput.setAttribute("autocomplete", "off");
  projectInput.setAttribute("placeholder", "Project");
  projectInput.innerHTML = "";
  // populate the dropdown list with the projects array
  const projectList = getProjects();
  projectList.forEach((project) => {
    const option = document.createElement("option");
    option.value = project.projectName;
    option.textContent = project.projectName;
    projectInput.appendChild(option);
  });
  form.appendChild(projectInput);

  const inputBox2 = document.createElement("div");
  inputBox2.classList.add("inputBox");

  const addProjectButton = document.createElement("button");
  addProjectButton.setAttribute("id", "addProject");
  addProjectButton.setAttribute("type", "button");
  addProjectButton.classList.add("newProjectButton");
  addProjectButton.textContent = "Add New Project";
  addProjectButton.addEventListener("click", (e) => {
    addProject();
  });
  inputBox2.appendChild(addProjectButton);

  const projectNameInput = document.createElement("input");
  projectNameInput.setAttribute("type", "text");
  projectNameInput.setAttribute("id", "projectName");
  projectNameInput.setAttribute("placeholder", "New Project Name");
  projectNameInput.setAttribute("autocomplete", "off");
  projectNameInput.classList.add("input");
  inputBox2.appendChild(projectNameInput);

  form.appendChild(inputBox2);

  const saveTaskButton = document.createElement("button");
  saveTaskButton.setAttribute("id", "saveTask");
  saveTaskButton.classList.add("saveButton");
  saveTaskButton.textContent = "Save Task";
  saveTaskButton.addEventListener("click", (e) => {
    saveTask(index, edit);
  });
  form.appendChild(saveTaskButton);

  document.getElementById("content").appendChild(form);
}

// display a list of projects, each with a delete button and a list of tasks
function displayProjects() {
  const content = document.getElementById("content");
  content.innerHTML = "";
  const projectListElement = document.createElement("div");
  const projectList = getProjects();

  // make a list item for each project in the projects array
  for (let i = 0; i < projectList.length; i++) {
    const projectLi = document.createElement("li");
    const project = projectList[i];
    // add delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("noButton");
    deleteButton.innerHTML = "delete";
    deleteButton.onclick = function () {
      projectList.splice(i, 1);
      storeProjects(projectList);
      removeDeletedProject(project.projectName);
      displayProjects();
    };

    // Find tasks for the current project
    const taskList = getTasks();
    const tasksForProject = taskList.filter(
      (task) => task.project === project.projectName
    );
    const taskListElement = document.createElement("ul");

    // Add each task item to the project's task list
    tasksForProject.forEach((task) => {
      const taskLi = document.createElement("li");
      let name = task.taskName;
      name = name.toUpperCase();
      taskLi.innerHTML = `${task.deadline}&nbsp&nbsp&nbsp${name} ${task.details}`;
      if (task.complete === "complete") {
        taskLi.classList.add("complete");
      }
      if (task.urgent === "urgent") {
        taskLi.classList.add("urgent");
      }
      taskListElement.appendChild(taskLi);
    });
    // add the project name to the project list item
    projectLi.innerHTML = `${project.projectName}`;

    // put it all together and add it to the content div
    projectLi.appendChild(deleteButton);
    taskListElement.classList.add("projectTasks");
    projectLi.appendChild(taskListElement);
    projectListElement.appendChild(projectLi);
    projectListElement.classList.add("project");
  }
  content.appendChild(projectListElement);
}

// recall task from storage and put the values in the edit form
function openEditForm(index) {
  // unhighlight the All Tasks button while editing
  const btn = document.getElementById("allTasks");
  btn.classList.remove("active");
  // pass edit=true through makeNewTaskForm to saveTasks because if youre saving a new task its just pushed to the array, otherwise the properties are saved
  const edit = true;
  makeNewTaskForm(index, edit);
  const taskList = getTasks();
  taskList.sort(sortFunction); // sort by date so index matches display form so that the item clicked on for editing matches the item in the edit form
  // fill the form with th details of the task to be edited
  const objectToEdit = taskList[index];
  const taskNameInput = document.getElementById("taskName");
  taskNameInput.value = objectToEdit.taskName;
  const deadlineInput = document.getElementById("deadline");
  deadlineInput.value = objectToEdit.deadline;
  const detailsInput = document.getElementById("details");
  detailsInput.value = objectToEdit.details;
  const completeInput = document.getElementById("complete");
  completeInput.value = objectToEdit.complete;
  const urgentInput = document.getElementById("urgent");
  urgentInput.value = objectToEdit.urgent;
  const projectInput = document.getElementById("project");
  projectInput.value = objectToEdit.project;
}

// Find tasks for the current day
function todayTasks() {
  const taskList = getTasks();
  const currentDate = new Date().toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const tasksForToday = taskList.filter(
    (task) => task.deadline === currentDate
  );
  return tasksForToday;
}

// display a list of tasks due today
function displayTodayTasks() {
  const content = document.getElementById("content");
  content.innerHTML = "";
  const taskListElement = document.createElement("div");
  const tasksForToday = todayTasks();
  tasksForToday.forEach((task) => {
    const li = document.createElement("li");
    let name = task.taskName;
    name = name.toUpperCase();
    li.innerHTML = `${name} ${task.details} <i>${task.project}</i>`;
    if (task.complete === "complete") {
      li.classList.add("complete");
    }
    if (task.urgent === "urgent") {
      li.classList.add("urgent");
    }
    taskListElement.appendChild(li);
    taskListElement.classList.add("tasks");
  });
  content.appendChild(taskListElement);
}
