<template>
  <v-container class="d-flex flex-column align-center ga-10">
    <v-icon class="mb-6" color="success" icon="mdi-check-circle-outline" size="128"></v-icon>

    <div class="text-center">
      <p class="font-weight-bold text-h5">Pagamento confirmado!</p>
      <p class="text-body-2">Parabéns, seu pagamento foi realizado com sucesso.</p>
    </div>

    <div class="text-center">
      <p class="font-weight-bold">Valor total</p>
      <p class="text-h3 text-primary">{{ `R$ ${formCheckout.total}` }}</p>
    </div>

    <div class="d-flex flex-column align-center ga-3">
      <p>Comprador: <strong>{{ formCheckout.name }}</strong></p>
      <p>Endereço de entrega: <strong>{{ `${formCheckout.street}, ${formCheckout.number} ${formCheckout.city} -
          ${formCheckout.state}` }}</strong></p>
      <p>Produto: <strong>{{ formCheckout.productName }}</strong></p>
      <p>Pago com: <strong>{{ formCheckout.paymentMethod }}</strong></p>
    </div>
  </v-container>
</template>

<script setup>
import { useCheckoutFormStore } from '@/stores/CheckoutFormStore';
import { storeToRefs } from 'pinia';

const checkoutFormModel = useCheckoutFormStore()
const { formCheckout } = storeToRefs(checkoutFormModel)
</script>
