import React from 'react'

import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

import CheckoutForm from './CheckoutForm'
const STRIPE_PUBLISHABLE_KEY = "pk_test_51HH0LFHDlZ1F32WmvquMI1hPjncu5K1rCFHXscEYj6D58ZZFqyMKEQmKlRFXe6s7hbp7dJqzeAtmg01kZKEXp0H300VWeMqO7t"

const stripe = loadStripe(STRIPE_PUBLISHABLE_KEY)

export default ({}) => (
    <div>
        <Elements stripe={stripe}>
            <CheckoutForm />
        </Elements>
    </div>
)