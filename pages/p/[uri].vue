<script setup lang="ts">
import type { iven_products } from '@prisma/client'

const route = useRoute()
const product = ref<null | iven_products>(null)

const response = await $fetch<iven_products>(`/api/products/${route.params.uri}`)
if (response?.productID) {
  product.value = response
}
</script>

<template>
  <div v-if="product">
    <h1 class="mb-10 max-w-[900px]">
      {{ product.name }}
    </h1>
    <div v-html="product.description" />
  </div>
  <div v-else>
    товар не найден
  </div>
</template>
