<template>
  <section class="product_module">
    <h2>Products</h2>
    <div
      v-if="products?.items?.length && !isLoading"
      class="categories_module_product_container"
    >
      <ProductItem
        v-for="product in products?.items"
        :product="product"
        :key="product.id"
      />
    </div>
    <span v-else-if="isLoading">Loading...</span>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { getProducts } from "@/api/products/products";
import { IProductsListResponse } from "@/api/products/productsTypes";
import ProductItem from "@/components/categories/ProductItem.vue";
import useLoading from "@/hooks/useLoading";
import { useRoute } from "vue-router";

const products = ref<IProductsListResponse | null>(null);
const { isLoading, setIsLoading } = useLoading;
const route = useRoute();
const id = ref(
  route?.query?.category_id ? route?.query?.category_id : undefined
);

const getProductsData = async () => {
  setIsLoading(true);
  products.value = await getProducts(id.value as string);
  setIsLoading(false);
};

onMounted(() => {
  getProductsData();
});

watch(
  () => route.query,
  async () => {
    const id = route.query?.category_id ? route.query?.category_id : undefined;
    products.value = await getProducts(id as string);
  }
);
</script>

<style lang="scss" scoped>
.product_module {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
}
.categories_module_product_container {
  display: flex;
  flex-wrap: wrap;
  padding: 0 20%;
  justify-items: center;
  gap: 40px;
  width: 100vw;
  justify-content: center;
  align-items: center;
}
</style>
