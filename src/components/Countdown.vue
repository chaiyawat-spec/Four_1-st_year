<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div><h2 class="h-title text-xl">Anniversary Countdown</h2><p class="sub">นับถอยหลังสู่วันสำคัญ</p></div>
      <button class="btn" @click="showForm = true">＋ เพิ่ม</button>
    </div>

    <Modal v-if="showForm" title="เพิ่มวันสำคัญ" @close="showForm = false">
      <div class="space-y-3">
        <div class="flex gap-2 flex-wrap">
          <button v-for="e in EMOJIS" :key="e" class="emoji-btn" :class="{ on: form.emoji === e }" @click="form.emoji = e">{{ e }}</button>
        </div>
        <input v-model="form.name" class="inp" placeholder="ชื่อวันสำคัญ..." />
        <input v-model="form.date" type="date" class="inp" />
        <label class="flex items-center gap-2 cursor-pointer text-sm text-[#6b5050]">
          <input v-model="form.recurring" type="checkbox" /> วนซ้ำทุกปี
        </label>
        <button class="btn-block" @click="save">เพิ่มวันสำคัญ 🔔</button>
      </div>
    </Modal>

    <div class="space-y-3">
      <div v-for="(e, idx) in sorted" :key="e.id" class="rounded-2xl p-4 flex items-center gap-4 group"
        :style="{ background: bg(e.daysLeft), border: '1px solid rgba(201,116,138,.15)', boxShadow: idx === 0 ? '0 4px 20px rgba(201,116,138,.15)' : 'none' }">
        <div class="text-3xl w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-white/60">{{ e.emoji }}</div>
        <div class="flex-1 min-w-0">
          <p class="truncate font-medium">{{ e.name }} <span v-if="e.recurring" class="text-xs text-[#c9748a]">🔔</span></p>
          <p class="text-xs mt-0.5 text-[#9a6070]">{{ fmt(e.nextDate) }}</p>
        </div>
        <div class="text-right shrink-0">
          <template v-if="e.daysLeft >= 0">
            <div class="h-title text-2xl" :style="{ color: e.daysLeft <= 7 ? '#d4183d' : '' }">{{ e.daysLeft }}</div>
            <div class="text-xs text-[#9a6070]">วัน</div>
          </template>
          <div v-else class="text-xs text-[#9a6070]">ผ่านมาแล้ว</div>
        </div>
        <button class="md:opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" @click="remove(e.id)">🗑️</button>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from "./Modal.vue";
import { fmt } from "../utils";

export default {
  name: "Countdown",
  components: { Modal },
  data() {
    return {
      events: [
        { id: "1", name: "วันเกิดแฟน 🎂", date: "2026-09-03", emoji: "🎂", recurring: true },
        { id: "2", name: "วันครบรอบ 💕", date: "2027-02-14", emoji: "💕", recurring: true },
        { id: "3", name: "ทริปญี่ปุ่น ✈️", date: "2026-12-20", emoji: "✈️", recurring: false },
      ],
      EMOJIS: ["🎂", "💕", "✈️", "🌸", "🎉", "💍", "🎵", "🌙", "❤️", "🎊"],
      showForm: false,
      form: { name: "", date: "", emoji: "🎂", recurring: false },
      now: new Date(),
      timer: null,
    };
  },
  computed: {
    sorted() {
      return this.events
        .map((e) => {
          const nextDate = this.nextDate(e);
          return { ...e, nextDate, daysLeft: Math.ceil((nextDate - this.now) / 864e5) };
        })
        .sort((a, b) => (a.daysLeft < 0) - (b.daysLeft < 0) || a.daysLeft - b.daysLeft);
    },
  },
  methods: {
    fmt,
    nextDate(e) {
      const d = new Date(e.date);
      if (!e.recurring) return d;
      while (d < this.now) d.setFullYear(d.getFullYear() + 1); // วนซ้ำทุกปีจนเป็นวันในอนาคต
      return d;
    },
    bg(days) {
      if (days < 0) return "#f3e8e0";
      return days <= 7 ? "linear-gradient(135deg, #fca5a5, #f7c5d0)" : days <= 30 ? "linear-gradient(135deg, #fde8d8, #f7e8e8)" : "#fffaf7";
    },
    save() {
      if (!this.form.name || !this.form.date) return;
      this.events.push({ ...this.form, id: Date.now().toString() });
      this.form = { name: "", date: "", emoji: "🎂", recurring: false };
      this.showForm = false;
    },
    remove(id) { this.events = this.events.filter((e) => e.id !== id); },
  },
  mounted() { this.timer = setInterval(() => (this.now = new Date()), 60000); },
  beforeUnmount() { clearInterval(this.timer); },
};
</script>
