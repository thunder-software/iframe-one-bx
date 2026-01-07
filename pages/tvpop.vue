<template>
  <!-- <b-overlay :show="loadinginpage" rounded="sm"> -->
    <div class="wrapper" >
      <div class="h_iframe">
        <iframe class="live" :src="url" height="100%" width="100%" title="description"></iframe>
      </div>
    </div>
  <!-- </b-overlay> -->
  </template>
  
  <script>
  export default {
      layout: 'tv',
    // props: ["status","live", "time" , "match"],
    data() {
      return {
        // pathname : null,
        // toDay : moment(new Date()).subtract(11,'hours').format("YYYY-MM-DD")
        // ch : this.$route.name
        loadinginpage: true,
        ch : null,
        url : null
      }
    },
    methods: {
      async tvpop(channel){
          let res = await this.$axios.get('/tvpop?ch='+channel);
          console.log('tvpop',res.data.H5LINKROW);
          // window.open(res.data.H5LINKROW,'','width=660,height=700,scrollbars=no,resizable=no,menubar=no,location=no,copyhistory=no,top=0,left=0');
          this.url = res.data.H5LINKROW;
          // window.open('/tvpop?ch='+channel, '_blank', 'width=768,height=512')
          this.loadinginpage = false;
      }
    },
    created() {
      this.ch = this.$route.query.ch;
      this.tvpop(this.ch);
    },
  }
  </script>
  <style scoped>
  html,body        {height:100%;}
  .wrapper         {
    width:80%; 
    /* max-width: 600px;  */
    height:100%; margin:0 auto; background:#CCC}
  /* .h_iframe        {
    position:relative; 
    padding-top: 56%;
  } */
  .h_iframe iframe {
    /* position:absolute; */
    position: fixed;
    top:0;
    left:0;
    width:100%; 
    height:100%;
  }
  </style>