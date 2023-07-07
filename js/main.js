const todosList = [];
const todoForm = document.getElementById("todoForm");
const todoList = document.getElementById("todoList");
const noTodosMessage = document.getElementById("noTodosMessage");

const renderList = () => {
    todoList.innerHTML = "";
    noTodosMessage.style.display = todosList.length === 0 ? "block" : "none";
    todosList.forEach((todo) => {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.addEventListener("change", () => {
            toggleTodoCompletion(todo.id);
        });

        const text = document.createElement("span");
        text.innerText = todo.text;
        if (todo.completed) {
            text.classList.add("completed");
        }

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.disabled = !todo.completed;
        deleteButton.addEventListener("click", () => {
            deleteTodoItem(todo.id);
        });

        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
};

const toggleTodoCompletion = (id) => {
    const todo = todosList.find((todo) => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderList();
    }
};

const deleteTodoItem = (id) => {
    const index = todosList.findIndex((todo) => todo.id === id);
    if (index !== -1) {
        todosList.splice(index, 1);
        renderList();
    }
};

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const todoInput = document.getElementById("todoInput");
    const todoText = todoInput.value.trim();
    if (todoText !== "") {
        const newTodo = {
            id: Date.now(),
            text: todoText,
            completed: false,
        };

        todosList.push(newTodo);
        todoInput.value = "";
        renderList();
    }
});

renderList();
