import { Flex, Heading, Text, Image, useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import { colors } from '../store/colors'

const WorkWithUs = () => {
  const diamond = require('../assets/diamond.png')
  const money = require('../assets/money.png')
  const [isSmallerThan1200] = useMediaQuery('(max-width: 1200px)')

  return (
    <Flex mt="3rem" flexDirection="column" alignItems="center" maxW="100%">
      <Heading
        color={colors.primaryGold}
        fontSize={isSmallerThan1200 ? '2rem' : '2.8rem'}
        textDecoration="underline"
        textAlign="center"
      >
        Ako funguje spolupráca s WiseBets?
      </Heading>
      <Flex
        flexDir="column"
        p="3rem"
        gap="1rem"
        color="whitesmoke"
        fontFamily="Poppins"
      >
        <Flex alignItems="flex-start" flexDir="column" maxW="40rem" mt="1rem">
          <Heading color={colors.primaryGold} mb="0.5rem">
            1. Výber služby
          </Heading>
          <Text textAlign="justify" style={{ textJustify: 'inter-word' }}>
            V prvom kroku si vyberiete z 3 služieb, tú ktorá vám najviac
            vyhovuje
          </Text>
        </Flex>
        <Flex
          alignItems="flex-end"
          flexDir="column"
          maxW="40rem"
          mt="1rem"
          position="relative"
        >
          <Image
            src={money}
            w="16rem"
            h="16rem"
            position="absolute"
            left="-250"
            top="-100"
            display={isSmallerThan1200 ? 'none' : 'block'}
          />
          <Heading color={colors.primaryGold} mb="0.5rem">
            2. Realizácia objednávky
          </Heading>
          <Text maxW="30rem" textAlign="justify">
            Po výbere služby si ju objednáte a uhradíte poplatok cez platobnú
            bránu. Platba je rýchla a bezpečná.
          </Text>
        </Flex>
        <Flex
          flexDir="column"
          alignItems="flex-start"
          maxW="40rem"
          mt="1rem"
          position="relative"
        >
          <Image
            src={diamond}
            w="16rem"
            h="16rem"
            position="absolute"
            right="-200"
            display={isSmallerThan1200 ? 'none' : 'block'}
          />
          <Heading color={colors.primaryGold} mb="0.5rem">
            3. Aktivácia členstva
          </Heading>
          <Text maxW="30rem" textAlign="justify">
            Po uhradení poplatku obdržíte e-mail so všetkými informáciami pre
            aktiváciu členstva. V e-maile nájdete aj pokyny na stiahnutie
            aplikácie TELEGRAM cez ktorú bude prebiehať naša komunikácia ktorá
            vám uľahčí prácu s nami.
          </Text>
        </Flex>
        <Flex flexDir="column" alignItems="flex-end" maxW="40rem" mt="1rem">
          <Heading color={colors.primaryGold} mb="0.5rem">
            4. Zárobok
          </Heading>
          <Text maxW="30rem" textAlign="justify">
            Po aktivácii vášho členstva máte okamžitý prístup k všetkým
            informáciám, ktoré potrebujete na to, aby ste začali ZARÁBAŤ.
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default WorkWithUs
