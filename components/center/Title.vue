<template>
  <div>
    <!-- layouts > Center > Home > Title -->
    <h5 class="inline-block pr-1" style="vertical-align: sub; color: #ffc107 !important;">
      {{ titlemenu }} / <div v-if="path" class="inline-block">{{titledate}}</div> <div v-else :class="live == false ? '' : 'text-danger'" class="inline-block"> {{ live == false ? trans('header.today') : 'Live Now!' }}</div>
    </h5>
    <b-img v-if="type == 'football'" src="/icon/soccer.png" class="inline-block" style="vertical-align: middle;"></b-img>
    <b-img v-if="type == 'muaythai'" src="/icon/boxing.png" class="inline-block" style="vertical-align: middle;"></b-img>
    <b-img v-if="type == 'cockfight'" src="/icon/chicken.png" class="inline-block" style="vertical-align: middle;"></b-img>
    <b-img v-if="type == 'bullfight'" src="/icon/cow4.png" class="inline-block" style="vertical-align: middle;"></b-img>
    <b-img v-if="type == 'snooker'" src="/icon/snooker.png" class="inline-block" style="vertical-align: middle;"></b-img>
    <b-img v-if="type == 'basketball'" src="/icon/basketball.png" class="inline-block" style="vertical-align: middle;"></b-img>
  </div>
</template>

<script>
export default {
  props: ['type' , 'live' , 'path'],
  computed : {
    titlemenu(){
      return this.trans(`header.${this.type}`)
    },
    titledate(){
      return this.trans(`header.${this.path}`)
    },


  }
};
</script>

<style></style>
