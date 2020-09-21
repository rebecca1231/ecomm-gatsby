export const formatPrice = price => {
  const realPrice = parseInt(price) / 100
  return realPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })
}
