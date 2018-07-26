import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import ContestCreate from '@/components/Contest/Create/ContestCreate'
import ContestSummary from '@/components/Contest/Summary/ContestSummary'
import ContestMark from '@/components/Contest/Mark/ContestMark'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/contest-create',
      name: 'ContestCreate',
      component: ContestCreate
    },
    {
      path: '/contest-summary/:contestName?',
      name: 'ContestSummary',
      component: ContestSummary
    },
    {
      path: '/contest-mark/:judgeEmail',
      name: 'ContestMark',
      component: ContestMark
    }
  ],
  mode: 'history'
})
