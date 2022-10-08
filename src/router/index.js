import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Classify from '../views/Classify.vue'
import Shopping from '../views/Shopping.vue'
import Search from '../views/Search.vue'
Vue.use(VueRouter)
VueRouter.prototype.back=false;
VueRouter.prototype.goBack = function goBack() { 
    this.back = true
    this.go(-1);
 }
const routes = [
    {
        path:'/home',
        component:Home,
        children:[
            {
                path:'classify',
                component:Classify,
                name:'classify'
            },
            {
                path:'shopping',
                component:Shopping,
                name:'shopping'
            }
        ]
    },
    {
        path:'/search',
        component:Search,
        name:'search'
    },
    {
        path:'*',
        redirect:'/home/classify',
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
