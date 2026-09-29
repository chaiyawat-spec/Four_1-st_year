<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div><h2 class="h-title text-xl">Secret Messages</h2><p class="sub">กล่องข้อความลับ 🔐</p></div>
      <button class="btn" @click="showForm = true">＋ เขียนข้อความลับ</button>
    </div>

    <Modal v-if="showForm" title="✍️ เขียนข้อความลับ" @close="showForm = false">
      <div class="space-y-3">
        <div class="flex gap-2">
          <button v-for="w in ['ฉัน', 'แฟน']" :key="w" class="chip flex-1 py-2 text-sm" :class="{ on: form.from === w }" @click="form.from = w">จาก {{ w }}</button>
        </div>
        <input v-model="form.title" class="inp" placeholder="ชื่อข้อความ..." />
        <textarea v-model="form.content" rows="4" class="inp resize-none" placeholder="เขียนข้อความลับไว้ที่นี่..."></textarea>
        <div>
          <p class="text-xs mb-1 text-[#9a7a7a]">เปิดอ่านได้วันที่</p>
          <input v-model="form.openDate" type="date" class="inp" />
        </div>
        <button class="btn-block" @click="save">ล็อกข้อความ 🔒</button>
      </div>
    </Modal>

    <div v-if="opened" class="fixed inset-0 z-50 flex items-center justify-center p-4"
      style="background: rgba(61,44,44,.5); backdrop-filter: blur(8px)" @click.self="openedId = null">
      <div class="w-full max-w-md rounded-3xl p-8 shadow-2xl text-center"
        style="background: linear-gradient(135deg, #fffaf7, #fef3f7); border: 1px solid rgba(201,116,138,.2)">
        <div class="text-5xl mb-4">💌</div>
        <p class="text-xs mb-1 text-[#c9748a]" style="letter-spacing: .15em">จาก {{ opened.from }} • {{ fmt(opened.openDate) }}</p>
        <h3 class="h-title text-lg mb-5">{{ opened.title }}</h3>
        <p class="hand leading-relaxed text-xl">{{ opened.content }}</p>
        <button class="btn mt-6 px-6" @click="openedId = null">ปิด ❤️</button>
      </div>
    </div>

    <div class="space-y-3">
      <div v-for="m in messages" :key="m.id" class="rounded-2xl p-5 flex items-start gap-4"
        :style="{ background: locked(m) ? 'linear-gradient(135deg, #f3e8e0, #fdf0f0)' : '#fffaf7', border: '1px solid rgba(201,116,138,.15)' }">
        <div class="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-xl"
          :style="{ background: locked(m) ? '#f7c5d0' : '#c9748a' }">{{ locked(m) ? "🔒" : "🔓" }}</div>
        <div class="flex-1 min-w-0">
          <p class="font-medium">{{ m.title }}</p>
          <p class="text-xs mt-0.5 text-[#9a6070]">
            จาก {{ m.from }} • {{ locked(m) ? `เปิดได้ใน ${daysUntil(m)} วัน (${fmt(m.openDate)})` : `เปิดได้แล้ว — ${fmt(m.openDate)}` }}
          </p>
        </div>
        <button v-if="!locked(m)" class="btn shrink-0 text-xs" @click="openedId = m.id">👀 อ่านเลย</button>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from "./Modal.vue";
import { fmt } from "../utils";

export default {
  name: "Secret",
  components: { Modal },
  data() {
    return {
      messages: [
        { id: "1", title: "ข้อความพิเศษสำหรับวันวาเลนไทน์ 💌", content: "ที่รัก... ขอบคุณที่อยู่ด้วยกันมาตลอด ทุกวันที่มีเธอมันพิเศษมากสำหรับฉัน รักเธอมากนะ ❤️", openDate: "2026-02-14", from: "ฉัน" },
        { id: "2", title: "ข้อความลับสุดพิเศษ 🌸", content: "เธอคือคนที่ฉันฝันถึงเสมอ ฉันรู้ว่าฉันโชคดีมากแค่ไหน", openDate: "2027-08-10", from: "แฟน" },
      ],
      showForm: false,
      openedId: null,
      form: { title: "", content: "", openDate: "", from: "ฉัน" },
    };
  },
  computed: {
    opened() { return this.messages.find((m) => m.id === this.openedId); },
  },
  methods: {
    fmt,
    locked(m) { return new Date(m.openDate) > new Date(); },
    daysUntil(m) { return Math.max(0, Math.ceil((new Date(m.openDate) - new Date()) / 864e5)); },
    save() {
      if (!this.form.title || !this.form.content || !this.form.openDate) return;
      this.messages.push({ ...this.form, id: Date.now().toString() });
      this.form = { title: "", content: "", openDate: "", from: "ฉัน" };
      this.showForm = false;
    },
  },
};
</script>
