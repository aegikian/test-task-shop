<script setup lang="ts">
import { onMounted } from "vue";
import { getCategoties } from "./api/category/category";

onMounted(() => {
  getCategoties();
});
</script>

<template>
  <div>first</div>
</template>

<style lang="scss" scoped>
.a {
  background-color: black;
}
</style>
