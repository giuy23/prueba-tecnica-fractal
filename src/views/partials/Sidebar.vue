<script lang="ts" setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="p-4 text-white">
    <h2 class="text-lg font-bold text-center px-6 py-4 rounded-md bg-slate-400">
      LOGO
    </h2>
    <nav
      class="flex flex-col text-2xl font-semibold p-4"
      :class="{ active: 'isActive' }"
    >
      <RouterLink :to="{ name: 'index' }">Home</RouterLink>
      <RouterLink :to="{ name: 'contact' }">Vista 1</RouterLink>
      <RouterLink :to="{ name: 'about' }">Vista 2</RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.router-link-active {
  background-color: aliceblue;
  color: #525252;
  border-radius: 4px;
  padding: 4px;
}
</style>
