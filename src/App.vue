<template>
  <div id="app">
    <Student/>
  </div>
</template>

<script>
import Student from "./components/student.vue";

export default {
  name: "app",
  components: {
    Student
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 3%;
  border: 2px solid black;
  padding: 2%;
}
</style>
