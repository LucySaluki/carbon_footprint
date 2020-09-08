<template>
    <div>
        <h3>MapTitle</h3>
        <GChart
            id="gauge-chart"
            type="GeoChart"
            :data="chartData"
            :options="chartOptions"
            :settings="settings"
        />
    </div>
</template>

<script>
import { GChart } from "vue-google-charts";

export default {
    name: "map-page",
    components: {
        GChart,
    },
    data() {
        return {
            chartOptions: {
                colorAxis: {minValue: 0,  colors: ['#B9FFB7', '#000000']}
            },
            settings: { packages: ["geochart"]},
        };
    },
    props: ["globalEmissions"],
    computed: {
        chartData: function () {
            const gibraltar = this.globalEmissions.findIndex(
                (el) => el.country === "Gibraltar"
            );
            if (gibraltar >= 0) {
                this.globalEmissions.splice(gibraltar, 1);
            }
            const data = [["Country", "Emissions"]];
            this.globalEmissions.forEach((country) => {
                data.push([country.countryShortCode, country.avg]);
            });
            return data;
        },
    },
};
</script>

<style>
</style>