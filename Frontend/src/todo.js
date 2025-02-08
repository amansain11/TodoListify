import "../styles/modern-normalize.css";
import "../styles/style.css";
import "../styles/components/header.css";
import "../styles/components/empty-content-box.css";
import "../styles/components/todo-container.css";

import hamburger from "./utils/hamburger.js";
import refreshAccessToken from "./utils/refresh-access-token.js";
import getAllTodos from "./utils/getAllTodos.js";
import dateFormater from "./utils/dateFormater.js";
import removeTodo from "./utils/removetodo.js";
import checkbox from "./utils/checkbox.js";

let currentPage = 1;
const limit = 10;

const toggleCheckbox = (todoId, isCompleted) => {
  const todo = document.getElementById(todoId);
  if (isCompleted) {
    todo.firstElementChild.firstElementChild.firstElementChild.classList.add(
      "marked-checked"
    );
    todo.firstElementChild.lastElementChild.firstElementChild.style.color =
      "#898989";
    todo.firstElementChild.lastElementChild.firstElementChild.style.textDecoration =
      "line-through";
  } else {
    todo.firstElementChild.firstElementChild.firstElementChild.classList.remove(
      "marked-checked"
    );
    todo.firstElementChild.lastElementChild.firstElementChild.style.color =
      "white";
    todo.firstElementChild.lastElementChild.firstElementChild.style.textDecoration =
      "none";
  }
};

const togglePaginationButtons = (totalCount) => {
  const prevBtn = document.getElementById("prev-button");
  const nextBtn = document.getElementById("next-button");

  const totalPages = Math.ceil(totalCount / limit);

  if (currentPage > totalPages) {
    location.reload();
  }

  prevBtn.disabled = currentPage === 1;
  prevBtn.style.color = prevBtn.disabled ? "#962901" : "orangered";

  nextBtn.disabled = currentPage === totalPages;
  nextBtn.style.color = nextBtn.disabled ? "#962901" : "orangered";
};

const loadTodos = () => {
  const emptyContentBox =
    document.getElementsByClassName("empty-content-box")[0];
  const navigationButtonBox = document.getElementsByClassName(
    "navigation-button-box"
  )[0];
  const todosBox = document.getElementsByClassName("todos-box")[0];
  const todoWrapper = document.getElementById("todo-box-wrapper");
  const container = document.getElementsByClassName("container")[0];
  const footer = document.getElementsByClassName("footer-box")[0];

  todoWrapper.innerHTML = "";

  getAllTodos(currentPage, limit)
    .then((data) => {
      if (data.totalCount === 0) {
        navigationButtonBox.style.display = "none";
        todosBox.style.display = "none";
        emptyContentBox.style.display = "flex";
        container.classList.add("justify-center");
        footer.style.display = "none";
      } else {
        navigationButtonBox.style.display = "flex";
        todosBox.style.display = "flex";
        footer.style.display = "flex";
        data.todos.forEach((todo) => {
          let todoBox = document.createElement("li");

          todoBox.setAttribute("class", "todo-box");
          todoBox.setAttribute("id", todo._id);
          todoBox.innerHTML = `<div class="todo-content-left">
                        <span id="todo-checkbox">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="#121212" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        </span>
                        <div class="todo-title">
                            <a id="todo-title" href="#">${todo.title}</a>
                        </div>
                    </div>
                    <div class="todo-content-right">
                        <span id="date">${dateFormater(todo.createdAt)}</span>
                        <button id="remove">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                                class="h-5 w-5 text-white">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
                            </svg>
                        </button>
                        <button id="edit">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            class="h-5 w-5 text-white">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                            </svg>
                        </button>
                    </div>`;
          todoWrapper.appendChild(todoBox);

          toggleCheckbox(todo._id, todo.complete);
        });

        togglePaginationButtons(data.totalCount);
      }
    })
    .catch((error) => console.log("Error fetching all todos", error));
};

const paginationHandler = () => {
  const paginationBox = document.getElementsByClassName(
    "pagination-link-box"
  )[0];

  paginationBox.addEventListener("click", (event) => {
    if (event.target.id === "prev-button" && currentPage > 1) {
      currentPage = currentPage - 1;
      loadTodos();
    } else if (event.target.id === "next-button") {
      currentPage = currentPage + 1;
      loadTodos();
    }
  });
  loadTodos();
};

const emptyBoxHandler = () => {
  const btn = document.getElementById("add-new-todo");
  const navigationButtonBox = document.getElementsByClassName(
    "navigation-button-box"
  )[0];
  const todosBox = document.getElementsByClassName("todos-box")[0];
  const footer = document.getElementsByClassName("footer-box")[0];
  const emptyContentBox =
    document.getElementsByClassName("empty-content-box")[0];
  const todoInputField = document.getElementById("text-box");

  btn.addEventListener("click", () => {
    emptyContentBox.style.display = "none";
    navigationButtonBox.style.display = "flex";
    todosBox.style.display = "flex";
    footer.style.display = "flex";
    todoInputField.focus();
  });
};

const addTodo = () => {
  const form = document.getElementsByClassName("add-todo-box")[0];

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const url = "http://localhost:8000/api/v1/todos/add-todo";

    const formData = new FormData(form);

    const data = new URLSearchParams();
    data.append("title", formData.get("todo"));

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include",
      body: data.toString(),
    })
      .then((Response) => Response.json())
      .then((data) => {
        if (data.success) {
          form.reset();
          loadTodos();
        }
         else {
          console.log("Failed adding todo: ", data.message);
        }
      })
      .catch((error) => console.error("Error: ", error));
  });
};

const removeTodoHandler = () => {
  const todoList = document.getElementById("todo-box-wrapper");

  todoList.addEventListener("click", async (event) => {
    if (event.target.tagName === "BUTTON" && event.target.id === "remove") {
      const result = await removeTodo(event.target.parentElement.parentElement.id);

      if (result.success) {
        loadTodos();
      } 

      else {
        console.log(result.message);
      }
    } 
    
    else if (event.target.tagName === "svg" && event.target.parentElement.id === "remove") {
        const result = await removeTodo(event.target.parentElement.parentElement.parentElement.id);

        if (result.success) {
            loadTodos();
        } 
        
        else {
            console.log(result.message);
        }
    } 
    else if (event.target.tagName === "path" && event.target.parentElement.parentElement.id === "remove") {
      const result = await removeTodo(event.target.parentElement.parentElement.parentElement.parentElement.id);

      if (result.success) {
        loadTodos();
      }

       else {
        console.log(result.message);
      }
    }
  });
};

const checkboxHandler = () => {
  let todosBox = document.getElementsByClassName("todos-box")[0];
  todosBox.addEventListener("click", async (element) => {
    if (
      element.target.tagName === "svg" &&
      element.target.parentElement.id === "todo-checkbox"
    ) {
      const todoId =
        element.target.parentElement.parentElement.parentElement.id;
      const result = await checkbox(todoId);
      toggleCheckbox(todoId, result.data.complete);
    } else if (
      element.target.tagName === "path" &&
      element.target.parentElement.parentElement.id === "todo-checkbox"
    ) {
      const todoId =
        element.target.parentElement.parentElement.parentElement.parentElement
          .id;
      const result = await checkbox(todoId);
      toggleCheckbox(todoId, result.data.complete);
    }
  });
};

hamburger();
refreshAccessToken();
paginationHandler();
emptyBoxHandler();
addTodo();
removeTodoHandler();
checkboxHandler();
