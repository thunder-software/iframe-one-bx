<template>
  <div>
    <b-navbar toggleable="sm" type="dark" fixed="top" class="p-0 header-sy">
      <b-container class="pc p-0" style="height: 46px">
        <b-navbar-brand class="text-logo" :style="whitelabel ? 'padding-left : 0px' : ''">
          <div is="header-logo"></div>
        </b-navbar-brand>

        <b-navbar-nav class="p-0 menu-pc">
        <b-row class="" style="height: 63px">
            <b-col cols="6" style="margin-top: 12px;">
              <div class="flex sele  ctleague text-secondary">
                <div is="header-select-option"></div>
              </div>
            </b-col>

            <b-col cols="6" class="text-right pr-0" style="margin-top: 5px;">
              <div is="header-user-credit"></div>
            </b-col>

          </b-row>
        </b-navbar-nav>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      curentMatch: null,
      path : '',
      whitelabel : localStorage.getItem('Whitelabel')
      // stylelogo : process.env.STYLE
    };
  },
  async mounted() {
    if(localStorage.getItem('adsHidden') != 'true'){
      await this.fetchBanners();
    }
  },
  methods: {
    ...mapActions({
      fetchBanners: "ads/fetchBanners",
    }),
    async logout() {
      await this.$auth.logout();
      this.$router.push({
        path: "/login"
      });
    },
    goProfile() {
      this.$router.push({
        path: "/profile"
      });
    },
    async switchVersion_whitelabel(){
      try {
        let response = await this.$axios.get("/switchVersion?whitelabel="+this.whitelabel);
        return window.location.href = response.data.url 
      } catch (error) {
        alert('wrong something');
      }
    }
  }
};
</script>

<style scoped>

::v-deep .dropdown-toggle {
  border: 0px solid !important;
}
.menu-pc {
  width: 77%;
  margin: -1px 45px 0px 0px;
  display: block ;
  }

.btn-menu-header {
  border: 0px solid;
  background: none;
  color: #FFFFFF99;
}

.btn-menu-header-active {
  border: 0px solid;
  background: #020b17;
  color: white;
  font-weight: 800;
  border-radius: 10px;
  padding: 8px;
}

.style-buttom-2 {
  box-shadow: inset 0px 39px 0px -24px #e67a73;
  background-color: #e4685d;
  border-radius: 4px;
  border: 1px solid #ffffff;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 15px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #b23e35;
}

@media screen and (max-width: 1400px) {
  .header-sy {
    position: fixed;
  }
}

@media screen and (max-width: 800px) {
  .header-sy {
      position: inherit;
    }
}


@media screen and (max-width: 576px) {
  .menu-pc {
    width: 77%;
    display: block;
    margin: 0px;
  }
}

</style>
