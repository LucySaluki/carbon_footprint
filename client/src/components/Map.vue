<template>
    <div>
    <h3>World Carbon Dioxide Production per Capita (tonnes)</h3>
    <GChart id="gauge-chart" :type="chartType" :settings="chartSettings" :data="mapData" :options="chartOptions"/>
    </div>
</template>

<script>
import { GChart } from 'vue-google-charts';
import { GEO_API_KEY } from "../secrets.js";

export default {
    name:'map-page',
    components: {
    GChart
  },
  data () {
    return { 
      chartType:"GeoChart",
      chartSettings:{
        packages:['geochart']
      },
      chartOptions:{
        mapsApiKey: GEO_API_KEY
      }
    }
  },
  props: ['globalEmissions'],
  computed: {mapData: function() {
      const mapData=[['Country','Value']];
      const countryData=["Sweden",6.4];
      mapData.push(countryData);
      console.log(mapData);
      return mapData;
  }}
}
</script>

<style>

</style>