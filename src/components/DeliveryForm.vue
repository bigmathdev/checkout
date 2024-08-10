<template>
  <v-container class="d-flex flex-column ga-15">
    <h3>Informações para a entrega</h3>

    <v-form class="d-flex flex-column ga-5">
      <v-text-field label="Cep" variant="outlined"></v-text-field>
      <v-row>
        <v-col cols="6">
          <v-text-field label="Rua" variant="outlined" />
        </v-col>
        <v-col cols="6">
          <v-text-field label="Número" variant="outlined" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field label="Cidade" variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field label="Estado" variant="outlined"></v-text-field>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>