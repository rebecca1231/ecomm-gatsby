import React from "react"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

import { formatPrice } from "../utils/format"
import { getCart, addToCart } from "../utils/cart"

const CartPage = () => {
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
                <span onClick={() => addToCart(product, -1)}> - </span>
                {product.qty}
                <span onClick={() => addToCart(product)}> + </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default CartPage
