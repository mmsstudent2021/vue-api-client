<template>
  <div class="row min-vh-100 justify-content-center align-items-center">
    <div class="col-lg-4">
      <h3>Register Form</h3>
      <hr>
      <form action="" @submit.prevent="register" ref="registerForm">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" name="name"  placeholder="Name">
          <label for="floatingInput">Your Name</label>
        </div>
        <div class="form-floating mb-3">
          <input type="email" class="form-control" name="email" placeholder="name@example.com">
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating mb-3">
          <input type="password" class="form-control" name="password" placeholder="Password">
          <label for="floatingPassword">Password</label>
        </div>
        <div class="form-floating mb-3">
          <input type="password" class="form-control" name="password_confirmation" placeholder="Confirm Password">
          <label for="floatingPassword">Confirm Password</label>
        </div>
        <div class="">
          <button class="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";

export default {
  computed: {
    ...mapState([
        'apiUrl'
    ]),
    ...mapGetters([
        'getUrl'
    ])
  },
  methods: {
    register() {
      let formData = new FormData(this.$refs.registerForm);
      fetch(this.getUrl("/register"),{
        method : "POST",
        body : formData
      })
          .then(res => res.json())
          .then(json => {
            if(json.success === true){
              this.$router.push('/login')
            }
          })
    }
  },
}
</script>

<style scoped>

</style>