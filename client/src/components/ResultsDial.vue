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
        redFrom:35, redTo: 50,
        yellowFrom:20, yellowTo: 35,
        minorTicks: 1,
        max:50
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