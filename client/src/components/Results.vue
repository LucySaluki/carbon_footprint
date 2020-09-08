<template>
  <div>
    <h3>Carbon Footprint comparative results (tonnes of CO2 per annum)</h3>
    <p class="footnote">(please be aware it may take a few seconds for your country data to load)</p>
    <div class="dials">
      <div>
        <ResultsDial :data="newUserScore" />
        <p class="your">Your Result</p>
      </div>
      <div>
        <ResultsDial :data="newUpdateScore" />
        <p class="your-new">Your Updated Result</p>
      </div>
      <div>
        <ResultsDial v-if="globalEmissions" :data="newCountryScore" />
        <p class="your-country" v-if="globalEmissions">The Average for Your Country</p>
      </div>
    </div>
    <EveryoneLikeMe v-if="globalEmissions" :selectedUser="selectedUser" :globalEmissions="globalEmissions" />
    <section v-else>Loading...</section>
    <UpdateForm :selectedUser="selectedUser" :questions="questions" />
  </div>
</template>

<script>
import ResultsDial from "@/components/ResultsDial.vue";
import UpdateForm from "@/components/UpdateForm.vue";
import EveryoneLikeMe from "@/components/EveryoneLikeMe.vue";
export default {
  name: "results",
  props: ["selectedUser", "globalEmissions", "questions"],
  components: {
    ResultsDial,
    UpdateForm,
    EveryoneLikeMe
  },
  data() {
    return {
      newUserScore: [["label", "score"]],
      newCountryScore: [["label", "score"]],
      newUpdateScore: [["label", "score"]],
    };
  },
  mounted() {
    this.getUserScore(this.selectedUser);
    this.startScore(this.selectedUser);
    if (this.globalEmissions) {
      this.loadGlobalEmissions(this.selectedUser);
    }
  },
  methods: {
    getUserScore: function (cUser) {
      const newUserValue = ["CO2", cUser.score];
      this.newUserScore.push(newUserValue);
    },
    startScore: function (cUser) {
      const newUserScoreValue = ["CO2", 0];
      this.newUpdateScore.push(newUserScoreValue);
    },
    loadGlobalEmissions: function (cUser) {
      const emissionCountries = this.globalEmissions;
      const countryAvg = emissionCountries.find(
        (el) => el.country === cUser.country
      );
      const newCountryValue = [
        ["label", "score"],
        ["CO2", countryAvg.avg],
      ];
      this.newCountryScore = newCountryValue;
    },
  },
  watch: {
    globalEmissions: function () {
      this.loadGlobalEmissions(this.selectedUser);
    },
    selectedUser: {
      handler: function () {
        const updatedScore = [
          ["label", "score"],
          ["CO2", this.selectedUser.newScore],
        ];
        this.newUpdateScore = updatedScore;
        const newScoreValue = [
          ["label", "score"],
          ["CO2", this.selectedUser.score],
        ];
        this.newUserScore = newScoreValue;
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.dials {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
}
.dials > div {
  display: flex;
  flex-flow: column;
  text-align: center;
}
.footnote {
  font-size: 75%;
  font-style: italic;
} 
</style>