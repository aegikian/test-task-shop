<template>
  <section class="categories_n_products">
    <nav class="categories_n_products_links">
      <RouterLink
        class="categories_n_products_link"
        :data-selected-route="useRoutes(route.path).active"
        v-for="route in routes"
        :to="useRoutes(route.path).to"
        :key="route.path"
      >
        {{ route.name }}
      </RouterLink>
    </nav>
    <button
      @click="handleReplace"
      class="categories_n_products_filter_remove_button"
    >
      Remove filters
    </button>
    <RouterView />
  </section>
</template>

<script setup lang="ts">
import { RouterView, useRoute, useRouter, RouterLink } from "vue-router";

const routes = [
  { name: "Categories", path: "/categories" },
  { name: "Products", path: "/products" },
];
const router = useRouter();

const useRoutes = (route: string) => {
  const { path, query } = useRoute();
  const id = query?.category_id;

  return {
    active: path === route,
    to: route + (id ? "?category_id=" + id : ""),
  };
};

const handleReplace = () => {
  router.replace("/");
};
</script>

<style lang="scss" scoped>
.categories_n_products {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-left: 12px;

  &_links {
    display: flex;
    gap: 40px;
  }

  &_link {
    text-decoration: none;
    color: black;
    padding: 2%;
    border-radius: 10px;
    transition: background-color 0.5s;
    box-sizing: border-box;
  }

  &_filter_remove_button {
    width: max-content;
    padding: 1%;
    border: none;
    border-radius: 6px;
    transition: background-color 0.4s;

    &:hover {
      background-color: rgb(195, 195, 195);
    }
  }
}

[data-selected-route="true"] {
  color: rgb(0, 0, 0);
  background-color: rgb(208, 208, 208);
}
</style>
