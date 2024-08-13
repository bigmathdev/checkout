<template>
  <v-container class="d-flex flex-column ga-15">
    <h3>Informações pessoais</h3>

    <v-form class="d-flex flex-column ga-5" ref="identifyForm">
      <v-text-field :rules="nameValidation" v-model="formCheckout.name" label="Nome *" variant="outlined" />
      <v-text-field :rules="emailValidation" v-model="formCheckout.email" label="E-mail" variant="outlined" />
      <v-text-field :rules="phoneValidation" v-model="formCheckout.phone" label="Telefone *" variant="outlined" />
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useCheckoutFormStore } from '@/stores/CheckoutFormStore';
import { storeToRefs } from 'pinia';

const checkoutFormModel = useCheckoutFormStore()
const { formCheckout } = storeToRefs(checkoutFormModel)

const identifyForm = ref(null)

const nameValidation = ref([value => {
  const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s+]+$/

  if (value?.length > 3 && nameRegex.test(value)) return true
  return 'Inclua apenas letras e mais de 3 caracteres'
}])

const emailValidation = ref([value => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  if (value) {
    if (emailRegex.test(value)) return true
    return 'Preencha com um e-mail válido'
  }
}])

const phoneValidation = ref([value => {
  const phoneRegex = /^\d+$/

  if (value?.length > 8 && phoneRegex.test(value)) return true
  return 'O campo deve conter mais de 8 dígitos e ser somente números'
}])

const validate = async () => {
  try {
    const response = await identifyForm.value.validate();
    return response.valid;
  } catch (error) {
    console.error('Erro ao validar:', error);
    return false;
  }
}

defineExpose({
  validate
})
</script>