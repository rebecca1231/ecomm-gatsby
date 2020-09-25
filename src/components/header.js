import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import { CartContext, ContextCart } from "../components/context/CartContext"
import { cartTotal } from "../utils/cartTotals"

const Header = ({ siteTitle }) => {

  const {cart} = useContext(CartContext)
  return (
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 640,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        {cart && cart.length &&
        <>
        <div>🛒
        {cart.length}
        </div>
        </>
        }
      </div>
    </header>
  )

  Header.propTypes = {
    siteTitle: PropTypes.string,
  }

  Header.defaultProps = {
    siteTitle: ``,
  }
}

export default Header
