<template>
  <div v-if="info !== undefined && info !== null">
    <div>
      <router-link to="/contest-summary" tag="button" class="btn btn-md">比賽資訊</router-link>
      <router-link v-if="info.admin" to="/contest-create" tag="button" class="btn btn-md">建立新比賽</router-link>
      <router-link :to="{ path: '/contest-mark/' + info.email }" tag="button" class="btn btn-md">評分比賽</router-link>
      <button @click="logout" class="btn btn-md">登出</button>
      <br>
    </div>
    <div>
      <p>身份別： {{ info.admin ? '管理員' :'評審' }}</p>
      <p>信箱： {{ info.email }}</p>
      <p>姓名： {{ info.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      info: null
    }
  },
  mounted () {
    this.info = this.$localStorage.fetch('user-token')
  },
  methods: {
    logout () {
      this.$localStorage.clear('user-token')
      this.$router.push('/')
      // this.$router.push('/login')
    }
  }
}
</script>
