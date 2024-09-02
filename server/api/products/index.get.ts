export default defineEventHandler(async (event) => {
  const prisma  = event.context.prisma
  return await prisma.iven_products.findMany({take: 10})
})
