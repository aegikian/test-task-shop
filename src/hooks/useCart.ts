import { ref } from "vue";

type CartItem = [number, number];

const useCart = (initialItems: CartItem[] = []) => {
  const items = ref(new Map<number, number>());

  const filler = (item?: CartItem) => {
    if (!item) return;
    const [itemId, quantity] = item;
    if (!items.value.has(itemId)) items.value.set(itemId, quantity);
    else items.value.set(itemId, items.value.get(itemId)! + quantity);
  };

  for (const item of initialItems) {
    filler(item);
  }

  const storagePush = () => {
    localStorage.setItem(
      "cart_items",
      JSON.stringify(Array.from(items.value.entries()))
    );
  };
  const setItems = (itemId: number, quantity: number = 1) => {
    filler([itemId, quantity]);
    storagePush();
  };

  const decrementOne = (itemId: number) => {
    if (!items.value.has(itemId)) return;
    const count = items?.value.get(itemId);
    if (count === undefined) return;
    if (count === 1) removeOne(itemId);
    else items.value.set(itemId, count - 1) && storagePush();
  };

  const removeOne = (itemId: number) => {
    items.value.has(itemId) && items.value.delete(itemId);
    storagePush();
  };

  const getProductIds = () => {
    const ids = Array.from(items.value.keys());
    if (ids) return ids;
  };

  const clearCart = () => {
    items.value = new Map<number, number>();
    storagePush();
  };

  const allItemsCount = () => {
    const entries = Array.from(items.value.values());
    if (!entries.length) return 0;
    return entries.reduce((el, acc = 0) => el + acc);
  };

  return {
    items,
    setItems,
    decrementOne,
    removeOne,
    clearCart,
    allItemsCount,
    getProductIds,
  };
};

const itemsFromStorage = localStorage.getItem("cart_items");
const parsedItems: CartItem[] = itemsFromStorage
  ? JSON.parse(itemsFromStorage)
  : [];

export default useCart(parsedItems);
