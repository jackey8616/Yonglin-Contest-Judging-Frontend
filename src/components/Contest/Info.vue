<template>
  <div class="row">
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'contest-info',
  props: [ 'title', 'info', 'editable' ]
}
</script>
