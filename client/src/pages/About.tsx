import React from 'react'
import { Flex, Heading, Image, Text, useMediaQuery } from '@chakra-ui/react'
import { colors } from '../store/colors'
import { motion } from 'framer-motion' // Import motion from framer-motion
import { faqs } from '../store/faq'
const About = () => {
  const [isSmallerThan1200] = useMediaQuery('(max-width: 1200px)')
  return (
    <Flex flexDir="column" alignItems="center" mt="1rem">
      <Heading
        textDecor="underline"
        textUnderlineOffset="0.5rem"
        color={colors.primaryGold}
      >
        Často kladené otázky
      </Heading>
      {faqs.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Flex
            flexDir="column"
            alignItems="center"
            gap="0.5rem"
            mb="1rem"
            maxW="50rem"
            flexWrap="wrap"
            textAlign="justify"
            fontFamily="Poppins"
            position="relative"
            p="3rem"
          >
            {item.image && index % 2 == 0 && (
              <Image
                src={item.image}
                width="16rem"
                display={isSmallerThan1200 ? 'none' : 'block'}
                position="absolute"
                left={index % 2 == 0 ? '-250' : 0}
                top="100"
              />
            )}
            {item.image && index % 2 == 1 && (
              <Image
                src={item.image}
                width="16rem"
                position="absolute"
                display={isSmallerThan1200 ? 'none' : 'block'}
                right={index % 2 == 1 ? '-200' : 0}
                bottom="100"
              />
            )}
            <Heading
              fontFamily="Poppins"
              fontSize="x-large"
              color={colors.primaryGold}
              fontWeight="bold"
              textAlign={isSmallerThan1200 ? 'center' : 'start'}
            >
              {item.question}
            </Heading>
            <Text fontFamily="Poppins" color="whitesmoke">
              {item.answer}
            </Text>
            {item.answers ? (
              <Flex
                color="whitesmoke"
                justifyContent="space-between"
                flexDir={isSmallerThan1200 ? 'column' : 'row'}
                gap={isSmallerThan1200 ? '1rem' : '1rem'}
                textAlign="left"
              >
                <Text>{item.answers.answer1}</Text>
                <Text>{item.answers.answer2}</Text>
                <Text>{item.answers.answer3}</Text>
              </Flex>
            ) : null}
          </Flex>
        </motion.div>
      ))}
    </Flex>
  )
}

export default About
