import {
  Box,
  Flex,
  Image,
  Text,
  useMediaQuery,
  Button,
  Drawer,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { colors } from '../../store/colors'
import { FaShoppingCart } from 'react-icons/fa'
import { FaBars as HamburgerIcon } from 'react-icons/fa'
import { IoMdClose as CloseIcon } from 'react-icons/io'

const Header = () => {
  const linkVariants = {
    hover: {
      scale: 1.1,
    },
  }
  const [isSmallerThan1200] = useMediaQuery('(max-width: 1200px)')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const scrollToSection = (id: any) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const logo = require('../../assets/logo.png')
  return !isSmallerThan1200 ? (
    <Flex
      w="100%"
      h={16}
      alignItems="center"
      justifyContent="space-between"
      p={4}
      backgroundColor="black"
      fontFamily="Poppins"
      fontSize="1.2rem"
      fontWeight="bold"
    >
      <Box p="0.5rem" mt="1.5rem">
        <Link to="/">
          <Image
            src={logo}
            alt="WiseBets"
            width="7rem"
            height="5rem"
            mt="0.5rem"
          />
        </Link>
      </Box>
      <Flex
        w="30rem"
        color={colors.primaryGold}
        justifyContent="space-between"
        mr={10}
      >
        <Text>
          {/* <Link to="#products">
            <motion.div whileHover="hover" variants={linkVariants}>
              Produkty
            </motion.div>
          </Link> */}
          <a href="#products">Produkts</a>
        </Text>
        <Link to="/qna">
          <motion.div whileHover="hover" variants={linkVariants}>
            Často kladené otázky
          </motion.div>
        </Link>
        <Link to="/contact">
          <motion.div whileHover="hover" variants={linkVariants}>
            Kontakt
          </motion.div>
        </Link>
        <Link to="/cart" style={{ marginLeft: '0.7rem' }}>
          {' '}
          <FaShoppingCart size={30} />
        </Link>
      </Flex>
    </Flex>
  ) : (
    <Flex
      position="relative"
      flexDirection="row"
      h="5rem"
      alignItems="center"
      justifyContent="space-between"
    >
      <Link to="/">
        <Image src={logo} alt="WiseBets" maxW="7rem" maxH="5rem" />
      </Link>
      <Button
        onClick={onOpen}
        // alignSelf="flex-end"
        // m="0.55rem"
        // mt="2rem"
        _hover={{ background: 'transparent', scale: 1.2 }}
        bg="transparent"
      >
        <HamburgerIcon color={colors.primaryGold} size="2rem" />
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="full">
        <DrawerOverlay />
        <DrawerContent>
          <Flex
            position="relative"
            fontFamily="Poppins"
            textDecoration="none"
            flexDirection="column"
            w="100%"
            h="100%"
            justifyContent="center"
            alignItems="center"
            bg="black"
            color={colors.primaryGold}
            fontWeight="bold"
            fontSize="2rem"
            gap="2rem"
          >
            <a href="#products" onClick={onClose}>
              Produkts
            </a>
            <Link to="/qna" onClick={onClose}>
              Často kladené otázky
            </Link>
            <Link to="/contact" onClick={onClose}>
              Kontakt
            </Link>
            <Link to="/cart">
              <FaShoppingCart size={30} color={colors.primaryGold} />
            </Link>
            <Button
              onClick={onClose}
              w="5rem"
              h="5rem"
              position="absolute"
              right={1}
              top={1}
              fontSize="2rem"
              bg="transparent"
              color={colors.primaryGold}
              _hover={{ background: 'transparent' }}
            >
              <CloseIcon />
            </Button>
          </Flex>
        </DrawerContent>
      </Drawer>
    </Flex>
  )
}

export default Header
