/******************************/
/***   GLOBAL VARIABLES     ***/
/******************************/

const form = document.getElementById('form');
const userInput = document.getElementById('todo-input');
const toDoContainer = document.querySelector('.todo-list');
const todo = document.querySelector('.todo');
const todos = document.querySelectorAll('.todo');
const todoLeft = document.querySelector('.todo-amount');
// const todoItemList2 = document.querySelectorAll('li');
const todoItemList = document.getElementsByTagName('li');
const clearCompleted = document.querySelector('.clear-btn');
const selection = document.querySelector('.selector');
const theme = document.querySelector('.night-day');
const body = document.querySelector('body');
const headImg = document.querySelector('.heading-background');
const forminput = document.querySelector('.form-input-container');
const todobackgeound = document.querySelector('.todo-conatiner');
const amount = document.querySelector('.data');
const circle = document.querySelector('.circle');
// const selectionTheme = document.querySelector('.style.selector');

console.log(circle);
/******************************/
/***       FUNCTION         ***/
/******************************/

function submitForm(e) {
  e.preventDefault();
  if (userInput.value.length > 0 && userInput.value !== '') {
    createToDo();
  }
}

function createToDo() {
  let todoItem = `
    <div class="todo">
        <div class="circle"></div>
        <li class="todo-item">${userInput.value}</li>
        <div class="remove hidden"><img src="./images/icon-cross.svg" alt=""></div>
    </div>
`;
  // Add new todo to DOM
  toDoContainer.insertAdjacentHTML('afterbegin', todoItem);

  // Clear user Input
  userInput.value = '';
  toDoCounter();
}

function addDelete(e) {
  let item = e.target;

  // Add and remove 'complete class'
  if (item.classList.contains('todo')) {
    item.classList.toggle('complete');
    item.firstElementChild.classList.toggle('complete');
  }
  // Remove Element form DOM
  if (item.classList.contains('remove')) {
    item.parentElement.remove();
  }
  toDoCounter();
}

function toDoCounter() {
  // itemleft counter
  let itemsLeft = 0;
  let list = [];

  [].forEach.call(todoItemList, (child) => {
    list.push(child.parentElement);
  });

  // loop through list and skip any element with the class of complete
  for (const x of list) {
    if (x.classList.contains('complete')) continue;

    // add one for every element that is not skipped
    itemsLeft++;
  }

  todoLeft.innerHTML = `${itemsLeft} items left`;
}

function clearBtn() {
  //remove all completed item from DOM
  [...todoItemList].forEach((item) => {
    if (item.parentElement.classList.contains('complete')) {
      item.parentElement.remove();
    }
  });
}

function filterOption(e) {
  let selected = e.target.innerText;
  [...todoItemList].forEach((item) => {
    let todo = item.parentElement;
    console.log(todo);
    switch (selected) {
      // Shaw all item
      case 'All':
        if (todo) {
          todo.style.display = 'flex';
        }
        break;
      // Show uncomplted Item
      case 'Active':
        if (todo.classList.contains('complete')) {
          todo.style.display = 'none';
        } else {
          todo.style.display = 'flex';
        }
        break;
      // Show Completed Item
      case 'Completed':
        if (todo.classList.contains('complete')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

function themeSwitch() {
  body.classList.toggle('light-theme');
	theme.classList.toggle('light-theme')
  headImg.classList.toggle('light-theme');
  forminput.classList.toggle('light-theme');
  todobackgeound.classList.toggle('light-theme');
  amount.classList.toggle('light-theme');
  selection.classList.toggle('light-theme');
  circle.classList.toggle('light-theme');
}

/******************************/
/***    EVENTLISTENER       ***/
/******************************/

form.addEventListener('submit', submitForm);
toDoContainer.addEventListener('click', addDelete);
clearCompleted.addEventListener('click', clearBtn);
selection.addEventListener('click', filterOption);
theme.addEventListener('click', themeSwitch);
