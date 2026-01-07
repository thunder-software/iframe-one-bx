<template>
  <div >
    
    <small v-if="live">
      <div>
        <span class="text-success font-semibold">HT</span>
        <!-- <small>
        <b-icon icon="bar-chart"></b-icon>
        <b-img src="/icon/tv.gif" class="inline-block pl-2 pr-0 py-0" />
      </small> -->
        <div class="flex">
          <div class="flex-1">
            <b-icon icon="bar-chart"></b-icon>
          </div>
          <div class="flex-1">
            <b-img src="/icon/tv.gif" class="inline-block pl-2 pr-0 py-0" />
          </div>
        </div>
      </div>
    </small>
    <small v-else>
      <small>
        <span class="text-danger block font-semibold">LIVE</span>
        21:30
      </small>
    </small>
  </div>
 
</template>
<script>
export default {
  props: ["live", "time"],

  created(){
   
  }
};

</script>
