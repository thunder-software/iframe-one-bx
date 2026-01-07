<template>
  <div class="inline-block">
    <button
      size="sm"
      variant="warning"
      style="border: 1px solid"
      v-b-modal="live ? 'modal-Leagues-live' : 'modal-Leagues-not-live'"
    >
      <b-icon icon="trophy" style="vertical-align: sub"></b-icon>
       {{ trans("content.selectleague") }} </button
    >

    <b-modal
      :id="live ? 'modal-Leagues-live' : 'modal-Leagues-not-live'"
      size="lg"
      hide-footer
      no-close-on-backdrop
    >
      <b-form-group>
        <template #label>
          <b>{{ trans("content.selectleague") }}</b><br />
          <b-form-checkbox
            v-model="allSelected"
            :indeterminate="indeterminate"
            aria-describedby="flavours"
            aria-controls="flavours"
            @change="toggleAll"
          >
            {{ allSelected ? "Un-select All" : "Select All" }}
          </b-form-checkbox>
        </template>

        <template v-slot="{ ariaDescribedby }">
          <b-form-checkbox-group
            id="flavors"
            v-model="selected"
            :options="flavours"
            :aria-describedby="ariaDescribedby"
            name="flavors"
            class="ml-4"
            aria-label="Individual flavours"
            stacked
          ></b-form-checkbox-group>
        </template>
      </b-form-group>

      <button class="btn btn-success btn-sm" @click="SelectLeague()">{{ trans("content.save") }}</button>
      <div class="hidden">{{ setDataLive }}</div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["getlive", "getnotlive", "lang", "live" , "type"],
  data() {
    return {
      flavours: [],
      selected: [],
      allSelected: false,
      indeterminate: false,
      oldlive: [],
      oldnotlive: []
    };
  },
  computed: {
    setDataLive() {
      this.flavours = [];
      if (this.oldlive.data != null && this.oldnotlive.data != null) {
        return [];
      } else {
        if (this.oldlive[0] != null) {
          this.oldlive[0].filter(f => {
            this.flavours.push(f.sbo_tournament_th);
          });
        }

        if (this.oldnotlive[0] != null) {
          this.oldnotlive[0].filter(f => {
            this.flavours.push(f.sbo_tournament_th);
          });
        }
        return [];
      }
    }
  },
  methods: {
    ...mapActions({
      updateMpyZoo : "mpy@zoo/updateMpyZoo"
    }),
    checkAll() {
      this.all = !this.all;
    },
    toggleAll(checked) {
      this.selected = checked ? this.flavours.slice() : [];
    },
    SelectLeague() {
      this.$bvModal.hide(
        this.live ? "modal-Leagues-live" : "modal-Leagues-not-live"
      );
      if (this.selected.length != 0) {
        if (this.oldlive[0] != null) {
          const findA1 = this.oldlive[0].filter(a1 =>
            this.selected.find(a2 => a2 === a1.sbo_tournament_th)
          );
          this.updateMpyZoo(findA1);
        }
        if (this.oldnotlive[0] != null) {
          const findA2 = this.oldnotlive[0].filter(a1 =>
            this.selected.find(a2 => a2 === a1.sbo_tournament_th)
          );
          this.updateMpyZoo(findA2);
        }
      } else {
        if (this.oldlive[0] != null) {
          this.updateMpyZoo(this.oldlive[0]);
        }
        if (this.oldnotlive[0] != null) {
          this.updateMpyZoo(this.oldnotlive[0]);
        }
      }
    }
  },
  created() {
    setTimeout(() => {
      var arr1 = [];
      var arr2 = [];
      arr1.push(this.getlive);
      arr2.push(this.getnotlive);
      this.oldlive = JSON.parse(JSON.stringify(arr1));
      this.oldnotlive = JSON.parse(JSON.stringify(arr2));
    }, 2000);
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
    }
  }
};
</script>

<style scoped></style>
