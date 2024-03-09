import { Flex, Text, useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import { colors } from '../../store/colors'
import { Link } from 'react-router-dom'

const Footer = () => {
  const [isSmallerThan900] = useMediaQuery('(max-width: 900px)')
  const businessPdfPath = require('../../assets/pdf/PODMIENKY PLATIEB A AKTIVÁCIE.pdf')
  const personalPdfPath = require('../../assets/pdf/SPRACOVANIE OSOBNÝCH ÚDAJOV Informačná povinnosť prevádzkovateľa voči dotknutej osobe.pdf')
  const overviewPdfPath = require('../../assets/pdf/VŠEOBECNÉ OBCHODNÉ PODMIENKY Informačná povinnosť o všeobecných obchodných podmienkach-2.pdf')
  return (
    <Flex
      alignItems="center"
      justifyContent="space-around"
      mt="1rem"
      p="1.5rem"
      gap={isSmallerThan900 ? '2rem' : 0}
      borderTop="2px solid"
      flexDir={isSmallerThan900 ? 'column' : 'row'}
      borderColor={colors.primaryGold}
    >
      <Flex flexDir="column" alignItems="start" gap="1rem">
        <a href={businessPdfPath} download style={{ textDecoration: 'none' }}>
          <Text color="white" fontFamily="Poppins">
            PODMIENKY PLATIEB A AKTIVÁCIE
          </Text>
        </a>
        <a href={personalPdfPath} download style={{ textDecoration: 'none' }}>
          <Text color="white" fontFamily="Poppins">
            SPRACOVANIE OSOBNÝCH ÚDAJOV
          </Text>
        </a>

        <a href={overviewPdfPath} download style={{ textDecoration: 'none' }}>
          <Text color="white" fontFamily="Poppins">
            VŠEOBECNÉ OBCHODNÉ PODMIENKY
          </Text>
        </a>
      </Flex>
      <Text
        color="white"
        fontFamily="Poppins"
        fontSize="0.5rem"
        textAlign="center"
      >
        Web je určený iba pre užívateľov starších ako 18 rokov. Negarantujeme
        žiadny príjem ani zisk. Ministerstvo financií varuje: Účasťou na
        hazardných hrách môže vzniknúť závislosť
      </Text>
      <Flex flexDir="column" alignItems="center" fontSize="0.8rem" gap="1rem">
        <Text color={colors.primaryGold} fontWeight="bold" fontSize="1rem">
          Kontakt na nás
        </Text>
        <Link
          to="https://www.facebook.com/wisebets.official"
          target="_blanc"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Text color="white" fontFamily="Poppins" fontWeight="bold">
            Facebook
          </Text>
        </Link>
        <Link
          to="https://www.instagram.com/wisebets_official/"
          target="_blanc"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Text color="white" fontFamily="Poppins" fontWeight="bold">
            Intagram
          </Text>
        </Link>
        <Link
          to="t.me/wisebets_official"
          target="_blanc"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Text color="white" fontFamily="Poppins" fontWeight="bold">
            Telegram
          </Text>
        </Link>
      </Flex>
    </Flex>
  )
}

export default Footer
