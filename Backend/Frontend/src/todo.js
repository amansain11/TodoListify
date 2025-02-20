import "../styles/modern-normalize.css";
import "../styles/style.css";
import "../styles/components/header.css";
import "../styles/components/empty-content-box.css";
import "../styles/components/todo-container.css";
import "../styles/components/todolistify_error.css";

import hamburger from "./utils/hamburger.js";
import refreshAccessToken from "./utils/refresh-access-token.js";
import getAllTodos from "./utils/getAllTodos.js";
import dateFormater from "./utils/dateFormater.js";
import removeTodo from "./utils/removetodo.js";
import checkbox from "./utils/checkbox.js";
import getAllPendingTodos from "./utils/getAllPendingTodos.js";
import getAllCompletedTodos from "./utils/getAllCompletedTodos.js";
import displayError from "./utils/todolistify_error.js";
import authUser from "./utils/authenticate-user.js";
import loading from "./utils/loading.js";

let currentPage = 1;
const limit = 10;
let AllTodosFlag = true
let PendingTodosFlag = false
let CompleteTodosFlag = false

const loadingParent = window.innerWidth < 724 ? document.getElementById('content-box-title') : document.getElementById('logo-box-title') ;
const loadingChild = loading()

loadingParent.appendChild(loadingChild)

const sessionValidation = async ()=>{
  try {
    const sessionValid = await authUser()
  
    if(!sessionValid.success){
      loadingChild.remove()
      displayError("Something Went Wrong..")
      setTimeout(()=>{
          location.href = '/login.html';
      }, 6000)
    }
  
    loadingChild.remove()
  } catch (error) {
    loadingChild.remove()
  
    displayError("Something Went Wrong..")
    setTimeout(()=>{
        location.href = '/login.html';
    }, 6000)
  }
}

const refreshAccessTokenHandler = async ()=>{
  const sessionValid = await authUser();
  const desktop_user_profile = document.getElementsByClassName('desktop-user-profile')[0];
  const mobile_user_profile = document.getElementsByClassName('mobile-user-profile')[0];
  if (sessionValid.success) { 
      let profile_btn = document.createElement('a');

      profile_btn.setAttribute('href','/profile-page.html');

      profile_btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg><span>${sessionValid.data.username.split(' ')[0]}</span>`;

      desktop_user_profile.append(profile_btn.cloneNode(true));
      mobile_user_profile.append(profile_btn.cloneNode(true));
  } else {
      const result = await refreshAccessToken()

      if(result.ok){
          location.reload()
      }
      else{
        location.href = '/login.html';
      }
  }
}

const createTodoElement = (todoId, todoTitle, todoDate)=>{
  let todoBox = document.createElement("li");

  todoBox.setAttribute("class", "todo-box");
  todoBox.setAttribute("id", todoId);
  todoBox.innerHTML = `<div class="todo-content-left">
                        <span id="todo-checkbox">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="#121212" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        </span>
                        <div class="todo-title">
                            <a id="title-text">${todoTitle}</a>
                            <div id="full-title-text">${todoTitle}</div>
                        </div>
                    </div>
                    <div class="todo-content-right">
                        <span id="date">${dateFormater(todoDate)}</span>
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
                        <button id="edit" class="edit-btn">
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

  return todoBox;
}

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
  prevBtn.style.color = prevBtn.disabled ? "var(--accent-dark)" : "var(--accent)";

  nextBtn.disabled = currentPage === totalPages;
  nextBtn.style.color = nextBtn.disabled ? "var(--accent-dark)" : "var(--accent)";
};

const loadTodos = async() => {
  const emptyContentBox =document.getElementsByClassName("empty-content-box")[0];
  const navigationButtonBox = document.getElementsByClassName(
    "navigation-button-box"
  )[0];
  const todosBox = document.getElementsByClassName("todos-box")[0];
  const todoWrapper = document.getElementById("todo-box-wrapper");
  const container = document.getElementsByClassName("container")[0];
  const footer = document.getElementsByClassName("footer-box")[0];

  todoWrapper.innerHTML = "";

  loadingParent.appendChild(loadingChild)

  await getAllTodos(currentPage, limit)
    .then((data) => {
      if (data.totalCount === 0) {
        loadingChild.remove()
        navigationButtonBox.style.display = "none";
        todosBox.style.display = "none";
        emptyContentBox.style.display = "flex";
        container.classList.add("justify-center");
        footer.style.display = "none";
      } else {
        loadingChild.remove()
        navigationButtonBox.style.display = "flex";
        todosBox.style.display = "flex";
        footer.style.display = "flex";
        data.todos.forEach((todo) => {
          const todoBox = createTodoElement(todo._id, todo.title, todo.createdAt)

          todoWrapper.appendChild(todoBox);

          toggleCheckbox(todo._id, todo.complete);
        });

        togglePaginationButtons(data.totalCount);
      }
    })
    .catch((error) => {
      loadingChild.remove()
      displayError("Something went wrong while fetching todos..")
    });
};

const loadPendingTodos = async() => {
  const todoWrapper = document.getElementById("todo-box-wrapper");

  todoWrapper.innerHTML = "";

  loadingParent.appendChild(loadingChild)

  await getAllPendingTodos(currentPage, limit)
  .then(data => {
    if(data.totalCount === 0){
      loadingChild.remove()
      togglePaginationButtons(1)
    }
    else{
      loadingChild.remove()
      data.todos.forEach(todo => {
          const todoBox = createTodoElement(todo._id, todo.title, todo.createdAt)
          todoWrapper.appendChild(todoBox);

          toggleCheckbox(todo._id, todo.complete);
      })
      togglePaginationButtons(data.totalCount);
    }
  })
  .catch(error => {
      loadingChild.remove()
      displayError("Something went wrong while fetching todos..")
  })
}

const loadCompletedTodos = async() => {
  const todoWrapper = document.getElementById("todo-box-wrapper");

  todoWrapper.innerHTML = "";

  loadingParent.appendChild(loadingChild)

  await getAllCompletedTodos(currentPage, limit)
  .then(data => {
    if(data.totalCount === 0){
      loadingChild.remove()
      togglePaginationButtons(1)
    }
    else{
      loadingChild.remove()
      data.todos.forEach(todo => {
          const todoBox = createTodoElement(todo._id, todo.title, todo.createdAt)
          todoWrapper.appendChild(todoBox);

          toggleCheckbox(todo._id, todo.complete);
      })
      togglePaginationButtons(data.totalCount);
    }
  })
  .catch(error => {
      loadingChild.remove()
      displayError("Something went wrong while fetching todos..")
  })
}

const paginationHandler = () => {
  const paginationBox = document.getElementsByClassName(
    "pagination-link-box"
  )[0];

  paginationBox.addEventListener("click", (event) => {
    if (event.target.id === "prev-button" && currentPage > 1) {
      currentPage = currentPage - 1;

      if(AllTodosFlag){
        loadTodos()
      }
      if(PendingTodosFlag){
        loadPendingTodos()
      }
      if(CompleteTodosFlag){
        loadCompletedTodos()
      }
    } 

    else if (event.target.id === "next-button") {
      currentPage = currentPage + 1;

      if(AllTodosFlag){
        loadTodos()
      }
      if(PendingTodosFlag){
        loadPendingTodos()
      }
      if(CompleteTodosFlag){
        loadCompletedTodos()
      }
    }
  });
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

    loadingParent.appendChild(loadingChild)

    const url = `/api/v1/todos/add-todo`;

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
        loadingChild.remove()
        form.reset();

        if(AllTodosFlag){
          loadTodos()
        }
        if(PendingTodosFlag){
          loadPendingTodos()
        }
        if(CompleteTodosFlag){
          loadCompletedTodos()
        }
      }
      else {
        loadingChild.remove()
        displayError(data.message)
      }
    })
    .catch((error) => {
      loadingChild.remove()
      displayError("Failed Adding New Todo..")
    });
  });
};

const removeTodoHandler = () => {
  const todoList = document.getElementById("todo-box-wrapper");

  todoList.addEventListener("click", async (event) => {
    const removeButton = event.target.closest("#remove")

    if(removeButton){
      const todoId = removeButton.closest('.todo-box').id;

      loadingParent.appendChild(loadingChild)

      const result = await removeTodo(todoId)
 
      if(result.success){
        loadingChild.remove()
         if(AllTodosFlag){
           loadTodos()
         }
         if(PendingTodosFlag){
           loadPendingTodos()
         }
         if(CompleteTodosFlag){
           loadCompletedTodos()
         }
      }
      else {
          loadingChild.remove()
          displayError(result.message)
      }
    }
  });
};

const checkboxHandler = () => {
  const todoList = document.getElementById("todo-box-wrapper");

  todoList.addEventListener("click", async (event) => {
    const checkboxbtn = event.target.closest('#todo-checkbox')

    if(checkboxbtn){
      const todoId = checkboxbtn.closest('.todo-box').id;

      loadingParent.appendChild(loadingChild)

      const result = await checkbox(todoId)

      if(result.success){
        loadingChild.remove()

        toggleCheckbox(todoId, result.data.complete)

        if(AllTodosFlag){
          loadTodos()
        }
        if(PendingTodosFlag){
          loadPendingTodos()
        }
        if(CompleteTodosFlag){
          loadCompletedTodos()
        }
      }
      else{
        loadingChild.remove()
        displayError(result.message)
      }
    }
  });
};

const editTodoHandler = () => { 
  const todoList = document.getElementById("todo-box-wrapper");

  todoList.addEventListener("click", async (event) => {
    const editbtn = event.target.closest('#edit')

    if(editbtn){
      const todo = editbtn.closest('.todo-box')
      
      todo.innerHTML = `<form id="edit-form">
          <input id="edit-input" type="text" name="todo" placeholder="Type to Edit todo...">
          <button id="save" class="save-btn" type="submit">
              save
          </button>
        </form>`;

      const todoId = todo.id;
      const form = todo.firstElementChild;

      form.addEventListener('submit', async(event) => {
        event.preventDefault()

        loadingParent.appendChild(loadingChild)

        const url = `/api/v1/todos/update-todo/${todoId}`;

        const formData = new FormData(form)

        const data = new URLSearchParams();
        data.append("title", formData.get("todo"))

        await fetch(url, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          credentials: "include",
          body: data.toString()
        })
        .then(Response => Response.json())
        .then(data => {
          if(data.success){
            loadingChild.remove()

            if(AllTodosFlag){
              loadTodos()
            }
            if(PendingTodosFlag){
              loadPendingTodos()
            }
            if(CompleteTodosFlag){
              loadCompletedTodos()
            }
          }
          else{
            loadingChild.remove()
            displayError(data.message)
          }
        })
        .catch(error => {
          loadingChild.remove()
          displayError("Failed Updating Todo..")
        })
      })
    }
  });
};

const navigationHandler = () => {
  const AllTodosButton = document.getElementById('all-todos-button')
  const PendingTodosButton = document.getElementById('pending-todos-button')
  const CompletedTodosButton = document.getElementById('completed-todos-button')

  AllTodosButton.addEventListener('click', ()=>{
    currentPage = 1;
    AllTodosFlag = true;
    PendingTodosFlag = false;
    CompleteTodosFlag = false;

    loadTodos()

    AllTodosButton.style.background = 'black';
    PendingTodosButton.style.background = 'none';
    CompletedTodosButton.style.background = 'none';
  })

  PendingTodosButton.addEventListener('click', ()=>{
    currentPage = 1;
    AllTodosFlag = false;
    PendingTodosFlag = true;
    CompleteTodosFlag = false;

    loadPendingTodos()

    AllTodosButton.style.background = 'none';
    PendingTodosButton.style.background = 'black';
    CompletedTodosButton.style.background = 'none';
  })

  CompletedTodosButton.addEventListener('click', ()=>{
    currentPage = 1;

    AllTodosFlag = false;
    PendingTodosFlag = false;
    CompleteTodosFlag = true;

    loadCompletedTodos()

    AllTodosButton.style.background = 'none';
    PendingTodosButton.style.background = 'none';
    CompletedTodosButton.style.background = 'black';
  })


}

sessionValidation()
hamburger();
refreshAccessTokenHandler();
loadTodos();
paginationHandler();
emptyBoxHandler();
navigationHandler()
addTodo();
removeTodoHandler();
checkboxHandler();
editTodoHandler();