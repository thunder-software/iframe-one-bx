<template>
    <td :class="this.change_active == true ? 'blink-bg' : ''" style="background: #262626 !important;">
      <small class="text-primary" style="font-weight: 600;" :class="checkodds == true ? 'hidden' : ''">
        <div v-if="odd_online != 0">
           {{point}}
        </div>
        <div v-else>
          <small class="font-semibold" v-if="odd_online == 1 && type_online != 'type45'"> {{point}}</small>
        </div>
      </small>
    </td>
  </template>
  
  <script>
  export default {
    props: ['odds','marketType', 'isonline' , 'type_online'],
    data() {
        return {
            change_active: false,
            old_data: null,
            id_odds: null,
            in_percent: null,
            odds_array : null,
        }
    },
    methods: {
        set_percent(){
            const value =  this.odds.filter(d=> d.market_type === this.marketType).find(d => d);
            if(value){
  
                this.old_data = value.point
                this.in_percent = value.point
                this.id_odds = value.id
                this.odds_array = value.online
  
                
  
  
            }
        }
    },
    computed:{
        checkodds(){
            const value = this.odds.filter(d=> d.market_type === this.marketType).find(d => d);
            if(value){
                if(value.l_percent == null){
                    return true
                }else{
                    return false
                }
            }
        },
        odd_online(){
            const value = this.odds.filter(d=> d.market_type === this.marketType).find(d => d);
            if(value){
                return value.online == 1 && value.status != 'end' ? 1 : 0;
            }
  
            return 0
  
        },
        point(){
            const value = this.odds.filter(d=> d.market_type === this.marketType).find(d => d);
            if(value){
                if (this.isonline == 1){
                    return value.point;
                }
            }
            return '-';
        }
    },
    watch: {
        odds: {
            handler(newValue, oldValue){
                const valueOld = oldValue.filter(d=> d.market_type === this.marketType).find(d => d)
                const valueNew = newValue.filter(d=> d.market_type === this.marketType).find(d => d)
  
                if (valueOld != undefined && valueNew != undefined){
                    // console.log("poppp old", valueNew.id, valueOld.in_percent , valueOld.percent , valueOld.in_percent + valueOld.percent)
                    // console.log("poppp new", valueNew.id, valueNew.in_percent , valueNew.percent ,valueNew.in_percent + valueNew.percent)
                    this.id_odds = valueNew.id
                    this.old_data = valueNew.point;
                    this.change_active = valueOld.point != valueNew.point ? true : false
                    this.in_percent = valueNew.point;
                }
  
            },
            deep: true,
        }
    },
    created(){
        this.set_percent()
    }
  }
  </script>
  
  <style scoped>
    .input-change-work {
        color: #ff2424;
        background-color: #ffff3b;
    }
  
  </style>