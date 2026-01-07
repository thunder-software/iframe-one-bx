<template>
<thead>
    <tr>
      <th rowspan="2" class="w-2">
        <!-- @click="collapseData('all')" -->
        <span>
          <b-icon
          style="cursor:pointer;"
          :icon="collapse_All  ? 'chevron-down' : 'chevron-up'"
          @click="collapseData('all')"
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
      <th colspan="6" class="none-border">
        <small class="font-semibold">
          {{ trans("content.fulltime") }}
        </small>
      </th>
    </tr>
    <tr>
      <th class="align-middle" style="width: 50px !important;"
        ><small class="font-semibold">
          HDP
        </small></th
      >
      <th class="w-14 align-middle">
        <div>
          <small class="font-semibold">
            {{ trans("content.home") }}
          </small>
        </div>
      </th>
      <th class="w-16 align-middle"
        ><small class="font-semibold">{{
          trans("content.away")
        }}</small></th
      >
      <th class="w-12 align-middle"
        ><small class="font-semibold">{{
          trans("content.goal")
        }}</small></th
      >
      <th class="w-12 align-middle"
        ><small class="font-semibold">
          {{ trans("content.over") }}
        </small></th
      >
      <th class="w-12 align-middle"
        ><small class="font-semibold">
          {{ trans("content.under") }}
        </small></th
      >
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
      console.log('this.status',this.status);
      
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