import { defineStore } from "pinia";
import { ref } from "vue";

export const useCheckoutFormStore = defineStore("CheckoutForm", () => {
  const formCheckout = ref({
    name: "",
    email: "",
    phone: "",
    cep: "",
    street: "",
    number: "",
    city: "",
    state: "",
    paymentMethod: "",
    product: "",
    price: "",
    shipping: "",
    total: "",
  });
  return {
    formCheckout,
  };
});
