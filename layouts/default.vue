<template>
  <div>
    <div>
      <!-- <div is="layouts-header" @activePath="activePath($event)" v-if="!iframe"></div> -->
      <div class="container">
        <div class="screen-container">
                <!-- <div class="screen-navbar">
                  <div class="container p-0">
                    <div class="w-full option-menu text-center">
                      <div is="layouts-option-menu"></div>
                    </div>
                  </div>
                </div> -->
          <div class="content-container">
                <div is="layouts-sidebar-left" :pathEvent="path" class="sidebar-left" />
            <div class="content2" style="position: relative">
              <!-- <div is="layouts-menu-center" /> -->
              <div is="layouts-announcement" />
              <Nuxt />
            </div>
            <!-- <div class="sidebar-right" :style="checkBetAll ? 'width: 0px;' : ''">
              <div is="layouts-sidebar-right" />
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment"
import { mapActions , mapGetters } from "vuex";
export default {
  data() {
    return {
      show: false,
      scY: 0,
      scTimer: 0,
      path : null,
      iframe : null,
      checkBetAll : false
    };
  },
  computed: {
    ...mapGetters({
      getselectleague: "selectleaguebutton/getselectleague",
      getclosebetlist: "closebetlist/getclosebetlist",
    })
  },
  created() {
    // this.$auth.strategy.token.set('...')

    // console.log("sss", this.$auth.$storage.getLocalStorage('_token.sanctumToken'))
    // console.log("sss", )

    if(localStorage.getItem('closeBetAll') == '1'){
      this.checkBetAll = true
    }
    
    if(localStorage.getItem('iframe-one')){

      this.$auth.$storage.setUniversal('_token.sanctumToken', this.$auth.$storage.getLocalStorage('_token.sanctumToken'))
      this.$auth.$storage.setUniversal('jojocc', this.$auth.$storage.getCookie('_token.sanctumToken'))
      this.$auth.strategy.token.set(this.$auth.$storage.getLocalStorage('_token.sanctumToken'))


      this.iframe = localStorage.getItem('iframe-one')
        this.iframe = true;
      }else{
        this.iframe = false;
        localStorage.removeItem('iframe-one')
      }
      // localStorage.setItem('Whitelabel',true)
      if (this.$auth.$storage.getUniversal("language") == null) {
      this.fetchLanguage("th");
      this.$auth.$storage.setUniversal("language", "th");
      } else {
      this.fetchLanguage(this.$auth.$storage.getUniversal("language"));
      }
      // for (let i = 0; i < array.length; i++) {
      // }
      if (this.$auth.$storage.getUniversal('price') == null) {
          this.$auth.$storage.setUniversal("price", "MY");
      }
      if (this.$auth.$storage.getUniversal('lineType') == null) {
          this.$auth.$storage.setUniversal("lineType", "FulltimeOnly");
      }
      if (this.$auth.$storage.getUniversal('sortTime') == null) {
          // const date = new Date();
          // date.setHours(date.getHours() - 11);
          // let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]
          // if(weekday == 'Sun' || weekday == 'Sat'){
          //   const Time = new Date().toLocaleTimeString();
          //   console.log('sortTime select default is null',Time,Time < "23:00:00");
          //   if (Time < "23:00:00") {
          //     this.$auth.$storage.setUniversal("sortTime", '06:00-23:00');
          //   }else{
          //     this.$auth.$storage.setUniversal("sortTime", 'Allmatch');
          //   }
          // }
          // this.$auth.$storage.setUniversal("sortTime", "Allmatch");
          this.setSortTime()
      }
      if (this.$auth.$storage.getUniversal('sortBy') == null) {
          this.$auth.$storage.setUniversal("sortBy", "SortByNormal");
      }
        else {
        let fDate = moment().add(1, 'day')
        let day = moment().day()
        let hour= moment().hours()
        let dayOfWeek = moment().format('ddd');
        var obj = {
          //  price : sessionStorage.getItem('price'),
          price : this.$auth.$storage.getUniversal('price'),
          //  fontSize: this.$auth.$storage.getUniversal('fontSize'),
          fontSize: sessionStorage.getItem('fontSize') ? sessionStorage.getItem('fontSize') : '+A',
          sortBy: this.$auth.$storage.getUniversal('sortBy'),
          sortTime: this.$auth.$storage.getUniversal('sortTime'),  
          lineType: this.$auth.$storage.getUniversal('lineType'), //lineType: "SingleLine",
          date: fDate.format('DD/MM/YYYY'),
        }
        
        //  if(['Sun','Sat'].includes(dayOfWeek)){
        //   if( hour > 23 || hour < 6){
            
        //     obj.sortTime = "23:00-11:00"
        //   }
        //   if(  hour >= 6 && hour <=  23){
            
        //     obj.sortTime =  "06:00-23:00"
        //   }
        //  }else{
        //   obj.sortTime = "Allmatch"
        //  }
        //  if (day == 0 || day == 6) {
        //   if (hour >= 23) {
        //     obj.sortTime = "Allmatch"
        //   }else{
        //     obj.sortTime = "23:00-11:00"
        //   }
        //  }
        //this.fetchSelectLeagueButton(obj);
      }

  const date = new Date();
    date.setHours(date.getHours() - 11);
    let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]
    if(weekday == 'Sun' || weekday == 'Sat'){
      const Time = moment(new Date()).format('DD/MM/YYYY HH:mm:ss')
      const TimeFive = moment(date).format('DD/MM/YYYY 23:00:00')
      console.log('sortTime select default pop',Time,Time < TimeFive);
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    // this.$connectToPusher();

    // const channel =  window.Pusher.subscribe('ticket-channel')
    // channel.bind('ticket-change', data => {
    //    console.log('------------------------->',data)
    // })
  },
  methods: {
    ...mapActions({
      fetchLanguage: "language/fetchLanguage",
      fetchSelectLeagueButton: "selectleaguebutton/fetchSelectLeagueButton",
    }),
    activePath(event){
      this.path = event
    },
    handleScroll() {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        clearTimeout(this.scTimer);
        this.scTimer = 0;
      }, 100);
    },
    setSortTime(){
      let display = {
          price : "MY",
          fontSize: "A",
          sortBy: "SortByNormal",
          sortTime: "Allmatch",
          lineType: "FulltimeOnly",
          date:"Allearly"
        }
        const date = new Date();
        date.setHours(date.getHours() - 11);
        let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]
        if(weekday == 'Sun' || weekday == 'Sat'){
          const Time = moment(new Date()).format('DD/MM/YYYY HH:mm:ss')
          const TimeFive = moment(new Date()).format('DD/MM/YYYY 23:00:00')
          console.log('sortTime select null login',Time,Time < TimeFive);
          if (Time < TimeFive) {
            display.sortTime = '06:00-23:00'
          }else{
            display.sortTime = 'Allmatch'
          }
        }
        this.fetchSelectLeagueButton(display);
    },
  },
  watch : {
    getclosebetlist(valuse){
      this.checkBetAll = valuse
    }
  }
};
</script>

<style scoped>
  .responsive-style {
    margin-right: -10rem;
  }

::v-deep ::-webkit-scrollbar {
    width: 7px !important;
    border-radius: 10px;
}
.screen-container {
  position: relative;
  width: 100%;
  min-height: 919px;
  /* background: #f1f2f8; */
  z-index: 100;
  margin-left: -5rem;
}

.screen-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 60px;
}

.content-container {
  padding-top: 0px;
  z-index: -3;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
}

.content-iframe {
  padding-top: 40px;
  z-index: -3;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
}

.style-menu {
  position: sticky;
  top: 80px;
}

.sidebar-left,
.sidebar-right {
  position: sticky;
  top: 0px;
}

.sidebar-left-iframe,
.sidebar-right-iframe {
  position: sticky;
  top: 40px;
  width: 400px;
}

.sidebar-left {
  left: 0;
  font-size: 14px;
  height: 88vh;
  overflow: auto;
  width: 418px;
  z-index: -4;
}
.sidebar-right {
  right: 0;
  z-index: -13;
  width: 411px;
  position: absolute;
  margin-right: -26rem;
}

.sidebar-left-iframe {
  left: 0;
  font-size: 14px;
  height: 88vh;
  overflow: auto;
}
.sidebar-right-iframe {
  right: 0;
  z-index: -13;
}
.announce1 {
  z-index: -3;
  margin-top: 0px;
  position: sticky;
  background: steelblue;
  color: white;
  width: 100%;
  height: 40px;
}

.content2 {
  flex-grow: 1;
  z-index: -3;
  margin-top: 0px;
  width: 106rem;
}

.content2-iframe {
  flex-grow: 1;
  z-index: -3;
  margin-top: 0px;
  width: 106rem;
}

.option-menu {
  background: linear-gradient(to bottom, #89c403 5%, #77a809 100%);
  color: white;
  height: 40px;
  margin-top: 80px;
}

.option-iframe {
  background: linear-gradient(180deg,#0e4372 5%,#4881b4);
  color: white;
  height: 40px;
  margin-top: 0px;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
}

.footer {
  color: rgb(255, 255, 255);
  width: 100%;
  height: 220px;
  align-self: flex-end;
  margin-top: 0px;
  background: 0% 0% / cover rgb(21, 35, 55);
  padding: 30px;
  border-top: 3px solid rgb(255, 204, 18);
}

@media screen and (max-width: 1500px) {
  .screen-container {
    margin-left: 0rem;
  }
}


@media screen and (max-width: 1400px) {
  /* .sidebar-right {
    display: none;
  } */
  .screen-container {
    position: relative;
  }
  .content-container {
    padding-top: 0px;
  }
  .content-iframe {
    padding-top: 40px;
  }
  .sidebar-left {
    width: 426px;
    position: sticky;
    height: 100vh;
  }

  .sidebar-left,
  .sidebar-right {
    top: 0px;
    /* position: inherit; */
  }

  .sidebar-left-iframe {
    width: 426px;
    position: sticky;
    height: 93vh;
  }

  .sidebar-left-iframe,
  .sidebar-right-iframe {
    top: 37px;
  }
  .screen-navbar {
    position: inherit;
    height: 0px;
  }
  .option-menu {
    margin-top: 0px;
    position: fixed;
    top: 79px;
  }

  .option-iframe {
    margin-top: 0px;
    position: fixed;
    top: 0px;
  }
}

@media screen and (max-width: 1300px) {
  .screen-container {
    margin-left: 0rem;
  }
  .sidebar-right {
    position: sticky;
    margin-right: 0rem;
  }
}

@media screen and (max-width: 800px) {
  .sidebar-left{
    top: 0px;
    /* position: inherit; */
  }

  .option-menu {
    margin-top: 0px;
    position: inherit;
    top: 0px;
  }

  .option-iframe {
    margin-top: 0px;
    position: fixed;
    top: 0px;
  }

  .content-container {
    padding-top: 0px;
    top: 0px;
  }

  .content-iframe {
    padding-top: 0px;
  }
}

@media screen and (max-width: 850px) {
  .sidebar-left {
    position: inherit;
  }
}

@media screen and (max-width: 800px) {
.sidebar-left,
  .sidebar-right {
    height: 1000px;
  }
}
</style>
