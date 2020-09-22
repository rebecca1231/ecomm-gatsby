export const TAX_RATE = process.env.TAX_RATE || 0.1
export const FREE_SHIPPING_THRESHOLD = process.env.FREE_SHIPPING_THRESHOLD || 10000
export const SHIPPING_RATE = process.env.SHIPPING_RATE || 500

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

export const cartSubtotal = cart => {
  const subtotal = cart.reduce((counter, product) => {
    return counter + product.price_in_cent * product.qty
  }, 0)
  return subtotal
}

export const shouldPayShipping = (cart) => {
  const subtotal = cartSubtotal(cart)
  return subtotal < FREE_SHIPPING_THRESHOLD
}

export const cartTotal = cart => {
  const subtotal = cartSubtotal(cart)
  const shipping = shouldPayShipping(cart) ? SHIPPING_RATE : 0
  const total = subtotal + subtotal * TAX_RATE + shipping

  return Math.round(total)
}
