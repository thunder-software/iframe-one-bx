<template>
      <thead :class="tableClass(status)">
        <tr>
          <th rowspan="2" class="w-2">
            <span>
              <b-icon
              @click="collapseData('all')"
              style="cursor:pointer;"
              :icon="collapse_All  ? 'chevron-down' : 'chevron-up'"
              class=""
              ></b-icon>
            </span>
          </th>
          <th rowspan="2" class="align-middle" style="width: 72px !important;">
            <small class="font-semibold">
              {{ trans("content.time") }}
            </small>
          </th>
          <th rowspan="2" class="align-middle">
            <small class="font-semibold">
              {{ trans("content.event") }}
            </small>
          </th>
          <th colspan="9" style="border: 0px">
            <small class="font-semibold">
              {{ trans("content.halftime") }}
            </small>
          </th>
        </tr>
        <tr>
          <th class="align-middle" style="width: 50px !important;"><small class="font-semibold">
              HDP
            </small></th>
          <th class="w-14 align-middle">
            <div>
              <small class="font-semibold">
                {{ trans("content.home") }}
              </small>
            </div>
          </th>
          <th class="w-16 align-middle"><small class="font-semibold">{{
            trans("content.away")
          }}</small></th>
          <th class="w-12 align-middle"><small class="font-semibold">{{
            trans("content.goal")
          }}</small></th>
          <th class="w-12 align-middle"><small class="font-semibold">
              {{ trans("content.over") }}
            </small></th>
          <th class="w-12 align-middle"><small class="font-semibold">
              {{ trans("content.under") }}
            </small></th>
          <!--ครึ่งเวลา1*2-->
          <th class="w-12 align-middle"><small class="font-semibold">1</small></th>
          <th class="w-12 align-middle"><small class="font-semibold">X</small></th>
          <th class="w-12 align-middle"><small class="font-semibold">2</small></th>
        </tr>
      </thead>
</template>

<script>
import { mapActions } from "vuex";
export default {
    props : ['status'],
    data() {
      return {
        collapse_All : false,
      }
    },
    methods: {
    ...mapActions({
      setCollapse : 'collapseAll/setCollapse'
    }),
    collapseData(){
      this.collapse_All = !this.collapse_All
      var data = {
        'collapse' : this.collapse_All,
        'type' : this.status == 'nonLive' ? 'nonlive' : 'live'
      }
      this.setCollapse(data)
    },
    fetchGetData() {
      this.$emit('fetch')
    },
    tableClass(status) {
      if (status == 'live') {
        return "table-live"
      } else if (status == "nonLive") {
        return "table-notlive"
      } else if (status == "early") {
        return "table-early"
      }
    },
    },
}
</script>

<style>

</style>