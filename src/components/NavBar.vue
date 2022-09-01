<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">Lara Vue</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/" >Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <template v-if="auth === null">
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/register">Register</router-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Product
              </a>
              <ul class="dropdown-menu">
                <li><router-link class="dropdown-item" to="/product/create">Create Product</router-link></li>
                <li><router-link class="dropdown-item" to="/product">Product List</router-link></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{ auth.name }}
              </a>
              <ul class="dropdown-menu">
                <li><router-link class="dropdown-item" to="/dashboard">Dashboard</router-link></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#" @click="logout()">Logout</a></li>
              </ul>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import {mapGetters, mapState} from "vuex";

export default {
  computed: {
    ...mapState([
        'auth',
        'token'
    ]),
    ...mapGetters([
        'getUrl'
    ])
  },
  methods: {
    logout() {

      localStorage.removeItem('auth');
      localStorage.removeItem('token');

      let headers = new Headers();
      headers.append("Authorization", "Bearer "+this.token);
      fetch(this.getUrl('/logout'),{
        method : "POST",
        headers
      }).then(res => res.json())
          .then(json => {
             if(json.success === true){

               this.$store.dispatch('logout')

             }
          }).finally(()=>this.$router.push("/login"))

    }
  },
}
</script>

<style scoped>

</style>