<template>
  <div>
    <div>
      帳號(Email):<input v-model="account" type="text" class="form-control" placeholder="Email"/>
    </div>
    <div>
      密碼:<input v-model="passwd" type="password" class="form-control" placeholder="Password"/>
    </div>
    <button @click="login" class="btn btn-md">登入</button>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      account: null,
      passwd: null
    }
  },
  methods: {
    login: function () {
      this.$ajax({
        method: 'POST',
        url: 'http://' + this.$backend + '/api/login',
        params: {
          'account': this.account,
          'passwd': this.passwd
        }
      }).then(response => {
        console.log(response.data)
        if (response.data.status === 'success') {
          this.$toasted.success('登入成功！')
          localStorage.setItem('token', JSON.stringify(response.data.data))
          this.$router.push({ path: '/dashboard' })
        } else if (response.data.status === 'failed') {
          this.$toasted.success('登入失敗！')
          console.log(response.data.detail)
        }
      }).catch(response => {
        console.log(response)
        this.$toasted.success('登入失敗！')
      })
    }
  }
}
</script>
