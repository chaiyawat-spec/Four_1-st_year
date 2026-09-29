<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4"
    style="background: rgba(61,44,44,.35); backdrop-filter: blur(4px)" @click.self="$emit('close')">
    <div class="w-full max-w-md rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto" style="background: #fffaf7">
      <div class="flex items-center justify-between mb-4">
        <h3 class="h-title text-lg">{{ title }}</h3>
        <button class="text-[#9a7a7a] cursor-pointer" @click="$emit('close')">✕</button>
      </div>
      <slot />
    </div>
  </div>
</template>
<script>
export default { name: "Modal", props: { title: String }, emits: ["close"] };
</script>
