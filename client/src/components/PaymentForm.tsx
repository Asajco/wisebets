import { useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import CartContext from '../store/cartContext'
import Success from '../pages/Succes'
import {
  Button,
  Checkbox,
  Flex,
  Heading,
  Input,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'
import { colors } from '../store/colors'
import { db } from '../firebase/config'
import { v4 } from 'uuid'
import { collection, doc, setDoc } from 'firebase/firestore'
export default function PaymentForm() {
  const [success, setSuccess] = useState(false)
  const [userEmail, setUserEmail] = useState<any>()
  const [userPhone, setUserPhone] = useState<any>()
  const [allowed, setAllowed] = useState(false)
  const stripe: any = useStripe()
  const { totalPriceOfCart, cart } = useContext(CartContext)
  const [isSmallerThan1200] = useMediaQuery('(max-width: 1200px)')
  const [isSmallerThan900] = useMediaQuery('(max-width: 900px)')
  const name = cart.map((item) => item.name).toString()

  const handleExpressCheckout = async (e: any) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:4000/payment', {
        amount: totalPriceOfCart * 100,
        currency: 'eur',
        name: `Členstvo ${name}`,
      })
      console.log(totalPriceOfCart)
      const itemId = v4()
      setDoc(doc(collection(db, 'orders'), itemId), {
        id: itemId,
        email: userEmail,
        phone: userPhone,
        name: name,
      })
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
          minH="92vh"
          p="2rem"
          alignItems="center"
          flexDir="column"
          fontFamily="Poppins"
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <fieldset className="FormGroup">
              <Flex flexDir="column" alignItems="center" className="FormRow">
                <Heading
                  color={colors.primaryGold}
                  m={isSmallerThan900 ? 0 : '1rem'}
                  mb={isSmallerThan900 ? '1rem' : 0}
                >
                  Sumár objednávky
                </Heading>

                {cart.map((item) => (
                  <Flex
                    maxW="25rem"
                    gap="8px"
                    mt="1rem"
                    key={item._id}
                    justifyContent="space-between"
                    color="white"
                    alignItems="center"
                    borderBottom="2px solid white"
                  >
                    <Text
                      fontStyle="bold"
                      fontSize={isSmallerThan1200 ? '1.2rem' : '1.8rem'}
                    >
                      Členstvo {item.name.toUpperCase()}
                    </Text>
                    <Text
                      fontSize={isSmallerThan1200 ? '1rem' : '1.6rem'}
                      maxW="7rem"
                      textAlign="center"
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

            <Input
              onChange={(e) => setUserPhone(e.target.value)}
              border="2px solid "
              color="white"
              borderColor={colors.primaryGold}
              mt="2rem"
              placeholder="Zadajte vaše tel. číslo"
            />
            <Text color="white" fontSize="0.8rem" mt="0.5rem">
              Zadajte číslo, ktoré používate v aplikácii Telegram
            </Text>

            <Checkbox
              onChange={(e) => setAllowed(e.target.checked)}
              color="white"
              mt="2rem"
            >
              Súhlasím so spracovaním osobných údajov
            </Checkbox>
            {allowed && (
              <Button
                type="button"
                onClick={handleExpressCheckout}
                mt="3rem"
                mb={isSmallerThan900 ? '2rem' : 0}
                disabled={!allowed}
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
            )}
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
