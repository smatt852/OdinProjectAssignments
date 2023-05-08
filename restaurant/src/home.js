import brunch from './brunch.png'

function createHome () {
  const home1 = document.createElement('div')
  home1.classList.add('home')
  const col1 = document.createElement('div')
  col1.classList.add('col1')
  const col2 = document.createElement('div')
  col2.classList.add('col2')
  const brunchImage = new Image()
  brunchImage.src = brunch
  brunchImage.alt = 'Yummy Brunch'
  brunchImage.classList.add('brunch')
  brunchImage.classList.add('imageFit')
  home1.appendChild(col1)
  home1.appendChild(brunchImage)
  home1.appendChild(col2)
  return home1
}

function loadHome () {
  const main1 = document.getElementById('main')
  // I dont know why but if you remove the next line
  // the section doesn't reload when you switch
  // buttons
  main1.textContent = ''
  main1.appendChild(createHome())
}

export default loadHome
