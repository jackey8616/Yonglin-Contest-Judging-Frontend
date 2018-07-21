<template>
  <div>
    比賽：
    <select v-model="selectedContest" class="form-control">
      <option v-for="contest in contestList" :key="contest">{{ contest }}</option>
    </select>
    <button class="btn btn-sm">送出</button>
  </div>
</template>

<script>
export default {
  name: 'query',
  props: [],
  mounted () {
    this.$ajax({
      'method': 'GET',
      'url': 'http://192.168.0.7:8000/api/contest/list'
    }).then(response => {
      this.$toasted.success('送出成功！')
      console.log(response.data)
    }).catch(response => {
      console.log(response.data)
      this.$toasted.error('發生錯誤：' + response)
    })
    this.contestList = ['AAA']
  },
  data () {
    return {
      selectedContest: null,
      contestList: []
    }
  },
  watch: {
    selectedContest: function () {
      this.$emit('selectedContest', this.selectedContest)
    }
  }
}
</script>
