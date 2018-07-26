<template>
  <div style="height: 100%;">
    <div>
      <div class="row">
        <div class="col-sm">
          <button v-if="slideIndex > 0" @click="prevSlide" class="btn">上一頁</button>
          <button class="btn btn-danger" @click="cancelCreate">取消</button>
        </div>
        <div class="col-sm">
          <button v-if="slideIndex != keys.length" @click="nextSlide" :disabled="!slideEnable[keys[slideIndex]]" class="btn btn-primary">下一頁</button>
          <button v-else @click="submitToBackend" class="btn btn-success">送出</button>
        </div>
      </div>
    </div>
    <div style="height: 100%;">
      <br>
      <swiper ref="swiper" :options="swiperOptions" style="height: 100%;">
        <swiper-slide><info ref="info" :title="'比賽資訊'" :info="componentData.info" :editable="true" @completed="checkComplete"/></swiper-slide>
        <swiper-slide><term ref="term" :title="'評分項目匯入'" :term="componentData.term" :editable="true" :increasable="true" @completed="checkComplete"/></swiper-slide>
        <swiper-slide><judge ref="judge" :title="'評審匯入'" :judge="componentData.judge" :terms="componentData.term.terms" :editable="true" :increasable="true" @completed="checkComplete"/></swiper-slide>
        <swiper-slide><team ref="team" :title="'參賽隊伍匯入'" :team="componentData.team" :editable="true" :increasable="true" @completed="checkComplete"/></swiper-slide>
        <swiper-slide><final-check ref="final-check" :form="componentData" @prev-slide="prevSlide"/></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Info from '@/components/Contest/Info'
import Judge from '@/components/Contest/Judge'
import Term from '@/components/Contest/Term'
import Team from '@/components/Contest/Team'
import FinalCheck from './FinalCheck'

export default {
  name: 'contest-create',
  components: { swiper, swiperSlide, Info, Judge, Term, Team, FinalCheck },
  data () {
    return {
      keys: [ 'info', 'term', 'judge', 'team' ],
      slideName: [ '比賽', '項目', '評審', '隊伍' ],
      slideIndex: 0,
      slideEnable: {
        info: false,
        term: false,
        judge: false,
        team: false
      },
      componentData: {
        info: {
          contestName: '',
          startDate: null,
          endDate: null
        },
        term: {
          terms: []
        },
        judge: {
          judges: []
        },
        team: {
          teams: []
        }
      },
      swiperOptions: {
        allowTouchMove: false,
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar'
        }
      }
    }
  },
  mounted () {
    let cache = this.$localStorage.fetch('create-contest-cache')
    // console.log(cache)
    if (cache !== undefined) {
      this.slideIndex = cache['slideIndex']
      this.componentData = {
        info: cache['info'],
        term: cache['term'],
        judge: cache['judge'],
        team: cache['team']
      }
      for (let i = 0; i < this.slideIndex; ++i) {
        this.$refs.swiper.swiper.slideNext()
      }
      this.$toasted.info('已恢復到上次暫存編輯資料！')
    } else {
      cache = {}
      cache['slideIndex'] = this.slideIndex
      cache['info'] = this.componentData.info
      cache['term'] = this.componentData.term
      cache['judge'] = this.componentData.judge
      cache['team'] = this.componentData.team
      this.$localStorage.save({ 'create-contest-cache': cache })
      this.$toasted.info('建立新比賽！')
    }
  },
  methods: {
    checkComplete: function (flag) {
      let key = this.keys[this.slideIndex]
      this.slideEnable[key] = flag
    },
    cancelCreate: function () {
      this.$localStorage.clear('create-contest-cache')
      this.$toasted.info('比賽已取消建立, 暫存清空!')
      this.$router.go(-1)
    },
    prevSlide: function () {
      if (this.$refs.swiper.swiper.slidePrev()) {
        let cache = this.$localStorage.fetch('create-contest-cache') || {}
        cache['slideIndex'] = --this.slideIndex
        this.$localStorage.save({ 'create-contest-cache': cache })
        // console.log(this.$localStorage.fetch())
      }
      let key = this.keys[this.slideIndex]
      this.$refs[key].checkComplete()
    },
    nextSlide: function () {
      if (this.$refs.swiper.swiper.slideNext()) {
        let movingKey = this.keys[this.slideIndex]
        let cache = this.$localStorage.fetch('create-contest-cache') || {}
        cache[movingKey] = this.componentData[movingKey]
        cache['slideIndex'] = ++this.slideIndex
        this.$localStorage.save({ 'create-contest-cache': cache })
        // console.log(this.$localStorage.fetch())
        this.$toasted.success(this.slideName[this.slideIndex - 1] + '資料已成功加入暫存！')
      }
      if (this.slideIndex !== this.keys.length) {
        let key = this.keys[this.slideIndex]
        this.$refs[key].checkComplete()
      }
    },
    submitToBackend: function () {
      this.$ajax({
        'method': 'POST',
        'url': 'http://' + this.$backend + '/api/contest/create',
        'params': this.componentData
      }).then(response => {
        if (response.data.status === 'success') {
          this.$toasted.success('送出成功！')
          this.$localStorage.clear('create-contest-cache')
          this.$router.push({ path: '/contest-summary/' + this.componentData.info.contestName })
        } else if (response.data.status === 'failed') {
          this.$toasted.error('送出失敗！')
          console.log(response.data.detail)
        }
      }).catch(response => {
        this.$toasted.error('發生錯誤：' + response.data)
      })
    }
  }
}
</script>
