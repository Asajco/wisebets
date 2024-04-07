import { Button, Flex, Heading, Text, useMediaQuery } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { colors } from '../store/colors'
import { Link } from 'react-router-dom'
import CartContext from '../store/cartContext'
import axios from 'axios'

const Succes = ({ customer_email }: any) => {
  const [isSmallerThan1200] = useMediaQuery('(max-width: 1200px)')

  useEffect(() => {
    // Check if the URL contains 'success' indicating successful payment redirection
    if (window.location.href.includes('/succes')) {
      sendEmail() // Send email upon successful payment
    }
  }, [])

  const sendEmail = async () => {
    try {
      // Send an email after the successful payment
      const userEmail = localStorage.getItem('userEmail')
      const totalPrice = localStorage.getItem('totalPrice')
      const productName = localStorage.getItem('product_name')
      const userName = localStorage.getItem('userName')

      await axios.post('https://wisebets.onrender.com/send-email', {
        customer_email: userEmail,
        total_price: totalPrice,
        product_name: productName,
        // Include any necessary data for the email
        // For example, order details, customer information, etc.
      })
      try {
        const response = await axios.post(
          //https://wisebets.onrender.com
          //http://localhost:4000
          'https://wisebets.onrender.com/create-invoice',
          {
            name: `Členstvo ${productName}`,
            unitPrice: totalPrice,
            clientName: userName,
            tax: 20,
          },
        )
        console.log('Response from SuperFaktura:', response.data)
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.error('Error sending email:', error)
    }
  }

  return (
    <Flex
      flexDir="column"
      alignItems="center"
      justifyContent={isSmallerThan1200 ? 'flex-start' : 'center'}
      h="92vh"
      gap="1.4rem"
      fontFamily="Poppins"
      mt={isSmallerThan1200 ? '3rem' : 0}
    >
      <Heading color={colors.primaryGold} textAlign="center">
        Ďakujeme za Vašu objednávku
      </Heading>
      <Text color="white" fontSize="1.3rem" textAlign="center">
        Pre ďalšie kroky, si pozrite Váš e-mail.
      </Text>
      <Link to="/">
        <Button
          color="whitesmoke"
          border="2px solid  #dab56f"
          bg="black"
          mt={isSmallerThan1200 ? '3rem' : 0}
          onClick={() => localStorage.setItem('userEmail', '')}
          _hover={{
            backgroundColor: '#dab56f',
            color: 'black',
            border: 'none',
          }}
        >
          Späť na domovskú stránku
        </Button>
      </Link>
    </Flex>
  )
}

export default Succes
