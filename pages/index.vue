<script setup lang="ts">
const nuxtApp = useNuxtApp()

const { data: products, refresh, status } = useFetch('/api/products', {
  key: 'products',
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
  transform: (data) => {
    return data.map((product) => {
      return {
        ...product,
        uri: modifyUri(product.uri),
        fetchedAt: new Date(),
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
