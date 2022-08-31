<template>
  <NavBar />
  <router-view/>
</template>

<script>
import * as bootstrap from 'bootstrap';
import NavBar from "@/components/NavBar";
export default {
  components: {NavBar},
  created() {
    if(localStorage.getItem('token') && localStorage.getItem('auth')){
      this.$store.dispatch("setAuth",JSON.parse(localStorage.getItem('auth')))
      this.$store.dispatch("setToken",localStorage.getItem('token'))
    }
  }
}
</script>

<style lang="scss">
@import "app.scss";
</style>
