<template>
    <div>Home</div>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Todo List</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" action="#" method="POST">
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Todo:</label>
                    <div class="mt-2">
                        <input
                            v-model="newTodo"
                            type="email"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div>
                    <button
                        :disabled="spinner.get_todos"
                        @click.stop.prevent="createTodo()"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <svg v-if="spinner.get_todos"
                             aria-hidden="true"
                             role="status"
                             class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                        </svg>
                        Save
                    </button>
                </div>
            </form>
        </div>


        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

            <dt class="text-sm font-medium leading-6 text-gray-900 text-center">
                Todo List
                <svg v-if="spinner.get_todos"
                     aria-hidden="true"
                     role="status"
                     class="text-center inline w-5 h-5 text-white animate-spin"
                     viewBox="0 0 100 101"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg>
            </dt>

            <dd v-if="!spinner.get_todos" class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">

                    <li
                        v-for="todo in todos"
                        :key="todo.id"
                        class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                        <div class="flex w-0 flex-1 items-center">
                            <div class="ml-4 flex min-w-0 flex-1 gap-2">
                                <input
                                    type="text"
                                    v-model="todo.label"
                                    @keyup.enter="updateTodo(todo)"
                               />
                            </div>
                        </div>
                        <div class="ml-4 flex-shrink-0">
                            <a @click.stop.prevent="deleteTodo(todo)" href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Delete</a>
                        </div>
                    </li>
                </ul>
            </dd>
        </div>
    </div>
</template>


<script>

import axios from "axios";
import Cookie from "@/service/cookie";
import message from "@/utils/messages";

export default {

    name: 'Home',

    data() {
        return {
            spinner: {
                get_todos: false,
            },
            todos: [],
            newTodo: ""
        };
    },

    created() {
        this.getTodos();
    },

    methods:{
        getTodos(){
            this.spinner.get_todos = true;

            axios.get('http://127.0.0.1:8000/api/v1/todos').then((response) => {
                this.todos = response.data.data;
            }).finally(()=>{
                this.spinner.get_todos = false;
            });
        },
        createTodo(){

            if(!this.newTodo) { return; }

            const payload = {
                label: this.newTodo
            };

            axios.post('http://127.0.0.1:8000/api/v1/todos', payload).then((response) => {
                this.todos.unshift(response.data.data);
                this.newTodo = "";
            });
        },

        updateTodo(todo){

            const payload = {
                label: todo.label
            };

            axios.put(`http://127.0.0.1:8000/api/v1/todos/${todo.id}`, payload);
        },

        deleteTodo(todo){
            const payload = {
                label: todo.label
            };

            axios.delete(`http://127.0.0.1:8000/api/v1/todos/${todo.id}`, payload).then(()=>{
                const index = this.todos.findIndex(o => o.id === todo.id);
                this.todos.splice(index, 1);
            });


        }
    }
}

</script>