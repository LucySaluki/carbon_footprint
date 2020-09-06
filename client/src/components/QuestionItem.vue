<template>
    <section>
        <header>
            <h2>{{ question.title }}</h2>
        </header>
        <main>
            <div v-for="(answer, index) in question.answers" :key="index">
                <input
                    v-on:change="handleInput"
                    :type="question.type"
                    :id="answer.value"
                    :value="answer.value"
                    v-model="inputAnswer"
                />
                <label :for="answer.value">{{ answer.value }}</label>
            </div>
        </main>
    </section>
</template>

<script>
import { eventBus } from "@/main.js";
export default {
    name: "question-item",
    props: ["question"],
    data() {
        return {
            inputAnswer: [],
        };
    },
    methods: {
        handleInput: function () {
            if (this.question.type === "number") {

            }
            eventBus.$emit("question-item-input", {
                question: this.question.key,
                answer: (this.question.type === "number") ? Number(this.inputAnswer) : this.inputAnswer,
            });
        },
    },
};
</script>

<style>
section {
    background-color: #E0F8CD;
}
</style>