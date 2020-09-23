import React from "react"

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"

export default () => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = event => {
    console.log("handleSubmit", event)
  }
  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button disable={!stripe}> Buy it </button>
    </form>
  )
}
