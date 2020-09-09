<template>
  <div class="header-container">
    <div>
      <img src="@/assets/logo.jpg" alt="carbon_footprint">
      <h1 >Welcome to the Carbon Footprint Calculator</h1>
    </div>
      <p>We can calculate your annual carbon footprint and see how you compare with the average annual carbon foot print for your country and other countries around the world.  We hope you will use this tool to then see how you can reduce your carbon footprint and hopefully help save the planet!</p>
      <input type="button" value="Home" v-on:click="goHome" />
  </div>
</template>

<script>
import { eventBus } from "@/main.js";
export default {
  name: "header-component",
  methods: {
    goHome: function () {
      eventBus.$emit("go-home");
    }
  }

}
</script>

<style scoped>
.header-container {
  display: grid;
  grid-template-rows: auto auto auto;
  gap: 20px;
  padding: 5px 30px;
  justify-items: center;;
}
.header-container>div {
  display: flex;
  flex-flow: row;
  align-items: center;;
}
h1{
  text-decoration: underline;
  text-align: center;
  padding: 40px;
}
input {
  margin: 10px;
  justify-self: start;
  height: 30px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: 0.4s;
}
input:hover {
  background-color: #94bda4;
}
</style>