import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useCepStore = defineStore("CepStore", () => {
  const cepResult = ref(null);

  const getCep = async (cep) => {
    const response = await axios(`https://viacep.com.br/ws/${cep}/json/`);
    cepResult.value = response.data;
  };

  return {
    getCep,
    cepResult,
  };
});
