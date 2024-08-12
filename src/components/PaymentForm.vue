<template>
  <v-container class="d-flex flex-column ga-15">
    <h3>Informações para o pagamento</h3>

    <v-radio-group v-model="radio">
      <v-radio label="Pix" value="pix"></v-radio>
      <div v-if="radio == 'pix'" class="d-flex flex-column align-center">
        <p>
          Escaneie o <strong>QR Code </strong> na instuição que você possui o PIX
          cadastrado e realize o pagamento.
        </p>
        <v-img :width="220" aspect-ratio="1/1" cover src="../assets/qrcode.jpeg"></v-img>
      </div>
      <v-radio label="Boleto" value="boleto"></v-radio>
      <div v-if="radio == 'boleto'" class="d-flex flex-column align-center">
        <p>
          Escaneio o <strong>Código de barras</strong> na sua instuição e realize
          o pagamento.
        </p>
        <v-img :width="220" aspect-ratio="1/1" cover src="../assets/barcode.png"></v-img>
      </div>
      <v-radio label="Cartão de crédito" value="cartao"></v-radio>
      <div v-if="radio == 'cartao'">
        <v-form class="d-flex flex-column ga-5" ref="paymentForm">
          <v-text-field :rules="nameCardValidation" label="Nome impresso no cartão *" variant="outlined" />
          <v-text-field :rules="numberCardValidation" label="Número do cartão *" variant="outlined"></v-text-field>
          <v-row>
            <v-col cols="6">
              <v-text-field :rules="validityCardValidation" label="Validade *" variant="outlined" />
            </v-col>
            <v-col cols="6">
              <v-text-field :rules="cvvCardValition" label="CVV *" variant="outlined" />
            </v-col>
          </v-row>
          <v-text-field :rules="cpfAndCnpjValidation" label="CPF/CNPJ do titular *" variant="outlined"></v-text-field>
        </v-form>
      </div>
    </v-radio-group>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const radio = ref('')
const paymentForm = ref(null)

const nameCardValidation = ref([value => {
  const nameCardRegex = /^[a-zA-z]+$/

  if (value?.length > 5 && nameCardRegex.test(value)) return true
  return "Insira um nome válido"
}])

const numberCardValidation = ref([value => {
  const numberCardRegex = /^\d+$/

  if (value?.length > 14 && numberCardRegex.test(value)) return true
  return "Insira um número de cartão válido"
}])

const validityCardValidation = ref([value => {
  const validityCardRegex = /^\d+$/

  if (value?.length === 4 && validityCardRegex.test(value)) return true
  return "Insira uma validade válida de 4 dígitos, ex: 00/00"
}])

const cvvCardValition = ref([value => {
  const cvvCardRegex = /^\d+$/

  if (value?.length === 3 && cvvCardRegex.test(value)) return true
  return "Insira um CVV válido"
}])

const cpfAndCnpjValidation = ref([value => {
  const cpfAndCnpjRegex = /^\d+$/

  if (value?.length === 11 || value?.length === 14 && cpfAndCnpjRegex.test(value)) return true
  return "Insira um CPF/CNPJ válido"
}])

const validate = async () => {
  try {
    if (radio.value === 'pix' || radio.value === 'boleto') {
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