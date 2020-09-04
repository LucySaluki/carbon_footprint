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
        };
    },
    mounted() {

      // uses OECD data
      // only 25 results
        const url =
            "https://stats.oecd.org/SDMX-JSON/data/AIR_GHG/AUS+AUT+BEL+CAN+CHL+COL+CZE+DNK+EST+FIN+FRA+DEU+GRC+HUN+ISL+IRL+ISR+ITA+JPN+KOR+LVA+LTU+LUX+MEX+NLD+NZL+NOR+POL+PRT+SVK+SVN+ESP+SWE+CHE+TUR+GBR+USA+EU28+OECDE+OECD+NMEC+ARG+BRA+CHN+CRI+IND+IDN+RUS+ZAF.GHG+CO2.GHG_CAP/all?startTime=2017&endTime=2017&dimensionAtObservation=allDimensions&pid=54d564ae-d39d-4fd5-b448-c5e0d3cbdd56";
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                const countries =
                    data.structure.dimensions.observation[0].values;
                const allData = [];
                for (let i = 0; i < countries.length; i++) {
                    const dataPoint = {};
                    dataPoint.id = countries[i].id;
                    dataPoint.name = countries[i].name;
                    dataPoint.avg =
                        data.dataSets[0].observations[`${i}:0:0:0`][0];
                    allData.push(dataPoint);
                }
                console.log("OECD DATA", allData);
            });

        // uses EIA data (needs EIA_API_KEY in @/secrets.js)
        // lots of results, lots of undefined though
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
                                let latest = data.map((el) => {
                                    const country = el.series[0].name.split(
                                        ", "
                                    )[1];
                                    const Mtonnes = el.series[0].data[0][1];
                                    const pop = popData.find((popEl) => {
                                        if (
                                            popEl.series[0].geography ===
                                            el.request.series_id.split("-")[2]
                                        ) {
                                            return popEl;
                                        }
                                    });
                                    let population;
                                    let average;
                                    if (pop) {
                                        const raw = pop.series[0].data[0][1];
                                        if (raw) {
                                            population = raw * 1000;
                                            average =
                                                (Mtonnes * 1000000) /
                                                population;
                                        }
                                    } else {
                                      return false;
                                    }
                                    return {
                                        country: country,
                                        emissions: Mtonnes * 1000000,
                                        population: population,
                                        avg: average,
                                    };
                                });
                                latest = latest.filter(country => country !== false && !isNaN(country.population) && !isNaN(country.avg))
                                console.log("EIA DATA", latest);
                            });
                        });
                });
            });
    },
};
</script>

<style>
</style>
