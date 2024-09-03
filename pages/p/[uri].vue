<script setup lang="ts">
const nuxtApp = useNuxtApp()
const route = useRoute()
const { data: product } = useFetch(`/api/products/${route.params.uri}`, {
  key: `product-${route.params.uri}`,
  getCachedData(key) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
  },
})
</script>

<template>
  <div v-if="product">
    <h1>
      {{ product.name }}
    </h1>
    <div v-html="product.description" />
  </div>
  <div v-else>
    товар не найден
  </div>
</template>
