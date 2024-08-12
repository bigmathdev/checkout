import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useProductStore = defineStore("ProductStore", () => {
  const product = ref(null);

  const getProduct = async () => {
    try {
      const response = await axios("https://localhost:3000/OFFER_CODE");
      product.value = response.data;
    } catch {
      console.error("Request error");
    }
  };

  return {
    getProduct,
    product,
  };
});
