<template>
<main>
<form v-on:submit.prevent="saveAnswers">
    <QuestionItem v-for="(question, index) in questions" :key="index" :question="question"  />
    <input type="submit" value="Save Answers" />
</form>

</main>

</template>

<script>
import {eventBus} from "@/main.js";
import QuestionItem from "@/components/QuestionItem.vue";
export default {
    name: "questions-page",
    components: { QuestionItem },
    props: ["questions", "selectedUser"],
    data() {
        return {
            answers: {}
        }
    },
    methods: {
        saveAnswers: function () {
              this.questions.forEach(question => {
                if (!this.answers[question.key]) {
                    this.answers[question.key] = [];
                }
            });
            eventBus.$emit("save-answers", this.answers);
        }
    },
    mounted() {
        eventBus.$on("question-item-input", (payload) => {
            this.answers[payload.question] = payload.answer;
        })
    }

}
</script>

<style>
input {
    margin: 0px 6px;
}
</style>