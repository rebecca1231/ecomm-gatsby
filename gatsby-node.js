const path = require("path")
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const makeRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
    resolve(
      graphql(request).then(result => {
        if (result.errors) {
          reject(result.errors)
        }
        return result
      })
    )
  })

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const generateProductPages = makeRequest(
    graphql,
    `
{
    allStrapiProduct {
        edges {
            node {
                id
                slug
            }
        }
    }
}
`
  ).then(result => {
    result.data.allStrapiProduct.edges.forEach(({ node }) => {
      createPage({
        path: `/products/${node.slug}`,
        component: path.resolve(`src/templates/product.js`),
        context: {
          id: node.id,
        },
      })
    })
  })
  return Promise.all([generateProductPages])
}
