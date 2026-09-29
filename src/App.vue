<script>
import { provide } from 'vue';
import navbar from './components/navbar.vue';
import Login from './components/login.vue';

export default {
  name: "App",
  components: {
    navbar,
    Login
  },
  data() {
    return {
      isLogin: false,
      Timeline: true,
      Wishlist: false,
      Countdown: false,
      Secret: false,
    }
  },
  methods: {
    loginSuccess(){
      this.isLogin = true
    },
    changeTab(tabName){
      this.Timeline = tabName === 'timeline'
      this.Wishlist = tabName === 'wishlist'
      this.Countdown = tabName === 'countdown'
      this.Secret = tabName === 'secret'
    }
  },
  computed: {

  },
  watch: {

  }
}
</script>

<template>
  <login v-if="!isLogin" @login_success="loginSuccess"></login>
  <div v-else>
    <navbar :timeline="Timeline" :wishlist="Wishlist" :countdown="Countdown" :secret="Secret" @change_tab="changeTab"></navbar>
    <h1>Componant</h1>
  </div>
</template>
