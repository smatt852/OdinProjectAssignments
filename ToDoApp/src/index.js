// INDEX.JS creates the page and adds the buttons

import './style.css'
import { displayTasks, makeNewTaskForm, displayProjects, displayTodayTasks } from './display.js'

const back = document.createElement('div')
back.classList.add('back')
document.body.appendChild(back)

const container = document.createElement('div')
container.setAttribute('id', 'container')
container.classList.add('container')
back.appendChild(container)

const header = document.createElement('div')
header.classList.add('header')
container.appendChild(header)

const title = document.createElement('div')
title.classList.add('title')
title.textContent = "Get 'er Done !"
header.appendChild(title)

const linkbox = document.createElement('div')
linkbox.classList.add('linkbox')
linkbox.setAttribute('id', 'linkbox')
header.appendChild(linkbox)

const main = document.createElement('div')
main.classList.add('main')
container.appendChild(main)

const content = document.createElement('div')
content.setAttribute('id', 'content')
content.classList.add('content')
main.appendChild(content)

const footer = document.createElement('footer')
footer.classList.add('footer')
footer.innerHTML = `Copyright © ${new Date().getFullYear()} SLM`
container.appendChild(footer)

// Make the buttons for the header
const allTasksButton = document.createElement('button')
allTasksButton.setAttribute('id', 'allTasks')
allTasksButton.textContent = 'All Tasks'
allTasksButton.addEventListener('click', (e) => {
  e.target.classList.add('active')
  const btn1 = document.getElementById('newTask')
  btn1.classList.remove('active')
  const btn2 = document.getElementById('dueToday')
  btn2.classList.remove('active')
  const btn3 = document.getElementById('projects')
  btn3.classList.remove('active')
  const content = document.getElementById('content')
  content.innerHTML = ''
  displayTasks()
})

const newTaskButton = document.createElement('button')
newTaskButton.setAttribute('id', 'newTask')
newTaskButton.textContent = 'New Task'
newTaskButton.addEventListener('click', (e) => {
  e.target.classList.add('active')
  const btn1 = document.getElementById('allTasks')
  btn1.classList.remove('active')
  const btn2 = document.getElementById('dueToday')
  btn2.classList.remove('active')
  const btn3 = document.getElementById('projects')
  btn3.classList.remove('active')
  const content = document.getElementById('content')
  content.innerHTML = ''
  const edit = false
  const index = null
  makeNewTaskForm(index, edit)
})

const dueTodayButton = document.createElement('button')
dueTodayButton.setAttribute('id', 'dueToday')
dueTodayButton.textContent = 'Due Today'
dueTodayButton.addEventListener('click', (e) => {
  e.target.classList.add('active')
  const btn1 = document.getElementById('allTasks')
  btn1.classList.remove('active')
  const btn2 = document.getElementById('newTask')
  btn2.classList.remove('active')
  const btn3 = document.getElementById('projects')
  btn3.classList.remove('active')
  const content = document.getElementById('content')
  content.innerHTML = ''
  displayTodayTasks()
})

const projectsButton = document.createElement('button')
projectsButton.setAttribute('id', 'projects')
projectsButton.textContent = 'Projects'
projectsButton.addEventListener('click', (e) => {
  e.target.classList.add('active')
  const btn1 = document.getElementById('allTasks')
  btn1.classList.remove('active')
  const btn2 = document.getElementById('newTask')
  btn2.classList.remove('active')
  const btn3 = document.getElementById('dueToday')
  btn3.classList.remove('active')
  const content = document.getElementById('content')
  content.innerHTML = ''
  displayProjects()
})

linkbox.appendChild(allTasksButton)
linkbox.appendChild(newTaskButton)
linkbox.appendChild(dueTodayButton)
linkbox.appendChild(projectsButton)

window.onload = function () {
  displayTasks()
}
