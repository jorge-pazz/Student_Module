import { createRouter, createWebHistory } from 'vue-router'
import register from '../views/RegisterStudent.vue' 
import StudentLogin from '../views/StudentLogin.vue'
import adminPanel from '../views/AdminPanel.vue'
import update from '../views/UpdateStudent.vue'

const routes = [
  {
    path: '/',
    name: 'adminPanel',
    component: adminPanel
  },
  
  {
    path: '/register',
    name: 'register',
    component: register
  },

  {
    path: '/studentLogin',
    name: 'StudentLogin',
    component: StudentLogin
  },

  {
    path: '/update/:ra',
    name: 'update',
    component: update
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
