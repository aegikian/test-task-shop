<template>
  <section
    v-if="products?.items?.length && !isLoading"
    class="cart_products_section"
  >
    <h2>Your products:</h2>
    <div class="cart_products_mapper">
      <div v-for="product in products?.items" :key="product.id">
        <ProductItem @update="() => updateAmount()" :product="product" />
        <button
          class="cart_button_delete"
          @click="
            () => {
              removeOne(product.id);
              getProductsData();
            }
          "
        >
          Delete
        </button>
      </div>
    </div>
    <h4>Amount: {{ amount }}₽</h4>
    <button class="cart_button_order" @click="isOpen = !isOpen">Order</button>
  </section>
  <section
    v-else-if="!products?.items?.length && !isLoading"
    class="cart_products_section"
  >
    <h1>Cart is empty</h1>
  </section>
  <section v-else-if="isLoading" class="cart_products_section">
    <h1>Loading...</h1>
  </section>
  <ModalComponent v-model:is-open="isOpen">
    <template #body>
      <div class="cart_modal_body">
        Congrats! You order on amount {{ amount }}₽ created!
      </div>
    </template>
  </ModalComponent>
</template>

<script setup lang="ts">
import { getProducts } from "@/api/products/products";
import { IProductsListResponse } from "@/api/products/productsTypes";
import ProductItem from "@/components/categories/ProductItem.vue";
import ModalComponent from "@/components/modules/ModalComponent.vue";
import useCart from "@/hooks/useCart";
import useLoading from "@/hooks/useLoading";
import { onMounted, ref, watch } from "vue";

const { getProductIds, removeOne, items, clearCart } = useCart;
const { isLoading, setIsLoading } = useLoading;
const amount = ref(0);
const products = ref<IProductsListResponse | null>(null);
const isOpen = ref(false);

const updateAmount = () => {
  amount.value = 0;
  products.value?.items?.forEach((el) => {
    const count = items.value.get(el.id);
    if (count) amount.value += count * el.price;
  });
};

const getProductsData = async () => {
  setIsLoading(true);
  const productsIds = getProductIds();
  if (productsIds?.length) {
    products.value = await getProducts(undefined, productsIds);
    updateAmount();
  } else products.value = null;
  setIsLoading(false);
};

onMounted(() => {
  getProductsData();
});

watch(
  () => items.value.size,
  () => getProductsData()
);

watch(
  () => isOpen.value,
  () => {
    if (isOpen.value)
      setTimeout(() => {
        isOpen.value = false;
        clearCart();
      }, 3000);
  }
);
</script>

<style lang="scss" scoped>
.cart_products_section {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 40px;
  justify-content: center;
  align-items: center;
}

.cart_products_mapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 40px;
  width: 80vw;
}

.cart_modal_body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 2%;
}

.cart_button_delete {
  background-color: rgba(231, 9, 9, 0.812);
  padding: 2%;
  border-radius: 6px;
  border: none;
  margin-top: 20px;
}

.cart_button_order {
  background-color: rgba(27, 163, 93, 0.812);
  padding: 2%;
  border-radius: 6px;
  border: none;
  width: 200px;
  margin-top: 20px;
}
</style>
