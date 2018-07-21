<template>
  <div v-if="judge !== null">
    評審：{{ judge.name }}
  </div>
</template>

<script>
export default {
  name: 'contest-mark',
  data () {
    return {
      judge: null
    }
  },
  mounted () {
    if (this.$route.params.judgeEmail !== undefined) {
      this.$ajax({
        method: 'GET',
        url: 'http://' + this.$backend + '/api/judge/info?' + this.$route.params.judgeEmail
      }).then(response => {
        if (response.data.status === 'success') {
          this.$toasted.success('成功獲取評審資料！')
          this.judge = response.data.data
        } else if (response.data.status === 'failed') {
          this.$toasted.error('獲取評審資料失敗！')
        }
      }).catch(response => {
        this.$toasted.error('獲取評審資料失敗！')
        console.log(response.data)
      })
    }
  }
}
</script>
