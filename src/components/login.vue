<template>
  <div
    class="relative min-h-screen overflow-hidden flex items-center justify-center px-4 py-10"
    style="background: linear-gradient(160deg, #fdf6f0 0%, #fde8e8 45%, #fdf6f0 100%)"
  >
    <!-- แสงฟุ้งพื้นหลัง -->
    <div class="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full"
      style="background: radial-gradient(circle, rgba(247,197,208,0.55) 0%, transparent 70%)"></div>
    <div class="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full"
      style="background: radial-gradient(circle, rgba(253,232,216,0.7) 0%, transparent 70%)"></div>

    <!-- หัวใจลอยขึ้น -->
    <span
      v-for="(h, i) in hearts"
      :key="i"
      class="floating-heart pointer-events-none absolute select-none"
      :style="{
        left: h.left + '%',
        fontSize: h.size + 'px',
        animationDuration: h.duration + 's',
        animationDelay: h.delay + 's',
      }"
    >♡</span>

    <!-- การ์ด Login -->
    <form
      class="login-card relative w-full max-w-sm rounded-3xl px-8 py-10 sm:px-10 flex flex-col items-center gap-5"
      @submit.prevent="onSubmit"
    >
      <!-- ไอคอนหัวใจ -->
      <div
        class="heartbeat w-16 h-16 rounded-full flex items-center justify-center"
        style="background: linear-gradient(135deg, #f7c5d0 0%, #fde8d8 100%); box-shadow: 0 8px 24px rgba(201,116,138,0.3)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-8" fill="#c9748a">
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
      </div>

      <div class="text-center">
        <p class="eyebrow text-xs uppercase mb-1">our little world</p>
        <h1 class="font-thai text-2xl text-[#a84f65]">ลงชื่อเข้าช้ายย</h1>
      </div>

      <!-- เส้นคั่น -->
      <div class="flex items-center gap-3 w-full opacity-60">
        <div class="h-px flex-1" style="background: linear-gradient(to right, transparent, #c9748a)"></div>
        <span class="text-[#c9748a] text-sm">♥</span>
        <div class="h-px flex-1" style="background: linear-gradient(to left, transparent, #c9748a)"></div>
      </div>

      <!-- ช่องชื่อ -->
      <div class="relative w-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#c9748a]">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
        <input
          v-model="name"
          type="text"
          placeholder="ตัวเองชื่อจริงอารัยย นามสกุลล่วย"
          class="field font-thai"
        />
      </div>

      <!-- ช่องรหัสผ่าน -->
      <div class="relative w-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#c9748a]">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="ใบ้ว่าวันที่คบกันน"
          class="field font-thai pr-12"
        />
        <button
          type="button"
          class="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-[#c9748a]/70 hover:text-[#c9748a] transition cursor-pointer"
          :aria-label="showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'"
          @click="showPassword = !showPassword"
        >
          <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
          </svg>
        </button>
      </div>

      <!-- ปุ่ม Login -->
      <button type="submit" class="login-btn font-thai w-full cursor-pointer">
        Login
        <span aria-hidden="true">♡</span>
      </button>

      <p class="signature text-base">made with ❤️ สำหรับคนที่รัก</p>
    </form>
  </div>
</template>

<script>
export default {
  name: "login",
  emits: ["login_success"],
  data() {
    return {
      name: "",
      password: "",
      showPassword: false,
      // หัวใจลอย: กำหนดค่าตายตัวจากสูตร ไม่ใช้ random เพื่อให้หน้าตาคงที่
      hearts: Array.from({ length: 14 }, (_, i) => ({
        left: (i * 7.3 + 4) % 96,
        size: 14 + ((i * 7) % 20),
        duration: 10 + ((i * 3) % 8),
        delay: -(i * 1.9),
      })),
    };
  },
  methods: {
    onSubmit() {
      if (this.name.trim() === "พัชรดา ธนูศิริ" && this.password === "12/10/2568") {
      this.$emit("login_success");
    } else {
      alert("ผิดนะจ๊ะ ลองใหม่อีกที 🥺");
    }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&family=Mali:wght@400;500;600&family=Playfair+Display:ital@1&display=swap");

.font-thai {
  font-family: "Mali", "Sarabun", sans-serif;
}

.eyebrow {
  color: #c9748a;
  letter-spacing: 0.22em;
  font-family: "Playfair Display", serif;
  font-style: italic;
}

.signature {
  color: #c9748a;
  font-family: "Dancing Script", "Mali", cursive;
}

.login-card {
  background: rgba(255, 250, 247, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(201, 116, 138, 0.15);
  box-shadow: 0 12px 48px rgba(201, 116, 138, 0.18);
  animation: card-in 0.7s ease-out both;
}

.field {
  width: 100%;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(201, 116, 138, 0.25);
  padding: 0.75rem 1rem 0.75rem 2.9rem;
  font-size: 0.875rem;
  color: #6b5050;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}
.field::placeholder {
  color: #c4a5a5;
}
.field:focus {
  background: #fff;
  border-color: #c9748a;
  box-shadow: 0 0 0 4px rgba(201, 116, 138, 0.15);
}

.login-btn {
  margin-top: 0.25rem;
  padding: 0.8rem 1rem;
  border-radius: 1rem;
  color: #fff;
  font-weight: 500;
  letter-spacing: 0.04em;
  background: linear-gradient(135deg, #d98aa0 0%, #c9748a 55%, #a84f65 100%);
  box-shadow: 0 8px 20px rgba(201, 116, 138, 0.35);
  transition: transform 0.15s, box-shadow 0.2s, filter 0.2s;
}
.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 26px rgba(201, 116, 138, 0.45);
  filter: brightness(1.04);
}
.login-btn:active {
  transform: translateY(0);
}
.login-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px rgba(201, 116, 138, 0.3);
}

.floating-heart {
  bottom: -40px;
  color: #e7a3b5;
  opacity: 0;
  animation-name: float-up;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.heartbeat {
  animation: heartbeat 1.8s ease-in-out infinite;
}

@keyframes float-up {
  0%   { transform: translateY(0) rotate(-10deg); opacity: 0; }
  10%  { opacity: 0.55; }
  90%  { opacity: 0.3; }
  100% { transform: translateY(-115vh) rotate(18deg); opacity: 0; }
}
@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  14%      { transform: scale(1.1); }
  28%      { transform: scale(1); }
  42%      { transform: scale(1.07); }
  70%      { transform: scale(1); }
}
@keyframes card-in {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .floating-heart, .heartbeat, .login-card { animation: none; }
  .floating-heart { opacity: 0.35; }
}
</style>
