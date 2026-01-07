<template>
    <thead>
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
          <th rowspan="2" class="align-middle w-24">
            <small class="font-semibold">
              {{ trans("content.time") }}
            </small>
          </th>
          <th rowspan="2" class="align-middle" style="width: 28rem">
            <small class="font-semibold">
              {{ trans("content.event") }}
            </small>
          </th>
          <th colspan="6" class="none-border">
            <small class="font-semibold">
              {{ trans("content.fulltime") }}
            </small>
          </th>

          <th colspan="5" style="border: 0px">
            <small class="font-semibold">
              {{ trans("content.halftime") }}
            </small></th
          >
        </tr>
        <tr>
          <th class="w-20" colspan="2">
            <small class="font-semibold">
              {{ trans("content.fulltime") }}
            </small></th
          >
          <th class="w-18" colspan="2">
            <div>
              <small class="font-semibold"
                >{{ trans("content.over") }} /
                {{ trans("content.under") }}</small
              >
            </div>
          </th>

          <th class="w-18" colspan="1">
            <small class="font-semibold">1X2</small>
          </th>

          <th class="w-18" colspan="1">
            <small class="font-semibold"
              >{{ trans("content.odd") }}/{{ trans("content.even") }}</small
            >
          </th>

          <th class="w-18" colspan="2"
            ><small class="font-semibold">
              {{ trans("content.halftime") }}
            </small></th
          >
          <th class="w-18" colspan="2"
            ><small class="font-semibold"
              >{{ trans("content.over") }} / {{ trans("content.under") }}</small
            ></th
          >

          <th class="w-18" colspan="1">
            <small class="font-semibold">1X2</small>
          </th>
        </tr>
      </thead>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props : ['status'],
  data() {
    return {
      scTimer: 0,
      scY: 0,
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
  },
}
</script>

<style>

</style>