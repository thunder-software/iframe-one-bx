<template>
  <div>
    <div class="flex">
      <div class="flex-none">
        <b-button variant="" size="sm" class="style-buttom-1 mr-1" @click="switchVersion()" style="margin-top: 6px;margin-left: 10px;">
          <b-icon icon="phone" style="margin-top: 3px"></b-icon>
          <span style="vertical-align: top;">
            {{trans('header.mobileversion')}}
          </span>
        </b-button>
      </div>
      <div class="flex-1 w-64">
        <button
          class="pr-2 cursor-pointer button-st btn-sm"
          @click="linkresults()"
        >
          <b-icon icon="markdown" class="mr-1">&nbsp;</b-icon>
          <span>{{ trans("header.results") }}</span>
        </button>
        &nbsp;
        <button
          class="pr-2 cursor-pointer button-st btn-sm"
          v-b-modal.menubar-announce-table
        >
          <b-icon icon="card-list" class="mr-1">&nbsp;</b-icon>
        <span>{{ trans("header.announcement") }}</span>
        </button>
        <b-modal
          id="menubar-announce-table"
          size="lg"
          hide-footer
          no-close-on-backdrop
        >
          <div class="modal-header">
            <h5 class="modal-title p-3">
              {{ trans("header.announcement") }}
            </h5>
          </div>
          <div class="modal-body">
            <div is="menubar-announce-table"></div>
          </div>
        </b-modal>
        &nbsp;
        <span style="vertical-align: initial ; width: 179px; display: inline-block; font-size: 12px;">
            <span class="mr-2 mt-0 text-white text-right">
              <b-icon icon="smartwatch" /> {{ localTime }}
            </span>
        </span>

        &nbsp;
        <span style="vertical-align: initial ; width: 163px; display: inline-block;">
          <b-form-checkbox v-model="checked" name="check-button" size="sm" variant="primary" switch>
            {{ trans("header.quickbet") }}
          </b-form-checkbox>
        </span>
      </div>
      <div class="flex">
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      localTime: " ",
      checked: false
    };
  },
  mounted() {
    this.showLocaleTime();
  },
  methods: {
    ...mapActions({
      actionsQuickbet: "quickbet/actionsQuickbet"
    }),
    linkresults() {
      window.open("/results", "_blank", "width=768,height=1024");
    },
    async switchVersion() {
      try {
        return (window.location.href =
          "https://mobile.one-allsports.com/login?userToken=" +
          localStorage.getItem("pack"));
      } catch (error) {
        alert("wrong something");
      }
    },
    showLocaleTime() {
      var time = this;
      setInterval(() => {
        time.localTime = moment().format("Y-MM-DD HH:mm:ss");
        // var date = new Date();
        // date.getFullYear() +
        // "-" +
        // (date.getMonth() + 1) +
        // "-" +
        // date.getDate() +
        // " " +
        // date.getHours() +
        // ":" +
        // date.getMinutes() +
        // ":" +
        // date.getSeconds();
      }, 1000);
    }
  },
  watch: {
    checked(value) {
      localStorage.setItem("quickbet", value);
      if (
        this.$route.params.path != "step" &&
        this.$route.params.path != "mixparlay"
      ) {
        this.actionsQuickbet(value);
      }
    }
  },
  created() {
    if (localStorage.getItem("quickbet") == "false") {
      this.checked = false;
      this.actionsQuickbet(false);
    } else {
      this.checked = true;
      this.actionsQuickbet(true);
    }
  }
};
</script>
<style scoped>
.style-buttom-1 {
  box-shadow: inset 0px 1px 0px 0px #f9eca0;
  background: linear-gradient(to bottom, #f0c911 5%, #f2ab1e 100%);
  background-color: #f0c911;
  border-radius: 6px;
  border: 0.5px solid #373737;
  display: inline-block;
  color: #373737;
  font-size: 15px;
  vertical-align: baseline;
  margin: 0px;
  padding: 1px 6px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #ded17c;
}
.modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
  background: #ffffff;
}
.modal-header {
  background: white;
  border-bottom: 1px solid #dee2e6;
}
.modal-content {
  background: white;
}
.button-st {
  text-align: center;
  border: 1.5px double #ffffff;
  background: none;
  height: 27px;
  margin-top: 7px;
  border-radius: 5px;
}
</style>
