<template>
  <div>
    <!-- layouts > Center > Home > Title -->
    <h5 class="inline-block pr-1" style="vertical-align: sub;
    font-size: 16px;
    white-space: pre;
    position: absolute;
    left: 34px;
    top: -9px;
    color: #ffc107 !important;
    font-weight: 700;
    ">
      <span v-if="navSide !='top-menu' || navPart == 'today' || navPart == 'muaythai'">{{ titlemenu }} /</span>  <span v-if="path" class="inline-block">{{titledate}}</span> <span v-else :class="live == false ? '' : 'text-danger'" class="inline-block"> {{ live == false ? trans('header.today') : 'Live Now!' }}</span>
    </h5>
    <b-img v-if="type == 'football' && navSide !='top-menu' || navPart == 'today'" src="/icon/soccer.png" class="inline-block img-icon-style" style=""></b-img>
    <b-img v-if="type == 'muaythai'" src="/icon/boxing.png" class="inline-block img-icon-style" style=""></b-img>
    <b-img v-if="type == 'cockfight'" src="/icon/chicken.png" class="inline-block img-icon-style" style=""></b-img>
    <b-img v-if="type == 'cockfightsouth'" src="/icon/chicken1.png" class="inline-block img-icon-style" style="width: 16px;"></b-img>
    <b-img v-if="type == 'bullfight'" src="/icon/cow4.png" class="inline-block img-icon-style" style=""></b-img>
    <b-img v-if="type == 'snooker'" src="/icon/snooker.png" class="inline-block img-icon-style" style=""></b-img>
    <b-img v-if="type == 'basketball'" src="/icon/basketball.png" class="inline-block img-icon-style" style=""></b-img>
    <b-img v-if="type == 'takraw'" src="/icon/takraw.png" class="inline-block img-icon-style" style="width: 16px;"></b-img>
  </div>
</template>

<script>
export default {
  props: ['type' , 'live' , 'path'],
  data() {
    return {
      navSide: '',
      navPart:'',
    }
  },
  computed : {
    titlemenu(){
      return this.trans(`header.${this.type}`)
    },
    titledate(){
      return this.trans(`header.${this.path}`)
    },


  },
  created() {
    const getSide = this.$route.query.s
    const getpart = this.$route.query.t
    this.navSide = getSide ? getSide : 'side-menu'
    this.navPart = getpart

  },
};
</script>

<style scoped>
  .img-icon-style {
    vertical-align: middle;
    position: absolute;
    margin-top: -9px;
    margin-left: -6px;
  }
</style>
