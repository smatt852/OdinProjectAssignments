function createMenu () {
  const text = `
MIXED BERRY TARTINE <i>15</i><br><br>
AVOCADO TOAST <i>16</i><br><br>
SUNDAY PANCAKES<br>
Single <i>17</i> Double <i>21</i> Triple <i>24</i><br><br>
CHEDDAR SCRAMBLE <i>21</i><br>
Scrambled Eggs, Long Island Home Fries, Multigrain Toast, Choice of Bacon, Breakfast Sausage, Chicken Sausage or Avocado<br><br>
BISCUITS & GRAVY <i>18</i><br>
Cheddar Biscuits, Poached Eggs, Breakfast Sausage Gravy, Hot Sauce<br><br>
STEAK & EGGS <i>46</i><br>
10oz Ribeye, Gremolata, Scrambled Eggs, Cheddar, Long Island Home Fries, Multigrain Toast<br><br>
CAESAR SALAD <i>14</i><br>
Romaine, Focaccia Croutons, Locatelli<br><br>
HOT CHICKEN SANDWICH <i>19</i><br>
Crispy Chicken Thigh, Chipotle, Lime Crema, B&B Pickles, Cilantro, Sesame Potato Bun<br><br>
SUNDAY BURGER <i>19</i><br>
Two Patties, Cheddar Cheese, Special Sauce, B&B Pickles, Sesame Potato Bun<br><br>
SIDES<br>
Chicken Sausage <i>9</i><br>
Bacon <i>9</i><br>
Hash Browns <i>9</i><br>`

  const menuText1 = document.createElement('div')
  menuText1.innerHTML = text
  menuText1.classList.add('menuText')
  menuText1.classList.add('menuText2')

  const menu1 = document.createElement('div')
  menu1.classList.add('menu')
  const col3 = document.createElement('div')
  col3.classList.add('col1')
  const col4 = document.createElement('div')
  col4.classList.add('col2')
  menu1.appendChild(col3)
  menu1.appendChild(menuText1)
  menu1.appendChild(col4)
  return menu1
}

function loadMenu () {
  const main1 = document.getElementById('main')
  main1.textContent = ''
  main1.appendChild(createMenu())
}

export default loadMenu
