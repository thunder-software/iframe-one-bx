<template>
  <div>
    <div v-for="(item , i) in setData" :key="i">
        <div v-for="(teams , index) in item.data" :key="index">
            <span v-if="index == 0">
                {{ teams.tournament.name_th }}
            </span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props : ['setData']
}
</script>

<style>

</style>