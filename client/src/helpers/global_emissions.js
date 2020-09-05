import { EIA_API_KEY } from "../secrets.js";
export const eiaDataApi = function () {
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
                            // console.log("EIA DATA", latest);
                            return latest;
                        });
                    });
            });
        });
}