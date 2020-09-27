import React, { useContext, useEffect, useState } from "react"

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"

import { CartContext } from "./../context/CartContext"
import { formatPrice } from "../utils/format"

const Card_Styles = {
  style: {
    base: {
      fontSize: "16px",
    },
  },
}

export default () => {
  const { cart, clearCart } = useContext(CartContext)
  const stripe = useStripe()
  const elements = useElements()
  const [token, setToken] = useState(null)
  const [total, setTotal] = useState("loading")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [shipping_name, setShipping_name] = useState("")
  const [shipping_address, setShipping_address] = useState("")
  const [shipping_state, setShipping_state] = useState("")
  const [shipping_country, setShipping_country] = useState("")
  const [shipping_zip, setShipping_zip] = useState("")

  const valid = () => {
    if (
      !shipping_name ||
      !shipping_address ||
      !shipping_state ||
      !shipping_country ||
      !shipping_zip
    ) {
      return false
    } else {
      return true
    }
  }

  const generateInput = (label, value, setOnChange) => {
    return (
      <div>
        <div>
          <label htmlFor={label}>{label} </label>
        </div>
        <input
          id={label}
          value={value}
          onChange={e => setOnChange(e.target.value)}
        />
      </div>
    )
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)
    const result = await stripe.confirmCardPayment(token, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    })
    const data = {
      paymentIntent: result.paymentIntent,
      shipping_name,
      shipping_address,
      shipping_state,
      shipping_country,
      shipping_zip,
      cart,
    }

    const response = await fetch("http://localhost:1337/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const order = await response.json()

    setLoading(false)
    setSuccess(true)
    clearCart()
  }

  useEffect(() => {
    const loadToken = async () => {
      setLoading(true)
      const response = await fetch("http://localhost:1337/orders/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: cart.map(product => ({
            ...product,
            ...{ id: product.strapiId },
          })),
        }),
      })
      const data = await response.json()
      console.log("loadToken", data)
      setToken(data.client_secret)
      setTotal(data.amount)
      setLoading(false)
    }
    loadToken()
  }, [cart])

  return (
    <div style={{ margin: "24px 0" }}>
      {!loading && <h3>Total: {formatPrice(total)}</h3>}
      {loading && <h3>Loading...</h3>}
      {!success && (
        <>
          <h4>Please fill in your shipping and payment information.</h4>
          <form
            onSubmit={handleSubmit}
            style={{
              padding: "24px 12px",
              border: "1px solid #eee",
              margin: "20px 0",
            }}
          >
            {generateInput("Recipient Name", shipping_name, setShipping_name)}
            {generateInput("Address", shipping_address, setShipping_address)}
            {generateInput("State", shipping_state, setShipping_state)}
            {generateInput("Country", shipping_country, setShipping_country)}
            {generateInput("Zip Code", shipping_zip, setShipping_zip)}

            <CardElement options={Card_Styles} />
            <button disabled={!stripe || !valid()} style={{ margin: "12px" }}>
              {" "}
              Buy it{" "}
            </button>
          </form>{" "}
        </>
      )}
      {success && (
        <>
          <h2>Payment Received! </h2>
          <h4>Your order is being processed!</h4>
        </>
      )}
    </div>
  )
}

/*
to do: 
Reroute to separat pge on order success, show order & shipping info,
  and add cancel functionality to that page


*/