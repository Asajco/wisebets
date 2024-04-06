import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import PaymentForm from './PaymentForm'
import Cart from '../pages/Cart'

const PUBLIC_KEY =
  'pk_live_51OVygHLsF6CdETVcKdpI1zR9j1flFZzFNtBSMK1vOuOdBRDTZ1HFrPYnLx1IDXhWgOjl9xNcbAxR3dkpAF5Fj7LL006p8yCCST'

// 'pk_test_51NTpHuBe4Ch3mocY7kgGUwlm41r7XjHz76aRX3QrDU4rZIW45acdelNhowFtNsZFFk2GMC7ZtHiVcNaHOa9Gi90700i3ysCwfj'

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
      {/* <Cart /> */}
    </Elements>
  )
}
