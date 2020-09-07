export const calculation = function(payload, user, questions){
    user.answers = payload;

    let score = questions.reduce((total, question) => {
        return total + question.basekg
    }, 0);

    let houseScore = 0;

    questions[1].answers.forEach((answer) => {
        if (answer.value === payload.sizeOfHouse) {
            houseScore += answer.kg
        }
    })

    questions[2].answers.forEach((answer) => {
        payload.fuelUsage.forEach((fuel) => {
            if (answer.value === fuel) {
                houseScore += answer.kg
            }
        })
    })

    questions[3].answers.forEach((answer) => {
        payload.recycling.forEach((choice) => {
            if (answer.value === choice) {
                houseScore += answer.kg
            }
        })
    })

    questions[4].answers.forEach((answer) => {
        if (answer.value === payload.carsInHousehold) {
            houseScore += answer.kg
        }
    })
    score += houseScore / payload.numPeopleInHouse;

    score += questions[5].answers[0].kg * payload.travelByBus;

    score += questions[6].answers[0].kg * payload.travelByTrain;

    score += questions[7].answers[0].kg * payload.travelByPlane;

    questions[8].answers.forEach((answer) => {
        if (answer.value === payload.weeklyDiet) {
            score += answer.kg
        }
    })

    questions[9].answers.forEach((answer) => {
        if (answer.value === payload.foodMiles) {
            score += answer.kg
        }
    })

    return Math.round(score) / 1000
}