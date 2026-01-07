<template>
  <div>
     <center2-football></center2-football>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  created() {
      this.$router.push({ path: "/football/all" });
  }
};
</script>
