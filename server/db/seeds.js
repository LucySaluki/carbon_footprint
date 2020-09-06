const { Db } = require("mongodb");

use carbon;

db.dropDatabase();
db.users.insertMany([
    {
        name: "Jonny",
        score: null,
        country: "United Kingdom",
        answers: {}
    },
    {
        name: "Duncan",
        score: null,
        country: "United Kingdom",
        answers: {}
    },
    {
        name: "Lucy",
        score: null,
        country: "United Kingdom",
        answers: {}
    },
    {
        name: "Vishal",
        score: null,
        country: "United Kingdom",
        answers: {}
    },
    {
        name: "Ally",
        score: 13.871,
        country: "Scotland",
        answers: {
            carsInHousehold: 2,
            foodMiles: "Mainly/all supermarket, fresh food",
            fuelUsage: ["Oil"],
            numPeopleInHouse: 3,
            recycling: ["Paper/glass/metal", "Plastic"],
            sizeOfHouse: "Large",
            travelByBus: 20,
            travelByPlane: 20,
            travelByTrain: 58,
            weeklyDiet: "Meat/dairy some days"
        }

    },
    {
        name: "Jarrod",
        score: 7.791,
        country: "Scotland",
        answers: {
            carsInHousehold: 0,
            foodMiles: "Mostly own garden/locally",
            fuelUsage: ["Wood"],
            numPeopleInHouse: 2,
            recycling: ["Paper/glass/metal", "Plastic"],
            sizeOfHouse: "Small",
            travelByBus: 5,
            travelByPlane: 5,
            travelByTrain: 5,
            weeklyDiet: "Meat/dairy most days"
        }

    }
]);

db.questions.insertMany([
    {
        key: "numPeopleInHouse",
        title: "How many people live in your house?",
        type: "number",
        basekg: 0,
        answers: [
            { value: "people", kg: 0 },
        ]
    },
    {
        key: "sizeOfHouse",
        title: "What size is your house?",
        type: "radio",
        basekg: 0,
        answers: [
            { value: "Small", kg: 930 },
            { value: "Medium", kg: 1480 },
            { value: "Large", kg: 2160 },
        ]
    },
    {
        key: "fuelUsage",
        title: "Do you use these fuels in your home?",
        type: "checkbox",
        basekg: 0,
        answers: [
            { value: "Oil", kg: 5900 },
            { value: "Wood", kg: 4000 }, //placeholders
            { value: "Coal", kg: 2000 }, //placeholders
            { value: "Bottled gas", kg: 9200 },
        ]
    },
    {
        key: "recycling",
        title: "Do you recycle?",
        type: "checkbox",
        basekg: 3400,
        answers: [
            { value: "Paper/glass/metal", kg: -70 },
            { value: "Plastic", kg: -140 },
        ]
    },
    {
        key: "carsInHousehold",
        title: "How many cars does your household use?",
        type: "radio",
        basekg: 0,
        answers: [
            { value: 0, kg: 0 },
            { value: 1, kg: 2800 },
            { value: 2, kg: 5600 },
            { value: 3, kg: 8400 },
            { value: 4, kg: 11200 },
        ]
    },
    {
        key: "travelByBus",
        title: "Number of miles travelled by bus per week",
        type: "number",
        basekg: 0,
        answers: [
            { value: "miles", kg: 0.1 },
        ]
    },
    {
        key: "travelByTrain",
        title: "Number of miles travelled by train per week",
        type: "number",
        basekg: 0,
        answers: [
            { value: "miles", kg: 0.1 },
        ]
    },
    {
        key: "travelByPlane",
        title: "Number of hours travelled by plane per year",
        type: "number",
        basekg: 0,
        answers: [
            { value: "hours", kg: 250 },
        ]
    },
    {
        key: "weeklyDiet",
        title: "What is your typical weekly diet?",
        type: "radio",
        basekg: 0,
        answers: [
            { value: "Meat/dairy most days", kg: 690 },
            { value: "Meat/dairy some days", kg: 490 },
            { value: "Vegetarian", kg: 190 },
            { value: "Vegan", kg: 90 },
        ]
    },
    {
        key: "foodMiles",
        title: "Where does your food come from?",
        type: "radio",
        basekg: 0,
        answers: [
            { value: "Mostly own garden/locally", kg: 90 },
            { value: "Some local but supermarket when out of season", kg: 190 },
            { value: "Mainly/all supermarket, fresh food", kg: 490 },
            { value: "Mainly/all supermarket, processed food", kg: 690 },
        ]
    }

]);
