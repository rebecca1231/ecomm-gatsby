import React from "react"
import CartContextProvider from "./src/components/context/CartContext"

export const wrapRootElement = ({ element }) => (
  <CartContextProvider>{element}</CartContextProvider>
)
