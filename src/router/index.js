import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import CreateContest from '@/components/CreateContest/CreateContest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/create-contest',
      name: 'CreateContest',
      component: CreateContest
    }
  ]
})
