<template>
    <main>
        <p>App</p>
        <!--just something to show it's rendering-->
        <HeaderPage/>
        <!-- Render the login component if NO user is selected (selectedUser === null) -->
        <LoginPage v-if="!selectedUser" :users="users" />

        <!-- ELSE render the questions component UNLESS selected user has no answers (selectedUser.answers === {}) -->
        <QuestionsPage v-else-if="!Object.keys(selectedUser.answers).length" :questions="questions" :selectedUser="selectedUser" />

        <!-- ELSE render the results component -->
        <ResultsPage v-else />
    </main>
</template>

<script>
import LoginPage from "@/components/Login.vue";
import QuestionsPage from "@/components/Questions.vue";
import ResultsPage from "@/components/Results.vue";
import HeaderPage from "@/components/Header.vue"
import QuestionService from './services/QuestionService';
import UserService from './services/UserService';

import { eiaDataApi } from "@/helpers/global_emissions.js";

export default {
    name: "app",
    components: {
        ResultsPage,
        QuestionsPage,
        LoginPage,
        HeaderPage
    },
    data() {
        return {
            users: null, //this will be the users array returned from the database
            selectedUser: null, //this will be the user selected or created in Login.vue and eventBussed back
            questions: null, //this will be the questions array returned from the database
            globalEmissions: null
        };
    },
    mounted() {
        this.fetchQuestions();
        this.fetchUsers();

        eiaDataApi().then(res => this.globalEmissions = res);
    },
    methods: {
        fetchQuestions() {
            QuestionService.getQuestions()
            .then(questions => this.questions = questions);
        },
        fetchUsers() {
            UserService.getUsers()
            .then(users => this.users = users);
        }
    }
};
</script>

<style>
body {
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
</style>
