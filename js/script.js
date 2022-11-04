// Seleção de elementos
const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const tudoList = document.querySelector("#tudo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelBtn = document.querySelector("#cancel-btn")
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erease-button");
const filterBtn = document.querySelector("#filter-select");

let oldInputValue
// Funções

const saveTodo = (text, done = 0, save = 1) => {
    const todo = document.createElement("div")
    todo.classList.add("todo")

    const todoTitle = document.createElement("h3")
    todoTitle.innerText = text
    todo.appendChild(todoTitle)

    const finishBtn = document.createElement("button")
    finishBtn.classList.add("finish-todo")
    finishBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(finishBtn)

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const removeBtn = document.createElement("button")
    removeBtn.classList.add("remove-todo")
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(removeBtn)

    if (done) {
        todo.classList.add("done");
    }

    if (save) {
        saveTodoLocalStorage({ text, done: 0 });
    }

    tudoList.appendChild(todo);

    todoInput.value = "";

    tudoList.appendChild(todo)

    todoInput.value = ""
    todoInput.focus()
}

const toggleForms = () => {
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    tudoList.classList.toggle("hide")
}

const updateTodo = (text) => {
    const todasTarefas = document.querySelectorAll(".todo");

    todasTarefas.forEach((todo) => {
        let todoTitleTarefas = todo.querySelector("h3");

        if (todoTitleTarefas.innerText === oldInputValue) {
            todoTitleTarefas.innerText = text;
            // Utilizando dados da localStorage
            updateTodoLocalStorage(oldInputValue, text);
        }
    });
};

const getSearchedTodos = (search) => {
    const todos = document.querySelectorAll(".todo");
  
    todos.forEach((todo) => {
      const todoTitle = todo.querySelector("h3").innerText.toLowerCase();
  
      todo.style.display = "flex";
  
      if (!todoTitle.includes(search)) {
        todo.style.display = "none";
      }
    });
  };

const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll(".todo");

    switch (filterValue) {
        case "all":
            todos.forEach((todo) => (todo.style.display = "flex"));

            break;

        case "done":
            todos.forEach((todo) =>
                todo.classList.contains("done")
                    ? (todo.style.display = "flex")
                    : (todo.style.display = "none")
            );

            break;

        case "todo":
            todos.forEach((todo) =>
                !todo.classList.contains("done")
                    ? (todo.style.display = "flex")
                    : (todo.style.display = "none")
            );

            break;

        default:
            break;
    }
};

// Eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const inputValue = todoInput.value
    if (inputValue) {
        saveTodo(inputValue)
    }
})

document.addEventListener("click", (e) => {
    const targtEl = e.target
    const parantEl = targtEl.closest("div")
    let todoTitle

    if (parantEl && parantEl.querySelector("h3")) {
        todoTitle = parantEl.querySelector("h3").innerText
    }

    if (targtEl.classList.contains("finish-todo")) {
        parantEl.classList.toggle("done")
    }
    if (targtEl.classList.contains("edit-todo")) {
        toggleForms()
        editInput.value = todoTitle
        oldInputValue = todoTitle
    }

    if (targtEl.classList.contains("remove-todo")) {
        parantEl.remove()
    }
})

cancelBtn.addEventListener("click", (e) => {
    e.preventDefault()
    toggleForms()
})

editForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const editInputValue = editInput.value

    if (editInputValue) {
        updateTodo(editInputValue)
    }
    toggleForms()

})

searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value;

    getSearchedTodos(search);
});

eraseBtn.addEventListener("click", (e) => {
    e.preventDefault();

    searchInput.value = "";

    searchInput.dispatchEvent(new Event("keyup"));
});

filterBtn.addEventListener("change", (e) => {
    const filterValue = e.target.value;

    filterTodos(filterValue);
});

// Local Storage
const getTodosLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    return todos;
};

const loadTodos = () => {
    const todos = getTodosLocalStorage();

    todos.forEach((todo) => {
        saveTodo(todo.text, todo.done, 0);
    });
};

const saveTodoLocalStorage = (todo) => {
    const todos = getTodosLocalStorage();

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));
};

const removeTodoLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    const filteredTodos = todos.filter((todo) => todo.text != todoText);

    localStorage.setItem("todos", JSON.stringify(filteredTodos));
};

const updateTodoStatusLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    todos.map((todo) =>
        todo.text === todoText ? (todo.done = !todo.done) : null
    );

    localStorage.setItem("todos", JSON.stringify(todos));
};

const updateTodoLocalStorage = (todoOldText, todoNewText) => {
    const todos = getTodosLocalStorage();

    todos.map((todo) =>
        todo.text === todoOldText ? (todo.text = todoNewText) : null
    );

    localStorage.setItem("todos", JSON.stringify(todos));
};

loadTodos();