import '../styles/modern-normalize.css';
import '../styles/style.css';
import '../styles/components/header.css';
import '../styles/components/empty-content-box.css';
import '../styles/components/todo-container.css';

import hamburger from './utils/hamburger.js';
import checkbox from './utils/checkbox.js';
import refreshAccessToken from './utils/refresh-access-token.js';
import getAllTodos from './utils/getAllTodos.js';
import dateFormater from './utils/dateFormater.js';

const allTodosHandler = async ()=>{
    const emptyContentBox = document.getElementsByClassName('empty-content-box')[0];
    const navigationButtonBox = document.getElementsByClassName('navigation-button-box')[0];
    const todosBox = document.getElementsByClassName('todos-box')[0];
    const container = document.getElementsByClassName('container')[0];

    getAllTodos()
    .then(data => {
        if(!data.totalCount <= 0){
            navigationButtonBox.style.display = 'flex';
            todosBox.style.display = 'flex';

            data.todos.forEach(todo => {
                let todoBox = document.createElement('li')
                todoBox.setAttribute('class', 'todo-box')
                todoBox.innerHTML = 
                        `<div class="todo-content-left">
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
                todosBox.appendChild(todoBox);
            });
        }
        else{
            emptyContentBox.style.display = 'flex';
            container.classList.add('justify-center');
        }
    })
    .catch(error => console.log("Error fetching all todos",error))
}

hamburger();
checkbox();
refreshAccessToken();
allTodosHandler()

