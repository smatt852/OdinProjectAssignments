/* eslint-disable space-before-function-paren */
/* eslint-disable semi */
/* eslint-disable quotes */
// READWRITE.JS saves and recalls task and project arrays from local storage

import { displayProjects, sortFunction } from "./display";

export {
  getTasks,
  getProjects,
  saveTask,
  addProject,
  storeTasks,
  storeProjects,
  removeDeletedProject,
};

// task constructor
// eslint-disable-next-line space-before-function-paren
function Task(taskName, deadline, details, complete, urgent, project) {
  this.taskName = taskName;
  this.deadline = deadline;
  this.details = details;
  this.complete = complete;
  this.urgent = urgent;
  this.project = project;
}

// get task array from local storage
function getTasks() {
  const taskList = JSON.parse(localStorage.getItem("taskList")) || [];
  return taskList;
}

// get project array from local storage
function getProjects() {
  const projectList = JSON.parse(localStorage.getItem("projectList")) || [];
  return projectList;
}

// get input from page, make a new task or save edits, put it in task array
function saveTask(index, edit) {
  const taskName = document.getElementById("taskName").value;
  const deadline = document.getElementById("deadline").value;
  const details = document.getElementById("details").value;
  const complete = document.getElementById("complete").value;
  const urgent = document.getElementById("urgent").value;
  const project = document.getElementById("project").value;
  const taskList = getTasks();
  taskList.sort(sortFunction);
  if (edit === true) {
    taskList[index].taskName = taskName;
    taskList[index].deadline = deadline;
    taskList[index].details = details;
    taskList[index].complete = complete;
    taskList[index].urgent = urgent;
    taskList[index].project = project;
  } else {
    const newTask = new Task(
      taskName,
      deadline,
      details,
      complete,
      urgent,
      project
    );
    taskList.push(newTask);
  }
  storeTasks(taskList);
}

// get input from page, make a new project, put it in project array
function addProject() {
  const projectName = document.getElementById("projectName").value;

  const x = document.getElementById("project");
  const option = document.createElement("option");
  option.text = projectName;
  x.add(option);

  const newProject = new Project(projectName);
  const projectList = JSON.parse(localStorage.getItem("projectList")) || [];
  projectList.push(newProject);
  storeProjects(projectList);
}

// save task array to local storage
function storeTasks(taskList) {
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

// save project array to local storage
function storeProjects(projectList) {
  localStorage.setItem("projectList", JSON.stringify(projectList));
}

// project constructor
function Project(projectName) {
  this.projectName = projectName;
}

// remove deleted project from task in task array
function removeDeletedProject(project) {
  const taskList = getTasks();
  const tasksInProject = taskList.filter((task) => task.project === project);
  tasksInProject.forEach((task) => {
    task.project = "";
    storeTasks(taskList);
    displayProjects();
  });
}
