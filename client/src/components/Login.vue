<template>
<div><select id="select-user" v-on:change="handleDropdown" v-model="selected">
  <option value=null disabled >Please choose an option</option>
  <option value="new_user">NEW USER</option>
  <option value=null disabled >----</option>

  <option v-for="(user, index) in users" :key="index" :value="user">{{ user.name}}</option>

  </select>
  <div  v-if="selected==='new_user'">
    <label for="name">Name:</label>
    <input type="text" v-model="name" id="name">
    <label for="country">Country:</label>
    <input type="text" v-model="country" id="country">
  </div>
  <div v-else-if="selected">
    <p>{{ selected.name }}</p>
    <p>{{ selected.country}}</p>
  </div>
  <input v-if="selected" type="button" :value="selected==='new_user'? 'Create New User':'Load my details'">
</div>

</template>

<script>
import { eventBus } from  "../main.js";

export default {
  name: "login-page",
  props: ["users"],
  data(){
    return {
      name: "",
      country: "",
      selected: null
    }
  },

methods: {
  handleDropdown: function() {

  }

  }

}


</script>










<style>

</style>