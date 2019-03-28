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
  height: 100%;
}
</style>
