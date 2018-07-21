<template>
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <h1>送出前, 最後確認...</h1>
      <div v-if="loading">
        Loading...
      </div>
      <ul v-else class="ul-horizontal">
        <dl>
          <dt>比賽資訊</dt>
          <dd>
            <dl>
              <dt>名稱</dt><dd>{{ form.info.contestName }}</dd>
              <dt>開始日期</dt><dd>{{ form.info.startDate }}</dd>
              <dt>結束日期</dt><dd>{{ form.info.endDate }}</dd>
            </dl>
          </dd>
        </dl>
        <dl>
          <dt>評分項目</dt>
          <dd>
            <dl v-for="term in form.term.terms" :key="term.id">
              <dt>#</dt><dd>{{ term.id }}</dd>
              <dt>名稱</dt><dd>{{ term.name }}</dd>
              <dt>權重</dt><dd>{{ term.weight }}</dd>
              <dt v-if="term.depend !== null">相依</dt><dd>{{ term.depend }}</dd>
            </dl>
          </dd>
        </dl>
        <dl>
          <dt>評審資訊</dt>
          <dd>
            <dl v-for="judge in form.judge.judges" :key="judge.id">
              <dt>#</dt><dd>{{ judge.id }}</dd>
              <dt>姓名</dt><dd>{{ judge.name }}</dd>
              <dt>信箱</dt><dd>{{ judge.email }}</dd>
              <dt>評分項目</dt><dd>{{ judge.term.toString() }}</dd>
            </dl>
          </dd>
        </dl>
        <dl>
          <dt>參賽隊伍</dt>
          <dd>
            <dl v-for="team in form.team.teams" :key="team.id">
              <dt>#</dt><dd>{{ team.id }}</dd>
              <dt>名稱</dt><dd>{{ team.name }}</dd>
            </dl>
          </dd>
        </dl>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'final-check',
  props: [ 'form' ],
  data () {
    return {
      loading: true
    }
  },
  mounted () {
    this.loading = false
  },
  methods: {
    submitData: function () {
    }
  }
}
</script>

<style scoped>
.ul-horizontal dt {
  float: left;
  overflow: hidden;
  clear: left;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ul-horizontal dl {
  clear: left;
}
.ul-horizontal dd {
  margin-left: 180px;
  text-align: left;
}
</style>
