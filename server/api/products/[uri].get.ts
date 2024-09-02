export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  const uri = getRouterParam(event, 'uri')

  if (!uri) {
    createError({ statusCode: 400, message: 'Не передан uri' })
  }

  const modifiedUri = uri?.endsWith('.html') ? uri : `${uri}.html`
  return await prisma.iven_products.findUnique({ where: { uri: modifiedUri }, select: {
    productID: true,
    name: true,
    uri: true,
    description: true,
  } })
})
