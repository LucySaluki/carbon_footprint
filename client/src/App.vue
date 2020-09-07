<template>
  <main>
    <HeaderPage />
    <!-- Render the login component if NO user is selected (selectedUser === null) -->
    <LoginPage v-if="!selectedUser" :users="users" :countries="countries" />

    <!-- ELSE render the questions component UNLESS selected user has no score (selectedUser.score === null) -->
    <QuestionsPage
      v-else-if="!selectedUser.score"
      :questions="questions"
      :selectedUser="selectedUser"
    />

    <!-- ELSE render the results component -->
    <ResultsPage v-else :selectedUser="selectedUser" :questions="questions" />
  </main>
</template>

<script>
import LoginPage from "@/components/Login.vue";
import QuestionsPage from "@/components/Questions.vue";
import ResultsPage from "@/components/Results.vue";
import HeaderPage from "@/components/Header.vue";
import QuestionService from "./services/QuestionService";
import UserService from "./services/UserService";
import {calculation} from "@/helpers/calculation.js"

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
      console.log(payload);
      this.selectedUser = payload;
      if (!this.users.find(user => user=== payload)){
        this.users.push(payload);
      }
    });

    eventBus.$on("go-home", () => {
      this.selectedUser = null;
    });

    eventBus.$on("delete-user", (deletedUser) => {
      const index = this.users.findIndex(user => user === deletedUser);
      this.users.splice(index, 1);
    })

    eventBus.$on("save-answers", (payload) => {
        this.selectedUser.score = calculation(payload, this.selectedUser, this.questions)

        UserService.updateUser(this.selectedUser._id, this.selectedUser).then((data) => this.selectedUser = data);
    });

    //////update answers calculation
    eventBus.$on("update-answers", (payload) => {
        this.selectedUser.score = calculation(payload, this.selectedUser, this.questions)

        UserService.updateUser(this.selectedUser._id, this.selectedUser).then((data) => this.selectedUser = data);
    });
        
    eventBus.$on("question-item-update", (payload) => {
        this.selectedUser.answers[payload.question] = payload.answer;
        this.selectedUser.newScore = calculation(this.selectedUser.answers, this.selectedUser, this.questions)
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
