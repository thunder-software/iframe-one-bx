<template>
  <small
    class="text-primary"
    v-if="
      match.priceGroups.Handicap != undefined &&
        match.priceGroups.Handicap[index - 1] != undefined
    "
    >{{ match.priceGroups.Handicap[index - 1].point }}</small
  >
</template>

<script>
export default {
  props: ["match", "index"]
};
</script>
