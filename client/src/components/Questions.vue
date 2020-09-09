<template>
<main id="main">
    <h2>Please answer the following questions:</h2>
<form v-on:submit.prevent="saveAnswers">
    <article>
        <QuestionItem v-for="(question, index) in questions" :key="index" :question="question"  />
    </article>
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

<style scoped>
input {
    margin: 0px 6px;
}
#main {
    margin: 40px;
    padding: 10px;
}
article {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: aliceblue;
}
</style>