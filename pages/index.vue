<template>
    <h2> Существующие товары:</h2>
    <div v-for="product in products" :key="product.productID">

        <NuxtLink :to="`/p/${product?.uri?.endsWith('.html') ? product.uri.slice(0, -5) : product.uri}`">
            <div>{{ product.name }}</div>
        </NuxtLink>
    </div>
    <h2>Несуществующие товары</h2>
    <NuxtLink :to="`/p/112323423452344562345`">
        <div>112323423452344562345</div>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { iven_products } from '@prisma/client';

const products = ref<iven_products[]>([])

try {
    const response = await $fetch<iven_products[]>('/api/products')
    if (response) {
        products.value = response
    }
} catch (error) {
    console.error(error)
}




</script>