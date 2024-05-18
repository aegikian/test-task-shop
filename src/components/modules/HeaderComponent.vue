<template>
  <header class="header">
    <nav class="header_routes_mapper">
      <RouterLink
        v-for="route in routes"
        class="header_routes_link"
        :to="route.path"
        :key="route.name"
        >{{ route.name }}</RouterLink
      >
      <RouterLink
        class="header_routes_cart"
        :data-counter="allItemsCount()"
        to="/cart"
      >
        <img
          class="header_routes_cart_image"
          src="../../assets/cart.svg"
          alt="cart"
        />
      </RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
import useCart from "@/hooks/useCart";

import { useRouter } from "vue-router";

const {
  options: { routes },
} = useRouter();

const { allItemsCount } = useCart;
</script>

<style lang="scss" scoped>
.header {
  background-color: rgba(255, 255, 255, 0.725);
  border-radius: 0px 0px 6px 6px;
  border: none;
  width: 100vw;
  height: 60px;
  border-bottom: 1px rgba(175, 175, 175, 0.221) solid;
  position: fixed;
  z-index: 10;
  backdrop-filter: blur(3px);
  box-shadow: inset 4px 8px 10px 0px rgba(128, 128, 128, 0.402);

  .header_routes_link {
    color: black;
    text-decoration: none;
    transition: all 0.5s;
  }
}

.header_routes_mapper {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  padding: 0 50px;
  align-items: center;
  height: 100%;
}

[data-selected="true"] {
  text-shadow: 0px 2px 6px rgb(14, 81, 215);
}
.header_routes_cart_image {
  width: 30px;
  border: none;
  border-radius: 50%;
}
.header_routes_cart {
  position: relative;
  color: black;

  &::after {
    content: attr(data-counter);
    background-color: rgb(255, 255, 255);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 60%;
    bottom: 0;
    width: 20px;
    border: 0.5px gray solid;
    height: 20px;
    border-radius: 10px;
  }
}
</style>
