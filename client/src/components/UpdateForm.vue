<template>
    <main id="main">
        <div>
            <span>Categories: </span>
            <input
                type="button"
                v-for="(category, index) in categories"
                :key="index"
                :value="category"
                class="tab-button"
                v-on:click="showQuestions(category)"
            />
        </div>
        <form v-on:submit.prevent="updateAnswers">
            <article>
                <UpdateItem
                    v-for="(question, index) in  questions"
                    :key="index"
                    :question="question"
                    :selectedUser="selectedUser"
                    :class="question.category + ' hidden'"
                />
            </article>
            <input type="submit" value="Update Answers" />
        </form>
    </main>
</template>

<script>
import { eventBus } from "@/main.js";
import UpdateItem from "@/components/UpdateItem.vue";

export default {
    name: "update-form",
    components: { UpdateItem },
    props: ["questions", "selectedUser"],
    data() {
        return {
            answers: {},
        };
    },
    methods: {
        updateAnswers: function () {
            this.questions.forEach((question) => {
                if (this.answers[question.key] === undefined) {
                    this.answers[question.key] = this.selectedUser.answers[
                        question.key
                    ];
                }
            });
            eventBus.$emit("update-answers", this.answers);
            this.answers = {};
        },
        showQuestions: function (which) {
            const buttons = document.querySelectorAll(".tab-button");
            buttons.forEach(el => el.classList.remove("active"));
            event.target.classList.add("active");
            const elements = document.getElementsByClassName(which);
            elements.forEach((el) => {
                el.classList.remove("hidden");
            });
            const others = this.categories.filter(
                (category) => category !== which
            );
            others.forEach((category) => {
                const elements = document.getElementsByClassName(category);
                elements.forEach((el) => {
                    if (!el.classList.contains("hidden")) {
                        el.classList.add("hidden");
                    }
                });
            });
        },
    },
    mounted() {
        eventBus.$on("question-item-update", (payload) => {
            this.answers[payload.question] = payload.answer;
        });
        this.$nextTick(() => {
            this.showQuestions("home");
            document.querySelector(".tab-button").classList.add("active");
        });
    },
    computed: {
        categories: function () {
            const cats = this.questions.map((item) => item.category);
            return cats.filter((item, i, ar) => ar.indexOf(item) === i);
        },
    },
};
</script>

<style scoped>
#main {
    margin: 40px;
    padding: 10px;
}
article {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: aliceblue;
}
.tab-button {
    margin: 0px;
    height: 50px;
    width: 100px;
    text-transform: capitalize;
    border:none;
    font-size: 1em;
}
.tab-button:hover {
    background-color: #c9c9c9;
}
.active {
    background-color: rgb(76, 155, 76);
    color: white;
}
.active:hover {
    background-color: rgb(61, 110, 61);
}
.hidden {
    display: none;
}
</style>