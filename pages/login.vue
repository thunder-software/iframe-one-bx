<template>
  <div>
    <b-container v-if="!this.$route.query.userToken">
      <b-row>
        <b-col class="mx-auto mt-40" lg="4" md="6" sm="8">
          <b-card no-body class="box-shadow">
            <template #header>
              <h1 style="font-size: 18px; font-weight: 600" class="m-0">
                <b-img src="/icon-lsm.png" class="inline-block" width="30" /><span class="ml-1"> Lsm Sport Loing</span>
              </h1>
            </template>
            <b-card-body>
              <b-alert variant="danger" v-if="!!errors.username" show dismissible>
                {{ errors.username[0] }}
              </b-alert>
              <b-form @submit.prevent="login">
                <b-form-group label="Username:" label-for="username" description="">
                  <b-input-group>
                    <template #prepend>
                      <b-input-group-text>
                        <b-icon icon="person-fill"></b-icon>
                      </b-input-group-text>
                    </template>
                    <b-form-input id="username" v-model="form.username" :state="getState('message')" type="text"
                      required></b-form-input>
                  </b-input-group>
                </b-form-group>

                <b-form-group label="Password:" label-for="password">
                  <b-input-group>
                    <template #prepend>
                      <b-input-group-text>
                        <b-icon icon="lock-fill"></b-icon>
                      </b-input-group-text>
                    </template>
                    <b-form-input id="password" type="password" :state="getState('message')" v-model="form.password"
                      required></b-form-input>
                  </b-input-group>
                </b-form-group>
                <div class="">

                  <b-row class="mx-0 mt-4" v-if="error_partner != null"
                    style="background: #fed4d4; border-radius: 4px; height: 38px">
                    <b-col cols="12">
                      <b-table-simple small borderless>
                        <b-tbody>
                          <b-tr>
                            <b-td v-if="error_partner != undefined" style="background: none; border: 0px;">
                              <div class="mt-1.5" style="position: absolute;">
                                <small style="color: slategrey;">
                                  {{
                                    error_partner == undefined
                                      ? null
                                      : error_partner
                                  }}
                                </small>
                              </div>
                            </b-td>
                          </b-tr>
                        </b-tbody>
                      </b-table-simple>
                    </b-col>
                  </b-row>

                  <b-row class="mt-4">
                    <b-col cols="6" lg="6">
                      <b-button type="submit" variant="" class="w-full btn-login">ล็อคอิน</b-button>
                    </b-col>
                    <b-col cols="6" lg="6" class="text-right">
                      <span class="float-righttext-primary cursor-pointer" @click="changepass()">ลืมรหัสผ่าน ?</span>
                    </b-col>
                  </b-row>
                </div>
              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import moment from "moment"
import { mapActions } from "vuex";


export default {
  layout: "guest",
  data() {
    return {
      checklang: 'th',
      form: {
        username: "LSM12_0t01",
        password: "123456"
      },
      error_partner: null,
      message: null,
      iframe: false,
    };
  },
  mounted() {
    console.log('mmmmm')
    // this.$connectToPusher();

    // const channel =  window.Pusher.subscribe('channel-event')
    // channel.bind('event-change', data => {
    //    console.log(data)
    // })

  },
  methods: {
    ...mapActions({
      fetchLanguage: "language/fetchLanguage",
      fetchSelectLeagueButton: "selectleaguebutton/fetchSelectLeagueButton",
    }),
    async login(event) {
      this.error_partner = null;
      this.$nuxt.$loading.start();
      event.preventDefault();
      try {
        console.log("logging in");
        await this.$auth.loginWith("sanctumToken", { data: this.form });
        console.log("logged in--------------------");
        this.$store.dispatch('ads/showAdsOnLogin');
        this.$router.push({ path: '/' })
        this.$nuxt.$loading.finish();
      } catch (err) {
        console.log(err.response);
        this.$nuxt.$loading.finish();
      }
    },
    changepass() {
      this.$router.push({ path: "/changepassword" });
    },
    getState(key) {
      if (this.errors[key] && this.errors[key].length > 0) {
        return false;
      }

      return null;
    },

    async loginToken() {
      localStorage.removeItem('iframe')
      localStorage.removeItem('iframe-one')
      localStorage.removeItem('filterSport')
      this.$auth.$storage.removeUniversal('price')
      this.$auth.$storage.removeUniversal('lineType')
      this.$auth.$storage.removeUniversal('sortTime')
      // this.$auth.$storage.removeLocalStorage('sortTime')
      // this.$auth.$storage.removeCookie('sortTime')
      this.$auth.$storage.removeUniversal('sortBy')
      console.log('remove sortTime');

      if (this.$route.query.Whitelabel) {
        localStorage.setItem('Whitelabel', this.$route.query.Whitelabel)
      } else {
        localStorage.removeItem('Whitelabel')
      }
      if (this.$route.query.userToken) {
        try {
          console.log("logging in token");
          await this.$auth.loginWith("sanctumToken", {
            data: { userToken: this.$route.query.userToken, lang: this.$route.query.lang }
          });

          this.$store.dispatch('ads/showAdsOnLogin');
          localStorage.setItem('pack', this.$route.query.userToken)
          console.log("logged in token --------------------");
          if (this.$route.query.lang) {
            this.ChangeLang(this.$route.query.lang)
          }

          if (this.$route.query.page == 'step') {
            this.$router.push({ path: '/football/step?s=top-menu' })
          } else if (this.$route.query.page == 'mixparlay') {
            this.$router.push({ path: '/football/mixparlay?s=top-menu' })
          } else if (this.$route.query.page == 'football') {
            this.$router.push({ path: '/football/all' })
          } else if (this.$route.query.page == 'early') {
            this.$router.push({ path: '/football/early' })
          } else if (this.$route.query.page == 'basketball') {
            this.$router.push({ path: '/basketball/all' })
          } else if (this.$route.query.page == 'muaythai') {
            this.$router.push({ path: '/muaythai/all' })
          } else if (this.$route.query.page == 'snooker') {
            this.$router.push({ path: '/snooker/all' })
          } else {
            this.$router.push({ path: '/football/all' })
          }

          if (this.$route.query.defulttable == 44) {
            this.$router.push({ path: '/muaythai/all' })
          }

          this.setSortTime();
          this.$nuxt.$loading.finish();
        } catch (err) {
          console.log(err.response);
          this.$router.push({ path: '/login' })
          this.$nuxt.$loading.finish();
        }
      }
    },
    setSortTime() {
      let display = {
        price: "MY",
        fontSize: "A",
        sortBy: "SortByNormal",
        sortTime: "Allmatch",
        lineType: "FulltimeOnly",
        date: "Allearly"
      }
      const date = new Date();
      date.setHours(date.getHours() - 11);
      let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]
      if (weekday == 'Sun' || weekday == 'Sat') {
        // const Time = new Date().toLocaleTimeString();
        const Time = moment(new Date()).format('DD/MM/YYYY HH:mm:ss')
        const TimeFive = moment(new Date()).format('DD/MM/YYYY 23:00:00')
        const TimeFour = moment(new Date()).format('DD/MM/YYYY 10:59:59')
        console.log('sortTime select login', Time, Time < TimeFive && Time > TimeFour);
        if (Time < TimeFive && Time > TimeFour) {
          display.sortTime = '06:00-23:00'
          // this.$auth.$storage.setUniversal("sortTime", '06:00-23:00');
          // this.$auth.$storage.setCookie("sortTime", '06:00-23:00')
          // this.$auth.$storage.setLocalStorage("sortTime", '06:00-23:00')
        } else {
          display.sortTime = 'Allmatch'
          // this.$auth.$storage.setUniversal("sortTime", 'Allmatch');
          // this.$auth.$storage.setCookie("sortTime", 'Allmatch')
          // this.$auth.$storage.setLocalStorage("sortTime", 'Allmatch')
        }
      }

      this.fetchSelectLeagueButton(display);
    },
    async ChangeLang(lang) {
      this.checklang = lang;
      await this.$axios.post('change-language', { lang: this.checklang });
      this.$auth.$storage.setUniversal("language", this.checklang);
      await this.fetchLanguage(this.checklang);
    },
  },
  created() {
    this.$auth.$storage.removeUniversal("language");
    this.loginToken()

  },
  watch: {
    errors(val) {
      if (val.message) {
        this.error_partner = [];
        this.error_partner = val.message;
      }
    }
  }
};
</script>

<style scoped>
.box-shadow {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border: 1px solid #dddddd;
}

.card-header {
  background: linear-gradient(0deg,
      rgba(80, 107, 145, 1) 0%,
      rgba(24, 40, 60, 1) 100%);
  border-bottom: 2px solid #ffd40c;
  color: white;
}

.btn-login {
  background: rgb(255, 204, 18);
  border: 0px;
  color: rgb(51, 51, 51);
}
</style>
