<template>
  <div>
    <!-- layouts > Header > MenuRight -->
    <div class="style-options font-sy">
      <user-tabs keyw="menuright" :iframe="iframe" ></user-tabs>
    </div>
  </div>
</template>
<script>
export default {
  props : ['iframe'],
  data() {
    return {};
  },
  methods: {
   
  },
};
</script>
<style scoped>
.font-sy {
  font-size: 14px;
  font-weight: 100;
}
</style>
