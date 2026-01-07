<template>
  <div class="p-0 mt-1">
    <!-- layouts > SidebarLeft > Banner -->

    <b-card
      class="mt-0 h-full"
      no-body
      style="border: 0px solid ; background: none"
     
     >
      <template #header>
        <div>
          <span>{{ trans("sidebar.creditinformation") }}</span>
        </div>
      </template>
      <b-card-body class="py-0 px-2 text-white">
        <div class="flex py-2" style="border-bottom: 1px solid #c0c0c059">
          <div class="flex-1 text-left"><span>{{ trans("sidebar.username") }}</span></div>
          <div class="flex-1 text-right" style="color: rgb(252, 191, 62);">
             <span>{{balance.username}}</span>
          </div>
        </div>
        <div class="flex py-2" style="border-bottom: 1px solid #c0c0c059">
          <div class="flex-1 text-left"><span>{{ trans("sidebar.credit") }}</span></div>
          <div class="flex-1 text-right">
            <span>
              <div is="my-format-price" v-if="balance"  :value="sumcerdit(balance)" :decimal="2"></div>              
            </span>
          </div>
        </div> 
        <div class="flex py-2" style="border-bottom: 1px solid #c0c0c059">
          <div class="flex-1 text-left"><span>{{ trans("sidebar.outstanding") }}</span></div>
          <div class="flex-1 text-right">
             <div is="my-format-price" :value="balance.outstanding_balance" :decimal="2"></div> 
          </div>
        </div>
        <div class="flex py-2" style="border-bottom: 1px solid #c0c0c059">
          <div class="flex-1 text-left"><span>{{ trans("sidebar.balance") }}</span></div>
          <div class="flex-1 text-right">
            <span><div is="my-format-price" v-if="balance.balance"  :value="balance.balance" :decimal="2"></div></span>
          </div>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      
    }
  },
  computed:{
    ...mapGetters({     
      balance: "balance/balance",
    })
  },
  methods: {
    ...mapActions({
      fetchuser : "user/fetchuser",
      fetchBalance : "balance/fetchBalance"

    }),
    sumcerdit(data){
      let sum = 0 
      return sum = data.balance + data.outstanding_balance
    }
  },
async created (){
  await this.fetchBalance();  
  }
}
</script>

<style scoped>
.card-header {
  border-top-left-radius: 10px !important; 
  border-top-right-radius: 10px !important;
  text-align: center;
  background: black;
  color: rgb(252, 191, 62);
  font-weight: bold;
  border-radius: 0px;
  padding: 10px 0px;
}
</style>
