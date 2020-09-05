const baseURL = 'http://localhost:3000/api/questions/'

export default {
    getQuestions() {
        return fetch(baseURL)
        .then(res =>res.json())
    },

}