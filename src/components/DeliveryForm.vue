<template>
  <v-container class="d-flex flex-column ga-15">
    <h3>Informações para a entrega</h3>

    <v-form class="d-flex flex-column ga-5" ref="deliveryForm">
      <v-text-field :rules="cepValidation" v-model="inputCep" label="Cep" variant="outlined" append-inner-icon="mdi-magnify" @click:append-inner="getCep(inputCep)" />
      <v-row>
        <v-col cols="6">
          <v-text-field :rules="streetValidation" label="Rua" v-model="cepAutocomplete.rua" variant="outlined">
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field :rules="houseNumberValidation" label="Número" variant="outlined" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field :rules="cityValidation" label="Cidade" v-model="cepAutocomplete.cidade" variant="outlined" />
        </v-col>
        <v-col cols="6">
          <v-text-field :rules="stateValidation" label="Estado" v-model="cepAutocomplete.estado" variant="outlined" />
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useCepStore } from '@/stores/CepStore';
import { storeToRefs } from 'pinia';

const { getCep } = useCepStore()

const cepResultRef = useCepStore()
const { cepResult } = storeToRefs(cepResultRef)

const deliveryForm = ref(null)
const inputCep = ref()

const cepAutocomplete = ref({
  rua: '',
  cidade: '',
  estado: ''
})

const cepValidation = ref([value => {
  const cepRegex = /^[0-9]{8}$/

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

watch(cepResult, () => {
  cepAutocomplete.value.rua = cepResult.value.logradouro
  cepAutocomplete.value.cidade = cepResult.value.localidade
  cepAutocomplete.value.estado = cepResult.value.uf
})

defineExpose({
  validate
})
</script>