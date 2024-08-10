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
        <IdentifyForm />
      </v-stepper-window-item>

      <v-stepper-window-item :value="2">
        <DeliveryForm />
      </v-stepper-window-item>

      <v-stepper-window-item :value="3">
        <PaymentForm />
      </v-stepper-window-item>
    </v-stepper-window>

    <v-stepper-actions @click:next="steps++" @click:prev="steps--" />
  </v-stepper>
</template>

<script setup>
import { ref } from 'vue'

const steps = ref(1)
</script>