<script setup lang="ts">
const nuxtApp = useNuxtApp()
const route = useRoute('p-uri')
const { data: product, status } = useFetch(`/api/products/${route.params.uri}`, {
  key: `product-${route.params.uri}`,
  transform: (product) => {
    return {
      ...product,
      fetchedAt: new Date(),
    }
  },
  getCachedData: key => cacheFunction(nuxtApp, key, 60),
})
</script>

<template>
  <div v-if="status === 'success'">
    <div v-if="product?.productID ">
      <h1>
        {{ product.name }}
      </h1>
      <div v-html="product.description" />
    </div>
    <div v-else>
      товар не найден
    </div>
  </div>
</template>
