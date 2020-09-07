<template>
  <div>
    <h3>Carbon Footprint comparative results (tonnes of CO2 per annum)</h3>
    <ResultsDial :selectedUser="selectedUser" :globalEmissions="globalEmissions"/>
  </div>
</template>

<script>
import ResultsDial from "@/components/ResultsDial.vue";
export default {
  name: "results",
  props: ["selectedUser",'globalEmissions'],
  components: {
    ResultsDial
  }

}
</script>

<style>

</style>