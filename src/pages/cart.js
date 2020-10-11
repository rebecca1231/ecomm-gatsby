import React, { useState, useCallback, useContext } from "react"
import Img from "gatsby-image"

import { CartContext } from "../context/CartContext"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Checkout from "../components/Checkout"
import styles from "./index.module.scss"

import { formatPrice } from "../utils/format"
import {
  cartSubtotal,
  cartTotal,
  shouldPayShipping,
  SHIPPING_RATE,
} from "../utils/cartTotals"

const CartPage = () => {
  const [, updateState] = useState()
  const forceUpdate = useCallback(() => updateState({}), [])
  const [showCheckout, setShowCheckout] = useState(false)

  const { cart, addToCart } = useContext(CartContext)

  return (
    <Layout>
      <SEO title="Cart" />
      <h2 className={styles.title}>Your Cart</h2>
      {cart && cart.length > 0 && (
        <>
          {" "}
          <table>
            <thead>
              <tr className={styles.title}>
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
                  {product.qty}
                    <span
                      className={styles.smbutton}
                      onClick={() => {
                        addToCart(product, -1)
                        forceUpdate()
                      }}
                    >Less
                    </span>
                    
                    <span
                      className={styles.smbutton}
                      onClick={() => {
                        addToCart(product)
                        forceUpdate()
                      }}
                    >More
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 className={styles.title} >SubTotal: {formatPrice(cartSubtotal(cart))} </h3>
          {shouldPayShipping(cart) && (
            <h3 className={styles.title}>Shipping: {formatPrice(SHIPPING_RATE)} </h3>
          )}
          {!shouldPayShipping(cart) && <h3 className={styles.title} >Shipping: Free</h3>}
          <h3 className={styles.title}>Total: {formatPrice(cartTotal(cart))} </h3>
        </>
      )}

      {cart && cart.length > 0 && (
        <div>
          <button
            className={styles.button}
            onClick={() => setShowCheckout(true)}
          >
            Checkout
          </button>
        </div>
      )}
      {showCheckout && <Checkout cart={cart} />}
    </Layout>
  )
}

export default CartPage
