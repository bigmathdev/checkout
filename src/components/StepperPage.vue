<template>
  <v-stepper alt-labels flat class="bg-white" v-model="steps">
    <v-stepper-header>
      <v-stepper-item :value="1" title="Identificação" :complete="steps > 1" />

      <v-divider />

      <v-stepper-item :value="2" title="Entrega" :complete="steps > 2" />

      <v-divider />

      <v-stepper-item :value="3" title="Pagamento" :complete="steps > 3" />
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
    </v-stepper-window>

    <v-stepper-actions @click:next="validateCurrentStep()" @click:prev="steps--" />
  </v-stepper>
</template>

<script setup>
import { ref } from 'vue'

const steps = ref(1)
const advanceStep = ref(false)

const identifyForm = ref(null)
const deliveryForm = ref(null)
const paymentForm = ref(null)

const nextStep = () => {
  if (advanceStep) {
    steps.value++
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
      break;
    default:
      break;
  }

  if (isValid.value) {
    steps.value++
  }
};


</script>