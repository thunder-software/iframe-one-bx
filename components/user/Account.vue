<template>
  <div class="card-img-style px-10 py-2">
    <div class="row text-center" v-if="balance"> 
      <div class="col-6">
        <span style="font-weight: 200;font-size: 14px;color: #FFFFFF; " class="block" >{{ trans("sidebar.username") }}</span>
        <span style="font-weight: 500;color: #FFFFFF;">{{ balance.username}}</span>
      </div>
      <div class="col-6">
        <span style="font-weight: 200;font-size: 14px;color: #FFFFFF;" class="block" >{{trans('sidebar.cashbalance')}}</span>
        <span style="font-weight: 500;color: #FFFFFF;"><my-format-price v-if="balance.balance" :value="balance.balance" :decimal="2"></my-format-price> {{ $auth.user.currency }}</span>
      </div>        
    </div>
    <!-- <b-row class="mb-4" v-if="balance">
      <b-col cols="4" class="p-4 border-sy">
        {{ trans("sidebar.username") }}
      </b-col>
      <b-col cols="8" class="p-4 border-sy"> {{ balance.username}} </b-col>
      <b-col cols="4" class="p-4 border-sy">
        {{ trans("sidebar.currency") }}
      </b-col>
      <b-col cols="8" class="p-4 border-sy"> THB </b-col>
      <b-col cols="4" class="p-4 border-sy"> {{trans('sidebar.cashbalance')}} </b-col>
      <b-col cols="8" class="p-4 border-sy">
        <span class=""><my-format-price v-if="balance.balance" :value="balance.balance" :decimal="2"></my-format-price> THB</span>
        <small><p class="font-italic">{{trans('sidebar.theremainingamount')}} </p></small>
      </b-col>
      
    </b-row> -->
  </div>
</template>
<script>
import {mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      status_password: false,
      form: {
        current_password: null,
        new_password: null,
        confirm_password: null
      }
    };
  },
  computed:{
    ...mapGetters({
      getuser : "user/getuser",
      balance: "balance/balance",
    })
  },
  methods: {
    ...mapActions({
      fetchBalance : "balance/fetchBalance"
    }),
    changepassword(value) {
      this.status_password = value;
    },
    onSubmit() {}
  },
 async created(){
  await this.fetchBalance();
},
};
</script>
<style scoped>
.border-sy {
  border-bottom: 1px solid silver;
}
.card-img-style {
  background: url('/banner/Frame-textt01.png');
  background-size: cover;
  height: 66px;
  padding-top: 15px;
  font-weight: 700;
  border-radius: 10px;
  margin-bottom: 8px;
  
}
</style>
