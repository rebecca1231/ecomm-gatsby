import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../../components/layout"
import { formatPrice } from "../../utils/format"
import { addToCart } from "../../utils/cart"

const ProductTemplate = ({ data }) => (
  <Layout>
    <Img fixed={data.strapiProduct.thumbnail.childImageSharp.fixed} />
    <h2>{data.strapiProduct.name}</h2>
    <p>{data.strapiProduct.description} </p>
    <p>Price: {formatPrice(data.strapiProduct.price_in_cent)} </p>
    <button
      onClick={() => addToCart(data.strapiProduct)}
      style={{ fontSize: "20px", padding: "24px", borderRadius: "2px" }}
    >
      Add To Cart
    </button>
  </Layout>
)

export const query = graphql`
  query ProductTemplateQuery($id: String!) {
    strapiProduct(id: { eq: $id }) {
      strapiId
      name
      price_in_cent
      description
      thumbnail {
        childImageSharp {
          fixed(width: 640) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`
export default ProductTemplate
