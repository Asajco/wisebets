import React, { useContext, useEffect } from 'react'
import CartContext from '../store/cartContext'
import {
  Image,
  Button,
  Flex,
  Heading,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router'
import PaymentForm from '../components/PaymentForm'
import { colors } from '../store/colors'
import { FaArrowCircleLeft } from 'react-icons/fa'

const Cart = () => {
  const { cart, totalPriceOfCart, setTotalPriceOfCart, setCart } = useContext(
    CartContext,
  )
  const navigate = useNavigate()
  const image = require('../assets/item1.png')
  const image2 = require('../assets/item2.png')
  const [isSmallerThan900] = useMediaQuery('(max-width: 900px)')
  const handlePayment = () => {
    navigate('/payment' /* , { state: { price: totalPriceOfCart } } */)
  }

  const handleDeleteItem = (id: any, price: any) => {
    const updatedCart = cart.filter((item) => item.id !== id)
    setCart(updatedCart)
    setTotalPriceOfCart((prevCart) => Number(prevCart) - Number(price))
    console.log(cart)
  }
  return (
    <Flex h="90vh" flexDir="column" alignItems="center" position="relative">
      <Button
        onClick={() => navigate('/home')}
        position="absolute"
        left="5"
        bg="transparent"
        top="5"
      >
        <FaArrowCircleLeft size={30} color={colors.primaryGold} />
      </Button>
      <Heading
        fontFamily="Poppins"
        fontWeight="bold"
        color={colors.primaryGold}
        mb="2rem"
      >
        Košík
      </Heading>
      <Flex
        color="white"
        maxW="30rem"
        mx="auto"
        flexDir="column"
        gap="1rem"
        p="1rem"
      >
        {cart.length > 0 ? (
          cart.map((item: any, index: any) => (
            <Flex
              key={index}
              flexDir="row"
              maxW="100%"
              alignItems="center"
              p="2.5rem"
              fontFamily="Poppins"
              h="2rem"
              border="2px solid"
              borderColor={colors.primaryGold}
              justifyContent="space-between"
              borderRadius="0.5rem"
              gap={isSmallerThan900 ? 3 : '1rem'}
            >
              <Text
                fontWeight="bold"
                fontSize={isSmallerThan900 ? '1rem' : '1.5rem'}
              >
                Členstvo {item.name.toUpperCase()}
              </Text>
              <Text fontSize={isSmallerThan900 ? '1rem' : '1.5rem'} w="7rem">
                {item.price} €
              </Text>
              <Button
                onClick={() => handleDeleteItem(item.id, item.price)}
                border="2px solid  #dab56f"
                color="white"
                bg="black"
                _hover={{
                  backgroundColor: '#dab56f',
                  color: 'black',
                }}
              >
                X
              </Button>
            </Flex>
          ))
        ) : (
          <Text alignSelf="center" fontFamily="Poppins" fontSize="1.4rem">
            Váš košík je prázdny
          </Text>
        )}
        {cart.length > 0 && (
          <Button
            onClick={() => handlePayment()}
            color="whitesmoke"
            w="100%"
            mt="2rem"
            border="2px solid  #dab56f"
            bg="black"
            _hover={{
              backgroundColor: '#dab56f',
              color: 'black',
              border: 'none',
            }}
          >
            Prejsť ku sumarizácii
          </Button>
        )}
      </Flex>
      {/* <Flex mt="5rem" gap="2rem" mb="1rem">
        <Image
          src={image}
          alt="WiseBets"
          w="30rem"
          boxShadow="3px 3px 12px 0px rgba(218,181,111,1)"
        />
        <Image
          src={image2}
          alt="WiseBets"
          w="30rem"
          boxShadow="3px 3px 12px 0px rgba(218,181,111,1)"
        />
      </Flex> */}
    </Flex>
  )
}

export default Cart
