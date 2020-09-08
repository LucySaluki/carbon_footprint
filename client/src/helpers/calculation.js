export const calculation = function (payload, user, questions) {
    user.answers = payload;

    // get the baseKG from every question
    let score = questions.reduce((total, question) => {
        return total + question.basekg
    }, 0);

    let homeScore = 0;
    // home category
    let homeQuestions = questions.filter(question => question.category === "household");
    // loop through each question
    homeQuestions.forEach(question => {
        // loop through each possible answer
        question.answers.forEach(answer => {
            // if user answers is an array...
            if (Array.isArray(payload[question.key])) {
                // loop through and match each to the possible answers
                payload[question.key].forEach(choice => {
                    if (answer.value === choice) {
                        homeScore += answer.kg;
                    }
                });
            } else {
                // else just loop through and match to possible answers
                if (answer.value === payload[question.key]) {
                    homeScore += answer.kg;
                }
            }
        });
    });
    // divide total score for home category questions by the number of people in house
    if (payload.numPeopleInHouse > 0) {
        score += homeScore / payload.numPeopleInHouse;
    };

    // all other categories
    let otherCategories = questions.filter(question => question.category !== "household");
    // loop through each question
    otherCategories.forEach(question => {
        if (question.answers.length === 1) { // it's an 'input * per-unit' question
            score += (question.answers[0].kg * payload[question.key]);
        } else { // it's a normal question
            question.answers.forEach(answer => {
                if (answer.value === payload[question.key]) {
                    score += answer.kg;
                }
            });
        }
    });

    //return in tonnes
    return Math.round(score) / 1000;
}