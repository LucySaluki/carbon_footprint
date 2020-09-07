<template>
    <div>
    <h3>MapTitle</h3>
    <GChart id="gauge-chart" :type="chartType" :settings="chartSettings" :data="mapData"/>
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
      chartType:"Geochart",
      chartSettings:{
        packages:['geochart'],
        mapsApiKey: GEO_API_KEY
      }
    }
  },
  props: ['globalEmissions'],
  computed: {mapData: function() {
      const mapData=[['country','value']];
      const countryData=["Sweden",6.4];
      mapData.push(countryData);
      console.log(mapData);
  }}
}
</script>

<style>

</style>