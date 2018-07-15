<template>
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <h1>評審匯入</h1>
    </div>
    <div class="col-md-8 offset-md-2">
      <judge :judge="{ 'judges': judges }" :editable="true" :increasable="true"/>
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
import Judge from '@/components/Contest/Judge'

export default {
  name: 'judge-import',
  components: { Judge },
  data () {
    return {
      judges: []
    }
  },
  mounted () {
    let cache = this.$localStorage.fetch('create-contest-cache')['judge']
    // console.log(cache)
    if (cache !== undefined) {
      this.judges = cache['judges']
    }
  },
  methods: {
    submitData: function () {
      this.$emit('judge-submit', 'judge', { 'judges': this.judges })
      this.$toasted.success('評審資料已成功加入暫存！')
    }
  }
}
</script>
