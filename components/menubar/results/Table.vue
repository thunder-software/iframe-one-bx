<template>
  <div class="px-3 py-2">
    <div>
      <b-overlay :show="loading" rounded="sm">
        <menubar-results-filter-result
          :loading="loading"
          :dataresults="getData"
          :sporttype="sporttype"
          @FilterDate="FilterDate($event)"
          @FilterResult="Filtertable($event)"
          @filterType="filterType($event)"
          :lang="lang"
        ></menubar-results-filter-result>
        <div class="sy-tab" v-if="!loading">
          <div v-if="getData.length == 0" class="text-center">
            {{ trans("content.notmatch") }}
          </div>
          <b-card  class="mb-2 h-full"  no-body  style="border: 0px solid; background: none">
            <template #header>
              <b-table-simple small striped hover class="rounded table-results">
                <b-thead class="mb-2">
                  <b-tr>
                    <b-th class="text-left pl-4" style="width: 200px;"><small>เวลาเริ่ม</small></b-th>
                    <b-th class="text-left pl-2" style="width: 400px;"><small>คู่แข่งขัน</small></b-th>
                    <b-th class="text-center" style="width: 200px;"><small>{{sporttype =='football'|| sporttype =='basketball'? 'สกอร์ครึ่งแรก':'ผู้ชนะ'}}</small></b-th>
                    <b-th class="text-center" style="width: 200px;"><small>{{sporttype =='football' || sporttype =='basketball'? 'สกอร์เต็มเวลา' :'Round'}}</small></b-th>
                    <b-th class="text-center" style="width: 200px;"><small>{{sporttype =='football' || sporttype =='basketball'? 'สถานะการเเข่งขัน':''}}</small></b-th>
                  </b-tr>
                </b-thead>
                <b-tbody v-for="(item, i) in getData" :key="i" v-if="sporttype == 'football'|| sporttype == 'basketball'">
                  <b-tr>
                    <b-th colspan="5"  class="text-left"  @click="toggleOpenTable(i)"  >
                      <b-icon  :icon="opened.includes(i)  ? 'caret-down-fill'  : 'caret-up-fill' "></b-icon>
                      <small class="pl-3">  {{item.nn.th }}  </small>
                    </b-th>
                  </b-tr>
                  <b-tr  v-if="opened.includes(i)"  v-for="(dataM, p) in item.m"  :key="p"  >
                    <b-td>
                      <small class="text-left ml-4">
                        {{convertdatetime(dataM.d)}}</small>
                    </b-td>
                    <b-td class="text-left ">
                      <small class="text-left ml-2">{{dataM.n.th.a}}</small>
                      <br />
                      <small class="text-left ml-2">{{dataM.n.th.h}}</small>
                    </b-td>
                    <b-td class="text-center">
                      <small class="align-top">{{ dataM.ht }}</small>
                    </b-td>
                    <b-td class="text-center">
                      <small class="align-top">{{ dataM.ft }}</small>
                    </b-td>
                    <b-td class="text-center">
                      <small class="align-top">{{ dataM.status }}</small>
                    </b-td>
                  </b-tr>
                </b-tbody>

                <b-tbody v-for="(item, i) in getData[i]" :key="i"  v-else>
                  <b-tr>
                    <b-th colspan="5"  class="text-left"  @click="toggleOpenTable(i)"  >
                      <b-icon  :icon="opened.includes(i)  ? 'caret-down-fill'  : 'caret-up-fill' "></b-icon>
                      <small class="pl-3">  {{item.boxing_cat_name }}  </small>
                    </b-th>
                  </b-tr>
                  <b-tr  v-if="opened.includes(i)"  v-for="(dataM, p) in item.list_all"  :key="p"  >
                    <b-td>
                      <small class="text-left ml-4">
                        {{dataM.rs_date}}</small>
                    </b-td>
                     <b-td class="text-left">
                      <small class="text-left ml-2 text-primary">{{dataM.team_red}}</small>
                      <br />
                      <small class="text-left ml-2 text-danger">{{dataM.team_blue}}</small>
                    </b-td>
                    <b-td class="text-center">
                      <small class="align-top">{{ dataM.result }}</small>
                    </b-td>
                    <b-td class="text-center">
                      <small class="align-top">{{ dataM.score_red }} : {{ dataM.score_blue }} </small>
                    </b-td>
                    <b-td class="text-center">
                      <small class="align-top">{{ dataM.status }}</small>
                    </b-td>
                  </b-tr>

                </b-tbody>


              </b-table-simple >
            </template>
          </b-card>

          <!-- <div v-for="(item, i) in getData" :key="i">
            <b-card  class="mt-0 h-full"  no-body  style="border: 0px solid; background: none" >
              <template #header>
                <div v-b-toggle="`collapse-${item.k}`" class="p-2">
                  <b-icon icon="caret-up-fill"></b-icon>
                  <span class="pl-3">
                    {{ lang == "th" ? item.nn.th : item.nn.en }}
                  </span>
                </div>
              </template>
              <b-card-body class="p-0">
                <b-collapse visible :id="`collapse-${item.k}`">
                  <b-table-simple  small  striped  hover  class="rounded table-results">
                    <b-tbody>
                      <b-tr v-for="(dataM, i) in item.m" :key="i">
                        <b-td style="width: 20%">
                          <small class="text-left ml-4">{{
                            convertdatetime(dataM.d)
                          }}</small>
                        </b-td>
                        <b-td class="">
                          <small class="text-left">{{
                            lang == "th" ? dataM.n.th.a : dataM.n.en.a
                          }}</small>
                          <br />
                          <small class="text-left">{{
                            lang == "th" ? dataM.n.th.h : dataM.n.en.h
                          }}</small>
                        </b-td>
                        <b-td class="" style="width: 10%">
                          <small class="align-top">{{ dataM.ht }}</small>
                        </b-td>
                        <b-td class="" style="width: 10%">
                          <small class="align-top">{{ dataM.ft }}</small>
                        </b-td>
                        <b-td class="" style="width: 15%">
                          <small class="align-top">{{ dataM.status }}</small>
                        </b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </b-collapse>
              </b-card-body>
            </b-card>
          </div> -->
        </div>
      </b-overlay>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      lang: this.$auth.$storage.getUniversal("language"),
      dataresults: [],
      dataFilterResult: [],
      checktype: null,
      getsport: { data: { result: {} } },
      oldsport: [],
      flavours: ["Orange", "Grape", "Apple", "Lime", "Very Berry"],
      selected: [],
      allSelected: false,
      indeterminate: false,
      sporttype: "football",
      opened: [],
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      getresults: "results/getresults",
      langs: "language/langs",
    }),
    getData() {
      const result = this.getsport.data.result;
      if (result && this.sporttype == "basketball"){
          this.opened = Array.from(Array(result.length).keys())
        return result;
      }
      if (result && this.sporttype == "football" && result.last1 ){  //result.last1คือเช็คว่าถ้าไม่มีข้อมูลก็ให้ข้อมูลออกไปเป็นค่าว่าง
          let last1 = result.last1
          this.opened = Array.from(Array(last1.length).keys())
        return last1;
      }
      if (result && this.sporttype == "muaythai" && result.res){
          let res = result.res

          this.opened = Array.from(Array(res.length).keys())
        return result;
      }
      if (result && this.sporttype == "cockfight" && result.res){
          let res = result.res
          this.opened = Array.from(Array(res.length).keys())
        return result;
      }
      if (result && this.sporttype == "bullfight" && result.res){
          let res = result.res
          this.opened = Array.from(Array(res.length).keys())
        return result;
      }
      return [];
      // if (this.getsport.data.result) {
      //     if (this.sporttype == "football"){
      //       const result = this.getsport.data.result.last1
      //       this.opened = Array.from(Array(result.length).keys())
      //       return result;

      //     }

      //     if (this.sporttype == "basketball"){
      //       const result = this.getsport.data.result;
      //       this.opened = Array.from(Array(result.length).keys())
      //       return result;
      //     }
      // } else {
      //   return [];
      // }
    },

  },
  methods: {
    ...mapActions({
      fetchResults: "results/fetchResults",
    }),
    toggleOpenTable(id) {
      const index = this.opened.indexOf(id);
      if (index > -1) {
        this.opened.splice(index, 1);
      } else {
        this.opened.push(id);
      }
    },
    filterType(event) {
       this.sporttype = event;
       this.fetchgetsport(event);
    },
    toggleAll(checked) {
      this.selected = checked ? this.flavours.slice() : [];
    },
    FilterDate(date) {
      this.getsport = this.oldsport;
      console.log('getsport',this.getsport);

       const finda1 = this.getsport.data.result.last1.filter((a1) =>
         a1.m.find((a2) => a2.d.substring(0, 10) === date)
       );
       if (this.sporttype == "football")
         this.getsport = { data: { result: { last1: finda1 } } };
       else if (this.sporttype == "basketball")
         this.getsport = { data: { result: finda1 } };
    },
    Filtertable(e) {
      console.log("Filtertable =>", e);
      // this.dataFilterResult = e.leagues;
      // var leagues = e.leagues.map(x=>x.check)
      // console.log(leagues);
      this.getsport = this.oldsport;
      // var type = this.sporttype == 'football' ? this.getsport.data.result.last1 : this.getsport.data.result
      // const finda1 = type.filter((a2) =>  e.find((a1) => a1 === a2.nn.en));
      if (this.sporttype == 'football') {
        let type = this.getsport.data.result.last1
        const finda1 = type.filter((a2) =>  e.find((a1) => a1 === a2.nn.en));
        return  this.getsport = { data: { result: { last1: finda1 } } };
      }
      if (this.sporttype == 'basketball') {
        let type = this.getsport.data.result
        const finda1 = type.filter((a2) =>  e.find((a1) => a1 === a2.nn.en));
        return  this.getsport = { data: { result:finda1} };
      }
      if (this.sporttype == 'muaythai'||this.sporttype == 'cockfight' || this.sporttype == 'bullfight') {
        let type = this.getsport.data.result.res
        const finda1 = type.filter((a2) =>  e.find((a1) => a1 === a2.boxing_cat_name));
        return  this.getsport = { data: { result:{ res: finda1 }} };
      }
      // if (this.sporttype == "football")
      //   this.getsport = { data: { result: { last1: finda1 } } };
      // else if (this.sporttype == "basketball")
      //   this.getsport = { data: { result: finda1 } };
      // this.dataFilterResult = this.dataresults.filter(x=>leagues.includes(x.check))
    },
    async fetchgetsport(type) {
      this.loading = true;
      this.getsport = { data: { result: {} } };
      this.getsport = await this.$axios.get("results-" + type + ".json");
      this.oldsport = JSON.parse(JSON.stringify(this.getsport));
      this.loading = false;
      // this.dataresults = this.getfootball.data.result.last1;
      // this.dataFilterResult = this.dataresults;
    },
  },
  async created() {
    this.fetchgetsport(this.sporttype);
    // await this.fetchResults();
    // console.log("getresults", this.getresults.result);
    // this.dataresults = this.getresults.result.last1;
    // this.dataFilterResult = this.dataresults;
  },
  watch: {
    langs(value) {
      this.lang = value;
    },
    selected(newValue, oldValue) {
      // Handle changes in individual flavour checkboxes
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
  },
};
</script>
<style scoped>
.sy-tab {
  border-radius: 6px;
  background: rgb(255, 255, 255);
  /* padding: 15px; */
  margin-bottom: 20px;
}
.card-header {
  background: #89b4ef;
  color: rgb(0, 0, 0);
  border-radius: 0px;
  border: none;
  padding: 0px 0px;
}
.table-results {
  border-bottom: 1px solid #dde1ef;
  vertical-align: middle;
  padding: 0px;
  height: 40px;
}
.table-results td {
  border-right: none;
  border-top: 1px solid #dde1ef;
  border-left: none;
  vertical-align: middle;
  padding: 0px;
  height: 40px;
  max-width: 30px;
}
</style>
