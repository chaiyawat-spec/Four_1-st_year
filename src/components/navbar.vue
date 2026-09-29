<template>
  <nav class="w-auto h-17 p-4 pl-60 pr-60 flex justify-between text-lg bg-white">
    <div class="flex gap-1 font-medium items-center justify-center text-[#a84f65]">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
      Micky & Four
    </div>
    <div class="flex justify-between gap-6">

      <div class="flex w-30 items-center justify-center text-sm text-[#9a7a7a] gap-1 font-[450] " :class="timeline ? 'text-[#fef3f7] border-1 rounded-2xl bg-[#c9748a] ': ''" @click="$emit('change_tab' , 'timeline')">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-4.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>Timeline
      </div>
      <div class="flex w-30 items-center justify-center text-sm text-[#9a7a7a] gap-1" :class="wishlist ? 'text-[#fef3f7] border-1 rounded-2xl bg-[#c9748a] ': ''" @click="$emit('change_tab' , 'wishlist')">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-4.5">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
        Wishlist
      </div>
      <div class="flex w-30 items-center justify-center text-sm text-[#9a7a7a] gap-1" :class="countdown ? 'text-[#fef3f7] border-1 rounded-2xl bg-[#c9748a] ': ''" @click="$emit('change_tab' , 'countdown')">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-4.5">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
        </svg>
        Countdown
      </div>
      <div class="flex w-30 items-center justify-center text-sm text-[#9a7a7a] gap-1" :class="secret ? 'text-[#fef3f7] border-1 rounded-2xl bg-[#c9748a] ': ''" @click="$emit('change_tab' , 'secret')">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-4.5">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
        </svg>
        Secret
      </div>
    </div>
  </nav>
</template>

<script>
import { normalizeClass } from 'vue';

export default {
  name: "navbar",
  data() {

  },
  props: {
    timeline: {
      type: Boolean,
      default: false
    },
    wishlist: {
      type: Boolean,
      default: false,
    },
    countdown: {
      type: Boolean,
      default: false,
    },
    secret: {
      type: Boolean,
      default: false,
    },
  }
}
</script>

<style></style>