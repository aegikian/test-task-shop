import CategoriesModuleVue from "@/components/categories/CategoriesModule.vue";
import ProductsModuleVue from "@/components/categories/ProductsModule.vue";
import CategoriesAndProductsPageVue from "@/pages/CategoriesAndProductsPage.vue";
import NotFoundPageVue from "@/pages/NotFoundPage.vue";
import ProductInfoVue from "@/pages/ProductInfo.vue";
import ShoppingCartVue from "@/pages/ShoppingCart.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Categories & products",
      component: CategoriesAndProductsPageVue,
      redirect: "/categories",
      children: [
        {
          path: "/categories",
          name: "categories",
          component: CategoriesModuleVue,
        },
        {
          path: "/products",
          name: "products",
          component: ProductsModuleVue,
        },
      ],
    },
    {
      path: "/product/:prod_id",
      component: ProductInfoVue,
    },
    { path: "/cart", component: ShoppingCartVue },
    {
      path: "/:pathMatch(.*)*",
      component: NotFoundPageVue,
    },
  ],
});

export default router;
