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
      maxW={isSmallerThan900 ? '18.5rem' : '19.5rem'}
      minH="22.5rem"
      px={isSmallerThan900 ? '1.85rem' : '1.5rem'}
      style={{
        textJustify: 'inter-word',
        hyphens: 'auto',
        wordBreak: 'normal',
        textOverflow: 'clip',
      }}
      py="1.8rem"
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
        style={{
          wordBreak: 'break-word',
          hyphens: 'auto',
          textOverflow: 'clip',
          msHyphens: 'auto',
          hyphenateCharacter: 'auto',
          WebkitHyphenateCharacter: 'auto',
          WebkitHyphens: 'auto',
          wordSpacing: isSmallerThan900 ? '-0.15rem' : '0',
        }}
        mt="1.5rem"
        color="whitesmoke"
        fontSize="1.10rem"
        alignSelf="flex-end"
        // style={{ textJustify: 'inter-word' }}
      >
        {data.text}
      </Text>
    </Flex>
  )
}

export default AiOfferCard
