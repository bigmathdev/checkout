<template>
  <v-app>
    <v-main class="d-flex align-center">
      <v-container fluid class="h-85 w-90 d-flex align-center justify-center">
        <v-card class="w-100 h-100 d-flex align-center justify-center bg-white pa-4 rounded-xl">
          <v-row class="h-100">
            <v-col cols="6">
              <StepperPage />
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
</script>
