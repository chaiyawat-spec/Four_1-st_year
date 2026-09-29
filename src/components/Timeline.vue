<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div><h2 class="h-title text-xl">Our Timeline</h2><p class="sub">ความทรงจำของเราสองคน</p></div>
      <button class="btn" @click="openNew">＋ เพิ่มความทรงจำ</button>
    </div>

    <Modal v-if="showForm" :title="editingId ? 'แก้ไขความทรงจำ' : 'บันทึกความทรงจำใหม่'" @close="showForm = false">
      <div class="space-y-3">
        <div class="flex gap-2 flex-wrap">
          <button v-for="e in EMOJIS" :key="e" class="emoji-btn" :class="{ on: form.emoji === e }" @click="form.emoji = e">{{ e }}</button>
        </div>
        <input v-model="form.title" class="inp" placeholder="หัวข้อ..." />
        <input v-model="form.date" type="date" class="inp" />
        <textarea v-model="form.content" rows="3" class="inp resize-none" placeholder="เล่าให้ฟังหน่อย..."></textarea>
        <div>
          <p class="text-xs mb-2 text-[#9a7a7a]">แท็ก</p>
          <div class="flex flex-wrap gap-2">
            <button v-for="t in TAGS" :key="t" class="chip" :class="{ on: form.tags.includes(t) }" @click="toggleTag(t)">{{ t }}</button>
          </div>
        </div>
        <button class="btn-block" @click="save">บันทึก ❤️</button>
      </div>
    </Modal>

    <div class="relative">
      <div class="absolute left-6 top-0 bottom-0 w-px" style="background: linear-gradient(to bottom, #f7c5d0, #fde8d8)"></div>
      <div class="space-y-6 pl-16">
        <div v-for="p in sorted" :key="p.id" class="relative group">
          <div class="absolute -left-10 top-4 w-8 h-8 rounded-full flex items-center justify-center shadow-sm bg-[#f7c5d0]">{{ p.emoji }}</div>
          <div class="card-soft p-5 flex items-start justify-between gap-2">
            <div class="flex-1 min-w-0">
              <p class="text-xs text-[#9a7a7a] mb-1">📅 {{ fmt(p.date) }}</p>
              <h3 class="font-medium mb-2">{{ p.title }}</h3>
              <p class="text-sm leading-relaxed text-[#6b5050]">{{ p.content }}</p>
              <img v-if="p.image" :src="p.image" :alt="p.title" class="mt-3 w-full h-44 rounded-xl object-cover" />
              <div v-if="p.tags.length" class="flex flex-wrap gap-1.5 mt-3">
                <span v-for="t in p.tags" :key="t" class="px-2.5 py-0.5 rounded-full text-xs bg-[#f7e8e8] text-[#c9748a]">{{ t }}</span>
              </div>
            </div>
            <div class="flex gap-1 md:opacity-0 group-hover:opacity-100 transition-opacity">
              <button class="p-1.5 rounded-lg hover:bg-pink-50 cursor-pointer" @click="openEdit(p)">✏️</button>
              <button class="p-1.5 rounded-lg hover:bg-red-50 cursor-pointer" @click="remove(p.id)">🗑️</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from "./Modal.vue";
import { fmt } from "../utils";

export default {
  name: "Timeline",
  components: { Modal },
  data() {
    return {
      // ข้อมูลตัวอย่าง — ตอนทำ backend ให้เปลี่ยนเป็นดึงจาก API
      posts: [
        { id: "1", title: "วันแรกที่เจอกัน", content: "วันนั้นเธอใส่เสื้อสีชมพูอ่อน ๆ ยืนรอรถอยู่ที่ป้าย ฉันไม่กล้าพูดอะไรเลย แต่ก็จำหน้าไม่ลืม ❤️", date: "2022-11-05", tags: ["#ความทรงจำ", "#วันพิเศษ"], emoji: "💫" },
        { id: "2", title: "ทริปเที่ยวเชียงใหม่ด้วยกัน", content: "ดอยสุเทพตอนเช้า หมอกบาง ๆ อากาศเย็นสบาย 🌸", date: "2023-06-20", tags: ["#ทริปเที่ยว", "#เชียงใหม่"], emoji: "🌸", image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&h=400&fit=crop&auto=format" },
        { id: "3", title: "วันครบรอบ 1 ปี", content: "ร้านอาหารริมทะเล เทียนน้อย ๆ บนโต๊ะ ขอบคุณที่อยู่ด้วยกันมาตลอดนะ 🎂", date: "2024-02-14", tags: ["#วันครบรอบ", "#โรแมนติก"], emoji: "🎂" },
      ],
      TAGS: ["#ทริปเที่ยว", "#วันครบรอบ", "#ของกิน", "#วันพิเศษ", "#ความทรงจำ", "#โรแมนติก"],
      EMOJIS: ["💫", "🌸", "🎂", "❤️", "🌙", "✨", "🌺", "🎵", "🍜", "🌅"],
      showForm: false,
      editingId: null,
      form: { title: "", content: "", date: "", tags: [], emoji: "💫" },
    };
  },
  computed: {
    sorted() { return [...this.posts].sort((a, b) => new Date(b.date) - new Date(a.date)); },
  },
  methods: {
    fmt,
    openNew() {
      this.form = { title: "", content: "", date: new Date().toISOString().slice(0, 10), tags: [], emoji: "💫" };
      this.editingId = null;
      this.showForm = true;
    },
    openEdit(p) {
      this.form = { title: p.title, content: p.content, date: p.date, tags: [...p.tags], emoji: p.emoji };
      this.editingId = p.id;
      this.showForm = true;
    },
    save() {
      if (!this.form.title.trim()) return;
      if (this.editingId) {
        this.posts = this.posts.map((p) => (p.id === this.editingId ? { ...p, ...this.form } : p));
      } else {
        this.posts.unshift({ ...this.form, id: Date.now().toString() });
      }
      this.showForm = false;
    },
    remove(id) { this.posts = this.posts.filter((p) => p.id !== id); },
    toggleTag(t) {
      const i = this.form.tags.indexOf(t);
      i === -1 ? this.form.tags.push(t) : this.form.tags.splice(i, 1);
    },
  },
};
</script>
