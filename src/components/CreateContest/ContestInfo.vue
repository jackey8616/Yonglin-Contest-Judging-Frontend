<template>
  <div>
    <div>
      比賽名稱：
      <input v-model="contestName" class="form-control" type="text"/>
    </div>
    <div class="row">
      <div class="col-sm"></div>
      <div class="col-sm"><button class="btn" @click="submitData">下一頁</button></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'contest-info',
  data () {
    return {
      contestName: null,
      nameDuplicate: false
    }
  },
  mounted () {
    let cache = this.$localStorage.fetch('create-contest-cache')['info']
    console.log(cache)
    if (cache !== undefined) {
      this.contestName = cache['contestName']
    }
  },
  methods: {
    submitData: function () {
      this.$toasted.success('比賽資料已成功加入暫存！')
      this.$emit('info-submit', 'info', { 'contestName': this.contestName })
    }
  }
}
</script>
