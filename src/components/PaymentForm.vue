<template>
  <v-container class="d-flex flex-column ga-15">
    <h3>Informações para o pagamento</h3>

    <v-form class="d-flex flex-column ga-5" ref="paymentForm">
      <v-radio-group v-model="paymentMethod">
        <v-radio label="Pix" value="pix" />
        <v-radio label="Boleto" value="boleto" />
        <v-radio label="Cartão de crédito" value="credito" />
      </v-radio-group>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const paymentMethod = ref('')
const paymentForm = ref(null)

const validate = async () => {
  try {
    const response = await paymentForm.value.validate();
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