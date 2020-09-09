<template>
    <main>
        <header>
            <h2>{{ question.title }}</h2>
        </header>
        <div>
            <div v-for="(answer, index) in question.answers" :key="index">
                <input
                    v-on:change="handleInput"
                    v-on:keyup="handleInput"
                    v-on:input="handleInput"
                    :type="question.type"
                    :id="answer.value"
                    :value="answer.value"
                    v-model="inputAnswer"
                    min=0
                />
                <label :for="answer.value">{{ answer.value }}</label>
            </div>
        </div>
    </main>
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
            if (this.inputAnswer === "" && this.question.type === "number") {
                this.inputAnswer = 0;
            }
            eventBus.$emit("question-item-input", {
                question: this.question.key,
                answer: (this.question.type === "number") ? Number(this.inputAnswer) : this.inputAnswer,
            });
        },
    },
};
</script>

<style scoped>
main {
    margin: 10px;
    display: grid;
    grid-template-rows: auto 1fr;
}
header {
    border-bottom: 2px solid rgb(128, 141, 128);
    padding: 10px 10px;
    margin: 10px 5px;
}
header > h2 {
    margin: 0px;
}
main > div {
    background-color: rgba(102, 167, 102, 0.2);
    padding: 10px;
    display: flex;
    flex-flow: column nowrap;
}
</style>