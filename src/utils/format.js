export const formatPrice = price => {
  if (!price) {
    return 0
  }
  const realPrice = parseInt(price) / 100
  return realPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })
}
