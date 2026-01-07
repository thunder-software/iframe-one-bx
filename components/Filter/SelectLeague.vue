<template>
  <div class="inline-block">
    <button
      class="btn btn-warning btn-sm"
      style="width: 95px; height: 31px; background: #FFCA3D; border: 1px solid #ffea62;"
      v-b-modal="live ? 'modal-Leagues-live' : 'modal-Leagues-not-live'"
    >
      <b-icon icon="trophy" style="vertical-align: sub"></b-icon>
      {{ trans("content.selectleague") }}
      <b-badge variant="light" v-if="selected.length != 0" style="position: absolute; right: 58px; top: -2px;">{{ selected.length }}</b-badge>
      </button
    >

    <b-modal
      :id="live ? 'modal-Leagues-live' : 'modal-Leagues-not-live'"
      size="lg"
      hide-footer
      no-close-on-backdrop
    >
    <div class="bgimg">{{ trans("content.selectleague") }}</div>
    <b-form @submit.prevent="SelectLeague()">
      <b-form-group>
        <template #label>
        <div class="flex mt-3">
          <div class="flex-1">
            <b-form-checkbox
                    class="all-checkbox"
                    style="{
                        padding: 5px 0px 7px 39px;
                        border: 1px solid #2c2c2c;
                        border-radius: 10px;
                        margin-top: initial;
                    }"
                    v-model="allSelected"
                    :indeterminate="indeterminate"
                    aria-describedby="flavours"
                    aria-controls="flavours"
                    @change="toggleAll"
                  >
                  
                  <span class="textCheckboxAll">
                    {{ allSelected ? trans("content.unselectall") : trans("content.selectall") }}
                  </span>
                </b-form-checkbox>
          </div>
          <div class="flex-1">
            <b-input-group class=""
            style="
            width: 80%;
            float: right;
            ">
              <template #append>
                <b-input-group-text class=""
                style="
                border: 1px solid #2c2c2c !important;
                border-top-right-radius: 10px;
                border-bottom-right-radius: 10px;
                background: black !important;
                ">
                  <b-icon icon="search" class="text-white"></b-icon>
                </b-input-group-text>
              </template>
              <b-form-input class="inputTextSearch"
              style="
              border: 1px solid #2c2c2c !important;
              border-right: none;
              border-right: none;
              border-top-left-radius: 10px;
              border-bottom-left-radius: 10px;
              background: black !important;
              color: white;
              "
              :placeholder="lang == 'th' ? 'ค้นหา' : 'search'" 
              v-model="textSearch"
              >
            </b-form-input>
            </b-input-group>
          </div>
        </div>
        <div class="lineSolid"></div>
        </template>
        <template v-slot="{ ariaDescribedby }">
          <b-form-checkbox-group
            id="flavors"
            v-model="selected"
            :options="flavours"
            :aria-describedby="ariaDescribedby"
            name="flavors"
            class=""
            aria-label="Individual flavours"
            stacked
          ></b-form-checkbox-group>
        </template>
      </b-form-group>

      <button type="sumbit" class="mt-2 btn-sm btn btn-success btnCustom" style="background: #fc1; color: black;" 
      @click="SelectLeague()">{{ trans("content.save") }}</button>
    </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapActions , mapGetters } from "vuex";
export default {
    props : { 
      getlive : {
        type: Array,
        default: [],
      } , 
      getnotlive : {
        type: Array,
        default: [],
      } ,
      getearly : {
        type: Array,
        default: [],
      } ,
      live : {
        type: String,
        default: '',
      },
      oldlive : {
        type: [Object, Array],
        default: () => [],
      },
      oldnotlive : {
        type: [Object, Array],
        default: () => [],
      },
      oldearly : {
        type: [Object, Array],
        default: () => [],
      },
      loading : {
        type: Boolean,
        default: false,
      },
    },
  data() {
    return {
      flavours: [],
      backup_flavours : [],
      selected: [],
      allSelected: false,
      indeterminate: false,
      textSearch: null,
      oldLive: [],
      oldnotLive: [],
      oldEarly: [],
      oldSport : [],
      navSide: '',
      navpart:'',
      numbertpye : 2,
      lang : ''
    };
  },
  computed: {
    ...mapGetters({
      langs: "language/langs",
      
    }),
  },
  methods: {
    ...mapActions({
      updateFootballLive: "footballlive/updateFootballLive",
      updateFootballNotLive: "footballnotlive/updateFootballNotLive"
    }),
    toggleAll(checked) {
      var arrayData = []
      this.selected = checked ? this.flavours.slice() : [];
        if(this.allSelected && this.indeterminate == false){
           for (let i = 0; i < this.flavours.length; i++) {
            arrayData.push(this.flavours[i].value)
           }
           this.selected = [...new Set(arrayData)];
         }

         if(this.allSelected == false && this.indeterminate == false){
           this.selected = []
         }
    },
    setFliter(){
      var a1 = []
      var setArray = []
      if(this.oldlive.length != 0){
          for (let i = 0; i < this.oldlive.data.data.length; i++) {
            setArray.push(this.oldlive.data.data[i])
          }
      }
      if(this.oldnotlive.length != 0){
        for (let i = 0; i < this.oldnotlive.data.data.length; i++) {
            setArray.push(this.oldnotlive.data.data[i])
          }
      }
      if(this.oldearly.length != 0){
        for (let i = 0; i < this.oldearly.data.data.length; i++) {
            setArray.push(this.oldearly.data.data[i])
          }
      }

      if(setArray.length != 0){
        var wbl_a = { data: { data: [] } }
        wbl_a.data.data = setArray.filter(f => {
          if(f.setting_w_b_l[0]){
            if(f.setting_w_b_l[0][this.numbertpye] == 1){
              return f.setting_w_b_l[0][this.numbertpye]
            }
          }
        })
        var name_lang 
        if(this.langs == 'th'){
          name_lang = 'name_th'
        }else{
          name_lang = 'name_en'
        }
        for (let i = 0; i < wbl_a.data.data.length; i++) {
          a1.push(
            { text: wbl_a.data.data[i].tournament[name_lang], value: wbl_a.data.data[i].tournament.tournament_id }
          )
        }
        const unique = [...new Map(a1.map((m) => [m.value, m])).values()];
        this.oldSport = JSON.parse(JSON.stringify(unique));
        this.oldSport.filter(f => {
          this.flavours.push(f);
        });
          if(localStorage.getItem('filterSport')){
            let obj = localStorage.getItem('filterSport').split(",");
            for (let i = 0; i < obj.length; i++) {
              this.selected.push(obj[i])
            }
         }
      }

      const filtered = this.selected.reduce((acc, current) => {
           const x = acc.find(item => parseInt(item) === parseInt(current));
           if (!x) {
             return acc.concat([current]);
           } else {
             return acc;
           }
         }, []);
         this.selected = filtered

         const filteredArr = this.flavours.reduce((acc, current) => {
           const x = acc.find(item => item.value === current.value);
           if (!x) {
             return acc.concat([current]);
           } else {
             return acc;
           }
         }, []);
         this.flavours = filteredArr
         this.backup_flavours = JSON.parse(JSON.stringify(this.flavours))
    },
    SelectLeague() {
       this.$bvModal.hide(
         this.live ? "modal-Leagues-live" : "modal-Leagues-not-live"
       );
       if (this.selected.length != 0) {
          if (this.oldSport != null) {
            const findA1 = this.oldSport.filter(a1 =>
              this.selected.find(a2 => a2 === a1.value)
            );
            let array = []
            for (let i = 0; i < findA1.length; i++) {
              array.push(findA1[i].value)
            }
            localStorage.setItem('filterSport', array.toString())
            this.$emit('filternonlive', findA1)
            this.$emit('filterlive', findA1)
            this.$emit('filterearly', findA1)
          }
          // if (this.oldnotLive != null) {


          //   const findA2 = this.oldnotLive.filter(a1 =>
          //     this.selected.find(a2 => a2 === a1.value)
          //   );
          //   let array = []
          //   for (let i = 0; i < findA2.length; i++) {
          //     array.push(findA2[i].value)
          //   }
          //   localStorage.setItem('filternonlive', array.toString())
          //   this.$emit('filternonlive', findA2)
          // }


          // if (this.oldearly != null) {
          //   const findA2 = this.oldearly.filter(a1 =>
          //     this.selected.find(a2 => a2 === a1.value)
          //   );
          //   localStorage.setItem('filterearly', findA2)
          //   this.$emit('filterearly', findA2)
          // }
       } else {
        localStorage.removeItem('filterSport')
        this.$emit('filterlive', this.oldLive)
        this.$emit('filternonlive', this.oldnotLive)
        this.$emit('filterearly', this.oldEarly)
        //  localStorage.removeItem('filterlive')
        //  if (this.oldLive != null) {
        //    this.$emit('filterlive', this.oldLive)
        //  }
        //  if (this.oldnotLive != null) {
        //    this.$emit('filternonlive', this.oldnotLive)
        //  }
        // if (this.oldearly != null) {
        //    this.$emit('filterearly', this.oldearly)
        //  }
       }
    },
  },
  async created() {
        this.setFliter()
        const  getpart =  this.$route.query.t
        const getSide = this.$route.query.s
        this.navpart = getpart
        this.navSide = getSide ? getSide : 'side-menu'
        if(this.$route.params.path == 'step'){
          this.numbertpye = 5
        }else if(this.$route.params.path == 'mixparlay'){
          this.numbertpye = 8
        }else{
          this.numbertpye = 2
        }
        // const arr3 = [
        //     ...new Set(this.getearly.map(({ tournament }) => tournament.name_en))
        //   ];
        // this.oldearly = JSON.parse(JSON.stringify(arr3));
        this.lang = this.langs
  },
  watch: {
    selected(newValue, oldValue) {
      if (newValue.length === 0) {
        this.indeterminate = false;
        this.allSelected = false;
      } else if (newValue.length === this.flavours.length) {
        this.indeterminate = false;
        this.allSelected = true;
      } else {
        this.indeterminate = true;
        this.allSelected = false;
      }
    },
    textSearch(text){
        if(text == '' || text == null){
          this.flavours = this.backup_flavours
        }
        this.flavours = this.flavours.filter((obj) => JSON.stringify(obj).toLowerCase().includes(text.toString().toLowerCase()));
      },

    langs(value) {
      this.lang = value;
      this.flavours = []
      this.selected = []
      this.allSelected = false,
      this.indeterminate = false,
      // localStorage.removeItem('filterSport')
      this.setFliter()
    },
    loading: {
      handler() {
        if(this.loading == false){
        this.setFliter()
        }
      },
      deep: true
    },
  }
};
</script>

<style scoped>
::v-deep .custom-checkbox .custom-control-input:checked ~ .custom-control-label::after {
    background-color: #fc1;
    border-radius: 5px;
}
::v-deep .custom-checkbox .custom-control-input:checked ~ .custom-control-label::before {
    background-color: #fc1;
}

::v-deep .custom-checkbox .custom-control-input:indeterminate ~ .custom-control-label::after {
    background-color: #fc1;
    border-radius: 5px;
}
.lineSolid {
  border-top: 1px solid #2c2c2c;
  margin-top: 1rem;
}
::v-deep .custom-control {
  border: 1px solid #2c2c2c;
  border-radius: 10px;
  padding: 10px 10px 10px 39px;
  margin-top: 10px;
  color: white;
}

::v-deep .custom-control:hover {
  background-color: #2c2c2c;
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
  padding: 15px 10px 16px 10px;
}

.btnCustom {
  background-color: #4579B2;
  border-radius: 10px;
}
.btnCustom:hover {
  background-color: #315781;
}
.btnCustom:focus {
  box-shadow: none;
}

.btnCustom:not(:disabled):not(.disabled):active:focus, .btnCustom:not(:disabled):not(.disabled).active:focus, .show > .btnCustom.dropdown-toggle:focus {
    box-shadow: none;
}

.btnCustom:not(:disabled):not(.disabled):active, .btnCustom:not(:disabled):not(.disabled).active, .show > .btnCustom.dropdown-toggle {
    color: #fff;
    background-color: #33649A;
    border-color: none;
    box-shadow: none;
}

.inputTextSearch:focus {
    box-shadow: none;
}


.textCheckboxAll {
  font-size: 14px;
  padding: 10px 20px 20px 8px;
  vertical-align: text-top;
  cursor: pointer;
}


@media screen and (max-width: 991px) {
  .all-checkbox {
    width: 100%;
  }

  .bgimg {
    background-image: url("@/static/banner/sport-m.png");
  }
}

</style>
