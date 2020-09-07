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
        redFrom:12, redTo: 15,
        yellowFrom:7.5, yellowTo: 12,
        minorTicks: 1,
        max:15
      },
      chartType:"Gauge",
      chartSettings:{
        packages:['corechart', 'gauge']
      }
    }
  },
  props: ['data']
}
</script>

<style>

</style>