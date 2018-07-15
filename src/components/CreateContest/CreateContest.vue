<template>
  <div>
    <div class="col-md-8 offset-md-2">
      <div class="row">
        <div class="col-sm"><button v-if="slideIndex > 0" @click="prevSlide" class="btn">上一頁</button></div>
        <div class="col-sm">
          <button v-if="slideIndex != keys.length" @click="nextSlide" class="btn btn-primary">下一頁</button>
          <button v-else @click="submitToBackend" class="btn btn-success">送出</button>
        </div>
      </div>
    </div>
    <div>
      <br>
      <swiper ref="swiper" :options="swiperOption">
        <swiper-slide><info :title="'比賽資訊'" :info="componentData.info" :editable="true"/></swiper-slide>
        <swiper-slide><judge :title="'評審匯入'" :judge="componentData.judge" :editable="true" :increasable="true"/></swiper-slide>
        <swiper-slide><term :title="'評分項目匯入'" :term="componentData.term" :editable="true" :increasable="true"/></swiper-slide>
        <swiper-slide><team :title="'參賽隊伍匯入'" :team="componentData.team" :editable="true" :increasable="true"/></swiper-slide>
        <swiper-slide><final-check :form="componentData" @prev-slide="prevSlide"/></swiper-slide>
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
  name: 'create-contest',
  components: { swiper, swiperSlide, Info, Judge, Term, Team, FinalCheck },
  data () {
    return {
      keys: [ 'info', 'judge', 'term', 'team' ],
      slideName: [ '比賽', '評審', '項目', '隊伍' ],
      slideIndex: 0,
      componentData: {
        info: {
          contestName: ''
        },
        judge: {
          judges: []
        },
        term: {
          terms: []
        },
        team: {
          teams: []
        }
      },
      swiperOption: {
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
        judge: cache['judge'],
        term: cache['term'],
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
      cache['judge'] = this.componentData.judge
      cache['term'] = this.componentData.term
      cache['team'] = this.componentData.team
      this.$localStorage.save({ 'create-contest-cache': cache })
      this.$toasted.info('建立新比賽！')
    }
  },
  methods: {
    prevSlide: function () {
      if (this.$refs.swiper.swiper.slidePrev()) {
        let cache = this.$localStorage.fetch('create-contest-cache')
        cache['slideIndex'] = --this.slideIndex
        this.$localStorage.save({ 'create-contest-cache': cache })
        // console.log(this.$localStorage.fetch())
      }
    },
    nextSlide: function () {
      if (this.$refs.swiper.swiper.slideNext()) {
        let movingKey = this.keys[this.slideIndex]
        let cache = this.$localStorage.fetch('create-contest-cache')
        cache[movingKey] = this.componentData[movingKey]
        cache['slideIndex'] = ++this.slideIndex
        this.$localStorage.save({ 'create-contest-cache': cache })
        // console.log(this.$localStorage.fetch())
        this.$toasted.success(this.slideName[this.slideIndex - 1] + '資料已成功加入暫存！')
      }
    },
    submitToBackend: function () {
      this.$ajax({
        'method': 'POST',
        'url': 'http://192.168.0.7:8000/api/create-contest',
        'params': this.componentData
      }).then(response => {
        this.$toasted.success('送出成功！')
        this.$localStorage.clear('create-contest-cache')
        console.log(response.data)
      }).catch(response => {
        this.$toasted.error('發生錯誤：' + response)
      })
    }
  }
}
</script>
