<template>
<div>
  <GChart id="gauge-chart" :type="chartType" :settings="chartSettings" :data="currentUser" :options="chartOptions"/>
  <p>Your results compared to the average for your country.</p>
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
        width: 400,
        height:400,
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
  props: ['selectedUser', 'globalEmissions'],
  computed: {currentUser: function(){
      if (this.selectedUser) {
        return this.getUserScore(this.selectedUser);
      }
      return null
  }},
  methods: {
    getUserScore: function(cUser){
      const countryUser=cUser.country;
      const currentUser=[['label','score']];
      const newUserScore=['Your C02',cUser.score];
      currentUser.push(newUserScore);
      const emissionCountries=this.globalEmissions
      const countryAvg = emissionCountries.find(el => el.country===countryUser);
      const newCountryScore=['Avg.CO2',countryAvg.avg];
      currentUser.push(newCountryScore);
      return currentUser;
    }
  }
 

}
</script>

<style>

</style>