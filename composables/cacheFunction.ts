import type { NuxtApp } from '#app'

export function cacheFunction(nuxtApp: NuxtApp, key: string, time: number = 60) {
  const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
  if (!data)
    return
  const expirationDate = new Date(data.fetchedAt)
  expirationDate.setTime(expirationDate.getTime() + 1000 * time)
  const isExpired = expirationDate < new Date()
  if (isExpired)
    return
  return data
}
