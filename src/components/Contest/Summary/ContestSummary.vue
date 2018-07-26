<template>
  <div>
    <div>
      <query @selectedContest="fetchSelect"/>
    </div>
    <div v-if="contest !== null">
      <div class="row">
        <div class="col-sm">
          <button v-if="slideIndex > 0" @click="prevSlide" class="btn">上一頁</button>
        </div>
        <div class="col-sm">
          <button v-if="slideIndex != keys.length - 1" @click="nextSlide" class="btn btn-primary">下一頁</button>
        </div>
      </div>
      <div>
        <swiper ref="swiper" :options="swiperOptions">
          <swiper-slide><info ref="info" :title="'比賽資訊'" :info="contest.info" :editable="false"/></swiper-slide>
          <swiper-slide><judge ref="judge" :title="'評審資訊'" :judge="contest.judge" :editable="false" :increasable="false"/></swiper-slide>
          <swiper-slide><term ref="term" :title="'評分項目資訊'" :term="contest.term" :editable="false" :increasable="false"/></swiper-slide>
          <swiper-slide><team ref="team" :title="'參賽隊伍資訊'" :team="contest.team" :editable="false" :increasable="false"/></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Query from '@/components/Contest/Summary/Query'
import Info from '@/components/Contest/Info'
import Judge from '@/components/Contest/Judge'
import Term from '@/components/Contest/Term'
import Team from '@/components/Contest/Team'

export default {
  name: 'contest-summary',
  components: { swiper, swiperSlide, Query, Info, Judge, Term, Team },
  mounted () {
    if (this.$route.params.contestName !== undefined) {
      this.contestName = this.$route.params.contestName
      this.fetchData()
    }
  },
  data () {
    return {
      keys: [ 'info', 'judge', 'term', 'team' ],
      slideIndex: 0,
      contestName: null,
      contest: null,
      swiperOptions: {
        allowTouchMove: false,
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar'
        }
      }
    }
  },
  methods: {
    fetchSelect: function (selectedContest) {
      this.contestName = selectedContest
      this.fetchData()
    },
    fetchData: function () {
      this.$ajax({
        method: 'POST',
        url: 'http://' + this.$backend + '/api/contest/info',
        params: {
          'selected': this.contestName
        }
      }).then(response => {
        if (response.data.status === 'success') {
          this.$toasted.success('成功獲取比賽資料！')
          this.contest = response.data.data
        } else if (response.data.status === 'failed') {
          this.$toasted.error('獲取比賽資料失敗！')
        }
      }).catch(response => {

      })
    },
    prevSlide: function () {
      if (this.$refs.swiper.swiper.slidePrev()) {
        --this.slideIndex
      }
    },
    nextSlide: function () {
      if (this.$refs.swiper.swiper.slideNext()) {
        ++this.slideIndex
        // console.log(this.$localStorage.fetch())
      }
    }
  }
}
</script>
