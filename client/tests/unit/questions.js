export const questionsData = [
    {
        key: "sizeOfHouse",
        title: "What size is your house?",
        category: "household",
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
        category: "household",
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
        key: "travelByBus",
        title: "Number of miles travelled by bus per week",
        category: "travel",
        type: "number",
        basekg: 0,
        answers: [
            { value: "miles", kg: 0.1 },
        ]
    }
];