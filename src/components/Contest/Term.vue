<template>
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <h1>{{ title }}</h1>
    </div>
    <div v-if="term !== null" class="col-md-8 offset-md-2">
      <table class="table table-stripped">
        <thead>
          <tr class="table-primary">
            <td v-if="editable || increasable">動作</td>
            <td>#</td>
            <td>名稱</td>
            <td>權重</td>
            <td>相依</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(term, index) in term.terms" :key="term.id" v-if="edit.index != index">
            <td v-if="editable || increasable">
              <div v-if="editable">
                <button @click="selectEdit(index)" class="btn btn-sm"><font-awesome-icon :icon="['fas', 'pen']"/> 編輯</button>
                /
                <button @click="removeTerm(index)" class="btn btn-sm"><font-awesome-icon :icon="['fas', 'minus-circle']"/> 刪除</button>
              </div>
            </td>
            <td>{{ term.id }}</td>
            <td>{{ term.name }}</td>
            <td>{{ term.weight }}</td>
            <td>{{ term.depend === null ? 'N/A' : term.depend }}</td>
          </tr>
          <tr v-else>
            <td v-if="editable || increasable">
              <div v-if="editable">
                <button @click="editTerm(index)" :disabled="nameDuplicate" class="btn btn-sm"><font-awesome-icon :icon="['fas', 'check-circle']"/> 確認</button>
                /
                <button @click="cancelEdit()" class="btn btn-sm"><font-awesome-icon :icon="['fas', 'times-circle']"/> 取消</button>
              </div>
            </td>
            <td>{{ edit.id }}</td>
            <td>
              <input v-model="edit.name" :class="getContorlClass(nameDuplicate = nameInvalid(edit.id, edit.name))" type="text" placeholder="名稱"/>
              <div v-if="nameDuplicate" style="color: RED;">名稱重複！</div>
            </td>
            <td><input v-model="edit.weight" :class="getContorlClass(false)" type="text" placeholder="權重"/></td>
            <td>
              <select v-model="edit.depend" class="form-control">
                <option value="null">None</option>
                <option v-for="term in term.terms" :key="term.id" :value="term.name">
                  {{ term.name }}
                </option>
              </select>
            </td>
          </tr>
          <tr v-if="edit.index === null && increasable">
            <td><button @click="addTerm()" :disabled="add.name == null || nameDuplicate" class="btn btn-sm"><font-awesome-icon :icon="['fas', 'plus-circle']"/> 新增</button></td>
            <td>{{ term.terms.length }}</td>
            <td>
              <input v-model="add.name" :class="getContorlClass(nameDuplicate = nameInvalid(add.id, add.name))" type="text" placeholder="名稱"/>
              <div v-if="nameDuplicate" style="color: RED;">姓名重複！</div>
            </td>
            <td><input v-model="add.weight" :class="getContorlClass(false)" type="text" placeholder="信箱"/></td>
            <td>
              <select v-model="add.depend" class="form-control">
                <option value="null">None</option>
                <option v-for="term in term.terms" :key="term.id" :value="term.name">
                  {{ term.name }}
                </option>
              </select>
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
import { faPen, faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'

library.add(
  faPen,
  faPlusCircle,
  faMinusCircle
)

export default {
  name: 'contest-term',
  props: [ 'title', 'term', 'editable', 'increasable' ],
  components: { FontAwesomeIcon },
  data () {
    return {
      add: {
        id: null,
        name: null,
        weight: 1.0,
        depend: null
      },
      edit: {
        index: null,
        id: null,
        name: null,
        weight: null,
        depend: null
      }
    }
  },
  watch: {
    term: {
      deep: true,
      immediate: true,
      handler () {
        this.checkComplete()
      }
    }
  },
  methods: {
    checkComplete: function () {
      if (this.term.terms === undefined || this.term.terms.length === 0) {
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
    addTerm: function () {
      this.term.terms.push({
        'id': this.term.terms.length,
        'name': this.add.name,
        'weight': this.add.weight,
        'depend': this.add.depend
      })
      this.add = { id: null, name: null, weight: 1.0, depend: null }
      this.$toasted.success('評審資料成功加入表格！')
    },
    selectEdit: function (index) {
      this.edit.index = index
      this.edit.id = this.term.terms[index].id
      this.edit.name = this.term.terms[index].name
      this.edit.weight = this.term.terms[index].weight
      this.edit.depend = this.term.terms[index].depend
    },
    cancelEdit: function () {
      this.edit = {
        index: null,
        id: null,
        name: null,
        weight: null,
        depend: null
      }
    },
    editTerm: function (index) {
      this.term.terms[index] = {
        'id': this.edit.id,
        'name': this.edit.name,
        'weight': this.edit.weight,
        'depend': this.edit.depend
      }
      this.edit = {
        index: null,
        id: null,
        name: null,
        weight: null,
        depend: null
      }
      this.$toasted.success('評審資料編輯成功！')
    },
    removeTerm: function (index) {
      this.term.terms.splice(index, 1)
      this.updateId()
      this.$toasted.success('評審資料移除成功！')
    },
    updateId: function () {
      for (let i = 0; i < this.term.terms.length; ++i) {
        this.term.terms[i].id = i
      }
    },
    nameInvalid: function (id, name) {
      for (let i = 0; i < this.term.terms.length; ++i) {
        if (this.term.terms[i].name === name && i !== id) {
          return true
        }
      }
      return false
    }
  }
}
</script>
