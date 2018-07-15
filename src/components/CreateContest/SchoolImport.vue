<template>
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <h1>參賽隊伍匯入</h1>
    </div>
    <div class="col-md-8 offset-md-2">
      <school :school="{ 'schools': this.schools }" :editable="true" :increasable="true"/>
    </div>
    <div class="col-md-8 offset-md-2">
      <div class="row">
        <div class="col-sm"><button class="btn" @click="$emit('prev-slide')">上一頁</button></div>
        <div class="col-sm"><button class="btn btn-primary" @click="submitData">下一頁</button></div>
      </div>
    </div>
  </div>
</template>

<script>
import School from '@/components/Contest/School'

export default {
  name: 'school-import',
  components: { School },
  data () {
    return {
      schools: []
    }
  },
  mounted () {
    let cache = this.$localStorage.fetch('create-contest-cache')['school']
    // console.log(cache)
    if (cache !== undefined) {
      this.schools = cache['schools']
    }
  },
  methods: {
    submitData: function () {
      this.$emit('school-submit', 'school', { 'schools': this.schools })
      this.$toasted.success('學校資料已成功加入暫存！')
    }
  }
}
</script>

<style scoped>
.full-height {
  height: 100vh;
}
</style>
