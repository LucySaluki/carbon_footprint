<template>
  <div>
    <h3>Carbon Footprint comparative results (tonnes of CO2 per annum)</h3>
    <ResultsDial :data="newUserScore" />
    <p>Your Results</p>
    <ResultsDial v-if="globalEmissions" :data="newCountryScore"/>
    <p>The Average for Your Country</p>
  </div>
</template>

<script>
import ResultsDial from "@/components/ResultsDial.vue";
export default {
  name: "results",
  props: ['selectedUser', 'globalEmissions'],
  components: {
    ResultsDial
  },
  data(){
    return {
    newUserScore:[['label','score']],
    newCountryScore:[['label','score']]
  }},
  mounted() {
        this.getUserScore(this.selectedUser);
      },
  methods: {
    getUserScore: function(cUser){
      const countryUser=cUser.country;
      const newUserValue=['Your C02',cUser.score];
      this.newUserScore.push(newUserValue);
    }
  },
  watch: {
    globalEmissions:function(){
      const currUser=this.selectedUser.country;
      const emissionCountries=this.globalEmissions;
      const countryAvg = emissionCountries.find(el => el.country===currUser);
      const newCountryValue=['Avg.CO2',countryAvg.avg];
      this.newCountryScore.push(newCountryValue);
    }
  }
}
</script>

<style>

</style>