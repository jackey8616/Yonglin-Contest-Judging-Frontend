<template>
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <h1>{{ title }}</h1>
    </div>
    <div v-if="team !== null" class="col-md-8 offset-md-2">
      <table class="table table-stripped">
        <thead>
          <tr class="table-primary">
            <td v-if="editable || increasable">動作</td>
            <td>#</td>
            <td>隊伍名稱</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(team, index) in team.teams" :key="team.id" v-if="edit.index != index">
            <td v-if="editable || increasable">
              <div v-if="editable">
                <button @click="selectEdit(index)" class="btn btn-sm"><font-awesome-icon :icon="['fas', 'pen']"/> 編輯</button>
                /
                <button @click="removeteam(index)" class="btn btn-sm"><font-awesome-icon :icon="['fas', 'minus-circle']"/> 刪除</button>
              </div>
            </td>
            <td>{{ team.id }}</td>
            <td>{{ team.name }}</td>
          </tr>
          <tr v-else>
            <td v-if="editable || increasable">
              <div v-if="editable">
                <button @click="editteam(index)" :disabled="nameDuplicate" class="btn btn-sm"><font-awesome-icon :icon="['fas', 'check-circle']"/> 確認</button>
                /
                <button @click="cancelEdit()" class="btn btn-sm"><font-awesome-icon :icon="['fas', 'times-circle']"/> 取消</button>
              </div>
            </td>
            <td>{{ edit.id }}</td>
            <td>
              <input v-model="edit.name" :class="getContorlClass(nameDuplicate = nameInvalid(edit.id, edit.name))" type="text" placeholder="名稱"/>
              <div v-if="nameDuplicate" style="color: RED;">名稱重複！</div>
            </td>
          </tr>
          <tr v-if="edit.index === null && increasable">
            <td><button @click="addteam()" :disabled="add.name == null || nameDuplicate" class="btn btn-sm"><font-awesome-icon :icon="['fas', 'plus-circle']"/> 新增</button></td>
            <td>{{ team.teams.length }}</td>
            <td>
              <input v-model="add.name" :class="getContorlClass(nameDuplicate = nameInvalid(add.id, add.name))" type="text" placeholder="名稱"/>
              <div v-if="nameDuplicate" style="color: RED;">名稱重複！</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPen, faPlusCircle, faMinusCircle, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

library.add(
  faPen,
  faPlusCircle,
  faMinusCircle,
  faCheckCircle,
  faTimesCircle
)

export default {
  name: 'contest-team',
  props: [ 'title', 'team', 'editable', 'increasable' ],
  components: { FontAwesomeIcon },
  data () {
    return {
      nameDuplicate: false,
      add: {
        id: null,
        name: null
      },
      edit: {
        index: null,
        id: null,
        name: null
      }
    }
  },
  methods: {
    getContorlClass: function (isInvalid) {
      return {
        'form-control': true,
        'valid': !isInvalid,
        'is-invalid': isInvalid,
        'text-success': !isInvalid,
        'text-danger': isInvalid
      }
    },
    addteam: function () {
      this.team.teams.push({
        'id': this.team.teams.length,
        'name': this.add.name
      })
      this.add = { name: null }
      this.$toasted.success('學校資料成功加入表格！')
    },
    selectEdit: function (index) {
      this.edit.index = index
      this.edit.id = this.team.teams[index].id
      this.edit.name = this.team.teams[index].name
    },
    cancelEdit: function () {
      this.edit = {
        index: null,
        id: null,
        name: null
      }
    },
    editteam: function (index) {
      this.team.teams[index] = {
        'id': this.edit.id,
        'name': this.edit.name
      }
      this.edit = {
        index: null,
        id: null,
        name: null
      }
      this.$toasted.success('學校資料編輯成功！')
    },
    removeteam: function (index) {
      this.team.teams.splice(index, 1)
      this.updateId()
      this.$toasted.success('學校資料移除成功！')
    },
    updateId: function () {
      for (let i = 0; i < this.team.teams.length; ++i) {
        this.team.teams[i].id = i
      }
    },
    nameInvalid: function (id, name) {
      for (let i = 0; i < this.team.teams.length; ++i) {
        if (this.team.teams[i].name === name && i !== id) {
          return true
        }
      }
      return false
    }
  }
}
</script>
