<template>
  <main>
    <p>App</p> <!--just something to show it's rendering-->

    <!-- Render the login component if NO user is selected (selectedUser === null) -->
    <LoginPage v-if="!selectedUser" :users="users" />

    <!-- ELSE render the questions component UNLESS selected user has no answers (selectedUser.answers === {}) -->
    <QuestionsPage v-else-if="!Object.keys(selectedUser.answers).length" />

    <!-- ELSE render the results component -->
    <ResultsPage v-else />
  </main>
</template>

<script>
import LoginPage from "@/components/Login.vue";
import QuestionsPage from "@/components/Questions.vue";
import ResultsPage from "@/components/Results.vue";

export default {
    name: "app",
    components: {
        ResultsPage,
        QuestionsPage,
        LoginPage,
    },
    data() {
        return {
            users: null, //this will be the users array returned from the database
            selectedUser: null, //this will be the user selected or created in Login.vue and eventBussed back
            questions: null, //this will be the questions array returned from the database
        };
    },
};
</script>

<style>
</style>