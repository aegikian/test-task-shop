<template>
  <section class="category_module">
    <h2>Categories</h2>
    <div
      v-if="categories?.items?.length && !isLoading"
      class="categories_module_category_container"
    >
      <CategoryItem
        @click="() => handleUpdate(String(category.id))"
        v-for="category in categories?.items"
        :selected="id == category.id"
        :category="category"
        :key="category.id"
      />
    </div>
    <span v-if="isLoading">Loading...</span>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { getCategories } from "@/api/category/category";
import { ICategoryListResponse } from "@/api/category/categoryTypes";
import CategoryItem from "@/components/categories/CategoryItem.vue";
import useLoading from "@/hooks/useLoading";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const categories = ref<ICategoryListResponse | null>(null);
const { isLoading, setIsLoading } = useLoading;
const id = ref();

onMounted(() => {
  id.value = route.query?.category_id ? route.query?.category_id : undefined;
  getCategoriesData();
});

const getCategoriesData = async () => {
  setIsLoading(true);
  const data = await getCategories(id.value as string);
  categories.value = {
    ...data,
    items: !id.value
      ? data.items.filter((el) => !el.parentId)
      : data.items.filter((el) => el.parentId == id.value || el.id == id.value),
  };
  setIsLoading(false);
};

const handleUpdate = async (newId?: string) => {
  id.value = newId;
  if (id.value) {
    router.replace({ query: { category_id: String(id.value) } });
  }
};

watch(
  () => route.query,
  async () => {
    id.value = route.query?.category_id ? route.query?.category_id : undefined;
    getCategoriesData();
  }
);
</script>

<style lang="scss" scoped>
.category_module {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
}
.categories_module_category_container {
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
