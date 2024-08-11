<template>
  <v-container class="d-flex flex-column ga-15">
    <h3>Informações para a entrega</h3>

    <v-form class="d-flex flex-column ga-5" ref="deliveryForm">
      <v-text-field :rules="cepValidation" label="Cep" variant="outlined" />
      <v-row>
        <v-col cols="6">
          <v-text-field :rules="streetValidation" label="Rua" variant="outlined" />
        </v-col>
        <v-col cols="6">
          <v-text-field :rules="houseNumberValidation" label="Número" variant="outlined" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field :rules="cityValidation" label="Cidade" variant="outlined" />
        </v-col>
        <v-col cols="6">
          <v-text-field :rules="stateValidation" label="Estado" variant="outlined" />
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const deliveryForm = ref(null)

const cepValidation = ref([value => {
  const cepRegex = /^\d+$/

  if (value?.length == 8 && cepRegex.test(value)) return true
  return "Preencha o campo com 8 dígitos"
}])

const streetValidation = ref([value => {
  const streetRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s+]+$/


  if (value?.length > 3 && streetRegex.test(value)) return true
  return "Preencha o nome da rua com mais de 3 caracteres"
}])

const houseNumberValidation = ref([value => {
  const numberRegex = /^\d+$/

  if (value?.length > 1 && numberRegex.test(value)) return true
  return "Preencha o campo com no mínimo 2 dígitos"
}])

const cityValidation = ref([value => {
  const cityRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s+]+$/

  if (value?.length > 2 && cityRegex.test(value)) return true
  return "Preencha o campo com mais de 2 caracteres, sendo somente letras"
}])

const stateValidation = ref([value => {
  const stateRegex = /^[a-zA-z]+$/

  if (value?.length == 2 && stateRegex.test(value)) return true
  return "Preencha o campo apenas com a abreviação do estado, ex: SP"
}])

const validate = async () => {
  try {
    const response = await deliveryForm.value.validate();
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