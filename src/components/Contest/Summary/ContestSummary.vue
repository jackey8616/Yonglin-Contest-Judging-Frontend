<template>
  <div>
    <div>
      <query @selectedContest="fetchSelect"/>
    </div>
    <div v-if="contest !== null">
      <swiper ref="swiper" :options="swiperOptions">
      </swiper>
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
        'method': 'GET',
        'url': 'http://' + this.$backend + '/api/contest/info?' + this.contestName
      }).then(response => {
        if (response.data.status === 'success') {
          this.$toasted.success('成功獲取比賽資料！')
          this.contest = response.data.data
        } else if (response.data.status === 'failed') {
          this.$toasted.error('獲取比賽資料失敗！')
        }
      }).catch(response => {

      })
    }
  }
}
</script>
