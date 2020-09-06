<template>
<div>
  <h3>Your Carbon Footprint</h3>
  <GChart id="gauge-chart" :type="chartType" :settings="chartSettings" :data="currentUser" :options="chartOptions"/>
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
        title: "Carbon Footprint (tonnes of CO2 per annum)",
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
  props: ['selectedUser'],
  computed: {currentUser: function(){
      if (this.selectedUser) {
        return this.getUserScore(this.selectedUser);
      }
      return null
  }},
  methods: {
    getUserScore: function(cUser){
      const currentUser=[['label','score']];
      const newUserScore=['C02',cUser.score];
      currentUser.push(newUserScore);
      return currentUser;
    }
  }
 

}
</script>

<style>

</style>