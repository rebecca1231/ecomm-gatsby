export const saveCart = cart => {
  localStorage.setItem("cart", JSON.stringify(cart))
  return cart
}

export const getCart = () => {
  try {
    const cart = JSON.parse(localStorage.getItem("cart"))
    if (cart) {
      return cart
    }
  } catch (err) {}

  return []
}
