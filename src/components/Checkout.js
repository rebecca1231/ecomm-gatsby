import React from 'react'

import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

import CheckoutForm from './CheckoutForm'
import {STRIPE_PUBLISHABLE_KEY} from '../client-config'

const stripe = loadStripe(STRIPE_PUBLISHABLE_KEY)

export default () => (
    <div>
        <Elements stripe={stripe}>
            <CheckoutForm />
        </Elements>
    </div>
)