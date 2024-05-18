<template>
  <section class="product_mapper_button_buy_section">
    <button
      v-if="countOfItems(id)"
      @click="
        () => {
          decrementOne(id);
          emit('update');
        }
      "
    >
      -
    </button>
    <button @click="handleAddItem">
      <img
        class="product_mapper_button_buy_image"
        v-if="!countOfItems(id)"
        src="../../assets/cart-add.svg"
        alt="add"
      />
      <img
        class="product_mapper_button_buy_image"
        v-else-if="countOfItems(id)"
        src="../../assets/cart-added.svg"
        alt="add"
      />
      <span>{{ countOfItems(id) }}</span>
    </button>
    <button v-if="countOfItems(id)" @click="handleAddItem">+</button>
  </section>
</template>

<script setup lang="ts">
import useCart from "@/hooks/useCart";

const props = defineProps<{ id: number }>();
const emit = defineEmits<{
  (e: "update"): void;
}>();

const { items, setItems, decrementOne } = useCart;

const handleAddItem = () => {
  setItems(props.id);
  emit("update");
};

const countOfItems = (id: number) => {
  return items.value.get(id);
};
</script>

<style lang="scss" scoped>
.product_mapper_button_buy_image {
  width: 30px;
}

.product_mapper_button_buy_section {
  display: flex;
  justify-content: space-between;
  button {
    background: none;
    border: none;
    width: 100%;
    font-size: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
