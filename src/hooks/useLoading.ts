import { ref } from "vue";

const useLoading = () => {
  const isLoading = ref(false);
  const setIsLoading = (state: boolean) => {
    isLoading.value = state;
  };
  return { isLoading, setIsLoading };
};
export default useLoading();
