<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <div><h2 class="h-title text-xl">Wishlist & Bucket List</h2><p class="sub">สิ่งที่เราอยากทำด้วยกัน ✨</p></div>
      <div class="text-right">
        <div class="h-title text-xl">{{ doneCount }}/{{ items.length }}</div>
        <p class="text-xs text-[#9a7a7a]">สำเร็จแล้ว</p>
      </div>
    </div>

    <div class="h-2 rounded-full overflow-hidden bg-[#f3e8e0] mb-4">
      <div class="h-full rounded-full transition-all duration-500"
        :style="{ width: percent + '%', background: 'linear-gradient(90deg, #f7c5d0, #c9748a)' }"></div>
    </div>

    <div class="flex gap-2 mb-4 flex-wrap">
      <button v-for="f in FILTERS" :key="f.id" class="chip" :class="{ on: filter === f.id }" @click="filter = f.id">{{ f.label }}</button>
    </div>

    <div class="flex gap-2 mb-5">
      <div class="flex rounded-xl overflow-hidden border border-[#c9748a]/25">
        <button v-for="t in TYPES" :key="t.id" class="px-3 py-2 text-xs text-[#a84f65] cursor-pointer"
          :class="type === t.id ? 'bg-[#f7c5d0]' : ''" @click="type = t.id">{{ t.label }}</button>
      </div>
      <input v-model="input" class="inp flex-1 min-w-0" placeholder="เพิ่มสิ่งที่อยากทำ..." @keydown.enter="add" />
      <button class="px-3 rounded-xl bg-[#c9748a] text-white cursor-pointer" @click="add">＋</button>
    </div>

    <div class="space-y-2">
      <div v-for="i in filtered" :key="i.id" class="flex items-center gap-3 p-3 rounded-xl group"
        :style="{ background: i.done ? '#f7e8e8' : '#fffaf7', border: '1px solid rgba(201,116,138,.12)' }">
        <button class="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 text-white text-xs cursor-pointer"
          :style="{ borderColor: i.done ? '#c9748a' : 'rgba(201,116,138,.4)', background: i.done ? '#c9748a' : 'transparent' }"
          @click="i.done = !i.done">{{ i.done ? "✓" : "" }}</button>
        <span class="flex-1 text-sm" :class="i.done ? 'line-through opacity-60' : ''">{{ i.type === "place" ? "🗺️" : "🛍️" }} {{ i.text }}</span>
        <button class="md:opacity-0 group-hover:opacity-100 transition-opacity text-[#9a7a7a] cursor-pointer" @click="remove(i.id)">✕</button>
      </div>
      <p v-if="!filtered.length" class="text-center py-8 sub">ว่างเปล่า... เพิ่มสิ่งที่อยากทำด้วยกันกันเถอะ 🌸</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Wishlist",
  data() {
    return {
      items: [
        { id: "1", text: "ไปเที่ยวญี่ปุ่นด้วยกัน 🗾", type: "place", done: false },
        { id: "2", text: "กินชาบูที่ร้านโปรด", type: "thing", done: true },
        { id: "3", text: "ดูดาวที่เขาค้อ 🌟", type: "place", done: false },
        { id: "4", text: "ทำเค้กวันเกิดให้แฟน 🎂", type: "thing", done: true },
        { id: "5", text: "เที่ยวทะเลด้วยกัน 🌊", type: "place", done: false },
      ],
      input: "",
      type: "place",
      filter: "all",
      TYPES: [{ id: "place", label: "🗺️ สถานที่" }, { id: "thing", label: "🛍️ ของ/ประสบการณ์" }],
      FILTERS: [
        { id: "all", label: "ทั้งหมด" }, { id: "place", label: "🗺️ สถานที่" },
        { id: "thing", label: "🛍️ ของ/ประสบการณ์" }, { id: "done", label: "✅ สำเร็จแล้ว" },
      ],
    };
  },
  computed: {
    doneCount() { return this.items.filter((i) => i.done).length; },
    percent() { return this.items.length ? (this.doneCount / this.items.length) * 100 : 0; },
    filtered() {
      return this.items.filter((i) =>
        this.filter === "all" ? true : this.filter === "done" ? i.done : i.type === this.filter);
    },
  },
  methods: {
    add() {
      if (!this.input.trim()) return;
      this.items.push({ id: Date.now().toString(), text: this.input.trim(), type: this.type, done: false });
      this.input = "";
    },
    remove(id) { this.items = this.items.filter((i) => i.id !== id); },
  },
};
</script>
