import {createRouter, createWebHistory} from 'vue-router'
import Login from '@/views/Login'
import LayoutAuth from '@/layouts/Auth'

const routes = [
    {
        path: '/login',
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
                component: Login
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
                component: Login
            }
        ]
    }

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
