<script setup lang="ts">
const nuxtApp = useNuxtApp()

const { data: products, refresh, status } = useFetch('/api/products', {
  key: 'products',
  getCachedData(key) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
  },
  transform: (data) => {
    return data.map((product) => {
      return {
        ...product,
        uri: modifyUri(product.uri),
      }
    })
  },
})
</script>

<template>
  <div>
    <h2>Status: {{ status }}</h2>
    <div style="display: flex; align-items: center;">
      <h2 style="padding-right: 10px;">
        Существующие товары:
      </h2>
      <button
        style="height: fit-content;"
        @click="refresh()"
      >
        Обновить
      </button>
    </div>
    <div
      v-for="product in products"
      :key="product.productID"
    >
      <NuxtLink
        :to="`/p/${product?.uri}`"
      >
        {{ product.name }}
      </NuxtLink>
    </div>
    <h2>Несуществующие товары</h2>
    <NuxtLink to="/p/fake-product">
      Fake Product
    </NuxtLink>
  </div>
</template>
