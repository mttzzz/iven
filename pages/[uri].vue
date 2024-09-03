<script setup lang="ts">
const route = useRoute('uri')
navigateTo({ name: 'p-uri', params: { uri: route.params.uri } })
</script>

<template>
  <div />
</template>
