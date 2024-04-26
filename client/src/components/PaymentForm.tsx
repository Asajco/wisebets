import { useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import { useForm } from 'react-hook-form'
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
  useToast,
} from '@chakra-ui/react'
import { colors } from '../store/colors'
import { db } from '../firebase/config'
import { v4 } from 'uuid'
import { collection, doc, setDoc } from 'firebase/firestore'
export default function PaymentForm() {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<any>()
  const [userName, setUserName] = useState<any>()
  const [userEmail, setUserEmail] = useState<any>()
  const [userPhone, setUserPhone] = useState<any>()
  const [coupon, setCoupon] = useState<any>()
  const [allowed, setAllowed] = useState(false)
  const stripe: any = useStripe()
  const { register } = useForm()
  const { totalPriceOfCart, cart } = useContext(CartContext)
  const [isSmallerThan1200] = useMediaQuery('(max-width: 1200px)')
  const [isSmallerThan900] = useMediaQuery('(max-width: 900px)')
  const name = cart.map((item) => item.name).toString()
  const toast = useToast()

  const isEmailValid = (email: any) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return emailPattern.test(email)
  }
  const handleEmailChange = (e: any) => {
    const value = e.target.value
    setUserEmail(value)

    if (!isEmailValid(value)) {
      setError('Neplatná emailová adresa!')
    } else {
      setError('')
    }
  }

  const handleExpressCheckout = async (e: any) => {
    e.preventDefault()
    // try {
    //   const response = await axios.post(
    //     //https://wisebets.onrender.com
    //     //http://localhost:4000
    //     'https://wisebets.onrender.com/create-invoice',
    //     {
    //       name: `Členstvo ${name}`,
    //       unitPrice: totalPriceOfCart,
    //       clientName: userName,
    //       tax: 20,
    //     },
    //   )
    //   console.log('Response from SuperFaktura:', response.data)
    // } catch (error) {
    //   console.log(error)
    // }

    try {
      let productId
      if (name == 'Starter') {
        productId = 'price_1P2HeNLsF6CdETVcOF9L8HM5'
      } else if (name == 'Pro') {
        productId = 'price_1P2HfvLsF6CdETVcukMK5ybk'
      } else {
        productId = 'price_1P2HgPLsF6CdETVcD5ysXOBN'
      }
      toast({
        title: 'Za chvílu budete presmerovaný',
        status: 'info',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      })
      const response = await axios.post(
        'https://wisebets.onrender.com/payment',
        {
          amount: totalPriceOfCart * 100,
          // amount: 0,
          currency: 'eur',
          name: `Členstvo ${name}`,
          email: userEmail,
          coupon: coupon,
          planId: productId,
        },
      )

      if (response.data.sessionId) {
        console.log(response.data)
        localStorage.setItem('userEmail', userEmail)
        //@ts-ignore
        localStorage.setItem('totalPrice', totalPriceOfCart)
        localStorage.setItem('userPhone', userPhone)
        localStorage.setItem('product_name', name)
        localStorage.setItem('userName', userName)

        const { error } = await stripe.redirectToCheckout({
          sessionId: response.data.sessionId,
        })

        if (error) {
          console.error('Error redirecting to checkout:', error)
          toast({
            title: 'Niekde nastala chyba!',
            status: 'error',
            isClosable: true,
            duration: 2000,
            position: 'top-right',
          })
        }
      }
    } catch (error) {
      console.error('Error initiating Express Checkout:', error)
      toast({
        title: 'Niekde nastala chyba!',
        status: 'error',
        isClosable: true,
        duration: 2000,
        position: 'top-right',
      })
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
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ maxWidth: '25rem' }}
          >
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
              onChange={(e) => setUserName(e.target.value)}
              border="2px solid "
              color="white"
              style={{
                WebkitAppearance: 'none', // Add -webkit- prefix
              }}
              borderColor={colors.primaryGold}
              mt="2rem"
              placeholder="Zadajte vaše meno..."
            />
            <Text color="white" fontSize="0.8rem" mt="0.5rem">
              Zadajte meno, ktoré používate v aplikácii Telegram
            </Text>
            <Input
              // onChange={(e) => setUserEmail(e.target.value)}
              border="2px solid "
              onChange={handleEmailChange}
              color="white"
              borderColor={colors.primaryGold}
              style={{
                WebkitAppearance: 'none', // Add -webkit- prefix
              }}
              mt="2rem"
              placeholder="Zadajte váš email..."
            />
            {error && (
              <Text mt="0.5rem" color="white">
                {error}
              </Text>
            )}
            <Input
              onChange={(e) => setUserPhone(e.target.value)}
              border="2px solid "
              color="white"
              borderColor={colors.primaryGold}
              mt="2rem"
              placeholder="Zadajte vaše tel. číslo"
              style={{
                WebkitAppearance: 'none', // Add -webkit- prefix
              }}
            />
            <Text color="white" fontSize="0.8rem" mt="0.5rem">
              Zadajte číslo, ktoré používate v aplikácii Telegram
            </Text>
            {/* <Input
              onChange={(e) => setCoupon(e.target.value)}
              border="2px solid "
              color="white"
              borderColor={colors.primaryGold}
              mt="2rem"
              placeholder="Zadajte kupón"
            /> */}
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
