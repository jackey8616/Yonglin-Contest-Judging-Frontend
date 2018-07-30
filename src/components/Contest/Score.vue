<template>
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <h1>{{ title }}</h1>
    </div>
    <div v-if="contest !== null" class="col-md-8 offset-md-2">
      <div v-if="contest.summation !== undefined">
      </div>
      <div v-if="contest.final !== undefined">
        <table class="table table-striped">
          <thead>
            <th>隊伍</th>
            <th v-for="term in getFinalTerm(contest.final)" :key="term">{{ term.includes('_weight') ? term.replace('_weight', '(加權後)') : term  }}</th>
          </thead>
          <tbody>
            <tr v-for="(score, team) in contest.final" :key="team">
              <td>{{ team }}</td>
              <td v-for="term in getFinalTerm(contest.final)" :key="term">
                {{ score[term] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-for="(score, mail) in contest.mark" :key="mail">
        {{ getJudgeByMail(mail).name }}
        <table class="table table-striped">
          <thead>
            <th>隊伍</th>
            <th v-for="(each) in getJudgeByMail(mail).term" :key="each">{{ each }}({{ getTermByName(each).depend }})</th>
          </thead>
          <tbody>
            <tr v-for="(score, team) in transformObject(mail, contest.mark[mail])" :key="team">
              <td>{{ team }}</td>
              <td v-for="mark in score" :key="mark">
                {{ mark }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'score',
  props: [ 'title', 'contest', 'editable', 'increasable' ],
  methods: {
    getTermByName: function (termName) {
      let term = null
      this.contest.term.terms.forEach((element, index) => {
        if (this.contest.term.terms[index].name === termName) {
          term = this.contest.term.terms[index]
        }
      })
      return term
    },
    getJudgeByMail: function (email) {
      let judge = null
      this.contest.judge.judges.forEach((element, index) => {
        if (this.contest.judge.judges[index].email === email) {
          judge = this.contest.judge.judges[index]
        }
      })
      return judge
    },
    transformObject: function (mail, object) {
      let judge = this.getJudgeByMail(mail)
      let team = this.contest.team.teams
      let transform = {}
      for (let index in team) {
        transform[team[index].name] = {}
        for (let indexIn in judge.term) {
          transform[team[index].name][judge.term[indexIn]] = object[judge.term[indexIn]][team[index].name]
        }
      }
      return transform
    },
    getFinalTerm: function (final) {
      let terms = []
      let termsWeight = []
      let termsSummation = null
      console.log(final)
      for (let team in final) {
        for (let term in final[team]) {
          if (term === 'summation') {
            termsSummation = term
          } else if (term.includes('_weight')) {
            termsWeight.push(term)
          } else {
            terms.push(term)
          }
        }
        break
      }
      return terms.concat(termsWeight).concat(termsSummation)
    }
  }
}
</script>
