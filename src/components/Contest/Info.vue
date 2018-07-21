<template>
  <div class="row" style="height: 100%;">
    <div>
      <div class="col-md-8 offset-md-2">
        <h1>{{ title }}</h1>
      </div>
      <div v-if="info !== null" class="col-md-8 offset-md-2">
        <div class="form-inline">
          比賽名稱：
          <input v-if="editable" v-model="info.contestName" class="form-control" type="text"/>
          <div v-else>{{ info.contestName }}</div>
        </div>
        <div class="form-inline">
          開始時間：
          <vue-datepicker-local v-if="editable" v-model="info.startDate" inputClass="form-control" @confirm="checkDateValid" show-buttons :disabled="!editable"/>
          <div v-if="!dateValid" style="color: RED;">日期或日期範圍有誤！</div>
        </div>
        <div class="form-inline">
          結束時間：
          <vue-datepicker-local v-if="editable" v-model="info.endDate" inputClass="form-control" @confirm="checkDateValid" show-buttons :disabled="!editable"/>
          <div v-if="!dateValid" style="color: RED;">日期或日期範圍有誤！</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueDatepickerLocal from 'vue-datepicker-local'

export default {
  name: 'contest-info',
  props: [ 'title', 'info', 'editable' ],
  components: { VueDatepickerLocal },
  data () {
    return {
      dateValid: true
    }
  },
  watch: {
    info: {
      deep: true,
      immediate: true,
      handler () {
        this.checkComplete()
      }
    }
  },
  methods: {
    checkComplete: function () {
      if (this.info.contestName === undefined || this.info.contestName.length === 0) {
      } else if (this.info.startDate === undefined || this.info.endDate === undefined) {
      } else {
        this.$emit('completed', true)
        return true
      }
      this.$emit('completed', false)
      return false
    },
    checkDateValid: function () {
      this.dateValid = !(this.info.startDate > this.info.endDate)
      return this.dateValid
    }
  }
}
</script>
