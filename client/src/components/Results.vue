<template>
  <main>
    <ResultsDial :selectedUser="selectedUser" />
    <UpdateForm :selectedUser="selectedUser" :questions="questions" /> 
  </main>
</template>

<script>
import ResultsDial from "@/components/ResultsDial.vue";
import UpdateForm from "@/components/UpdateForm.vue";
export default {
  name: "results",
  props: ["selectedUser", "questions"],

  components: {
    ResultsDial,
    UpdateForm
  }

}
</script>

<style>

</style>