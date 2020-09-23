import React, { useState, useCallback } from "react"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Checkout from "../components/Checkout"

import { formatPrice } from "../utils/format"
import { getCart, addToCart } from "../utils/cart"
import {
  cartSubtotal,
  cartTotal,
  shouldPayShipping,
  SHIPPING_RATE,
} from "../utils/cartTotals"

const CartPage = () => {
  const [, updateState] = React.useState()
  const forceUpdate = React.useCallback(() => updateState({}), [])
  const [showCheckout, setShowCheckout] = useState(false)

  const cart = getCart()
  return (
    <Layout>
      <SEO title="Cart" />
      <table>
        <thead>
          <tr>
            <th>Product </th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(product => (
            <tr>
              <td>
                <Img
                  style={{
                    width: "100px",
                    height: "100px",
                    verticalAlign: "middle",
                  }}
                  fixed={product.thumbnail.childImageSharp.fixed}
                />
                <span style={{ marginLeft: "15px", whiteSpace: "nowrap" }}>
                  {product.name}
                </span>
              </td>
              <td>{formatPrice(product.price_in_cent)}</td>
              <td style={{ textAlign: "center" }}>
                <span
                  onClick={() => {
                    addToCart(product, -1)
                    forceUpdate()
                  }}
                >
                  {" "}
                  -{" "}
                </span>
                {product.qty}
                <span
                  onClick={() => {
                    addToCart(product)
                    forceUpdate()
                  }}
                >
                  {" "}
                  +{" "}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>SubTotal: {formatPrice(cartSubtotal(cart))} </h3>
      {shouldPayShipping(cart) && (
        <h3>Shipping: {formatPrice(SHIPPING_RATE)} </h3>
      )}
      {!shouldPayShipping(cart) && <h3>Shipping: Free</h3>}
      <h3>Total: {formatPrice(cartTotal(cart))} </h3>
      <div>
        {cart && cart.length > 0 && (
          <button
            style={{ fontSize: "24px", padding: "12px 24px" }}
            onClick={() => setShowCheckout(true)}
          >
            Checkout
          </button>
        )}
      </div>
      {showCheckout && <Checkout />}
    </Layout>
  )
}

export default CartPage
