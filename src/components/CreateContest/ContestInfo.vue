<template>
  <div class="row">
    <info :info="{contestName: this.contestName}" :editable="true"/>
    <div class="col-md-8 offset-md-2">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm"><button class="btn btn-primary" @click="submitData">下一頁</button></div>
      </div>
    </div>
  </div>
</template>

<script>
import Info from '@/components/Contest/Info'

export default {
  name: 'contest-info',
  components: { Info },
  data () {
    return {
      contestName: null,
      nameDuplicate: false
    }
  },
  mounted () {
    let cache = this.$localStorage.fetch('create-contest-cache')['info']
    // console.log(cache)
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
