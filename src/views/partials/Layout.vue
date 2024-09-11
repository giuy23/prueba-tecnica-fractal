<script lang="ts" setup>
import MenuBarIcon from "@/Icons/MenuBarIcon.vue" 
import Sidebar from "@/views/partials/Sidebar.vue"
import { ref } from "vue";

const isSidebarOpen = ref(false);
const openSiderbar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<template>
  <div class="flex">
    <div
      :class="{
        hidden: !isSidebarOpen,
        block: isSidebarOpen,
        fixed: true,
        'z-40': true,
      }"
      class="lg:relative lg:block bg-stone-600 lg:w-1/6 w-64 min-h-full"
    >
      <Sidebar />
    </div>

    <div
      v-if="isSidebarOpen"
      @click="openSiderbar"
      class="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
    ></div>

    <div class="flex-1 bg-blue-100 min-h-screen m-auto">
      <div class="lg:hidden p-4">
        <button @click="openSiderbar" >
          <MenuBarIcon/>
        </button>
      </div>

      <slot></slot>
    </div>
  </div>
</template>

<style scoped></style>
