// Seleção de elementos
const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const tudoList = document.querySelector("#tudo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelBtn = document.querySelector("#cancel-btn")

let oldInputValue
// Funções

const saveTodo = (text) => {
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
        }
    });
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