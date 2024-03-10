import { Flex, Heading, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import Newsletter from '../components/Newsletter'
import Orders from '../components/Orders'
import { colors } from '../store/colors'

const Admin = () => {
  const [name, setName] = useState<any>()
  const [password, setPassword] = useState<any>()

  return (
    <Flex
      flexDir="column"
      alignItems="center"
      gap="2rem"
      h="92vh"
      color="white"
      mt="5rem"
    >
      <Heading color={colors.primaryGold}>Admin panel</Heading>
      <Input
        onChange={(e) => setName(e.target.value)}
        w="20rem"
        placeholder="Zadajte meno"
      />
      <Input
        onChange={(e) => setPassword(e.target.value)}
        w="20rem"
        placeholder="Zadajte heslo"
      />

      {name === 'olejnikrobert241@gmail.com' && password === 'WiseBets1' && (
        <Flex gap="2rem">
          <Orders />
          <Newsletter />
        </Flex>
      )}
    </Flex>
  )
}

export default Admin
