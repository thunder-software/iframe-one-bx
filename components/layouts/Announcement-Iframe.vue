<template>
  <div class="announcement mr-0">
    <div class="flex w-full" style="height: 28px;">
      <div class="flex px-2 pt-1" style="background: #555555;"><small>{{ trans('header.announcement') }}</small></div>
      <div class="flex-1">
        <marquee scrollamount="2" v-if="marquee" class="small" onmouseover="this.stop()" onmouseleave="this.start()">
          {{ marquee.date_time }} {{ lang == 'th' ? marquee.content_th : marquee.content_en }} 
        </marquee>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
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
  top: 40px;
  margin-left: 0px;
  margin-right: -20px;
  color: white;
  z-index: 99;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  height: 28px;
}

@media screen and (max-width: 1400px) {
  .announcement {
    position: inherit;
    top: 0px;
  }
}
</style>
