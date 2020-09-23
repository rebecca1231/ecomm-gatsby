export const TAX_RATE = process.env.TAX_RATE || 0.1
export const FREE_SHIPPING_THRESHOLD = process.env.FREE_SHIPPING_THRESHOLD || 10000
export const SHIPPING_RATE = process.env.SHIPPING_RATE || 500

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
  