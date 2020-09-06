<template>
<div id="login-form">
  <select id="select-user" v-model="selected">
    <option value=null disabled >Please choose an option</option>
    <option value="new_user">NEW USER</option>
    <option value=null disabled >----</option>

    <option v-for="(user, index) in users" :key="index" :value="user">{{ user.name}}</option>
  </select>

  <form v-on:submit.prevent="handleForm">
    <div  v-if="selected==='new_user'">
      <label for="name">Name:</label>
      <input type="text" v-model="name" id="name" required>
      <label for="country">Country:</label>
      <!-- <input type="text" v-model="country" id="country"> -->
      <select v-model="country" required>
        <option value="" disabled>Choose a country...</option>
        <option v-for="(nation, index) in countries" :key="index" :value="nation.name">{{nation.name}}</option>
      </select>
    </div>
    <div v-else-if="selected">
      <p>{{ selected.name }}</p>
      <p>{{ selected.country}}</p>
    </div>
    <input v-if="selected" type="submit" :value="selected === 'new_user' ? 'Create New User' : 'Load my details'">
  </form>
</div>

</template>

<script>
import { eventBus } from  "../main.js";
import UserService from "@/services/UserService.js";

export default {
  name: "login-page",
  props: ["users", "countries"],
  data(){
    return {
      name: "",
      country: "",
      selected: null
    }
  },

methods: {
  handleForm: function() {
    if (this.selected === "new_user") {
      const newUser = {
        name: this.name,
        country: this.country,
        score: null,
        answers: {}
      }
      UserService.postUser(newUser);
      this.selected = newUser;
    }
    eventBus.$emit("user-selected", this.selected);
    this.selected = null;

  }

  }

}


</script>










<style>

</style>