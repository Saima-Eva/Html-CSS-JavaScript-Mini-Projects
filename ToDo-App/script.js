//Find the element
const container = document.querySelector(".container");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#inputTodo");
const todoAddButton = document.querySelector("#addTodoButton");
const todoLists = document.getElementById("lists");
const messageElement = document.getElementById("message");


//showMessage
const showMessage = (text, status) =>{
    messageElement.textContent = text;
    messageElement.classList.add(`bg-${status}`);
    setTimeout(()=>{
        messageElement.textContent = "";
        messageElement.classList.remove(`bg-${status}`);
    }, 1000);
};


//creatTodo
const createTodo = (todoID, todoValue) =>{
    const todoElement = document.createElement("li");
    todoElement.id = todoID;
    todoElement.classList.add("li-style");
    todoElement.innerHTML =`<span>${todoValue}</span>
    <span><button class="btn" id="deleteButton"><i class="fa fa-trash"></i></button></span>`;
    todoLists.appendChild(todoElement);

    const deleteButton = todoElement.querySelector("#deleteButton");
    deleteButton.addEventListener("click", deleteTodo)
};

//deleteTodo
const deleteTodo = (event) =>{
const selectedTodo = event.target.parentElement.parentElement.parentElement;

todoLists.removeChild(selectedTodo);
showMessage("todo is deleted", "danger");

let todos = getTodosFromLocalStorage();
todos = todos.filter((todo) => todo.todoID !== selectedTodo.id);
localStorage.setItem("mytodos", JSON.stringify(todos));
};

//getTodosFromLocalStorgae
const getTodosFromLocalStorage = () => {
   return localStorage.getItem("mytodos") ? JSON.parse
    (localStorage.getItem("mytodos")) : [];
}

//adTodo
const addTodo = (event) =>{
    event.preventDefault();
    const todoValue = todoInput.value;


    //unique id
    const todoID = Date.now().toString();
    createTodo(todoID, todoValue);
    showMessage("todo is added", "success");

//add todo to local storage
    const todos = getTodosFromLocalStorage();
    todos.push({todoID, todoValue});
    localStorage.setItem("mytodos", JSON.stringify(todos));
    todoInput.value = "";
};

//loadtodos
const loadTodos = () =>{
    const todos = getTodosFromLocalStorage();
    todos.map((todo) => createTodo(todo.todoID, todo.todoValue))
};


//adding listeners
 todoForm.addEventListener("submit", addTodo);
 window.addEventListener("DOMContentLoaded", loadTodos);