<template>
  <!-- :class="scY => 64 ? 'f' : ''" -->
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
          <th  rowspan="2" class="align-middle" style="width: 67px !important;">
            <small class="font-semibold">
              {{ trans("content.time") }}
            </small>
          </th>
          <th  rowspan="2" class="align-middle">
            <small class="font-semibold">
              {{ trans("content.event") }}
            </small>
          </th>
          <th  colspan="6" class="none-border">
            <small class="font-semibold">
              {{ trans("content.fulltime") }}
            </small>
          </th>

          <th  colspan="7" style="border: 0px">
            <small class="font-semibold">
              {{ trans("content.halftime") }}
            </small></th
          >
        </tr>
        <tr>
          <th  class="w-12"
            ><small class="font-semibold">
              HDP
            </small></th
          >
          <th  class="w-14">
            <div>
              <small class="font-semibold">
                {{ trans("content.home") }}
              </small>
            </div>
          </th>
          <th  class="w-16"
            ><small class="font-semibold">{{
              trans("content.away")
            }}</small></th
          >
          <th  class="w-12"
            ><small class="font-semibold">{{
              trans("content.goal")
            }}</small></th
          >
          <th  class="w-12"
            ><small class="font-semibold">
              {{ trans("content.over") }}
            </small></th
          >
          <th  class="w-12"
            ><small class="font-semibold">
              {{ trans("content.under") }}
            </small></th
          >

          <th  class="w-12"
            ><small class="font-semibold">
              HDP
            </small></th
          >
          <th  class="w-14">
            <div>
              <small class="font-semibold">
                {{ trans("content.home") }}
              </small>
            </div>
          </th>
          <th  class="w-16"
            ><small class="font-semibold">{{
              trans("content.away")
            }}</small></th
          >
          <th  class="w-12"
            ><small class="font-semibold">{{
              trans("content.goal")
            }}</small></th
          >
          <th  class="w-12"
            ><small class="font-semibold">
              {{ trans("content.over") }}
            </small></th
          >
          <th  class="w-12"
            ><small class="font-semibold">
              {{ trans("content.under") }}
            </small></th
          >
          <th></th>
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
  mounted() {
      window.addEventListener('scroll', this.handleScroll);
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
    handleScroll() {
        if (this.scTimer) return;
        this.scTimer = setTimeout(() => {
          this.scY = window.scrollY;
          clearTimeout(this.scTimer);
          this.scTimer = 0;
        }, 100);
      }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },

}
</script>

<style scoped>
 .fixed-sy {
  position: fixed;
 }
 .bg-style-table {
  background: #f88f84 ;
 }
</style>