<template>
  <div
    class="categories_mapper"
    :data-selected="selected"
    :style="{ backgroundImage: `url(${category.imageUrl})` }"
  >
    <div class="categories_mapper_bottom_block">
      <span class="categories_mapper_name">{{ category.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ICategory } from "@/api/category/categoryTypes";
defineProps<{ category: ICategory; selected: boolean }>();
</script>

<style lang="scss" scoped>
.categories_mapper {
  display: flex;
  justify-content: end;
  width: 200px;
  height: 300px;
  align-items: center;
  flex-direction: column;
  position: relative;
  gap: 1rem;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  transition: all 0.5s;
  padding: 20px;
  border-radius: 6px;
  &:hover {
    scale: 1.1;
    box-shadow: inset 4px 4px 8px 2px rgba(128, 128, 128, 0.523);
  }
  .categories_mapper_bottom_block {
    backdrop-filter: blur(5px) sepia(40%);
    padding: 20px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: rgba(240, 248, 255, 0.42);
  }
}

[data-selected="true"] {
  &::after {
    content: "";
    position: absolute;
    background-image: url("../../assets/selected.svg");
    background-position: center;
    background-size: contain;
    width: 40px;
    height: 40px;
    z-index: 2;
    background-color: rgb(216, 216, 216);
    top: 0;
    left: 0;
    border-radius: 50%;
  }
}
</style>
