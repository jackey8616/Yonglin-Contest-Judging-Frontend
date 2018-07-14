<template>
  <div>
    <div class="row">
      <table class="table table-stripped">
        <thead>
          <td>動作</td>
          <td>序號</td>
          <td>姓名</td>
          <td>信箱</td>
        </thead>
        <tbody>
          <tr v-for="(judge, index) in judges" :key="judge.id" v-if="edit.index != index">
            <td>
              <button @click="selectEdit(index)" class="btn btn-sm"><font-awesome-icon :icon="['fas', 'pen']"/> 編輯</button>
              /
              <button @click="removeJudge(index)" class="btn btn-sm"><font-awesome-icon :icon="['fas', 'minus-circle']"/> 刪除</button>
            </td>
            <td>{{ judge.id }}</td>
            <td>{{ judge.name }}</td>
            <td>{{ judge.email }}</td>
          </tr>
          <tr v-else>
            <td>
              <button @click="editJudge(index)" :disabled="nameInvalid(edit.id, edit.name) || emailInvalid(edit.id, edit.email)" class="btn btn-sm"><font-awesome-icon :icon="['fas', 'check-circle']"/> 確認</button>
              /
              <button @click="cancelEdit()" class="btn btn-sm"><font-awesome-icon :icon="['fas', 'times-circle']"/> 取消</button>
            </td>
            <td>{{ edit.id }}</td>
            <td>
              <div v-if="nameInvalid(edit.id, edit.name)">
                <input v-model="edit.name" class="form-control is-invalid text-danger" type="text" placeholder="姓名"/>
                <div style="color: RED;">姓名重複！</div>
              </div>
              <div v-else>
                <input v-model="edit.name" class="form-control valid text-success" type="text" placeholder="姓名"/>
              </div>
            </td>
            <td>
              <div v-if="emailInvalid(edit.id, edit.email)">
                <input v-model="edit.email" class="form-control is-invalid text-danger" type="email" placeholder="信箱"/>
                <div style="color: RED;">信箱重複或非法的信箱格式！</div>
              </div>
              <div v-else>
                <input v-model="edit.email" class="form-control valid text-success" type="text" placeholder="信箱"/>
              </div>
            </td>
          </tr>
          <tr v-if="edit.index === null">
            <td><button @click="addJudge()" :disabled="add.name == null || add.email == null || nameInvalid(add.id, add.name) || emailInvalid(add.id, add.email)" class="btn btn-sm"><font-awesome-icon :icon="['fas', 'plus-circle']"/> 新增</button></td>
            <td>{{ judges.length }}</td>
            <td>
              <div v-if="nameInvalid(add.id, add.name)">
                <input v-model="add.name" class="form-control is-invalid text-danger" type="text" placeholder="姓名"/>
                <div style="color: RED;">姓名重複！</div>
              </div>
              <div v-else>
                <input v-model="add.name" class="form-control valid text-success" type="text" placeholder="姓名"/>
              </div>
            </td>
            <td>
              <div v-if="emailInvalid(add.id, add.email)">
                <input v-model="add.email" class="form-control is-invalid text-danger" type="email" placeholder="信箱"/>
                <div style="color: RED;">信箱重複或非法的信箱格式！</div>
              </div>
              <div v-else>
                <input v-model="add.email" class="form-control valid text-success" type="text" placeholder="信箱"/>
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
import { faPen, faPlusCircle, faMinusCircle, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

library.add(
  faPen,
  faPlusCircle,
  faMinusCircle,
  faCheckCircle,
  faTimesCircle
)

export default {
  name: 'judge-import',
  components: { FontAwesomeIcon },
  data () {
    return {
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
      },
      judges: []
    }
  },
  mounted () {
    let cache = this.$localStorage.fetch('create-contest-cache')['judge']
    console.log(cache)
    if (cache !== undefined) {
      this.judges = cache['judges']
    }
  },
  methods: {
    submitData: function () {
      this.$emit('judge-submit', 'judge', { 'judges': this.judges })
      this.$toasted.success('評審資料已成功加入暫存！')
    },
    addJudge: function () {
      this.judges.push({
        'id': this.judges.length,
        'name': this.add.name,
        'email': this.add.email
      })
      this.add = { id: null, name: null, email: null }
      this.$toasted.success('評審資料成功加入表格！')
    },
    selectEdit: function (index) {
      this.edit.index = index
      this.edit.id = this.judges[index].id
      this.edit.name = this.judges[index].name
      this.edit.email = this.judges[index].email
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
      this.judges[index] = {
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
    },
    removeJudge: function (index) {
      this.judges.splice(index, 1)
      this.updateId()
    },
    updateId: function () {
      for (let i = 0; i < this.judges.length; ++i) {
        this.judges[i].id = i
      }
    },
    nameInvalid: function (id, name) {
      for (let i = 0; i < this.judges.length; ++i) {
        if (this.judges[i].name === name && i !== id) {
          return true
        }
      }
      return false
    },
    emailInvalid: function (id, email) {
      for (let i = 0; i < this.judges.length; ++i) {
        if (this.judges[i].email === email && i !== id) {
          return true
        }
      }
      return this.add.email != null && !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.add.email)
    }
  }
}
</script>
