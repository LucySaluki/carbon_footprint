# Carbon Footprint

Welcome to the Carbon Footprint calculator. You can can calculate your personal carbon footprint and compare it to your country average there is also a world map to see how well your country is doing.  You can also update your options to see how you can reduce your carbon footprint - enjoy!

## You will need
* MongoDB on your computer
* Some kind of text editor like visual studio Code 
* An API key is required for the EIA from https://www.eia.gov/opendata/register.php

## To Set Up
* Download the code
* cd into server/ 
```
npm install
npm run seeds
npm run server:dev
```
* cd into client/ 
Create a secrets.js file in the src folder and add in the following
```
export const EIA_API_KEY="Your API KEY";
```
* then
```
npm install
npm run serve
```
* Open Chrome and enter localhost:8080 into the address bar.

## Additional Information
### Compiles and minifies for production
```
npm run build
```
### Run your unit tests
```
npm run test:unit
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
