import {createRouter, createWebHistory} from 'vue-router';
import Login from '@/views/Login';
import LayoutAuth from '@/layouts/Auth';
import Register from "@/views/Register";
import VerifyEmail from "@/views/VerifyEmail";
import ForgotPassword from "@/views/ForgotPassword";
import ResetPassword from "@/views/ResetPassword";
import LayoutDefault from "@/layouts/Default";
import Home from "@/views/Home";
import Guard from "@/service/middleware";
import Profile from "@/views/Profile";

const routes = [
    {
        path: '/',
        beforeEnter: Guard.redirectIfNotAuthenticated,
        component: LayoutDefault,
        children: [
            {
                path: '',
                name: 'index',
                component: Home
            },
            {
                path: 'profile',
                name: 'profile',
                component: Profile
            }
        ]
    },
    {
        path: '/login',
        beforeEnter: Guard.redirectIfAuthenticated,
        component: LayoutAuth,
        children: [
            {
                path: '',
                name: 'login',
                component: Login
            }
        ]
    },
    {
        path: '/register',
        component: LayoutAuth,
        children: [
            {
                path: '',
                name: 'register',
                component: Register
            }
        ]
    },
    {
        path: '/verify-email',
        component: LayoutAuth,
        children: [
            {
                path: '',
                name: 'verifyEmail',
                component: VerifyEmail
            }
        ]
    },
    {
        path: '/forgot-password',
        component: LayoutAuth,
        children: [
            {
                path: '',
                name: 'forgot-password',
                component: ForgotPassword
            }
        ]
    },
    {
        path: '/reset-password',
        component: LayoutAuth,
        children: [
            {
                path: '',
                name: 'reset-password',
                component: ResetPassword
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router


// import { createRouter, createWebHistory } from 'vue-router'
// import Login from '@/views/Login'
// import LayoutAuth from '@/layouts/Auth'
//
// const routes = [
//   {
//     path: '/login',  component: LayoutAuth,
//     children: [
//       { path: '', name: 'login', component: Login}
//     ]
//   }
// ]
//
// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })
//
// export default router
