<template>
  <div>
    <!-- <perfect-scrollbar> -->
    <!-- <b-row class="modal-announcement text-danger text-center block p-4" style="display: block;">
      <div class="text-bold">
        ⚠️ เรียนสมาชิก ทุกท่านหวยตัวเก่าได้ปิดบริการลงแล้ว บริษัทจึงมีหวยใหม่มาให้ บริการ ให้เอเย่นทุกท่านเข้าไปตั้งค่าเปิดให้บริการสมาชิกด้วย ⚠️
        <br>
        🙏 เรียนเพื่อให้ทราบทุกท่านขอบคุณครับ 🙏
      </div>
    </b-row> -->
    <b-row class="modal-announcement" v-for="(item, i) in announces.data" :key="i">
      
        <b-col cols="12" md="3" class="py-3 border-sy">
          <div class="block">
            <span>{{ getOnlyDate(item.date_time) }}</span> <span >{{ getOnlyTime(item.date_time) }}</span>
          </div>
        </b-col>
        <b-col cols="12" md="9" class="py-3 border-sy">
          <div style="word-break: break-word;"  v-html="item['content' + _keyLang] ? item['content' + _keyLang] : item['content_en']">
          </div>
        </b-col>
      
    </b-row>
    <div class="mt-3">
      <b-pagination
      @input="getdataannounce()"
      v-model="curPage"
      :total-rows="totalAll"
      :per-page="perPage"
      :first-text="trans('paginate.first')"
      :prev-text="trans('paginate.prev')"
      :next-text="trans('paginate.next')"
      :last-text="trans('paginate.last')"
      size="sm"
      pills
    >
      </b-pagination>

    </div>

    <!-- </perfect-scrollbar> -->
  </div>
</template>
<script>
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      announces: [],
      curPage: 1,
      frompage:1,
      perPage: 1,
      totalAll: 1,
      
    };
  },
  computed: {
    ...mapGetters({
      // getannounce: "announce/getannounce",
      lang: "language/langs",
    }),
  },
  methods: {
    ...mapActions({
      // fetchannounce: "announce/fetchannounce",
    }),
    async getdataannounce(){
      let response =  await this.$axios.get("/announces",{ params: {page: this.curPage}});
       this.announces = response.data
       this.frompage = response.data.meta.from
       this.curPage = response.data.meta.current_page
       this.perPage = response.data.meta.per_page
       this.totalAll = response.data.meta.total
       
    },
    getOnlyDate(date) {
      return moment(date).format('YYYY-MM-DD')
    },
    getOnlyTime(time) {
      return moment(time).format('HH:mm:ss')
    }
  },
  async created() {
    await this.getdataannounce()
    // this.announces = this.getannounce;
  },
};
</script>
<style scoped>
.modal-announcement{
  border: 1px solid #E0E0E0;
  /* padding: 2px; */
  border-radius: 0px;
  margin-bottom: 10px;
}
/* .modal-announcement:last-child>.border-sy {
  border-bottom: 0;
  padding-bottom: 0 !important; 
} */
.border-sy {
  background: #2c2c2c;
}

.ps {
  height: 700px;
}
</style>
