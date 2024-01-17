<template>
    <!-- component -->
    <div class="max-w-md mx-auto p-8 bg-white rounded-md shadow-md">
        <h2 class="text-2xl font-semibold mb-6">My Profile</h2>
        <form action="#" method="POST">
            <div class="mb-4">
                <label for="first_name" class="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                <input
                    v-model="firstName"
                    type="text"
                    id="first_name"
                    name="first_name"
                    required
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                >
            </div>
            <div class="mb-4">
                <label for="last_name" class="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                <input
                    v-model="lastName"
                    type="text"
                    id="last_name"
                    name="last_name"
                    required
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                >
            </div>
            <div class="mb-4">
                <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                    v-model="email"
                    type="text"
                    id="email"
                    name="email"
                    required
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                >
            </div>
            <div class="mb-4">
                <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input
                    v-model="password"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                >
            </div>

            <button
                :disabled="spinner.profile"
                @click.stop.prevent="update()"
                class="mb-4 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
                <svg v-if="spinner.profile"
                     aria-hidden="true"
                     role="status"
                     class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg>
                Save
            </button>

            <div
                v-if="response.message"
                :class="`bg-${response.color}-100 border border-${response.color}-400 text-${response.color}-700 px-4 py-3 rounded relative`" role="alert"
            >
                <span class="block sm:inline">{{ response.message }}</span>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import message from "@/utils/messages";
import axios from "axios";
export default {

    name : 'Profile',

    data(){
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            response: {
                color: '',
                message: ''
            },
            spinner: {
                profile: false
            }
        }
    },

    computed: {
        ...mapState({
            user: state => state.user.user,
        })
    },

    created() {
        this.firstName = this.user.first_name;
        this.lastName = this.user.last_name;
        this.email = this.user.email;
    },

    methods:{

        update(){

            if(this.firstName == ''){
                this.response.color = 'red';
                this.response.message = message['FirstName']
                return;
            }

            if(this.lastName == ''){
                this.response.color = 'red';
                this.response.message = message['LastName']
                return;
            }

            if(this.email == ''){
                this.response.color = 'red';
                this.response.message = message['EmailError']
                return;
            }

            const payload = {
                first_name: this.firstName,
                last_name: this.lastName,
                email: this.email
            }

            if(this.password){
                payload.password = this.password;
            }

            this.resetResponse()

            this.spinner.profile = true;

            axios.put('http://127.0.0.1:8000/api/v1/me', payload).then((response)=>{
                this.response.color = 'green';
                this.response.message = message['UpdateSucceeded'];
            }).catch((e)=>{
                const errorCode = e?.response?.data?.error || 'ServerError';
                this.response.color = 'red';
                this.response.message = message[errorCode]
            }).finally(()=>{
                this.spinner.profile = false;
            });
        },

        resetResponse(){
            this.response.color = '';
            this.response.message = ''
        },
    }
}

</script>
