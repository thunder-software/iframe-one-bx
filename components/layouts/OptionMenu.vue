<template>
  <div>
    <!-- layouts / OptionMenu -->
    <div :is="iframe != '1' ? 'header-option-menu' : 'header-option-menu-iframe'"></div>
  </div>
</template>

<script>
export default {
data() {
  return {
    iframe : null
  }
},
created() {
  if(localStorage.getItem('iframe')){
      this.iframe = localStorage.getItem('iframe')
    }
},
}
</script>

