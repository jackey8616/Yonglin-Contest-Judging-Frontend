<template>
  <div class="row" style="height: 100%;">
    <div>
      <div class="col-md-8 offset-md-2">
        <h1>{{ title }}</h1>
      </div>
      <div v-if="info !== null" class="col-md-8 offset-md-2">
        <div class="form-inline">
          比賽名稱：
          <input v-model="info.contestName" @change="checkNameDuplicate" :disabled="!editable" class="form-control" type="text"/>
          <div v-if="nameDuplicated" style="color: RED;">比賽名稱重複！</div>
        </div>
        <div class="form-inline">
          開始時間：
          <vue-datepicker-local v-model="info.startDate" inputClass="form-control" @confirm="checkDateValid" show-buttons :disabled="!editable"/>
          <div v-if="!dateValid" style="color: RED;">日期或日期範圍有誤！</div>
        </div>
        <div class="form-inline">
          結束時間：
          <vue-datepicker-local v-model="info.endDate" inputClass="form-control" @confirm="checkDateValid" show-buttons :disabled="!editable"/>
          <div v-if="!dateValid" style="color: RED;">日期或日期範圍有誤！</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueDatepickerLocal from 'vue-datepicker-local'

export default {
  name: 'info',
  props: [ 'title', 'info', 'editable' ],
  components: { VueDatepickerLocal },
  data () {
    return {
      nameDuplicated: false,
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
    zoneDate: function (date) {
      return this.$moment.tz(date, 'Asia/Taipei').format('YYYY-MM-DD')
    },
    checkNameDuplicate: function () {
      this.$ajax({
        method: 'POST',
        url: 'http://' + this.$backend + '/api/contest/check-duplicate',
        params: { 'info.contestName': this.info.contestName }
      }).then(response => {
        this.nameDuplicated = response.data.data.length !== 0
      }).catch(response => {
        this.$toasted.error('檢查重名失敗！')
      })
    },
    checkDateValid: function () {
      if (this.info.startDate !== null && this.info.endDate !== null) {
        this.dateValid = !(this.info.startDate > this.info.endDate)
        this.info.startDate = this.zoneDate(this.info.startDate)
        this.info.endDate = this.zoneDate(this.info.endDate)
      }
      return this.dateValid
    }
  }
}
</script>
