import { Flex, Heading, Image, Text, useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import { motion } from 'framer-motion'
import { products } from '../store/products'
import Card from '../components/Card'

import { colors } from '../store/colors'
import { aiOffer } from '../store/products'
import WorkWithUs from '../components/WorkWithUs'
import AiOfferCard from '../components/AiOfferCard'
const Home = () => {
  const crown = require('../assets/crown.png')

  const stats = require('../assets/stats.png')
  const [isSmallerThan1200] = useMediaQuery('(max-width: 1200px)')
  const [isSmallerThan900] = useMediaQuery('(max-width: 900px)')
  return (
    <Flex direction="column" alignItems="center" position="relative">
      {/* <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, }}
      >
        <Image src={image1} h="90vh" mb="4" />
      </motion.div> */}

      <Heading
        fontSize="2.5rem"
        textDecoration="underline"
        textAlign="center"
        color={colors.primaryGold}
        m="1rem"
      >
        Prečo si vybrať nás?
      </Heading>
      <motion.div style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
        <Text
          color="whitesmoke"
          fontFamily="Poppins"
          textAlign="center"
          fontSize="1.25rem"
        >
          Ponúkame Vám revolučné stávkové poradenstvo s využitím najmodernejších
          technológií umelej inteligencie (AI)
        </Text>
      </motion.div>
      <Flex
        flexDir="column"
        flexWrap="wrap"
        textAlign="justify"
        alignItems="flex-start"
        gap="1rem"
        color="white"
        p={isSmallerThan900 ? '1.75rem' : '2.5rem'}
        maxW="40rem"
        fontFamily="Poppins"
        style={{ hyphens: 'auto', wordSpacing: '-0.05rem' }}
      >
        <Image
          src={crown}
          color="white"
          position="absolute"
          left="20"
          top="200"
          w="16rem"
          display={isSmallerThan1200 ? 'none' : 'block'}
          h="14rem"
        />
        <Image
          src={stats}
          color="white"
          position="absolute"
          right="100"
          top="400"
          w="16rem"
          h="14rem"
          display={isSmallerThan1200 ? 'none' : 'block'}
        />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ hyphens: 'auto' }}
        >
          <Text style={{ hyphens: 'auto' }}>
            <Text
              color={colors.primaryGold}
              fontWeight="bold"
              fontSize="1.3rem"
              style={{ hyphens: 'auto' }}
              mb="0.5rem"
            >
              Skúsenosti a znalosti
            </Text>{' '}
            Máme za sebou roky skúseností v oblasti stávkovania a disponujeme
            rozsiahlymi znalosťami v rôznych športových odvetviach.
          </Text>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ hyphens: 'auto' }}
        >
          <Text style={{ hyphens: 'auto' }}>
            <Text
              color={colors.primaryGold}
              fontWeight="bold"
              fontSize="1.3rem"
              mb="0.5rem"
            >
              Inovatívny prístup
            </Text>{' '}
            Neustále vyvíjame a vylepšujeme naše AI algoritmy, aby sme vám
            priniesli čo najpresnejšie predpovede.
          </Text>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ hyphens: 'auto' }}
        >
          <Text>
            <Text
              color={colors.primaryGold}
              fontWeight="bold"
              fontSize="1.3rem"
              style={{ hyphens: 'auto' }}
              mb="0.5rem"
            >
              Transparentnosť
            </Text>{' '}
            Poskytujeme vám detailné analýzy a zdôvodnenia našich tipov, aby ste
            mali kontrolu nad svojimi stávkami.
          </Text>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ hyphens: 'auto' }}
        >
          <Text>
            <Text
              color={colors.primaryGold}
              fontWeight="bold"
              fontSize="1.3rem"
              mb="0.5rem"
            >
              Zákaznicky servis
            </Text>{' '}
            Našim klientom poskytujeme individuálny prístup a promptnú podporu.
          </Text>
        </motion.div>
      </Flex>
      <Flex
        wrap="wrap"
        justifyContent="space-around"
        mt="6"
        gap="2rem"
        id="products"
      >
        {Object.values(products)?.map((product: any, index) => (
          <Card data={product} key={index} />
        ))}
      </Flex>
      <WorkWithUs />
      <Heading
        m="2rem"
        color={colors.primaryGold}
        textDecoration="underline"
        textAlign="center"
      >
        ČO VÁM PONÚKA UMELÁ INTELIGENCIA (AI)
      </Heading>
      <Flex
        gap="2.5rem"
        p={isSmallerThan900 ? '2rem' : 0}
        flexDirection={isSmallerThan900 ? 'column' : 'row'}
        style={{
          textJustify: 'inter-word',
          hyphens: 'auto',
          wordBreak: 'normal',
          textOverflow: 'clip',
        }}
      >
        {aiOffer.map((item: any, index) => (
          <AiOfferCard data={item} key={index} />
        ))}
      </Flex>
      {/* <motion.div>
        <Image src={image2} mb="4" />
      </motion.div>
      <motion.div>
        <Image src={image3} mb="4" />
      </motion.div> */}
    </Flex>
  )
}

export default Home
