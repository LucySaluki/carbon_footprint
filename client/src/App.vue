<template>
  <main>
    <!--just something to show it's rendering-->
    <HeaderPage />
    <!-- Render the login component if NO user is selected (selectedUser === null) -->
    <LoginPage v-if="!selectedUser" :users="users" :countries="countries" />

    <!-- ELSE render the questions component UNLESS selected user has no answers (selectedUser.answers === {}) -->
    <QuestionsPage
      v-else-if="!Object.keys(selectedUser.answers).length"
      :questions="questions"
      :selectedUser="selectedUser"
    />

    <!-- ELSE render the results component -->
    <ResultsPage v-else :selectedUser="selectedUser"/>
  </main>
</template>

<script>
import LoginPage from "@/components/Login.vue";
import QuestionsPage from "@/components/Questions.vue";
import ResultsPage from "@/components/Results.vue";
import HeaderPage from "@/components/Header.vue";
import QuestionService from "./services/QuestionService";
import UserService from "./services/UserService";

import { eventBus } from "@/main.js";

import { eiaDataApi } from "@/helpers/global_emissions.js";

export default {
  name: "app",
  components: {
    ResultsPage,
    QuestionsPage,
    LoginPage,
    HeaderPage,
  },
  data() {
    return {
      users: null, //this will be the users array returned from the database
      selectedUser: null, //this will be the user selected or created in Login.vue and eventBussed back
      questions: null, //this will be the questions array returned from the database
      globalEmissions: null,
      countries: null
    };
  },
  mounted() {
    this.fetchQuestions();
    this.fetchUsers();

    // grab the countries list from the restcountries api
    fetch("https://restcountries.eu/rest/v2/all")
    .then(res => res.json())
    .then(data => {
      // set UK name to United Kingdom not United Kingdom of Great Britain and Northern Ireland
      data.find(el => el.alpha3Code === "GBR").name = "United Kingdom";
      this.countries = data.sort((a,b) => (a.name >= b.name) ? 1 : -1);
    // then grab global emissions data
      eiaDataApi(this.countries).then((res) => {
        this.globalEmissions = res;
      });
    });

    eventBus.$on("user-selected", (payload) => {
      this.selectedUser = payload;
      this.users.push(payload);
    });

    eventBus.$on("save-answers", (payload) => {
        this.selectedUser.answers = payload;

        // const numPeopleInHouse = parseInt(payload.numPeopleInHouse);
        // const sizeOfHouse = payload.sizeOfHouse;
        // const fuelUsage = payload.fuelUsage;
        // const recycling = payload.recycling;
        // const carsInHousehold = payload.carsInHousehold;
        // const travelByTrain = parseInt(payload.travelByTrain);
        // const travelByBus = parseInt(payload.travelByBus);
        // const travelByPlane = parseInt(payload.travelByPlane);
        // const foodMiles = payload.foodMiles;
        const weeklyDiet = payload.weeklyDiet;

        let score = this.questions.reduce((total, question) => {
          return total + question.basekg
        }, 0);

        let houseScore = 0;

        this.questions[1].answers.forEach((answer) => {
            if (answer.value === payload.sizeOfHouse){
                houseScore += answer.kg
            }
        })

        this.questions[2].answers.forEach((answer) => {
            payload.fuelUsage.forEach((fuel) => {
              if (answer.value === fuel){
                  houseScore += answer.kg
              }
            })
        })

        this.questions[3].answers.forEach((answer) => {
            payload.recycling.forEach((choice) => {
                if (answer.value === choice){
                    houseScore += answer.kg
                }
            })
        })

        this.questions[4].answers.forEach((answer) => {
            if (answer.value === payload.carsInHousehold){
                houseScore += answer.kg
            }
        })
        score += houseScore / payload.numPeopleInHouse;

        score += this.questions[5].answers[0].kg * payload.travelByBus;
            
        score += this.questions[6].answers[0].kg * payload.travelByTrain;

        score += this.questions[7].answers[0].kg * payload.travelByPlane;

        this.questions[8].answers.forEach((answer) => {
            if (answer.value === payload.weeklyDiet){
                score += answer.kg
            }
        })

        this.questions[9].answers.forEach((answer) => {
            if (answer.value === payload.foodMiles){
                score += answer.kg
            }
        })

        this.selectedUser.score = Math.round(score) / 1000;

        UserService.updateUser(this.selectedUser._id, this.selectedUser);
    });
  },
  methods: {
    fetchQuestions() {
      QuestionService.getQuestions().then(
        (questions) => (this.questions = questions)
      );
    },
    fetchUsers() {
      UserService.getUsers().then((users) => {
        this.users = users;

      });
    },
  },
};
</script>

<style>
body {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  color: #098639;
}
</style>
