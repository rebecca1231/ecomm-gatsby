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

export const addToCart = product => {
  const cart = getCart()

  const indexOfProduct = cart.findIndex(alreadyInCart =>
     alreadyInCart.strapId === product.strapId
)

  if (indexOfProduct !== -1) {
    cart[indexOfProduct].qty += 1
  } else {
    product.qty = 1
    cart.push(product)
  }
  setCart(cart)
}
