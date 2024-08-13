<template>
  <v-container class="d-flex flex-column">
    <h3>Informações para o pagamento</h3>

    <v-radio-group v-model="formCheckout.paymentMethod">
      <v-radio label="Pix" value="Pix"></v-radio>
      <div v-if="formCheckout.paymentMethod == 'Pix'" class="d-flex flex-column align-center">
        <p>
          Escaneie o <strong>QR Code </strong> na instuição que você possui o PIX
          cadastrado e realize o pagamento.
        </p>
        <v-img :width="220" aspect-ratio="1/1" class="ma-2" cover src="../assets/qrcode.jpeg"></v-img>
      </div>
      <v-radio label="Boleto" value="Boleto bancário"></v-radio>
      <div v-if="formCheckout.paymentMethod == 'Boleto bancário'" class="d-flex flex-column align-center my-2">
        <p>
          Escaneio o <strong>Código de barras</strong> na sua instuição e realize
          o pagamento.
        </p>
        <v-img :width="220" aspect-ratio="1/1" class="ma-8" cover src="../assets/barcode.png"></v-img>
      </div>
      <v-radio label="Cartão de crédito" value="Cartão de crédito"></v-radio>
      <div v-if="formCheckout.paymentMethod == 'Cartão de crédito'">
        <v-form class="d-flex flex-column my-4" ref="paymentForm">
          <v-text-field :rules="nameCardValidation" density="compact" label="Nome impresso no cartão *"
            variant="outlined" />
          <v-text-field :rules="numberCardValidation" density="compact" label="Número do cartão *"
            variant="outlined"></v-text-field>
          <v-row>
            <v-col cols="6">
              <v-text-field :rules="validityCardValidation" density="compact" label="Validade *" variant="outlined" />
            </v-col>
            <v-col cols="6">
              <v-text-field :rules="cvvCardValition" density="compact" label="CVV *" variant="outlined" />
            </v-col>
          </v-row>
          <v-text-field :rules="cpfAndCnpjValidation" density="compact" label="CPF/CNPJ do titular *"
            variant="outlined"></v-text-field>
        </v-form>
      </div>
    </v-radio-group>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

import { useCheckoutFormStore } from '@/stores/CheckoutFormStore';
import { storeToRefs } from 'pinia';

const checkoutFormModel = useCheckoutFormStore()
const { formCheckout } = storeToRefs(checkoutFormModel)

const paymentForm = ref(null)

const nameCardValidation = ref([value => {
  const nameCardRegex = /^[a-zA-z\s+]+$/

  if (value?.length > 5 && nameCardRegex.test(value)) return true
  return "Insira um nome válido"
}])

const numberCardValidation = ref([value => {
  const numberCardRegex = /^(\d{4}\s?){3}\d{4}$/
  
  if (value?.length > 14 && numberCardRegex.test(value)) return true
  return "Insira um número de cartão válido"
}])

const validityCardValidation = ref([value => {
  const validityCardRegex = /^\d+$/

  if (value?.length === 4 && validityCardRegex.test(value)) return true
  return "Insira uma validade válida"
}])

const cvvCardValition = ref([value => {
  const cvvCardRegex = /^\d+$/

  if (value?.length === 3 && cvvCardRegex.test(value)) return true
  return "Insira um CVV válido"
}])

const cpfAndCnpjValidation = ref([value => {
  const cpfAndCnpjRegex = /^\d+$/

  if (value !== '00000000000' && value?.length === 11 && cpfAndCnpjRegex.test(value) || value?.length === 14 && value !== '00000000000000' && cpfAndCnpjRegex.test(value)) return true
  return "Insira um CPF/CNPJ válido"
}])

const validate = async () => {
  try {
    if (formCheckout.value.paymentMethod === 'Pix' || formCheckout.value.paymentMethod === 'Boleto bancário') {
      return true
    } else {
      const response = await paymentForm.value.validate();
      return response.valid;

    }
  } catch (error) {
    console.error('Erro ao validar:', error);
    return false;
  }
}

defineExpose({
  validate
})
</script>