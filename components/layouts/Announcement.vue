<template>
  <div class="style-announcement" :style="iframe == '2' ? 'top: 46px;' : 'top: 95px;'">
  <div class="announcement">
    <div class="flex w-full" style="height: 28px;">
      <div class="flex px-2 pt-1" style="color: #FCBA2B; font-weight: 900;"><small>{{ trans('header.announcement') }}</small></div>
      <div class="flex-1">
        <marquee scrollamount="2" v-if="marquee" class="small" onmouseover="this.stop()" onmouseleave="this.start()">
          {{ marquee.date_time }} {{ lang == 'th' ? marquee.content_th : marquee.content_en }}
        </marquee>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      iframe: false,
      announces: [],
      lang: this.$auth.$storage.getUniversal("language"),
    }
  },
  computed: {
    ...mapGetters({
      getannounce: "announce/getannounce",
      langs: "language/langs",
    }),
    marquee() {
      if (!this.announces.length) return null
      return this.announces[0]
    }
  },
  methods: {
    ...mapActions({
      fetchannounce: "announce/fetchannounce",
    })
  },
  async created() {
    if(localStorage.getItem('iframe-one')){
      
      this.iframe = localStorage.getItem('iframe-one')
      console.log('nnnnnnnnnn',this.iframe);
    }
    await this.fetchannounce()
    this.announces = this.getannounce;
  },
  watch: {
    langs(value) {
      this.lang = value;
    },
  }
}
</script>
<style scoped>
marquee {
  line-height: 28px;
}

.announcement {
  background: rgb(34, 34, 34);
  position: sticky;
  margin-left: 6px;
  margin-right: 8px;
  color: white;
  border-radius: 18px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}

.style-announcement {
  color: white;
  z-index: 1;
  margin-left: 8px;
  margin-right: 9px;
  display: flex;
  align-items: center;
  height: 35px;
  margin-top: 9px;
  padding-top: 0px;
  background: black;
}

/* @media screen and (max-width: 1400px) {
  .style-announcement {
    top: 47px;
}
} */

@media screen and (max-width: 800px) {
  .announcement {
    position: inherit;
    top: 0px;
  }

  .style-announcement {
    top: 0px;
}
}
</style>
