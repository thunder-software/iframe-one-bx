<template>
  <div class="inline-block">
    <button
      class="btn btn-light btn-sm"
      style="border: 1px solid #c0c0c0c7 !important; margin-top: 24px"
      v-b-modal="'modal-Leagues'"
    >
      <b-icon icon="trophy" style="vertical-align: sub"></b-icon>
      {{ trans("content.selectleague") }}</button
    >
    <b-modal
      :id="'modal-Leagues'"
      size="lg"
      hide-footer
      no-close-on-backdrop
    >
      <b-form-group>
        <template #label>
          <b class="mb-3">{{ trans("content.selectleague") }}</b><br />
          <b-form-checkbox
            class="mt-3"
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
            :aria-describedby="ariaDescribedby"
            name="flavors"
            class="ml-4 "
            aria-label="Individual flavours"
            stacked
          ></b-form-checkbox-group>
        </template>
      </b-form-group>
      <button class="mt-2 btn btn-success btn-sm" @click="SelectLeague()">{{ trans("content.save") }}</button> 
      <button class="mt-2 btn btn-danger btn-sm" @click="hideModal()">{{ trans("content.close") }}</button>
      <div class="hidden">{{ setData }}</div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["getlive","getnotlive","live","loading","sporttype"],
    // props : { 
    //   getlive : {
    //     type: Array,
    //     default: [],
    //   } , 
    //   getnotlive : {
    //     type: Array,
    //     default: [],
    //   } , 
    //   live : {
    //     type: String,
    //     default: '',
    //   },
    //   loading : {
    //     type: Boolean,
    //     default: false,
    //   },
    // },
  data() {
    return {
      modalShow: false,
      flavours: [],
      selected: [],
      allSelected: false,
      indeterminate: false,
      oldlive: [],
      oldnotlive: []
    };
  },
  computed: {
    setData() {
      this.flavours = [];
      if (this.oldlive.data != null && this.oldnotlive.data != null) {
        return [];
      } else {
        if (this.oldlive != null) {
          this.oldlive.filter(f => {
            this.flavours.push(f);
          });
        }
        return [];
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
      this.selected = checked ? this.flavours.slice() : [];
    },
    SelectLeague() {
       this.$bvModal.hide("modal-Leagues");
       if (this.selected.length != 0) {
          if (this.oldlive != null) {
            const findA1 = this.oldlive.filter(a1 =>
              this.selected.find(a2 => a2 === a1)
            );
            this.$emit('filterlive', findA1)
          }
       } else {
         if (this.oldlive != null) {
           this.$emit('filterlive', this.oldlive)
         }
       }
    },
    FilterGroup(){
      if(this.sporttype == 'football' || this.sporttype == 'basketball'){
     const arr1 = [
           ...new Set(this.getlive.map(tournament => {
              return tournament.nn.en
           }))
         ];
         this.oldlive = JSON.parse(JSON.stringify(arr1));
     }else{
      const arr2 = [
           ...new Set(this.getlive.res.map(tournament => {
              return tournament.boxing_cat_name
           }))
         ];
         this.oldlive = JSON.parse(JSON.stringify(arr2));
     }
    },
    hideModal() {
      this.$bvModal.hide("modal-Leagues");
    },
  },
  async created() {
    // console.log("getlivegetlivegetlive",this.getlive);
    this.FilterGroup()

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
    loading(value){
      if(!value){
        this.FilterGroup()
      }
     
    }
  }
};
</script>

<style scoped></style>
