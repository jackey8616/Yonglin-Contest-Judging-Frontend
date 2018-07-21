<template>
  <div>
    比賽：
    <select v-model="selectedContest" class="form-control">
      <option v-for="contest in contestList" :key="contest">{{ contest }}</option>
    </select>
    <button class="btn btn-sm" @click="selectContest">送出</button>
  </div>
</template>

<script>
export default {
  name: 'query',
  props: [],
  mounted () {
    this.$ajax({
      'method': 'GET',
      'url': 'http://' + this.$backend + '/api/contest/list'
    }).then(response => {
      if (response.data.status === 'success') {
        response.data.data['contest-lists'].forEach(element => {
          this.contestList.push(element.info.contestName)
        })
      } else if (response.data.status === 'failed') {
        this.$toasted.error('獲取比賽清單失敗！')
        console.log(response.data.detail)
      }
    }).catch(response => {
      console.log(response.data)
      this.$toasted.error('發生錯誤：' + response.data)
    })
  },
  data () {
    return {
      selectedContest: null,
      contestList: []
    }
  },
  methods: {
    selectContest: function () {
      this.$emit('selectedContest', this.selectedContest)
    }
  }
}
</script>
