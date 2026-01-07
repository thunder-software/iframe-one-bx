<template>
   <td>
      <small
        class="text-primary" style="font-weight: 600;"
        v-if="
          priceGroups.priceGroups[market_type] != undefined &&
            priceGroups.priceGroups[market_type][index - 1] != undefined && priceGroups.priceGroups[market_type][index - 1].l_percent != null && priceGroups.priceGroups[market_type][index - 1].in_percent != null
        "
        >
         <div v-if="priceGroups.priceGroups[market_type][index - 1].prices[0].price != 0 && priceGroups.priceGroups[market_type][index - 1].prices[1].price != 0" style="display: inline-block;">
          {{ priceGroups.priceGroups[market_type][index - 1].point == '0.0' ? '0' : priceGroups.priceGroups[market_type][index - 1].point}}
        </div>
        </small
      >
      <small v-else>  </small>

</td>
</template>

<script>
export default {
  props: ["priceGroups", 'market_type', "index"]
};
</script>