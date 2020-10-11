import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"

import { CartContext } from "../context/CartContext"
import EmmasLogo from "../EmmasLogo.png"
import headerStyles from "./header.module.scss"

const Header = ({ siteTitle }) => {
  const { cart } = useContext(CartContext)

  return (
    <header className={headerStyles.header}>
      <nav>
        <ul className={headerStyles.navList}>
          <li>
            <Link className={headerStyles.title} to="/">
              <img src={EmmasLogo} alt="logo" className={headerStyles.img} />
            </Link>
          </li>
      
        {cart && (
          <li>
          <Link to="/cart" className={headerStyles.navItem}>
           Cart: 
                  {cart.reduce((counter, product) => {
                    return counter + product.qty
                  }, 0)}
   
          </Link>
          </li>
        )}
          </ul>
      </nav>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
