<template>
  <div>
    <b-row class="my-2">
      <b-col cols="12">
        <!-- <b-icon
          icon="filter-circle-fill"
          class="inline-block text-white"
          style="margin-top: 3px"
        ></b-icon>
        <h5 class="inline-block text-white">{{ trans("header.rules") }}</h5> -->
      </b-col>
    </b-row>
    <b-row v-for="(item, i) in rules" :key="i" class="mb-2">
      <b-col cols=12>
        <b-card header-tag="div">
          <template #header>
            <span>
              {{ item["sport_name" + _keyLang] ? item["sport_name" + _keyLang] : item["sport_name_en"] }}</span>
          </template>
          <div class="rules" v-html=" item['detail' + _keyLang] ? item['detail' + _keyLang] : item['detail_en']"></div>
        </b-card>
      </b-col>
    </b-row>
    <button class="btn btn-light btn-sm" style="float: right;" @click="versionMobile()">V.1.1.1</button>
  </div>
  <!-- <div class="mt-4">
        <div class="mb-2">

        </div>
        <b-card no-body  v-for="(item,i) in this.rules.data.data" :key="i" class="mb-2" >
          <template #header>
            <span>{{item['sport_name'+_keyLang] ? item['sport_name'+_keyLang]  : item['sport_name_en'] }}</span>
          </template>
          <b-card-body style="padding: 12px; !important ">
            <b-row>
              <b-col cols="12">
                <div class="rules" v-html="item['detail'+_keyLang] ? item['detail'+_keyLang]  : item['detail_en'] "></div>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
    </div> -->
</template>
<script>
export default {
  data() {
    return {
      rules: [],
      sport_type_id: null,
    };
  },
  computed: {},
  methods: {
    async factRules() {
      const {data: { data }} = await this.$axios.get("/rules", { params: { sport_type_id: this.sport_type_id } });
      this.rules = data;
    },
    versionMobile(){
      window.open("https://m.lsmsportsbook.com/login?userToken="+localStorage.getItem('pack')+"&lang="+this.$auth.$storage.getUniversal("language"));
    }
  },
  async created() {
    await this.factRules();
  },
};
</script>

<style lang="scss" scoped>
div.rules ol {
  list-style: decimal;
}
::v-deep .card {
  background : white !important;
}
</style>
