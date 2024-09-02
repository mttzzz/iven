<script setup lang="ts">
import type { iven_products } from '@prisma/client'

const products = ref<iven_products[]>([])

async function fetchProducts() {
  try {
    const response = await $fetch<iven_products[]>('/api/products')
    if (response) {
      products.value = response
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
    products.value = JSON.parse(storedProducts)
  }
}

onBeforeMount(() => {
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
        :to="`/p/${product?.uri?.endsWith('.html') ? product.uri.slice(0, -5).toLocaleLowerCase() : product.uri?.toLocaleLowerCase()}`"
      >
        <div>{{ product.name }}</div>
      </NuxtLink>
    </div>
    <h2>Несуществующие товары</h2>
    <NuxtLink to="/p/112323423452344562345">
      <div>112323423452344562345</div>
    </NuxtLink>
  </div>
</template>
