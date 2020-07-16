// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Functions

function addTodo(event){
    event.preventDefault() // Prevents the form from submitting
    
    // Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    
    // Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // Add Todo to LocalStorage
    saveLocalTodos(todoInput.value);    

    // Create Checkmark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    // Create Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    // trashButton.classList.add('completed')
    todoDiv.appendChild(trashButton);

    // Attaching Div to Ul
    todoList.appendChild(todoDiv);

    // Clear Todo Input Value
    todoInput.value = '';
}

function deleteCheck(event){
    const item = event.target;

    // Delete Todo
    if (item.classList[0] === 'trash-btn'){
        const todo = item.parentElement; // selects the parent element of the element with the 'trash-btn' class, which is the todo list item (li)

        // Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();          // waits for the transition to end before removing the todo
        });
    }

    // Check Mark
    if (item.classList[0] === 'complete-btn'){
        const todo = item.parentElement
        todo.classList.toggle('completed')
    }

}

function filterTodo(event){
    const todos = todoList.childNodes;

    
    todos.forEach(function(todo) {
        
        
            switch (event.target.value) {
                case "all":
                    todo.style.display = 'flex';
                    break;
                case "completed":
                    if(todo.classList.contains('completed')){
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none';
                    }
                    break;
                case "uncompleted":
                    if(!todo.classList.contains('completed')){
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none';
                    }
                    break;
            }
        
        
    })
}

function saveLocalTodos(todo) {
    // Checking if there are things in the local storage
    let todos;
    if (localStorage.getItem('todos') === null) {       // checking if there is already todos in the local storage
        todos = [];             // if not, create a todos array
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));      // if there is, get the todos array and update the todos variable
    }
    todos.push(todo);       // push the todo variable into the todos array
    localStorage.setItem('todos', JSON.stringify(todos));   // set the todos array in the local storage
}

function getTodos() {
    let todos
    if (localStorage.getItem('todos') === null) {       // checking if there is already todos in the local storage
        todos = [];             // if not, create a todos array
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));      // if there is, get the todos array and update the todos variable
    }  

    // after retrieving the previously created todo list, iterate through each entry and create a li item based on the value
    
    todos.forEach(function(todo){
        // Todo Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        
        // Create Li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        // Create Checkmark Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        // Create Trash Button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        // trashButton.classList.add('completed')
        todoDiv.appendChild(trashButton);

        // Attaching Div to Ul
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    let todos
    if (localStorage.getItem('todos') === null) {       // checking if there is already todos in the local storage
        todos = [];             // if not, create a todos array
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));      // if there is, get the todos array and update the todos variable
    }  
    
    const todoIndex = Array.from(todoList.childNodes).indexOf(todo); // create an array from the todoList's childnodes and finds the index of the todo
    todos.splice(todoIndex, 1);      // removing the specific todo based of its index from the todos list

    localStorage.setItem('todos', JSON.stringify(todos))    // updating the todos list
}
