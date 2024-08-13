<template>
  <v-card flat color="#EFF2F6" class="rounded-xl h-100 d-flex flex-column align-center justify-center px-6 ga-6"
    v-if="product">
    <div class="d-flex flex-column ga-6">
      <p class="text-center">Valor total</p>
      <p class="text-h3 text-blue-accent-4 font-weight-bold">{{ `R$ ${calcShipping}` }}</p>
      <div>
        <p class="text-center text-caption text-grey-darken-1">
          <v-icon icon="mdi-lock" color="green-accent-3"></v-icon>
          Pagamento seguro
        </p>
      </div>
    </div>

    <v-divider class="w-85"></v-divider>

    <p class="w-100 px-4">Resumo do pedido</p>

    <v-card :title="product.itemsIncluded" :subtitle="product.size" flat color="transparent" class="w-100">
      <template #prepend>
        <v-img :width="70" :aspect-ratio="1 / 1" class="bg-transparent border-sm border-surface rounded-lg"
          :src="product.productImages"></v-img>
      </template>
      <template #append>
        <div class="d-flex flex-column justify-center align-center">
          <div class="d-flex align-center">
            <v-btn flat density="compact" @click="minusProduct" icon="mdi-minus"
              class="bg-transparent rounded-s-lg rounded-e-0 border-sm border-surface"></v-btn>
            <p class="px-2 py- border-sm border-surface">{{ product.quantity }}</p>
            <v-btn flat density="compact" class="bg-transparent rounded-e-lg rounded-s-0 border-sm border-surface"
              icon="mdi-plus" @click="addProduct"></v-btn>
          </div>
        </div>
      </template>
    </v-card>

    <v-divider class="w-85"></v-divider>

    <div class="w-100 px-4">
      <div class="d-flex justify-space-between">
        <p class="text-grey-darken-1">Subtotal</p>
        <p>{{ `R$ ${product.total}` }}</p>
      </div>

      <div class="d-flex justify-space-between">
        <p class="text-grey-darken-1">Frete</p>
        <p>{{ `R$ ${product.shipping}` }}</p>
      </div>
    </div>

    <v-divider class="w-85"></v-divider>

    <div class="d-flex justify-space-between w-100 px-4">
      <p class="font-weight-bold">Total</p>
      <p class="font-weight-bold">{{ `R$ ${calcShipping}` }}</p>
    </div>
  </v-card>
</template>

<script setup>
import { useProductStore } from '@/stores/ProductStore';
import { useCheckoutFormStore } from '@/stores/CheckoutFormStore';
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';

const checkoutFormModel = useCheckoutFormStore()
const { formCheckout } = storeToRefs(checkoutFormModel)

const productRef = useProductStore()
const { product } = storeToRefs(productRef)

const calcShipping = computed(() => {
  return product.value.total + product.value.shipping
})

const addProduct = () => {
  if (product.value.quantity >= 1) {
    product.value.total += 1500
    product.value.quantity++
    formCheckout.value.total = calcShipping.value
  } return null
}

const minusProduct = () => {
  if (product.value.quantity > 1) {
    product.value.total -= 1500
    product.value.quantity--
    formCheckout.value.total -= 1500
  }
}

onMounted(() => {
  productRef.getProduct()
})
</script>