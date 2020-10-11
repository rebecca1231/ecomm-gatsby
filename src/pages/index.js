import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

import { formatPrice } from "../utils/format"
import { fromProductSlugtoUrl } from "../utils/products"
import styles from "./index.module.scss"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h2 className={styles.title} >Hot Items</h2>
    <div className={styles.posts}>
      {data.allStrapiProduct.nodes.map(product => (
        
        <Link
          className={styles.a}
          to={fromProductSlugtoUrl(product.slug)}
        >
          <div className={styles.post} >
            <div>
              <Img fixed={product.thumbnail.childImageSharp.fixed} />
            </div>
            <h3 style={{ marginBottom: 0 }}> {product.name} </h3>
            {formatPrice(product.price_in_cent)}
          </div>
        </Link>
      ))}
    </div>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query MyQuery {
    allStrapiProduct {
      nodes {
        id
        description
        created_at
        name
        price_in_cent
        strapiId
        slug
        thumbnail {
          childImageSharp {
            fixed(width: 200, height: 200) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`
