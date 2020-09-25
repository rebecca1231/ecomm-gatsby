import React, { createContext, useState } from "react"
import { getCart, saveCart } from "../../utils/cart"
export const CartContext = createContext(null)

export default ({ children }) => {
  const [cart, setCart] = useState(getCart())
  const updateCart = updatedCart => {
    setCart(updatedCart)
    saveCart(updatedCart)
  }

  const addToCart = (product, qty = 1) => {
    const copy = [...cart]
    const index = copy.findIndex(item => item.strapiId === product.strapiId)
    if (index === -1) {
      product.qty = parseInt(qty)
      copy.push(product)
    } else {
      copy[index].qty += parseInt(qty)
      if (copy[index].qty === 0) {
        copy.splice(index, 1)
      }
    }
    updateCart(copy)
  }

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}
