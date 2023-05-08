// There is a header and a footer that remain constant
// then 2 buttons which toggle between the homepage
// and the menu

import loadHome from './home'
import loadMenu from './menu'

function createHeader () {
  // create divs with content for header
  const header1 = document.createElement('div')
  header1.classList.add('header')
  const contact1 = document.createElement('div')
  contact1.classList.add('contact')
  const title1 = document.createElement('div')
  title1.textContent = 'Eatz Diner'
  title1.classList.add('title')
  const address1 = document.createElement('div')
  address1.textContent = '1245 Robie St, Hfx.'
  address1.classList.add('address')
  const phone1 = document.createElement('div')
  phone1.textContent = '902.555-5555'
  phone1.classList.add('phone')
  const linkbox1 = document.createElement('div')
  linkbox1.classList.add('linkbox')

  const homeButton = document.createElement('button')
  homeButton.setAttribute('id', 'homeButton')
  homeButton.textContent = 'Home'
  homeButton.addEventListener('click', (e) => {
    e.target.classList.add('active')
    const btn = document.getElementById('menuButton')
    btn.classList.remove('active')
    loadHome()
  })
  const menuButton = document.createElement('button')
  menuButton.setAttribute('id', 'menuButton')
  menuButton.textContent = 'Menu'
  menuButton.addEventListener('click', (e) => {
    e.target.classList.add('active')
    const btn = document.getElementById('homeButton')
    btn.classList.remove('active')
    loadMenu()
  })

  // append to header
  header1.appendChild(title1)
  contact1.appendChild(address1)
  contact1.appendChild(phone1)
  linkbox1.appendChild(homeButton)
  linkbox1.appendChild(menuButton)
  contact1.appendChild(linkbox1)
  header1.appendChild(contact1)

  return header1
}

function createMain () {
  const main1 = document.createElement('div')
  main1.setAttribute('id', 'main')
  main1.classList.add('main')
  return main1
}

function createFooter () {
  const footer1 = document.createElement('footer')
  const copyright = document.createElement('div')
  copyright.textContent = `Copyright © ${new Date().getFullYear()} SLM`
  footer1.classList.add('footer')
  footer1.appendChild(copyright)
  return footer1
}

function initializeWebsite () {
  const content1 = document.createElement('div')
  content1.setAttribute('id', 'content')
  document.body.appendChild(content1)
  content1.appendChild(createHeader())
  content1.appendChild(createMain())
  content1.appendChild(createFooter())

  loadHome()
  // this function gets the content div from index.html,
  // appends the sections that were made in this
  // js file, but doesn't return any elements to
  // index.js, which calls it. Functions are called
  // across js files but elements are not passed.
}

export default initializeWebsite
