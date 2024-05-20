<template>
  <section class="product_mapper_container">
    <article
      class="product_mapper"
      @click="() => router.push(`/product/${product.id}`)"
      :style="{ backgroundImage: `url(${product.imageUrl})` }"
    >
      <div class="product_mapper_bottom_block">
        <span class="product_mapper_bottom_block_name">{{ product.name }}</span>
        <span class="product_mapper_bottom_block_name"
          >Price: {{ product.price }} ₽</span
        >
      </div>
    </article>
    <CartButtonGroup @update="() => emit('update')" :id="product.id" />
  </section>
</template>

<script setup lang="ts">
import { IProduct } from "@/api/products/productsTypes";
import { useRouter } from "vue-router";
import CartButtonGroup from "../modules/CartButtonGroup.vue";

defineProps<{ product: IProduct }>();
const emit = defineEmits<{
  (e: "update"): void;
}>();
const router = useRouter();
</script>

<style lang="scss" scoped>
.product_mapper {
  display: flex;
  justify-content: end;
  width: 250px;
  height: 320px;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.5s;
  background-size: cover;
  background-position: center;
  padding: 20px;
  border-radius: 6px;
  &:hover {
    transform: scale(1.1) translateY(-5%);
    box-shadow: inset 4px 4px 8px 2px rgba(128, 128, 128, 0.523);
  }
  &_bottom_block {
    backdrop-filter: blur(5px) sepia(40%);
    padding: 20px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    background-color: rgba(240, 248, 255, 0.42);
    gap: 20px;
    &_name {
      text-align: left;
      color: rgb(0, 0, 0);
    }
  }
}

.product_mapper_container {
  transition: all 0.5s;
}
</style>
