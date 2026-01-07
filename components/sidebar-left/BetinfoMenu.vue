<template>
  <div>
    <!-- layouts > SidebarLeft > SportBet -->
    <div class="flex text-center">
      <div class="flex-1 p-1">
        <button
          class="w-full btn-sm"
          :class="menu == false ? 'btn-at' : 'btn-menu'"
          @click="selectmenu(false)"
          >{{trans('sidebar.sportsmenu')}} 
          <b-icon
            :icon="itemOpen ? 'chevron-up' : 'chevron-down'"
            class="float-right mt-1 mr-2"
          ></b-icon> 
          </button
        >
      </div>
      <div class="flex-1 p-1">
        <button
          class="w-full btn-sm"
          :class="menu == true ? 'btn-at' : 'btn-menu'"
          @click="selectmenu(true)"
          >{{trans('sidebar.balance')}}</button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions , mapGetters } from "vuex";
export default {
  data() {
    return {
      menu: false,
      itemOpen : true
    };
  },
  computed: {
    ...mapGetters({
      getTabsport : "clicksport/getTabsport"
    }),
  },
  methods: {
    ...mapActions({
      actionsTabsport: 'clicksport/actionsTabsport'
    }),
    selectmenu(type) {
      this.menu = type;
      if(type == false){
        this.itemOpen = !this.itemOpen
        this.actionsTabsport(this.itemOpen)
      }
      this.$emit("selectmenu", type);
    }
  },
  watch : {
    getTabsport(value){
      this.itemOpen = value
    }
  }
};
</script>

<style scoped>
.btn-menu {
  background: linear-gradient(to bottom, #f9f9f9 5%, #e9e9e9 100%);
  display: inline-block;
  cursor: pointer;
  color: black;
  font-size: 15px;
}

.btn-at {
  /* background: linear-gradient(to bottom, #ffec64 5%, #ffab23 100%); */
  display: inline-block;
  cursor: pointer;
  color: black;
  font-size: 15px;
  background: #c5c5c5;
}
</style>
