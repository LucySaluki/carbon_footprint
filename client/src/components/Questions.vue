<template>
<main>
<section>
    <header><h1>Number of people in your house?</h1></header>
    <article>
        <div>
            <label for="numPeopleAnswer">Number:</label>
            <input type="number" id="numPeopleAnswer" v-model="numPeopleInHouse" />
        </div>
    </article>
</section>
<section >
    <header><h1>{{ questions[0].title }}</h1></header>
    <article>
        <div>
            <input type="radio" name="numPeopleAnswer" :id="questions[0].answers[0].value" :value="questions[0].answers[0].value" v-model="sizeOfHouse" />
            <label :for="questions[0].answers[0].value">{{questions[0].answers[0].value}}</label>
        </div>
        <div>
            <input type="radio" name="numPeopleAnswer" :id="questions[0].answers[1].value" :value="questions[0].answers[1].value" v-model="sizeOfHouse" />
            <label :for="questions[0].answers[1].value">{{questions[0].answers[1].value}}</label>
        </div>
        <div>
            <input type="radio" name="numPeopleAnswer" :id="questions[0].answers[2].value" :value="questions[0].answers[2].value" v-model="sizeOfHouse" />
            <label :for="questions[0].answers[2].value">{{questions[0].answers[2].value}}</label>
        </div>
    </article>
</section>
<QuestionItem v-for="(question, index) in questions" :key="index" :question="question"  />
<input type="button" value="save answers" v-on:click="saveAnswers" />
</main>

</template>

<script>
import {QuestionItem} from "@/components/QuestionItem.vue";
export default {
    name: "questions-page",
    components: { QuestionItem },
    props: ["questions", "selectedUser"],
    data() {
        return {
            numPeopleInHouse: 0,
            sizeOfHouse: "Small"
        }
    }

}
// [
//   {
//     "_id": "5f53719fb68896cfa8b332e8",
//     "key": "sizeOfHouse",
//     "title": "What size is your house?",
//     "type": "radio",
//     "basekg": 0,
//     "answers": [
//       {
//         "value": "Small",
//         "kg": 930
//       },
//       {
//         "value": "Medium",
//         "kg": 1480
//       },
//       {
//         "value": "Large",
//         "kg": 2160
//       }
//     ]
//   },
//   {
//     "_id": "5f53719fb68896cfa8b332e9",
//     "key": "fuelUsage",
//     "title": "Do you use these fuels in your home?",
//     "type": "checkbox",
//     "basekg": 0,
//     "answers": [
//       {
//         "value": "Oil",
//         "kg": 5900
//       },
//       {
//         "value": "Wood",
//         "kg": 4000
//       },
//       {
//         "value": "Coal",
//         "kg": 2000
//       },
//       {
//         "value": "Bottled gas",
//         "kg": 9200
//       }
//     ]
//   },
//   {
//     "_id": "5f53719fb68896cfa8b332ea",
//     "key": "recycling",
//     "title": "Do you recycle?",
//     "type": "checkbox",
//     "basekg": 3400,
//     "answers": [
//       {
//         "value": "Paper/glass/metal",
//         "kg": -70
//       },
//       {
//         "value": "Plastic",
//         "kg": -140
//       }
//     ]
//   },
//   {
//     "_id": "5f53719fb68896cfa8b332eb",
//     "key": "carsInHousehold",
//     "title": "How many cars does your household use?",
//     "type": "radio",
//     "basekg": 0,
//     "answers": [
//       {
//         "value": 0,
//         "kg": 0
//       },
//       {
//         "value": 1,
//         "kg": 2800
//       },
//       {
//         "value": 2,
//         "kg": 5600
//       },
//       {
//         "value": 3,
//         "kg": 8400
//       },
//       {
//         "value": 4,
//         "kg": 11200
//       }
//     ]
//   },
//   {
//     "_id": "5f53719fb68896cfa8b332ec",
//     "key": "travelByBus",
//     "title": "Number of miles travelled by bus per week",
//     "type": "number",
//     "basekg": 0,
//     "answers": [
//       {
//         "value": "per mile",
//         "kg": 0.1
//       }
//     ]
//   },
//   {
//     "_id": "5f53719fb68896cfa8b332ed",
//     "key": "travelByTrain",
//     "title": "Number of miles travelled by train per week",
//     "type": "number",
//     "basekg": 0,
//     "answers": [
//       {
//         "value": "per mile",
//         "kg": 0.1
//       }
//     ]
//   },
//   {
//     "_id": "5f53719fb68896cfa8b332ee",
//     "key": "travelByPlane",
//     "title": "Number of hours travelled by plane per year",
//     "type": "number",
//     "basekg": 0,
//     "answers": [
//       {
//         "value": "per hour",
//         "kg": 250
//       }
//     ]
//   },
//   {
//     "_id": "5f53719fb68896cfa8b332ef",
//     "key": "weeklyDiet",
//     "title": "What is your typical weekly diet?",
//     "type": "radio",
//     "basekg": 0,
//     "answers": [
//       {
//         "value": "Meat/dairy most days",
//         "kg": 690
//       },
//       {
//         "value": "Meat/dairy some days",
//         "kg": 490
//       },
//       {
//         "value": "Vegetarian",
//         "kg": 190
//       },
//       {
//         "value": "Vegan",
//         "kg": 90
//       }
//     ]
//   },
//   {
//     "_id": "5f53719fb68896cfa8b332f0",
//     "key": "foodMiles",
//     "title": "Where does your food come from?",
//     "type": "radio",
//     "basekg": 0,
//     "answers": [
//       {
//         "value": "Mostly own garden/locally",
//         "kg": 90
//       },
//       {
//         "value": "Some local but supermarket when out of season",
//         "kg": 190
//       },
//       {
//         "value": "Mainly/all supermarket, fresh food",
//         "kg": 490
//       },
//       {
//         "value": "Mainly/all supermarket, processed food",
//         "kg": 690
//       }
//     ]
//   }
// ]
</script>

<style>

</style>