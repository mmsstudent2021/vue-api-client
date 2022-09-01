<template>
  <label class="form-label" :for="name">{{ label }}</label>
  <input :type="type" class="form-control" :value="value" :class="{'is-invalid':errors[name]}" :name="name" :id="name">
  <div class="invalid-feedback" v-if="errors[name]">{{ errors[name][0] }}</div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "Input Label"
    },
    type:{
      type : String,
      default: "text"
    },
    name:{
      type : String,
      default: "input_name"
    },
    errors:{
      type : Object,
    },
    value:{
      default:null
    }
  },
}
</script>

<style scoped>

</style>