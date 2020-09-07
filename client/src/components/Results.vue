<template>
  <ResultsDial :selectedUser="selectedUser" />
</template>

<script>
import ResultsDial from "@/components/ResultsDial.vue";
export default {
  name: "results",
  props: ["selectedUser"],
  components: {
    ResultsDial
  }

}
</script>

<style>

</style>