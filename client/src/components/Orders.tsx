import React, { useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Heading,
  Flex,
} from '@chakra-ui/react'
import { colors } from '../store/colors'
const Orders = () => {
  const [orders, setOrders] = React.useState([])
  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, 'orders'))
      //add data to state
      let data: any = []
      querySnapshot.forEach((doc) => {
        data = [...data, { id: doc.id, ...doc.data() }]
      })
      setOrders(data)
    }

    getData()
  }, [])
  return (
    <Flex
      direction="column"
      alignItems="center"
      h="92vh"
      p="2rem"
      color="white"
      overflowY="scroll" // Add scroll if content overflows
    >
      <Heading color={colors.primaryGold}>Objednávky</Heading>
      <Table variant="simple" colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            <Th fontFamily="Poppins" color="white">
              Email
            </Th>
            <Th fontFamily="Poppins" color="white">
              Name
            </Th>
            <Th fontFamily="Poppins" color="white">
              Phone
            </Th>
            <Th fontFamily="Poppins" color="white">
              Name
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((item: any, index: number) => (
            <Tr
              key={index}
              border="2px solid"
              borderColor="primaryGold"
              borderRadius="0.5rem"
            >
              <Td>{item.email}</Td>
              <Td>{item.user_name}</Td>
              <Td>{item.phone}</Td>
              <Td>{item.name}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  )
}

export default Orders
