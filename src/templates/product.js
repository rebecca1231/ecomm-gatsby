import React, { useState, useContext } from "react"
import {Link} from 'gatsby'
import { graphql } from "gatsby"
import Img from "gatsby-image"

import { CartContext } from "../context/CartContext"

import Layout from "../components/layout"

import { formatPrice } from "../utils/format"
import styles from "./product.module.scss"

const ProductTemplate = ({ data }) => {
  const [qty, setQty] = useState(1)
  const { addToCart } = useContext(CartContext)

  return (
    <Layout>
      <h2 className={styles.title}>{data.strapiProduct.name}</h2>

      <Img
        fixed={data.strapiProduct.thumbnail.childImageSharp.fixed}
        className={styles.img}
      />
      <div className={styles.p} >
      <p>{data.strapiProduct.description}</p>
      <p>Price: {formatPrice(data.strapiProduct.price_in_cent)}</p>
      </div>
      <input
        type="number"
        value={qty}
        onChange={event => setQty(event.target.value)}
      />
      <Link
      to="/cart"
        onClick={() => addToCart(data.strapiProduct, qty)}
        className={styles.button}
      >
        {" "}
        Add To Cart
      </Link>
    </Layout>
  )
}

export default ProductTemplate

export const query = graphql`
  query ProductTemplateQuery($id: String!) {
    strapiProduct(id: { eq: $id }) {
      strapiId
      name
      price_in_cent
      description
      thumbnail {
        childImageSharp {
          fixed(width: 400) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`
