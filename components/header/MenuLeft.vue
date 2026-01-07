<template>
  <div>
    <!-- layouts > Header > MenuLeft -->
    <span class="text-sm">
      <nuxt-link :to="{ path: '/football/today', query: {s: 'top-menu',t:'today'} }" class="nuxt-link">{{ trans("header.today") }}</nuxt-link>
      <nuxt-link :to="{ path: '/football/step', query: {s: 'top-menu'} }" class="nuxt-link"><span @click="linkmenu('step')">{{ trans("header.step") }}</span></nuxt-link>
      <nuxt-link :to="{ path: '/football/mixparlay', query: {s: 'top-menu'} }" class="nuxt-link"><span @click="linkmenu('mixparlay')">{{ trans("header.mixparlay") }}</span></nuxt-link>
      <nuxt-link :to="{ path: '/muaythai/all', query: {s: 'top-menu',t:'muaythai'} }" class="nuxt-link">{{ trans("header.muaythai") }}</nuxt-link>
      <!-- <span class="cursor-pointer" :class="path == '/football/today' ? 'active' :''" @click="linkpath('/football/today')">
        {{ trans("header.today") }} &nbsp;</span
      >
      <span class="cursor-pointer" :class="path == '/football/step' ? 'active' :''" @click="linkpath('/football/step')">{{ trans("header.step") }} &nbsp;</span>
      <span class="cursor-pointer" :class="path == '/football/mixparlay' ? 'active' :''" @click="linkpath('/football/mixparlay')">
        {{ trans("header.mixparlay") }} &nbsp;
      </span>
      <span class="cursor-pointer" :class="path == '/muaythai/all' ? 'active' :''" @click="linkpath('/muaythai/all')">
        {{ trans("header.muaythai") }}
      </span> -->
    </span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      path: this.$route.path
    }
  },
  methods: {
    ...mapActions({
      setBetinfo : "betinfo/setBetinfo"
    }),
    linkmenu(type){
      this.setBetinfo(type)
    },
    linkpath(path) {
      this.$router.push({ path: path })
      this.path = path
      setTimeout(() => {
        this.$emit('activePath', path)
      }, 500);
    }
  },
}
</script>

<style scoped>

a.nuxt-link {
  color: #686868;
  margin-right: 5px;
  border: 1.5px double #868686;
  border-radius: 5px;
  margin: auto;
  padding: 4px;

}
a.nuxt-link:hover {
  text-decoration: none;
}
/* a.nuxt-link-active {
  font-weight: bold;
} */
a.nuxt-link-exact-active {
  color: #ffae00;
  border: 1.5px double #ffae00;
}
</style>
