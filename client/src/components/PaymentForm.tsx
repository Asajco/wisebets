import { useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import CartContext from '../store/cartContext'
import Success from '../pages/Succes'
import {
  Button,
  Flex,
  Heading,
  Input,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'
import { colors } from '../store/colors'

export default function PaymentForm() {
  const [success, setSuccess] = useState(false)
  const [userEmail, setUserEmail] = useState<any>()
  const stripe: any = useStripe()
  const { totalPriceOfCart, cart } = useContext(CartContext)
  const [isSmallerThan1200] = useMediaQuery('(max-width: 1200px)')
  const name = cart.map((item) => item.name).toString()
  console.log(name)

  const handleExpressCheckout = async (e: any) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:4000/payment', {
        amount: totalPriceOfCart * 100,
        currency: 'eur',
        name: `Členstvo ${name}`,
      })
      console.log(userEmail)

      if (response.data.sessionId) {
        localStorage.setItem('userEmail', userEmail)
        //@ts-ignore
        localStorage.setItem('totalPrice', totalPriceOfCart)
        localStorage.setItem('product_name', name)
        const { error } = await stripe.redirectToCheckout({
          sessionId: response.data.sessionId,
        })

        if (error) {
          console.error('Error redirecting to checkout:', error)
        }
      }
    } catch (error) {
      console.error('Error initiating Express Checkout:', error)
    }
  }

  return (
    <>
      {!success ? (
        <Flex
          h="92vh"
          p="2rem"
          alignItems="center"
          flexDir="column"
          fontFamily="Poppins"
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <fieldset className="FormGroup">
              <Flex flexDir="column" alignItems="center" className="FormRow">
                <Heading color={colors.primaryGold} m="1rem">
                  Sumár objednávky
                </Heading>

                {cart.map((item) => (
                  <Flex
                    w="20rem"
                    gap="8px"
                    key={item._id}
                    justifyContent="space-between"
                    color="white"
                    alignItems="center"
                  >
                    <Text
                      fontStyle="bold"
                      fontSize={isSmallerThan1200 ? '1.2rem' : '1.8rem'}
                    >
                      Členstvo {item.name.toUpperCase()}
                    </Text>
                    <Text
                      fontSize={isSmallerThan1200 ? '1rem' : '1.6rem'}
                      w="7rem"
                    >
                      {item.price} €
                    </Text>
                  </Flex>
                ))}
              </Flex>
            </fieldset>
            <Input
              onChange={(e) => setUserEmail(e.target.value)}
              border="2px solid "
              color="white"
              borderColor={colors.primaryGold}
              mt="2rem"
              placeholder="Zadajte váš email..."
            />
            <Button
              type="button"
              onClick={handleExpressCheckout}
              mt="3rem"
              alignSelf="center"
              w="100%"
              color="whitesmoke"
              border="2px solid  #dab56f"
              bg="black"
              _hover={{
                backgroundColor: '#dab56f',
                color: 'black',
                border: 'none',
              }}
            >
              Zaplatiť
            </Button>
          </form>
        </Flex>
      ) : (
        <div>
          <Success customer_email={userEmail} />
        </div>
      )}
    </>
  )
}
