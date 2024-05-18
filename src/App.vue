<template>
  <div><HeaderComponent /></div>
  <div class="app_layout">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import HeaderComponent from "@/components/modules/HeaderComponent.vue";
</script>

<style lang="scss" scoped>
.app_layout {
  padding: 100px 0;
  max-width: 100vw;
  min-width: 100vw;
  overflow-x: hidden;
}
</style>
