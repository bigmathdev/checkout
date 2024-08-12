import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useProductStore = defineStore("ProductStore", () => {
  const product = ref(null);

  const getProduct = async () => {
    try {
      const response = await axios("http://localhost:3000/OFFER_CODE");
      product.value = await response.json();
    } catch {
      console.erro("Request error", error);
    }
  };

  return {
    getProduct,
    product,
  };
});
