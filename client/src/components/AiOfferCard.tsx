import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { colors } from '../store/colors'
import { color } from 'framer-motion'

const AiOfferCard = (data: any) => {
  console.log(data)
  data = data.data
  return (
    <Flex
      flexDir="column"
      alignItems="center"
      w="17rem"
      p="1.5rem"
      border="2px solid"
      borderRadius="0.5rem"
      borderColor={colors.primaryGold}
      fontFamily="Roboto"
      boxShadow="2px 7px 16px 1px rgba(231,166,26,1);"
      mb="2rem"
    >
      <Text
        color={colors.primaryGold}
        fontSize="1.35rem"
        textAlign="center"
        fontWeight="bold"
        fontFamily="Poppins"
      >
        {data.title}
      </Text>
      <Text
        textAlign="justify"
        mt="1.5rem"
        color="whitesmoke"
        fontSize="1.10rem"
        alignSelf="flex-end"
      >
        {data.text}
      </Text>
    </Flex>
  )
}

export default AiOfferCard
