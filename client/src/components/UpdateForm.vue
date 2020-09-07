<template>
<main>
    <form v-on:submit.prevent="updateAnswers">
        <UpdateItem v-for="(question, index) in  questions" :key="index" :question="question" :selectedUser="selectedUser"/>
        <input type="submit" value="Update Answers" />
    </form>
</main>

</template>

<script>
import {eventBus} from "@/main.js";
import UpdateItem from "@/components/UpdateItem.vue";

export default {

    name: "update-form",
    components: {UpdateItem},
    props: ['questions', 'selectedUser'],
    data() {
        return {
            answers: {}
        }
    },
    methods: {
        updateAnswers : function() {
            eventBus.$emit("update-answers", this.answers);
        }

    },


}
</script>

<style>

</style>