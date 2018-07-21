<template>
  <div>
    <div>
      <query @selectedContest="fetchData"/>
    </div>
    <div>
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
  data () {
    return {
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
    fetchData: function (selectedContest) {
      console.log('Selected Contest')
    }
  }
}
</script>
