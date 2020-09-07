<template>
  <div>
    <h3>Carbon Footprint comparative results (tonnes of CO2 per annum)</h3>
    <p class="footnote">(please be aware it may take a few seconds for your country data to load)</p>
    <div class="dials">  
      <p class="your">Your Results</p>
      <ResultsDial :data="newUserScore" />
      <p class="your-country" v-if="globalEmissions">The Average for Your Country</p>
      <ResultsDial v-if="globalEmissions" :data="newCountryScore"/>
    </div>
    <UpdateForm :selectedUser="selectedUser" :questions="questions" /> 
  </div>
</template>

<script>
import ResultsDial from "@/components/ResultsDial.vue";
import UpdateForm from "@/components/UpdateForm.vue";
export default {
  name: "results",
  props: ['selectedUser', 'globalEmissions', 'questions'],
  components: {
    ResultsDial,
    UpdateForm
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
      const newUserValue=['C02',cUser.score];
      this.newUserScore.push(newUserValue);
    }
  },
  watch: {
    globalEmissions:function(){
      const currUser=this.selectedUser.country;
      const emissionCountries=this.globalEmissions;
      const countryAvg = emissionCountries.find(el => el.country===currUser);
      const newCountryValue=['CO2',countryAvg.avg];
      this.newCountryScore.push(newCountryValue);
    }
  }
}
</script>

<style scoped>
.your {
  grid-area: title1;
  justify-self:center;
}
.your-country {
  grid-area:title2;
}
.dials > ResultsDial {
  grid-area: dial;
}
.dials {
  display: grid;
  grid-template-columns: 200px 300px;
  grid-template-rows: auto;
  grid-template-areas: 
    "dial dial "
    "title1 title2";
}
.footnote {
  font-size: 75%;
  font-style: italic;
}
</style>