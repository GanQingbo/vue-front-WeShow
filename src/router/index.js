import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AllShows from "../views/AllShows";
import Ticket from "../views/Ticket";
import Person from "../views/Person";
import Register from "../views/Register";
import Login from "../views/Login"
import ResetPassword from "../views/ResetPassword";
import UserInfo from "../views/UserInfo";
import UpdateInfo from "../views/UpdateInfo";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/AllShows',
    name:'AllShows',
    component: AllShows
  },
  {
    path: '/Ticket',
    name:'Ticket',
    component: Ticket
  },
  {
    path: '/Person',
    name:'Person',
    component: Person
  },
  {
    path:'/Register',
    component: Register
  },
  {
    path:'/Login',
    component: Login
  },
  {
    path:'/ResetPassword',
    component: ResetPassword
  },
  {
    path:'/UserInfo',
    component: UserInfo
  },
  {
    path:'/UpdateInfo',
    component:UpdateInfo
  }

]

const router = new VueRouter({
  routes
})

export default router
