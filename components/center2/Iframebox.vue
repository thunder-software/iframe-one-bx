<template>
    <div :class="!fulltv ? 'wrapper' : 'wrapper2'" >
      <div :class="!fulltv ? 'h_iframe' : 'h_iframe2'">
          <iframe class="live" :src="urls" height="100%" width="100%" title="description"></iframe>
          <b-button @click="clocetvpop()" :class="!fulltv ? 'btn-close' : 'btn-close2'" title="Close" variant="danger">X</b-button>
          <img src="/icon/fulltv.png" @click="fullscreen()" :class="!fulltv ? 'fullscreen' : 'fullscreen2'" alt="">
      </div>
    </div>
  </template>
  
  <script>
import { mapActions } from 'vuex'
  export default {
    props : ['urls'],
    data() {
      return {
        loadinginpage: true,
        ch : null,
        url : null,
        fulltv : false
      }
    },
    methods: {
      ...mapActions({
        actionsTV : "tvpop/actionsTV"
      }),
      fullscreen(){
        this.fulltv = !this.fulltv;
      },
      clocetvpop(){
        this.actionsTV(null)
      },
      async tvpop(channel){
          let res = await this.$axios.get('/tvpopiframe?ch='+channel);
          this.url = res.data.H5LINKROW;
          this.loadinginpage = false;
      }
    },
    created() {
    //   this.ch = this.$route.query.ch;      
    //   this.tvpop(this.ch);
    },
  }
  </script>
  <style scoped>
    html,body        
      {
        height:100%;
      }
    .wrapper {
      width:100%; 
      height:100%; 
      margin: auto;
      text-align: center;
    }
    .h_iframe iframe {
        width: 1077px;
        height: 514px;
        margin: auto;
    }

    .wrapper2 {
        width:80%; 
        height:100%; margin:0 auto; background:#CCC}
      .h_iframe2 iframe {
        position: fixed;
        top:0;
        left:0;
        width:100%; 
        height:100%;
      }

      .btn-close {
        z-index: 10; 
        position: absolute; 
        right: 0px; 
        top: 0px; 
        cursor: pointer;
      }
      .btn-close2 {
        z-index: 10; 
        position: fixed; 
        right: 0px; 
        top: 0px; 
        cursor: pointer;
      }
      .fullscreen{
        z-index: 10;
        position: absolute;
        width: 25px;
        bottom: 9px;
        left: 10px;
        cursor: pointer;
      }
      .fullscreen2{
        z-index: 10;
        position: fixed;
        width: 25px;
        bottom: 9px;
        left: 10px;
        cursor: pointer;
      }
      @media screen and (max-width: 1400px) {
        .h_iframe iframe {
          width: 992px;
        }
      }
  </style>