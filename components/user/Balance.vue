<template>
  <div class="bg-white px-10 py-2 rounded">
    <b-row class="mb-4">
      <b-col cols="4" class="p-4 border-sy">
        {{ trans("sidebar.cashbalance") }}
      </b-col>
      <b-col cols="8" class="p-4 border-sy">
        <span class="">512.10 </span>
        <small>
          <p class="font-italic">
            {{ trans("sidebar.theremainingamount") }}
          </p>
        </small>
      </b-col>
      <b-col cols="4" class="p-4 border-sy">
        {{ trans("sidebar.outstandingbalance") }}</b-col>
      <b-col cols="8" class="p-4 border-sy">
        <span class="">1,010.00 </span>
        <small>
          <p class="font-italic">
            {{ trans("sidebar.totalrunningrets") }}
          </p>
        </small>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      balance: "balance/balance",
    }),
  },
  methods: {
    ...mapActions({
      fetchBalance: "balance/fetchBalance",
    }),
  },
  created() {
    this.fetchBalance();
    console.log("balance", balance);
  },
};
</script>
<style scoped>
.border-sy {
  border-bottom: 1px solid silver;
}
</style>