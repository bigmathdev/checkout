<template>
  <v-app>
    <v-main class="d-flex align-center">
      <v-container fluid class="h-85 w-90 d-flex align-center justify-center">
        <v-card class="w-100 h-100 d-flex align-center justify-center bg-white pa-4 rounded-xl"
          :class="spinner === 100 ? 'flex-column' : ''">
          <v-overlay :model-value="checkoutComplete && spinner < 100" class="align-center justify-center">
            <v-progress-circular :model-value="spinner" :rotate="360" :size="100" :width="15" color="teal">
            </v-progress-circular>
          </v-overlay>
          <SucessCheckout v-if="spinner === 100" />
          <v-row v-else class="h-100">
            <v-col cols="6">
              <StepperPage @checkoutComplete="(e) => checkoutComplete = e" />
            </v-col>
            <v-col cols="6">
              <CardProduct />
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, watch } from 'vue';

const checkoutComplete = ref(false)
const interval = ref(-1)
const spinner = ref(0)

watch(checkoutComplete, () => {
  interval.value = setInterval(() => {
    if (spinner.value === 100) return null
    spinner.value += 10
  }, 500)

})

</script>
