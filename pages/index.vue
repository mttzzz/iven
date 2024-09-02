<script setup lang="ts">
import type { iven_products } from '@prisma/client'

const products = ref<iven_products[]>([])

async function fetchProducts() {
  try {
    const response = await $fetch<iven_products[]>('/api/products')
    if (response) {
      products.value = response.map(product => ({
        ...product,
        uri: product?.uri?.endsWith('.html') ? product.uri.slice(0, -5) : product.uri,
      }))
      localStorage.setItem('products', JSON.stringify(response))
    }
  }
  catch (error) {
    console.error(error)
  }
}

function loadProductsFromLocalStorage() {
  const storedProducts = localStorage.getItem('products')
  if (storedProducts) {
    products.value = (JSON.parse(storedProducts) as iven_products[]).map(product => ({
      ...product,
      uri: product?.uri?.endsWith('.html') ? product.uri.slice(0, -5) : product.uri,
    }))
  }
}

onMounted(() => {
  loadProductsFromLocalStorage()
  if (products.value.length === 0) {
    fetchProducts()
  }
})
</script>

<template>
  <div>
    <div style="display: flex; align-items: center;">
      <h2 style="padding-right: 10px;">
        Существующие товары:
      </h2>
      <button
        style="height: fit-content;"
        @click="fetchProducts"
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
        <div>{{ product.name }}</div>
      </NuxtLink>
    </div>
    <h2>Несуществующие товары</h2>
    <NuxtLink to="/p/fake-product">
      <div>Fake Product</div>
    </NuxtLink>
  </div>
</template>
