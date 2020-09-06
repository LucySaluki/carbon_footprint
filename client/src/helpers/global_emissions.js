import { EIA_API_KEY } from "../secrets.js";
export const eiaDataApi = function (restCountries) {
    // uses EIA data (needs EIA_API_KEY in @/secrets.js)
    // lots of results, lots of undefined though
    // initial endpoint
    return fetch(
        `http://api.eia.gov/category/?category_id=2622652&api_key=${EIA_API_KEY}`
    )
        .then((res) => res.json())
        .then((data) => {
            const allCountries = data.category.childseries.map((el) => {
                // endpoint for each country's emissions
                return fetch(
                    `http://api.eia.gov/series/?api_key=${EIA_API_KEY}&series_id=${el.series_id}`
                ).then((res) => res.json());
            });
            // return array of each country's historical emissions data
            return Promise.all(allCountries).then((data) => {
                // loop through the emssions data and map it to the restCountries
                let latest = data.map(el => {
                    // extract the 3 letter id for the emissions data
                    const emissions3Code = el.request.series_id.split("-")[2];
                    // extract the emissions in kg
                    const kg = Number((el.series[0].data[0][1] * 1000000).toFixed(5));
                    // find a match in the restCountries data
                    const foundCountry = restCountries.find(country => {
                        return country.alpha3Code === emissions3Code;
                    })
                    if (foundCountry) {
                        // create an object with the data we need for each country
                        return {
                            country: foundCountry.name,
                            countryCode: emissions3Code,
                            border: foundCountry.borders,
                            emissions: kg,
                            population: foundCountry.population,
                            avg: Number((kg / foundCountry.population).toFixed(3)),
                        }
                    }
                });
                // filter out null/no data countries and sort alphabetically
                return latest.filter(el => el && el.emissions > 0).sort((a, b) => (a >= b) ? 1 : -1);
            });
        });
}