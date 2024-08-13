import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useProductStore = defineStore("ProductStore", () => {
  const product = ref(null);

  const getProduct = async () => {
    try {
      const response = await axios.get("https://api.deepspacestore.com/offers/nike_offer");
      product.value = response.data;
    } catch ( error) {
      console.error("Request error", error);
    }
  };

  return {
    getProduct,
    product
  };
});
