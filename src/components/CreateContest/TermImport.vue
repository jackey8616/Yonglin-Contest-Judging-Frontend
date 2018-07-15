<template>
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <h1>評分項目匯入</h1>
    </div>
    <div class="col-md-8 offset-md-2">
      <term :term="{ 'terms': this.terms }" :editable="true" :increasable="true"/>
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
import Term from '@/components/Contest/Term'

export default {
  name: 'term-import',
  components: { Term },
  data () {
    return {
      terms: []
    }
  },
  mounted () {
    let cache = this.$localStorage.fetch('create-contest-cache')['term']
    // console.log(cache)
    if (cache !== undefined) {
      this.terms = cache['terms']
    }
  },
  methods: {
    submitData: function () {
      this.$emit('term-submit', 'term', { 'terms': this.terms })
      this.$toasted.success('項目資料已成功加入暫存！')
    }
  }
}
</script>
