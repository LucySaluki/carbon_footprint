<template>
  <div>
    <h3>Carbon Footprint comparative results (tonnes of CO2 per annum)</h3>
    <p class="footnote">(please be aware it may take a few seconds for your country data to load)</p>
    <div class="dials">  
      <p class="your">Your Result</p>
      <ResultsDial :data="newUserScore" />
      <p class="your-new">Your Updated Result</p>
      <ResultsDial :data="newUpdateScore" />
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
    newCountryScore:[['label','score']],
    newUpdateScore:[['label','score']]
  }},
  mounted() {
        this.getUserScore(this.selectedUser);
        this.startScore(this.selectedUser);
      },
  methods: {
    getUserScore: function(cUser){
      const newUserValue=['CO2',cUser.score];
      this.newUserScore.push(newUserValue);
    },
    startScore:function(cUser) {
      const newUserScoreValue=['CO2',this.selectedUser.newScore];
      this.newUpdateScore.push(newUserScoreValue);
    }
  },
  watch: {
    globalEmissions:function(){
      const currUser=this.selectedUser.country;
      const emissionCountries=this.globalEmissions;
      const countryAvg = emissionCountries.find(el => el.country===currUser);
      const newCountryValue=['CO2',countryAvg.avg];
      this.newCountryScore.push(newCountryValue);
    },
    selectedUser:{
      handler:function() {
      if (this.selectedUser.newScore!==this.selectedUser.score) {
        const updatedScore = [['label','score'],['CO2',this.selectedUser.newScore]]
        this.newUpdateScore=updatedScore;
      }
    },
    deep:true
    }
  }
}
</script>

<style scoped>
.your {
  grid-area: title1;
  justify-self:center;
}
.your-new {
  grid-area: title2;
  justify-self:left;
  padding-left:30px;
}
.your-country {
  grid-area:title3;
}
.dials > ResultsDial {
  grid-area: dial;
}
.dials {
  display: grid;
  grid-template-columns: 300px 300px 300px;
  grid-template-rows: auto;
  grid-template-areas: 
    "dial dial dial "
    "title1 title2 title3";
}
.footnote {
  font-size: 75%;
  font-style: italic;
}
</style>