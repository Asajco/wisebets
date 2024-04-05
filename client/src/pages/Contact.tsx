import {
  Button,
  Flex,
  Heading,
  Image,
  Img,
  Input,
  Text,
  Textarea,
  useMediaQuery,
} from '@chakra-ui/react'

import React, { useState } from 'react'

import { colors } from '../store/colors'
import { FaFacebook } from 'react-icons/fa6'
import { FaInstagram, FaTelegram } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Contact = () => {
  const [email, setEmail] = useState<any>()
  const image = require('../assets/contact_image.png')

  const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)')
  const handleSubscribe = async () => {
    await axios
      .post('http://localhost:4000/add-email', { email: email })
      .then((response: any) => {
        console.log(response.data) // Log the response from the server
        // Update UI or show a success message
      })
      .catch((error: any) => {
        console.error('Error:', error)
        // Handle errors or show error message
      })
    // setEmail('')
  }
  return (
    <Flex
      fontFamily="Poppins"
      p="2rem"
      display="flex"
      flexDir={isSmallerThan1000 ? 'column-reverse' : 'row'}
      alignItems="center"
      justifyContent="center"
      h="90vh"
    >
      <Image
        src={image}
        w="40rem"
        h="40rem"
        ml="3rem"
        display={isSmallerThan1000 ? 'none' : 'block'}
      />
      <Flex
        alignItems="center"
        justifyContent="center"
        flexDir="column"
        ml={isSmallerThan1000 ? 0 : '10rem'}
        gap="2rem"
      >
        <Heading
          color={colors.primaryGold}
          fontFamily="Poppins"
          textAlign="center"
        >
          Prihláste sa na odber Newsletteru
        </Heading>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignContent: 'center',
            justifyContent: 'center',
          }}
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <Input
            placeholder="Zadajte Váš e-mail..."
            borderColor={colors.primaryGold}
            onChange={(e) => setEmail(e.target.value)}
            _focus={{ textDecoration: 'none' }}
          />
          <Button
            type="submit"
            mt="1rem"
            alignSelf="center"
            onClick={handleSubscribe}
            w="15rem"
            color="white"
            border="2px solid  #dab56f"
            bg="black"
            _hover={{
              backgroundColor: '#dab56f',
              color: 'black',
              border: 'none',
            }}
          >
            Odoberať
          </Button>
        </form>
        <Flex
          gap="2rem"
          flexDir="column"
          fontFamily="Poppins"
          mt="3rem"
          position="relative"
        >
          <Link
            to="https://www.facebook.com/wisebets.official"
            target="_blanc"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <FaFacebook color={colors.primaryGold} size={40} />
            <Text color="white" fontFamily="Poppins" fontWeight="bold">
              WiseBets
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
            <FaInstagram color={colors.primaryGold} size={40} />
            <Text color="white" fontFamily="Poppins" fontWeight="bold">
              wisebets_offcial
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
            <FaTelegram color={colors.primaryGold} size={40} />
            <Text color="white" fontFamily="Poppins" fontWeight="bold">
              WiseBets_official
            </Text>
          </Link>
          {/* <Image
            src={diamond}
            width="20rem"
            h="13rem"
            position="absolute"
            bottom="-100"
            left="-300"
          /> */}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Contact
