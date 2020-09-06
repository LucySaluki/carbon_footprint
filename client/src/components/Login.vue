<template>
<div id="login-form">
  <select id="select-user" v-model="selected">
    <option value=null disabled >Please choose an option</option>
    <option value="new_user">New user</option>
    <option value=null disabled >     </option>
    <option value=null disabled >Existing users</option>
    <option v-for="(user, index) in users" :key="index" :value="user">{{user.name}}</option>
  </select>

  <form v-on:submit.prevent="handleForm">
    <div v-if="selected==='new_user'">
      <div>
        <span v-if="!this.name" class="required"> * </span>
        <label for="name">Name: </label>
        <input type="text" v-model="name" id="name" required>
      </div>
      <div>
        <span v-if="!this.country" class="required"> * </span>
        <label for="country">Country: </label>
        <select v-model="country" required>
          <option value="" disabled>Choose a country...</option>
          <option v-for="(nation, index) in countries" :key="index" :value="nation.name">{{nation.name}}</option>
        </select>
      </div>
    </div>
    <div v-else-if="selected">
      <p>Name: {{ selected.name }}</p>
      <p>Country: {{ selected.country}}</p>
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
  data() {
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
        UserService.postUser(newUser).then(user => eventBus.$emit("user-selected", user));
      } else {
        eventBus.$emit("user-selected", this.selected);
      }
      this.selected = null;
    }
  }
}


</script>




<style>
#login-form {
  display: flex;
  flex-flow: column;
  padding: 20px;
}
#login-form > form {
  display: grid;
  grid-template-rows: auto 40px;
  gap: 40px;
  margin: 20px;
}
#login-form > form > div {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
}
p {
  margin: 0px;
}
.required {
  color: red;
  font-weight: 900;
}
</style>