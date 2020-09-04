<template>
    <main>
        <p>App</p>
        <!--just something to show it's rendering-->

        <!-- Render the login component if NO user is selected (selectedUser === null) -->
        <LoginPage v-if="!selectedUser" :users="users" />

        <!-- ELSE render the questions component UNLESS selected user has no answers (selectedUser.answers === {}) -->
        <QuestionsPage v-else-if="!Object.keys(selectedUser.answers).length" />

        <!-- ELSE render the results component -->
        <ResultsPage v-else />
    </main>
</template>

<script>
import LoginPage from "@/components/Login.vue";
import QuestionsPage from "@/components/Questions.vue";
import ResultsPage from "@/components/Results.vue";

import { EIA_API_KEY } from "@/secrets.js";

export default {
    name: "app",
    components: {
        ResultsPage,
        QuestionsPage,
        LoginPage,
    },
    data() {
        return {
            users: null, //this will be the users array returned from the database
            selectedUser: null, //this will be the user selected or created in Login.vue and eventBussed back
            questions: null, //this will be the questions array returned from the database
            countries: null,
        };
    },
    mounted() {
        fetch(
            `http://api.eia.gov/category/?category_id=2622652&api_key=${EIA_API_KEY}`
        )
            .then((res) => res.json())
            .then((data) => {
                const allCountries = data.category.childseries.map((el) => {
                    return fetch(
                        `http://api.eia.gov/series/?api_key=${EIA_API_KEY}&series_id=${el.series_id}`
                    ).then((res) => res.json());
                });
                Promise.all(allCountries).then((data) => {
                    // get world pop data
                    fetch(
                        `http://api.eia.gov/category/?api_key=${EIA_API_KEY}&category_id=2632716`
                    )
                        .then((res) => res.json())
                        .then((popData) => {
                            const allPops = popData.category.childseries.map(
                                (el) => {
                                    return fetch(
                                        `http://api.eia.gov/series/?api_key=${EIA_API_KEY}&series_id=${el.series_id}`
                                    ).then((res) => res.json());
                                }
                            );
                            Promise.all(allPops).then((popData) => {
                                const latest = data.map((el) => {
                                    const country = el.series[0].name.split(
                                        ", "
                                    )[1];
                                    const Mtonnes = el.series[0].data[0][1];
                                    const pop = popData.find(popEl => {
                                      if (popEl.series[0].geography === el.request.series_id.split("-")[2]) {
                                        return popEl;
                                      }
                                    })
                                    // console.log(pop);
                                    let population;
                                    let average;
                                    if (pop) {
                                      const raw = pop.series[0].data[0][1];
                                      if (raw) {
                                        population =  raw * 1000;
                                        average = (Mtonnes*1000000) / population
                                      }
                                    }
                                    return {
                                        country: country,
                                        emissions: Mtonnes*1000000,
                                        population: population,
                                        avg: average
                                    };
                                });
                                console.log(latest);
                                //this.countries = data;
                                console.log(popData);
                            });
                        });
                });
            });
    },
};
</script>

<style>
</style>

http://climatedataapi.worldbank.org/climateweb/rest/v1/country/mavg/tas/2000/2020/GBR