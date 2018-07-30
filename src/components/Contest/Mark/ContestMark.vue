<template>
  <div v-if="judge !== null">
    評審：{{ judge.name }}
    <div v-if="contest === null">
      <select v-model="selectedContest" class="form-control">
        <option v-for="(contest, index) in judge.contests" :key="index">
          {{ index }}
        </option>
      </select>
      <button @click="fetchContest(selectedContest)" class="btn btn-md">選擇</button>
      <button @click="$router.go(-1)" class="btn btn-md btn-danger">回上頁</button>
    </div>
    <div v-if="contest !== null">
      <table class="table stripped">
        <thead>
          <td>隊伍名稱</td>
          <td v-for="term in contest.term.terms" v-if="judge.contests[contest.info.contestName].includes(term.name)" :key="term.id">
            {{ term.name }}
          </td>
        </thead>
        <tbody>
          <tr v-for="team in contest.team.teams" :key="team.id">
            <td>{{ team.name }}</td>
            <td v-for="term in contest.term.terms" v-if="judge.contests[contest.info.contestName].includes(term.name)" :key="term.id">
              <input v-model="mark[term.name][team.name]" @change="cacheSave()" :class="getControlClass(mark[term.name][team.name] === '')"/>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="submitMark" class="btn btn-md">評分送出</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'contest-mark',
  data () {
    return {
      judge: null,
      selectedContest: null,
      contest: null,
      mark: null
    }
  },
  mounted () {
    if (this.$route.params.judgeEmail !== '') {
      this.$ajax({
        method: 'POST',
        url: 'http://' + this.$backend + '/api/judge/info',
        params: {
          'selected': this.$route.params.judgeEmail
        }
      }).then(response => {
        if (response.data.status === 'success') {
          this.$toasted.success('成功獲取評審資料！')
          this.judge = response.data.data
          if (this.judge.cache !== undefined) {
            this.cacheLoad(this.judge.cache)
          }
        } else if (response.data.status === 'failed') {
          this.$toasted.error('獲取評審資料失敗！')
        }
      }).catch(response => {
        this.$toasted.error('獲取評審資料失敗！')
        console.log(response.data)
      })
    }
  },
  methods: {
    getControlClass: function (isInvalid) {
      return {
        'form-control': true,
        'valid': !isInvalid,
        'is-invalid': isInvalid,
        'text-success': !isInvalid,
        'text-danger': isInvalid
      }
    },
    fetchContest: function (selected) {
      this.$ajax({
        method: 'POST',
        url: 'http://' + this.$backend + '/api/contest/info',
        params: {
          'selected': selected
        }
      }).then(response => {
        if (response.data.status === 'success') {
          this.contest = response.data.data
          this.mark = {}
          if (this.contest.mark !== undefined && this.contest.mark[this.judge.email] !== undefined) {
            let editMark = this.contest.mark[this.judge.email]
            for (let term in editMark) {
              this.$set(this.mark, term, {})
              for (let team in editMark[term]) {
                this.$set(this.mark[term], team, editMark[term][team])
              }
            }
            this.$toasted.info('成功讀取已送出成績！評審可再次編輯送出！')
          } else {
            this.contest.term.terms.forEach((element, index) => {
              if (this.judge.contests[this.contest.info.contestName].includes(element.name)) {
                this.$set(this.mark, element.name, {}) // this.mark[element.name] = {}
                this.contest.team.teams.forEach((elementIn, indexIn) => {
                  this.$set(this.mark[element.name], elementIn.name, '') // this.mark[element.name][elementIn.name] = ''
                })
              }
            })
            this.$toasted.success('獲取比賽資料成功！')
          }
        } else if (response.data.status === 'failed') {
          this.$toasted.error('獲取比賽資料失敗！')
        }
      }).catch(response => {
        this.$toasted.error('獲取比賽資料失敗！')
      })
    },
    cacheLoad: function (cache) {
      this.selectedContest = cache['selectedContest']
      this.contest = cache['contest']
      this.mark = cache['mark']
    },
    cacheSave: function () {
      if (this.selectedContest != null) {
        this.$ajax({
          method: 'POST',
          url: 'http://' + this.$backend + '/api/judge/cache',
          params: {
            'judgeEmail': this.judge.email,
            'selectedContest': this.selectedContest,
            'contest': this.contest,
            'mark': this.mark
          }
        }).then(response => {
          if (response.data.status === 'success') {
            this.$toasted.success('暫存成功！')
          } else if (response.data.status === 'failed') {
            this.$toasted.info('暫存失敗！')
          }
        }).catch(response => {
          this.$toasted.info('暫存失敗！')
        })
      }
    },
    submitMark: function () {
      for (let term in this.mark) {
        for (let team in this.mark[term]) {
          if (this.mark[term][team] === '') {
            this.$toasted.error('尚有欄位未填入！')
            return null
          }
        }
      }
      this.$ajax({
        method: 'POST',
        url: 'http://' + this.$backend + '/api/contest/mark',
        params: {
          'judgeEmail': this.judge.email,
          'contest': this.contest,
          'mark': this.mark
        }
      }).then(response => {
        if (response.data.status === 'success') {
          this.$toasted.success('評分送出成功！')
          this.$router.push({ path: '/dashboard' })
        } else if (response.data.status === 'failed') {
          console.log(response.data.detail)
          this.$toasted.error('評分送出失敗！')
        }
      }).catch(response => {
        console.log(response)
        this.$toasted.error('評分送出失敗！')
      })
    }
  }
}
</script>
