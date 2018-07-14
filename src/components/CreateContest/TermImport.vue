<template>
  <div>
    <div class="row">
      <div class="col-sm"><button class="btn" @click="$emit('prev-slide')">上一頁</button></div>
      <div class="col-sm"><button class="btn" @click="submitData">下一頁</button></div>
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPen, faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'

library.add(
  faPen,
  faPlusCircle,
  faMinusCircle
)

export default {
  name: 'term-import',
  components: { FontAwesomeIcon },
  data () {
    return {
      add: {
        id: null,
        name: null
      },
      terms: []
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
