import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import ReposPage from '../views/ReposPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component:Home
  },
  {
    path:'/profile/:username',
    component: Profile
  },
  {
    path:'/profile/:username/repos',
    component: ReposPage
  }
]

 const router = createRouter({
   history:createWebHistory(),
   routes
 })

 export default router