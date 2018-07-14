<template>
  <div>
    <div class="row">
      <table class="table table-stripped">
        <thead>
          <td>動作</td>
          <td>序號</td>
          <td>國小名稱</td>
        </thead>
        <tbody>
          <tr v-for="school in schools" :key="school.id">
            <td>
              <button class="btn btn-sm"><font-awesome-icon :icon="['fas', 'pen']"/> 編輯</button>
              /
              <button class="btn btn-sm"><font-awesome-icon :icon="['fas', 'minus-circle']"/> 刪除</button>
            </td>
            <td>{{ school.id }}</td>
            <td>{{ school.name }}</td>
          </tr>
          <tr>
            <td><button @click="addSchool()" :disabled="add.name == null || nameInvalid()" class="btn btn-sm"><font-awesome-icon :icon="['fas', 'plus-circle']"/> 新增</button></td>
            <td>{{ schools.length }}</td>
            <td>
              <div v-if="nameInvalid()">
                <input v-model="add.name" class="form-control is-invalid text-danger" type="text" placeholder="名稱"/>
                <div style="color: RED;">名稱重複！</div>
              </div>
              <div v-else>
                <input v-model="add.name" class="form-control valid text-success" type="text" placeholder="名稱"/>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

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
  name: 'school-import',
  components: { FontAwesomeIcon },
  data () {
    return {
      add: {
        name: null
      },
      schools: []
    }
  },
  methods: {
    submitData: function () {
      this.$emit('school-submit', 'school', { 'schools': this.schools })
      this.$toasted.success('學校資料已成功加入暫存！')
    },
    addSchool: function () {
      this.schools.push({
        'id': this.schools.length,
        'name': this.add.name
      })
      this.add = { name: null }
      this.$toasted.success('學校資料成功加入表格！')
    },
    nameInvalid: function () {
      for (let id in this.schools) {
        if (this.schools[id].name === this.add.name) {
          return true
        }
      }
      return false
    }
  }
}
</script>
