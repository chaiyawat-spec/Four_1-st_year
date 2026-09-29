<template>
  <div class="relative overflow-hidden rounded-3xl p-8 text-center"
    style="background: linear-gradient(135deg, #f7c5d0 0%, #fde8d8 50%, #f7c5d0 100%); box-shadow: 0 8px 40px rgba(201,116,138,.18)">
    <div class="absolute top-3 left-5 opacity-20 text-5xl">♡</div>
    <div class="absolute bottom-3 right-5 opacity-20 text-5xl">♡</div>
    <p class="text-sm uppercase mb-2 text-[#9a6070]" style="letter-spacing: .2em">เราคบกันมาแล้ว</p>
    <div class="h-title text-6xl leading-none">{{ days }}</div>
    <div class="text-xs mt-1 text-[#9a6070]">วัน</div>
    <div class="flex justify-center gap-6 mt-4">
      <div v-for="i in parts" :key="i.label">
        <div class="h-title text-2xl">{{ i.value }}</div>
        <div class="text-xs text-[#9a6070]">{{ i.label }}</div>
      </div>
    </div>
    <p class="hand mt-4 text-[#a84f65]">ตั้งแต่ {{ label }} ❤️</p>
  </div>
</template>
<script>
import { fmt } from "../utils";
const START_DATE = "2023-02-14"; // ✏️ แก้เป็นวันที่คบกันจริง

export default {
  name: "DayCounter",
  data() { return { now: new Date(), timer: null, label: fmt(START_DATE) }; },
  computed: {
    days() { return Math.floor((this.now - new Date(START_DATE)) / 864e5); },
    parts() {
      const s = new Date(START_DATE), n = this.now;
      let m = (n.getFullYear() - s.getFullYear()) * 12 + n.getMonth() - s.getMonth();
      if (n.getDate() < s.getDate()) m--;
      const anchor = new Date(s.getFullYear(), s.getMonth() + m, s.getDate());
      return [
        { label: "ปี", value: Math.floor(m / 12) },
        { label: "เดือน", value: m % 12 },
        { label: "วัน", value: Math.floor((n - anchor) / 864e5) },
      ];
    },
  },
  mounted() { this.timer = setInterval(() => (this.now = new Date()), 60000); },
  beforeUnmount() { clearInterval(this.timer); },
};
</script>
