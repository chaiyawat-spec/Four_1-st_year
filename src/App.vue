<script>
import { provide } from 'vue';
import navbar from './components/navbar.vue';
import Login from './components/login.vue';
import DayCounter from './components/DayCounter.vue';
import Timeline from './components/Timeline.vue';
import Wishlist from './components/Wishlist.vue';
import Countdown from './components/Countdown.vue';
import Secret from './components/Secret.vue';

export default {
  name: "App",
  components: {
    navbar,
    Login,
    DayCounter,
    Timeline,
    Wishlist,
    Countdown,
    Secret
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
  <div v-else class="min-h-screen" style="background: linear-gradient(160deg, #fdf6f0 0%, #fde8e8 40%, #fdf6f0 100%)">
    <navbar :timeline="Timeline" :wishlist="Wishlist" :countdown="Countdown" :secret="Secret" @change_tab="changeTab"></navbar>
    <div class="max-w-2xl mx-auto px-4 pb-16">
      <header class="pt-8 pb-6 text-center">
        <p class="text-xs uppercase text-[#c9748a]" style="letter-spacing: .22em">our little world</p>
        <p class="hand mt-1 text-lg text-[#a84f65]">เก็บทุกช่วงเวลาที่มีค่าไว้ที่นี่ ❤️</p>
      </header>
      <DayCounter class="mb-8" />
      <div class="rounded-3xl p-6" style="background: rgba(255,250,247,.75); backdrop-filter: blur(8px); border: 1px solid rgba(201,116,138,.1); box-shadow: 0 8px 40px rgba(201,116,138,.08)">
        <Timeline v-if="Timeline" />
        <Wishlist v-if="Wishlist" />
        <Countdown v-if="Countdown" />
        <Secret v-if="Secret" />
      </div>
      <p class="hand text-center mt-8 text-[#c9748a]">made with ❤️ สำหรับคนที่รัก</p>
    </div>
  </div>
</template>
