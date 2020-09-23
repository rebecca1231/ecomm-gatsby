export const setCart = cart => {
  localStorage.setItem("cart", JSON.stringify(cart))
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

export const addToCart = (product, qty = 1) => {
  const cart = getCart()
  const index = cart.findIndex(item => item.strapiId === product.strapiId)
  if (index === -1) {
    product.qty = parseInt(qty)
    cart.push(product)
  } else {
    cart[index].qty += parseInt(qty)
    if (cart[index].qty === 0) {
      cart.splice(index, 1)
    }
  }
  setCart(cart)
}
