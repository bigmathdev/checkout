<template>
  <v-stepper alt-labels flat class="bg-white h-100 d-flex flex-column justify-space-between" v-model="steps">
    <v-stepper-header >
      <v-stepper-item :value="1" title="Identificação" :complete="steps > 1" />
  
      <v-divider />
  
      <v-stepper-item :value="2" title="Entrega" :complete="steps > 2" />
  
      <v-divider />
  
      <v-stepper-item :value="3" title="Pagamento" :complete="steps > 3" />
      <v-divider />
  
      <v-stepper-item :value="4" title="Finalizar compra" :complete="steps == 4" />
    </v-stepper-header>
  
    <v-stepper-window>
      <v-stepper-window-item :value="1">
        <IdentifyForm ref="identifyForm" />
      </v-stepper-window-item>
  
      <v-stepper-window-item :value="2">
        <DeliveryForm ref="deliveryForm" />
      </v-stepper-window-item>
  
      <v-stepper-window-item :value="3">
        <PaymentForm ref="paymentForm" />
      </v-stepper-window-item>
  
      <v-stepper-window-item :value="4">
        <p class="text-center font-weight-bold">Confirmando pagamento...</p>
      </v-stepper-window-item>
    </v-stepper-window>
  
    <v-stepper-actions @click:next="validateCurrentStep()" @click:prev="steps--" />
  </v-stepper>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue'

import { useCheckoutFormStore } from '@/stores/CheckoutFormStore';
import { storeToRefs } from 'pinia';

const checkoutFormModel = useCheckoutFormStore()
const { formCheckout } = storeToRefs(checkoutFormModel)

const steps = ref(1)

const emit = defineEmits(['checkoutComplete'])

const identifyForm = ref(null)
const deliveryForm = ref(null)
const paymentForm = ref(null)

const submitCheckoutForm = async () => {
  try {
    const response = await axios.post("https://api.deepspacestore.com/offers/nike_offer/create_order", {
      name: formCheckout.value.name,
      email: formCheckout.value.email,
      phone: formCheckout.value.phone,
      cep: formCheckout.value.cep,
      street: formCheckout.value.street,
      number: formCheckout.value.number,
      city: formCheckout.value.city,
      state: formCheckout.value.state,
      paymentMethod: formCheckout.value.paymentMethod,
      product: formCheckout.value.product,
      price: formCheckout.value.price,
      shipping: formCheckout.value.shipping,
      total: formCheckout.value.total,
    })

    if (response.data) {
      emit('checkoutComplete', true)
    }
  } catch (error) {
    console.error("Erro no método post", error)
  }

}

const validateCurrentStep = async () => {
  const isValid = ref(null)

  switch (steps.value) {
    case 1:
      isValid.value = await identifyForm.value.validate()
      break;
    case 2:
      isValid.value = await deliveryForm.value.validate()
      break;
    case 3:
     isValid.value = await paymentForm.value.validate()
     isValid.value ? submitCheckoutForm() : ''
     break;
    default:
      break;
  }

  if (isValid.value) {
    steps.value++
  }
};

</script>