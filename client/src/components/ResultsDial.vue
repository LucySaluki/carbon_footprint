<template>
<div>
  <GChart id="gauge-chart" :type="chartType" :settings="chartSettings" :data="data" :options="chartOptions"/>
</div>
</template>

<script>
import { GChart } from 'vue-google-charts';

export default {
    name: "results-page",
    components: {
    GChart
  },
  data () {
    return {
      chartOptions: {
        width: 200,
        height:200,
        redFrom:18, redTo: 20,
        yellowFrom:12, yellowTo: 18,
        minorTicks: 1,
        max:20
      },
      chartType:"Gauge",
      chartSettings:{
        packages:['corechart', 'gauge']
      }
    }
  },
  props: ['data'],
}
</script>

<style>

</style>