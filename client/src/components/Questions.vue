<template>
<main>
<form v-on:submit.prevent="saveAnswers">
    <QuestionItem v-for="(question, index) in questions" :key="index" :question="question"  />
    <input v-if="okToSubmit" type="submit" value="Save Answers" />
    <input v-else type="submit" value="Please answer all the questions!" disabled />
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
            answers: {},
            okToSubmit: false
        }
    },
    methods: {
        saveAnswers: function () {
              this.questions.forEach(question => {
                if (this.answers[question.key] === undefined) {
                    this.answers[question.key] = [];
                }
            });
            eventBus.$emit("save-answers", this.answers);
        },
        questionsFilled: function () {
            const filtered = this.questions.filter(question => question.type !== "checkbox");
            const keys = filtered.map(question => question.key);
            for (let key of keys) {
                if (this.answers[key] === undefined) {
                    return false;
                }
            }
            return true;
        }
    },
    mounted() {
        eventBus.$on("question-item-input", (payload) => {
            this.answers[payload.question] = payload.answer;
            this.okToSubmit = this.questionsFilled();
        })
    },

}
</script>

<style>
input {
    margin: 0px 6px;
}
</style>