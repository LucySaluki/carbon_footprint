<template>
    <main>
        <header>
            <h2>{{ question.title}}</h2>
        </header>
   
        <div v-for="(answer, index) in question.answers" :key="index"> 
            <input 
                v-on:change ="handleInput"
                v-on:keyup="handleInput"
                :type="question.type"
                :id="answer.value"
                :value="answer.value"
                v-model="inputAnswer"
            />
            <label :for="answer.value">{{ answer.value }}</label>
        </div>
    </main>
</template>

<script>
import {eventBus} from "@/main.js";
export default {
    name: "update-item",
    props: ["question", "selectedUser"],
    data() {
        return {
            inputAnswer: null
        }
    },
    methods: {
        handleInput: function () {
            eventBus.$emit("question-item-update", {
                question: this.question.key,
                answer: (this.question.type === "number") ? Number(this.inputAnswer) : this.inputAnswer,
            });
        },
    },
    mounted() {
        this.inputAnswer = this.selectedUser.answers[this.question.key];
    }
}
</script>

<style></style>