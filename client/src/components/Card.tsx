import React, { useContext } from 'react'
import { TItem } from '../types/types'
import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import { colors } from '../store/colors'
import CartContext from '../store/cartContext'
import { Link, useNavigate } from 'react-router-dom'
const Card = (data: any) => {
  data = data.data
  const navigate = useNavigate()
  const { totalPriceOfCart, setTotalPriceOfCart, setCart } = useContext(
    CartContext,
  )
  const handleBuy = () => {
    setCart((prevCart) => [...prevCart, data])
    setTotalPriceOfCart(Number(totalPriceOfCart) + Number(data.price))
    navigate('/cart')
  }
  return (
    <Flex
      borderRadius="0.5rem"
      p={4}
      flexDir="column"
      alignItems="center"
      bg="black"
      w="18rem"
      h="22rem"
      justifyContent="space-between"
      border="2px solid #dab56f"
      borderColor={colors.primaryGold}
      position="relative"
    >
      {' '}
      <Flex
        flexDir="column"
        color="white"
        gap="0.5rem"
        alignItems="center"
        fontFamily="Poppins"
      >
        <Heading
          fontFamily="Poppins"
          fontWeight="bold"
          color={colors.primaryGold}
          alignSelf="center"
        >
          {data.name}
        </Heading>
        <Text fontWeight="bold" color={colors.primaryGold}>
          {data.succes}
        </Text>
        <Text>{data.tips}</Text>
        <Text>{data.ebook}</Text>
        <Text>{data.support}</Text>
        <Text>{data.notification}</Text>
        <Text>{data.shortDescription ? data.shortDescription : null}</Text>
        <Text fontWeight="bold" color={colors.primaryGold}>
          {data.price} €
        </Text>
      </Flex>
      <Button
        onClick={() => handleBuy()}
        color="whitesmoke"
        border="2px solid  #dab56f"
        bg="black"
        _hover={{
          backgroundColor: '#dab56f',
          color: 'black',
          border: 'none',
        }}
      >
        Zakúpiť
      </Button>
    </Flex>
  )
}

export default Card
