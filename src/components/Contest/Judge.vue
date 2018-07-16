<template>
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <h1>{{ title }}</h1>
    </div>
    <div v-if="judge !== null" class="col-md-8 offset-md-2">
      <table class="table table-stripped">
        <thead>
          <tr class="table-primary">
            <td v-if="editable || increasable">動作</td>
            <td>#</td>
            <td>姓名</td>
            <td>信箱</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(judge, index) in judge.judges" :key="judge.id" v-if="edit.index != index">
            <td v-if="editable || increasable">
              <div v-if="editable">
                <button @click="selectEdit(index)" class="btn btn-sm"><font-awesome-icon :icon="['fas', 'pen']"/> 編輯</button>
                /
                <button @click="removeJudge(index)" class="btn btn-sm"><font-awesome-icon :icon="['fas', 'minus-circle']"/> 刪除</button>
              </div>
            </td>
            <td>{{ judge.id }}</td>
            <td>{{ judge.name }}</td>
            <td>{{ judge.email }}</td>
          </tr>
          <tr v-else>
            <td v-if="editable || increasable">
              <div v-if="editable">
                <button @click="editJudge(index)" :disabled="nameDuplicate || emailDuplicate" class="btn btn-sm"><font-awesome-icon :icon="['fas', 'check-circle']"/> 確認</button>
                /
                <button @click="cancelEdit()" class="btn btn-sm"><font-awesome-icon :icon="['fas', 'times-circle']"/> 取消</button>
              </div>
            </td>
            <td>{{ edit.id }}</td>
            <td>
              <input v-model="edit.name" :class="getContorlClass(nameDuplicate = nameInvalid(edit.id, edit.name))" type="text" placeholder="姓名"/>
              <div v-if="nameDuplicate" style="color: RED;">姓名重複！</div>
            </td>
            <td>
              <input v-model="edit.email" :class="getContorlClass(emailDuplicate = emailInvalid(edit.id, edit.email))" type="email" placeholder="信箱"/>
              <div v-if="emailDuplicate" style="color: RED;">信箱重複或非法的信箱格式！</div>
            </td>
          </tr>
          <tr v-if="edit.index === null && increasable">
            <td v-if="editable || increasable">
              <button @click="addJudge()" :disabled="add.name == null || add.email == null || nameDuplicate || emailDuplicate" class="btn btn-sm"><font-awesome-icon :icon="['fas', 'plus-circle']"/> 新增</button>
            </td>
            <td>{{ judge.judges.length }}</td>
            <td>
              <input v-model="add.name" :class="getContorlClass(nameDuplicate = nameInvalid(add.id, add.name))" type="text" placeholder="姓名"/>
              <div v-if="nameDuplicate" style="color: RED;">姓名重複！</div>
            </td>
            <td>
              <input v-model="add.email" :class="getContorlClass(emailDuplicate = emailInvalid(add.id, add.email))" type="email" placeholder="信箱"/>
              <div v-if="emailDuplicate" style="color: RED;">信箱重複或非法的信箱格式！</div>
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
  name: 'contest-judge',
  props: [ 'title', 'judge', 'editable', 'increasable' ],
  components: { FontAwesomeIcon },
  data () {
    return {
      nameDuplicate: false,
      emailDuplicate: false,
      add: {
        id: null,
        name: null,
        email: null
      },
      edit: {
        index: null,
        id: null,
        name: null,
        email: null
      }
    }
  },
  watch: {
    judge: {
      deep: true,
      immediate: true,
      handler () {
        this.checkComplete()
      }
    }
  },
  methods: {
    checkComplete: function () {
      if (this.judge.judges === undefined || this.judge.judges.length === 0) {
      } else {
        this.$emit('completed', true)
        return true
      }
      this.$emit('completed', false)
      return false
    },
    getContorlClass: function (isInvalid) {
      return {
        'form-control': true,
        'valid': !isInvalid,
        'is-invalid': isInvalid,
        'text-success': !isInvalid,
        'text-danger': isInvalid
      }
    },
    addJudge: function () {
      this.judge.judges.push({
        'id': this.judge.judges.length,
        'name': this.add.name,
        'email': this.add.email
      })
      this.add = { id: null, name: null, email: null }
      this.$toasted.success('評審資料成功加入表格！')
    },
    selectEdit: function (index) {
      this.edit.index = index
      this.edit.id = this.judge.judges[index].id
      this.edit.name = this.judge.judges[index].name
      this.edit.email = this.judge.judges[index].email
    },
    cancelEdit: function () {
      this.edit = {
        index: null,
        id: null,
        name: null,
        email: null
      }
    },
    editJudge: function (index) {
      this.judge.judges[index] = {
        'id': this.edit.id,
        'name': this.edit.name,
        'email': this.edit.email
      }
      this.edit = {
        index: null,
        id: null,
        name: null,
        email: null
      }
      this.$toasted.success('評審資料編輯成功！')
    },
    removeJudge: function (index) {
      this.judge.judges.splice(index, 1)
      this.updateId()
      this.$toasted.success('評審資料移除成功！')
    },
    updateId: function () {
      for (let i = 0; i < this.judge.judges.length; ++i) {
        this.judge.judges[i].id = i
      }
    },
    nameInvalid: function (id, name) {
      for (let i = 0; i < this.judge.judges.length; ++i) {
        if (this.judge.judges[i].name === name && i !== id) {
          return true
        }
      }
      return false
    },
    emailInvalid: function (id, email) {
      for (let i = 0; i < this.judge.judges.length; ++i) {
        if (this.judge.judges[i].email === email && i !== id) {
          return true
        }
      }
      return this.add.email != null && !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    }
  }
}
</script>
