<template>
  <NavBar />
  <router-view/>
</template>

<script>
import * as bootstrap from 'bootstrap';
import NavBar from "@/components/NavBar";
export default {
  components: {NavBar}
}
</script>

<style lang="scss">
@import "app.scss";
</style>
