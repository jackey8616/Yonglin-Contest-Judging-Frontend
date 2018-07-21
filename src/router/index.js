import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import ContestCreate from '@/components/Contest/Create/ContestCreate'
import ContestSummary from '@/components/Contest/Summary/ContestSummary'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/contest-create',
      name: 'ContestCreate',
      component: ContestCreate
    },
    {
      path: '/contest-summary',
      name: 'ContestSummary',
      component: ContestSummary
    }
  ]
})
