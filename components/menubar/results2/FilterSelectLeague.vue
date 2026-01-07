<template>
  <div class="">
    <b-form-select v-model="selected" :options="arrayOptions" size="sm"></b-form-select>
    <!-- <button
      variant="light"
      class="btn btn-light w-full"
      style="border: 1px solid #E1E9F4;border-radius: 10px; background: #FFCA3D;"
      v-b-modal="'modal-Leagues'"
    >
      <b-img src="/icon/trophy.png" style="width: 22px; height: 22px; display: inline-block;" ></b-img>
      {{ trans("content.selectleague") }}</button
    >
    <b-modal
      :id="'modal-Leagues'"
      size="lg"
      hide-footer
      no-close-on-backdrop
    >
    <div class="bgimg">{{ trans("content.selectleague") }}</div>
      <b-form-group>
        <template #label>
          <b-form-checkbox
            style="{ padding: 5px 0px 7px 39px;border: 1px solid #c0c0c080; border-radius: 10px; margin-top: initial;}"
            class="mt-3 all-checkbox "
            v-model="allSelected"
            :indeterminate="indeterminate"
            aria-describedby="flavours"
            aria-controls="flavours"
            @change="toggleAll"
          >
            {{ allSelected ? trans("content.unselectall") : trans("content.selectall") }}
          </b-form-checkbox>
        </template>

        <template v-slot="{ ariaDescribedby }">
          <b-form-checkbox-group   
            id="flavors"
            v-model="selected"
            :options="flavours"
            :text-field="langresults =='th'?'text_th':'text_en'"
            :aria-describedby="ariaDescribedby"
            name="flavors"
            aria-label="Individual flavours"
            stacked
          ></b-form-checkbox-group>
        </template>  
      </b-form-group>
      <div class="flex">
        <div class="flex-1 text-center">
          <button class=" btn btn-sm btnCustom w-60 text" @click="SelectLeague()">{{ trans("content.save") }}</button>
        </div>
        <div class="flex-1 text-center">
        <button class=" btn btn-sm btnCancel w-60" @click="hideModal()">{{ trans("content.close") }}</button>
        </div>
      </div>
       
    </b-modal> -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["getlive","getnotlive","live","loading","lang", 'sporttype'],
  data() {
    return {
      modalShow: false,
      flavours: [],
      selected: null,
      allSelected: false,
      indeterminate: false,
      oldlive: [],
      oldnotlive: [],
      langresults:null,
    };
  },
  computed: {
    arrayOptions(){
      if(this.getlive.status == 200){
      
        var uniqueArray = this.getlive.data.data.filter((value, index, self) =>
          index === self.findIndex((t) => String(t.league_id) === String(value.league_id))
        );

        uniqueArray = uniqueArray.sort((a, b) => {
          var aParts = a.sort_league.split('-').map(Number);
          var bParts = b.sort_league.split('-').map(Number);

          for (var i = 0; i < aParts.length; i++) {
            if (aParts[i] < bParts[i]) return -1;
            if (aParts[i] > bParts[i]) return 1;
          }
          return 0;
        });
        
        if(this.sporttype != 0){
          uniqueArray = uniqueArray.filter(item => item.sport_id === parseInt(this.sporttype));
        }

        var newArray = uniqueArray.map(item => ({
          text: item.league_name_th,
          value: item.league_id
        }));
           newArray.unshift(
             { value: null , text: 'ทั้งหมด' }
           )
        return  newArray
      }
    }
  },
  methods: {
    ...mapActions({
      updateFootballLive: "footballlive/updateFootballLive",
      updateFootballNotLive: "footballnotlive/updateFootballNotLive"
    }),
    checkAll() {
      this.all = !this.all;
    },
    toggleAll(checked) {
            // if (!checked) {
            //   this.selected = null
            //   return ;
            // }

            // if (this.allSelected) {
            //   for (let index = 0; index < this.flavours.length; index++) {
            //         this.selected.push(this.flavours[index].sport_id.toString());
            //   }
            // }
    },
    // MapLeague(){
    //   if (this.getlive.data.data.length == undefined) {
    //     return [];
    //   }
    //   const x   = {}
    //   let arra1 = []
    //   let arra2 = []
    //   this.getlive.data.data.map(function (y, index) {
    //         let key_league = y.league_id//+'-'+y.sport_id
    //         if (x[key_league] == undefined) {
    //           x[key_league] = {
    //             league : {
    //               league_id : y.league_id,
    //               league_name_en : y.league_name_en,
    //               league_name_th : y.league_name_th,
    //               sport_id: y.sport_id ,
    //             },
    //           }
    //           arra1.push({text_th:y.league_name_th, text_en: y.league_name_en, value: key_league,sport_id:y.sport_id} )
    //          }
    //   });  
    //   arra1.unshift({value : null ,text_en:'All',text_th:'ทั้งหมด',sport_id:"0"}) 
    //   if (this.sporttype == "0") {
    //     return arra1
    //   }
    //   arra2 = arra1.filter((f) => f.sport_id == this.sporttype)
    //   return this.flavours = arra2
    // },
    // SelectLeague() {
    //    this.$bvModal.hide("modal-Leagues");

    //    this.$emit('SelectedItem',this.selected)
    // },
    hideModal() {
      this.$bvModal.hide("modal-Leagues");
    },
  },
  async created() {
    this.langresults = localStorage.getItem("auth.language");
  },
  watch: {
    sporttype(value){
      this.selected = null
    },
    selected(newValue, oldValue) {
      // if (newValue.length === 0) {
      //   this.indeterminate = false;
      //   this.allSelected = false;
      // } else if (newValue.length === this.flavours.length) {
      //   this.indeterminate = false;
      //   this.allSelected = true;
      // } else {
      //   this.indeterminate = true;
      //   this.allSelected = false;
      // }
      this.$emit('selectedValue', newValue)
      
      
    },
    loading(value){

      if(!value){
        // this.MapLeague()
        // const arr1 = [
        //   ...new Set(this.getlive.map(tournament => {
        //     return tournament.nn.en
        //   }))
        // ];
        // this.oldlive = JSON.parse(JSON.stringify(arr1));
      }
    }
  }
};
</script>

<style scoped>
.btnCustom {
  background-color: #4579B2;
  border-radius: 10px;
  color: #FFFFFF;
}
.btnCancel{
  background-color: #ffffff;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
}
::v-deep .custom-control {
  border: 1px solid #E1E9F4;
  border-radius: 10px;
  padding: 10px 10px 10px 39px;
  margin-top: 10px;
}

::v-deep .custom-control:hover {
  background-color: #E1E9F4;
}
.all-checkbox {
  width: 42%;
  padding: 5px 0px 7px 39px;
}
.bgimg {
  background-image: url("@/static/banner/sport-l.png");
  background-size: cover;
  width:100%;
  color: white;
  font-size: 20px;
  text-align: center;
  padding: 10px 10px 13px 10px;
}
</style>
