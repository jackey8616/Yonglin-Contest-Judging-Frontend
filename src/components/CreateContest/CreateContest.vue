<template>
  <swiper ref="swiper" :options="swiperOption">
    <swiper-slide><contest-info @info-submit="nextSlide" @prev-slide="prevSlide"/></swiper-slide>
    <swiper-slide><judge-import @judge-submit="nextSlide" @prev-slide="prevSlide"/></swiper-slide>
    <swiper-slide><term-import @term-submit="nextSlide" @prev-slide="prevSlide"/></swiper-slide>
    <swiper-slide><school-import @school-submit="nextSlide" @prev-slide="prevSlide"/></swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import ContestInfo from './ContestInfo'
import JudgeImport from './JudgeImport'
import TermImport from './TermImport'
import SchoolImport from './SchoolImport'

export default {
  name: 'create-contest',
  components: { swiper, swiperSlide, ContestInfo, JudgeImport, TermImport, SchoolImport },
  data () {
    return {
      slideIndex: 0,
      componentData: {
        info: null,
        judge: null,
        term: null,
        school: null
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
    if (cache !== undefined) {
      for (let i = 0; i < cache['slideIndex']; ++i) {
        this.$refs.swiper.swiper.slideNext()
      }
      this.$toasted.info('已恢復到上次暫存編輯資料！')
    }
  },
  methods: {
    prevSlide: function () {
      if (this.$refs.swiper.swiper.slidePrev()) {
        this.slideIndex -= 1
        let cache = this.$localStorage.fetch('create-contest-cache')
        cache['slideIndex'] = this.slideIndex
        this.$localStorage.save({ 'create-contest-cache': cache })
        // console.log(this.$localStorage.fetch())
      }
    },
    nextSlide: function (key, data, slideEnd = false) {
      if (this.$refs.swiper.swiper.slideNext()) {
        this.slideIndex += 1
        this.componentData[key] = data
        let cache = this.$localStorage.fetch('create-contest-cache')
        cache[key] = data
        cache['slideIndex'] = this.slideIndex
        this.$localStorage.save({ 'create-contest-cache': cache })
        // console.log(this.$localStorage.fetch())
      }
    }
  }
}
</script>
