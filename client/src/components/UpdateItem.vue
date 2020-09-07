<template>
    <main>
        <header>
            <h2>{{ question.title}}</h2>
        </header>
   
        <div v-for="(answer, index) in question.answers" :key="index"> 
            <input 
                v-on:change ="handleInput"
                :type="question.type"
                :id="answer.value"
                :value="answer.value"
                v-model="selectedUser.answers[question.key]"
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

    methods: {
    
    },
}
</script>

<style>

</style>