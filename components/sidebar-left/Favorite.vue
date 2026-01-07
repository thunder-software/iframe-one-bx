<template>
  <div>
    <b-overlay :show="loading">
      <b-card class="mt-0 h-full bg-white" no-body style="border: 0px solid; background: none; border-radius: 10px;">
        <template #header>
          <div class="flex">
            <div class="flex">
              <b-img src="/icon/star3.png" class="img-color ml-2"></b-img>
            </div>
            <div class="flex-1 text-left ml-2">
              <span class="text-white">{{ trans("sidebar.my_favourites") }}</span>
            </div>
            <div class="flex mr-3">
              <span
              style="
              background-color: #0000000A;
              color: #ffc107;
              border-radius: 3px; width: 20px;"
              >{{ events.length }}</span>
            </div>
          </div>
        </template>
        <b-card-body class="p-0" v-if="events.length != 0">
          <!-- <span v-if="!events.length" class="text-black font-st text-center">
            <b-img src="/icon/star.png" class="img-color"></b-img>
            <span class="block mt-1">{{ lang == 'th' ? 'กรุณากดติดดาวเพื่อเพิ่ม' : 'Please press star to add.' }}</span>
            <span class="block">{{ lang == 'th' ? 'รายการโปรดของคุณ' : 'Your favorites' }}</span>
          </span> -->
          <div class="favorite-list">
            <div style="background: rgba(241, 241, 241, 1); border-radius: 6px; padding: 0px 7px; margin-bottom: 6px;" v-for="(sport, i) in sports" :key="i">
              <b-row class="p-0 m-0 w-full cursor-pointer" @click="redirectTo(sport.route.split('/')[1], sport.sport_id)">
                <b-col cols="8" class="text-left py-1 px-0">
                  <b-img :src="'/icon/'+sport.name_en+'1.png'" class="inline-block" style="width: 20px;"></b-img>
                  <span :class="curSport == sport.sport_id ? 'text-red-500' : 'text-style-color'" class="ml-2" style="font-size: 14px;">{{ sport["name" +
                    keyLang] }}</span>
                </b-col>
                <b-col cols="4" class="text-right p-0 py-1">
                  <div class="badge mr-2.5" style="background: rgba(235, 161, 54, 1); color: white;">{{ countFav[sport.sport_id] }}</div>
                </b-col>
              </b-row>
            </div>
          </div>
        </b-card-body>
      </b-card>
    </b-overlay>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      lang: this.$auth.$storage.getUniversal("language"),
    }
  },
  computed: {
    ...mapGetters({
      events: "favorite/events",
      sports: "favorite/sports",
      loading: 'favorite/loading',
      curSport: "favorite/curSport",
      countFav: 'favorite/countFav',
      langs: "language/langs",
    })
  },
  methods: {
    ...mapActions({
      setSport: 'favorite/setCurSport',
      setLoadData: 'favorite/setLoadData',
    }),
    redirectTo(target, sportId) {
      const isFav = this.$route.name.split('-')[0] === 'favorite'
      const path = this.$route.name.split('-')[1]

      if (!isFav || (isFav && path !== target)) {
        this.setLoadData(true)
        this.setSport(sportId)
        this.$router.push({ path: `/favorite/${target}` })
      }
    }
  },
  watch: {
    loading(val) {
      console.log('loading log', val)
    },
    langs(value) {
      this.lang = value;
    },
  }
}
</script>

<style scoped>
.img-color {
  width: 17px;
  /* filter: grayscale(100%);
  opacity: 0.3; */
  margin: auto;
}
.text-style-color{
  color: rgba(67, 67, 67, 1);
}
.font-st {
  font-size: 14px !important;
}

.favorite-list div:last-child {
  border-bottom: 0 !important;
}

.card-header {
  text-align: center;
  color: white;
  border-radius: 9px;
  border: 0px solid;
  padding: 10px 0px;
  background-color: #191919;
}
</style>
