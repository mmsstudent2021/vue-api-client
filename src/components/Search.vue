<template>
  <div class="input-group">
    <input class="form-control" v-model="keyword" type="text">
    <button @click="search" class="btn btn-primary">
      <i class="bi bi-search"></i>
    </button>
  </div>
</template>

<script>
import {debounce, throttle} from "lodash";

export default {
  data() {
    return {
      keyword: null
    }
  },
  methods: {
    search:throttle(function (){
      this.$emit('search',this.keyword)
    },500)
  },
  watch:{
    keyword:debounce(function (){
      this.$emit('search',this.keyword)
    },500)
  }
}
</script>

<style scoped>

</style>