<template>
    <div>
        <LoginMenu/>

        <div class="grid gap-2 h-screen">
            <section class="bg-gray-100 dark:bg-gray-900">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto sm:h-screen md:h-screen xl:h-screen lg:py-0">
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form class="space-y-4 md:space-y-6">
                                <div>
                                    <label
                                        for="email"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your E-mail
                                    </label>

                                    <input
                                        v-model="email"
                                        type="text"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                    >
                                </div>
                                <div>
                                    <label
                                        for="password"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>

                                    <input
                                        v-model="password"
                                        type="password"
                                        placeholder="••••••••"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                </div>
                                <div
                                    v-if="response.message"
                                    :class="`bg-${response.color}-100 border border-${response.color}-400 text-${response.color}-700 px-4 py-3 rounded relative`" role="alert"
                                >
                                    <span class="block sm:inline">{{ response.message }}</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <div class="flex items-start">
                                    </div>
                                    <div class="my-4 text-center">
                                        <RouterLink
                                            :to="{ name : 'forgot-password' }"
                                            class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                        >
                                            Forgot your password?
                                        </RouterLink>
                                    </div>
                                </div>

                                <button
                                    :disabled="spinner.register"
                                    @click.stop.prevent="login()"
                                    class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    <svg v-if="spinner.register"
                                        aria-hidden="true"
                                        role="status"
                                        class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                    </svg>
                                    Sign in
                                </button>

                                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet?
                                    <a
                                        href="register"
                                        class="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                        Sign up
                                    </a>
                                </p>
                            </form>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>

import {LoginMenu} from "@/components/Auth/LoginMenu";
import Cookie from '@/service/cookie';
import axios from "axios";
import message from "@/utils/messages";
export default {
    name: 'Login',

    components: {
        LoginMenu
    },

    data() {
        return {
            email: 'andrebarros@gmail.com',
            password: '123123',
            response: {
                color: '',
                message: ''
            },
            spinner: {
                register: false
            }
        }
    },

    methods: {
        login() {

            if(this.email == ''){
                this.response.color = 'red';
                this.response.message = message['EmailError']
                return;
            }

            if(this.password == ''){
                this.response.color = 'red';
                this.response.message = message['PasswordError']
                return;
            }

            const payload = {
                email: this.email,
                password: this.password
            }

            this.resetResponse()

            this.spinner.register = true;

            axios.post('http://127.0.0.1:8000/api/v1/login', payload).then((response) => {
                const token = `${response.data.token_type} ${response.data.access_token}`
                Cookie.setToken(token);
                this.$store.commit('user/STORE_USER', response.data.data);
                this.$router.push({ name : 'index' });
            }).catch((e)=>{
                const errorCode = e?.response?.data?.error || 'ServerError';
                this.response.color = 'red';
                this.response.message = message[errorCode];
            }).finally(()=>{
                this.spinner.register = false;
            });
        },

        resetResponse(){
            this.response.color = '';
            this.response.message = ''
        },

    }
}
</script>