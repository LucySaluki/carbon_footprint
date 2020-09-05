<template>
  <main>
    <p>App</p>
    <!--just something to show it's rendering-->
    <HeaderPage />
    <!-- Render the login component if NO user is selected (selectedUser === null) -->
    <LoginPage v-if="!selectedUser" :users="users" />

    <!-- ELSE render the questions component UNLESS selected user has no answers (selectedUser.answers === {}) -->
    <QuestionsPage
      v-else-if="!Object.keys(selectedUser.answers).length"
      :questions="questions"
      :selectedUser="selectedUser"
    />

    <!-- ELSE render the results component -->
    <ResultsPage v-else />
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
    };
  },
  mounted() {
    this.fetchQuestions();
    this.fetchUsers();

    eiaDataApi().then((res) => (this.globalEmissions = res));

    eventBus.$on("save-answers", (payload) => {
        this.selectedUser.answers = payload;

        const numPeopleInHouse = parseInt(payload.numPeopleInHouse);
        const sizeOfHouse = payload.sizeOfHouse;
        const fuelUsage = payload.fuelUsage;
        const recycling = payload.recycling;
        const carsInHousehold = payload.carsInHousehold;
        const travelByTrain = parseInt(payload.travelByTrain);
        const travelByBus = parseInt(payload.travelByBus);
        const travelByPlane = parseInt(payload.travelByPlane);
        const foodMiles = payload.foodMiles;
        const weeklyDiet = payload.weeklyDiet;

        let score = this.questions.reduce((total, question) => {
          return total + question.basekg
        }, 0);

        let houseScore = 0;

        this.questions[1].answers.forEach((answer) => {
            if (answer.value === sizeOfHouse){
                houseScore += answer.kg
            }
        })

        this.questions[2].answers.forEach((answer) => {
            fuelUsage.forEach((fuel) => {
              if (answer.value === fuel){
                  houseScore += answer.kg
              }
            })
        })

        this.questions[3].answers.forEach((answer) => {
            recycling.forEach((choice) => {
                if (answer.value === choice){
                    houseScore += answer.kg
                }
            })
        })

        this.questions[4].answers.forEach((answer) => {
            if (answer.value === carsInHousehold){
                houseScore += answer.kg
            }
        })
        score += houseScore / numPeopleInHouse;

        score += this.questions[5].answers[0].kg * travelByBus;
            
        score += this.questions[6].answers[0].kg * travelByTrain;

        score += this.questions[7].answers[0].kg * travelByPlane;

        this.questions[8].answers.forEach((answer) => {
            if (answer.value === weeklyDiet){
                score += answer.kg
            }
        })

        this.questions[9].answers.forEach((answer) => {
            if (answer.value === foodMiles){
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

        // dev push selectedUser
        this.selectedUser = users[1];
      });
    },
  },
};
</script>

<style>
body {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
</style>
