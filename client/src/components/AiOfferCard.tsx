import { Flex, Text, useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import { colors } from '../store/colors'

const AiOfferCard = (data: any) => {
  const [isSmallerThan900] = useMediaQuery('(max-width: 900px)')
  data = data.data
  return (
    <Flex
      flexDir="column"
      alignItems="center"
      w="18.5rem"
      px={isSmallerThan900 ? '2.4rem' : '1.5rem'}
      py="1.5rem"
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
        style={{ textJustify: 'inter-word' }}
      >
        {data.text}
      </Text>
    </Flex>
  )
}

export default AiOfferCard
