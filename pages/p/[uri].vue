<script setup lang="ts">
const nuxtApp = useNuxtApp()
const route = useRoute()
const { data: product } = useFetch(`/api/products/${route.params.uri}`, {
  key: `product-${route.params.uri}`,
  getCachedData(key) {
    const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    if (!data)
      return
    const expirationDate = new Date(data.fetchedAt)
    expirationDate.setTime(expirationDate.getTime() + 1000 * 60) // 60 sec
    const isExpired = expirationDate < new Date()
    if (isExpired)
      return
    return data
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
