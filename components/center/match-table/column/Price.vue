<template>
  <small
    @click="Bet()"
    class="text-bet"
    :class="checkColor(dataScore) ? 'red-text' : 'green-text'"
    v-if="showcolor"
  >
    <my-format-price :value="dataScore" :decimal="2"></my-format-price>
    <b-icon
      :icon="checkColor(dataScore) ? 'arrow-down-short' : 'arrow-up-short'"
      :class="checkColor(dataScore) ? 'text-red-500' : 'text-green-500'"
      class="absolute"
      style="margin-top: 6px; margin-left: -2px ;"
    ></b-icon>
  </small>
  <small @click="Bet()" class="text-bet" v-else>
    <my-format-price :value="dataScore" :decimal="2"></my-format-price>
  </small>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["score", "data", "namematch", "type"],
  data() {
    return {
      timer: null,
      countDown: 30,
      showcolor: false
    };
  },
  computed: {
    dataScore() {
      return this.score;
    }
  },
  methods: {
    ...mapActions({
      fetchActionsTab: "tabbet/fetchActionsTab"
    }),
    Bet() {
      var obj = {};
      if (this.type == "football") {
        obj = {
          id: this.data.k,
          match_n: this.namematch.th,
          match_en :this.namematch.en,
          date: this.data.d,
          tor: this.data.n.th.a,
          tor_en : this.data.n.en.a,
          rong: this.data.n.th.h,
          rong_en: this.data.n.en.h,
          price:this.data.bpl,
          open: true,
          status:"Running",
          ip:this.data.id,
          type :this.type
        };
      } else {
        obj = {
          id: this.data.boxing_cat_id, 
          match_n: this.namematch,
          match_en :this.data.boxing_cat_name,
          date:this.data.fight_datetime,
          tor: this.data.team_blue_show.boxer_name_th,
          tor_en :this.data.team_blue_show.boxer_name_en,
          rong: this.data.team_red_show.boxer_name_th,
          rong_en: this.data.team_red_show.boxer_name_en,
          price:this.data.team_blue_price_single,
          open: true,
          status:"Running",
          ip:this.data.boxing_key_id,
          type :this.type,
        };
      }
      this.fetchActionsTab(obj);
    },
    checkColor(price) {
      let text = price.toString();
      let result = text.substring(0, 1);
      if (result == "-") {
        return true;
      } else {
        return false;
      }
    },

    startAutoRefresh() {
      this.timer = setInterval(() => {
        this.countDown--;
        if (this.countDown == 20) {
          this.showcolor = false;
        }
        if (this.countDown <= 0) {
          this.showcolor = true;
          this.countDown = 30;
        }
      }, 1000);
    }
  },
  created() {
    // this.startAutoRefresh();
  },
  watch: {
    data: {
      handler() {},
      deep: true
    }
  }
};
</script>

<style scoped>
.text-bet:hover {
  text-decoration: underline;
  cursor: pointer;
}

.red-text {
  animation: blinkingText 2s infinite;
}
@keyframes blinkingText {
  0% {
    background: #ffd3d4;
  }
  25% {
    background: #ffd3d4;
  }
  50% {
    background: #ffd3d4;
  }
  75% {
    background: #ffd3d4;
  }
  100% {
    background: none;
  }
}

.green-text {
  animation: alternate 2s infinite;
}
@keyframes alternate {
  0% {
    background: #9effb0;
  }
  25% {
    background: #9effb0;
  }
  50% {
    background: #9effb0;
  }
  75% {
    background: #9effb0;
  }
  100% {
    background: none;
  }
}
</style>
