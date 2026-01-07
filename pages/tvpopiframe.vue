<template>
      <div class="wrapper" >
        <div class="h_iframe">
          <iframe class="live" :src="url" height="100%" width="100%" title="description"></iframe>
        </div>
      </div>
    </template>
    
    <script>
    export default {
        layout: "guest",
      data() {
        return {
          loadinginpage: true,
          ch : null,
          url : null
        }
      },
      methods: {
        async tvpop(channel){
            let res = await this.$axios.get('/tvpopiframe?ch='+channel);
            this.url = res.data.H5LINKROW;
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
      html,body        
        {
          height:100%;
        }
      .wrapper {
        width:80%; 
        height:100%; margin:0 auto; background:#CCC}
      .h_iframe iframe {
        position: fixed;
        top:0;
        left:0;
        width:100%; 
        height:100%;
      }
    </style>