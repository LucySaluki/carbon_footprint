<template>
    <section>
        <p :class="percentDifference > 100 ? 'bad' : 'good'">There would be <strong>{{ percentDifference }}%</strong> of the current worldwide CO<sub>2</sub> if everyone lived like you</p>
    </section>
</template>

<script>
export default {
    name: "everyone-like-me",
    props: ["selectedUser", "globalEmissions"],
    data() {
        return {
            totalWorldPop: 0,
            totalWorldEmissions: 0,
            hypotheticalWorld: 0,
        };
    },
    methods: {
        calculateTotal: function () {
            this.globalEmissions.forEach((country) => {
                this.totalWorldPop += country.population;
                this.totalWorldEmissions += country.emissions;
            });
        },
    },
    computed: {
        percentDifference: function () {
            const percent =
                (this.hypotheticalWorld / this.totalWorldEmissions) * 100;
            return Math.round(percent);
        },
        userScore: function () {
            return this.selectedUser.score;
        }
    },
    mounted() {
        this.calculateTotal();
        this.hypotheticalWorld = this.selectedUser.score * this.totalWorldPop;
    },
    watch: {
        userScore: function () {
            this.hypotheticalWorld = this.selectedUser.score * this.totalWorldPop;
        }
    }
};
</script>

<style scoped>
p {
    padding: 10px;
    text-align: center;
    margin-top: 10px;
}
.bad {
    background-color: rgb(230, 168, 168);
}
.good {
    background-color: rgb(175, 202, 175);
}
</style>