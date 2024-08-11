<template>
  <v-container class="d-flex flex-column ga-15">
    <h3>Informações pessoais</h3>

    <v-form class="d-flex flex-column ga-5" ref="identifyForm">
      <v-text-field :rules="nameValidation" label="Nome" variant="outlined" />
      <v-text-field :rules="emailValidation" label="E-mail" variant="outlined" />
      <v-text-field :rules="phoneValidation" label="Telefone" variant="outlined" />
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const identifyForm = ref(null)

const nameValidation = ref([value => {
  const nameRegex = /^[a-zA-Z]+$/

  if (value?.length > 3 && nameRegex.test(value)) return true
  return 'Inclua apenas letras e mais de 3 caracteres'
}])

const emailValidation = ref([value => {
  const emailRegex = /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i

  if (emailRegex.test(value)) return true
  return 'Preencha com um e-mail válido'
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