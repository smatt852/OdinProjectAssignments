// INDEX.JS creates the page and adds the buttons

import "./style.css";
import {
  displayTasks,
  makeNewTaskForm,
  displayProjects,
  displayTodayTasks,
} from "./display.js";

const back = document.createElement("div");
back.classList.add("back");
document.body.appendChild(back);

const container = document.createElement("div");
container.setAttribute("id", "container");
container.classList.add("container");
back.appendChild(container);

const header = document.createElement("div");
header.classList.add("header");
container.appendChild(header);

const linkbox = document.createElement("div");
linkbox.classList.add("linkbox");
linkbox.setAttribute("id", "linkbox");
header.appendChild(linkbox);

const title = document.createElement("div");
title.classList.add("title");
title.textContent = "Get 'er Done !";
header.appendChild(title);

const main = document.createElement("div");
main.classList.add("main");
container.appendChild(main);

const content = document.createElement("div");
content.setAttribute("id", "content");
content.classList.add("content");
main.appendChild(content);

const footer = document.createElement("footer");
footer.classList.add("footer");
footer.innerHTML = `Copyright © ${new Date().getFullYear()} SLM`;
container.appendChild(footer);

// Make the buttons for the header
// make the buttons that call the functions to display and edit tasks
function makeButton(id, text, parent, cssClass, func, ...args) {
  const btn = document.createElement("button");
  btn.setAttribute("id", id);
  btn.textContent = text;
  const par = parent;
  par.appendChild(btn);
  btn.classList.add(cssClass);
  btn.onclick = func;
}

makeButton("allTasks", "All Tasks", linkbox, "button", displayTasks);
makeButton(
  "newTask",
  "New Task",
  linkbox,
  "button",
  makeNewTaskForm,
  null,
  false
);
makeButton("dueToday", "Due Today", linkbox, "button", displayTodayTasks);
makeButton("projects", "Projects", linkbox, "button", displayProjects);

// highlight the active button
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", (event) => {
    document
      .querySelectorAll("button")
      .forEach((e) => e.classList.remove("active"));
    button.classList.add("active");
  });
});

window.onload = function () {
  displayTasks();
};
