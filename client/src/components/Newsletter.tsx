import {
  Button,
  Flex,
  Heading,
  Input,
  Textarea,
  Text,
  useToast,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { colors } from '../store/colors'
import { collection, doc, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'

const Newsletter = () => {
  const [subject, setSubject] = useState<any>('')
  const [message, setMessage] = useState<any>('')
  const [emails, setEmails] = useState<any>()
  const toast = useToast()
  const handleSendNewsletter = async () => {
    const emailsSnapshot = await getDocs(collection(db, 'emails'))
    console.log(emailsSnapshot)
    const emailData = emailsSnapshot.docs.map((doc) => {
      const data = doc.data()
      return data.email
    })
    console.log(emailData)
    if (emailData) {
      setEmails(emailData)
    }
    //https://wisebets.onrender.com/send-newsletter
    await axios
      .post('https://wisebets.onrender.com/send-newsletter', {
        subject: subject,
        message: message,
        emails: emails,
      })
      .then((response: any) => {
        console.log(response.data) // Log the response from the server
        toast({
          title: 'Úspešné vytvrorenie',
          duration: 4000,
          position: 'top-right',
        })
        // Update UI or show a success message
      })
      .catch((error: any) => {
        console.error('Error:', error)
        toast({
          title: 'Niekde nastala chyba',
          duration: 1000,
          position: 'top-right',
        })
        // Handle errors or show error message
      })
    // setEmail('')
  }

  return (
    <Flex h="92vh" flexDir="column" alignItems="center" gap="2rem">
      <Heading color={colors.primaryGold}>Vytvorenie newslettru</Heading>

      <form
        onSubmit={(e) => e.preventDefault()}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          width: '20rem',
          color: 'white',
        }}
      >
        <Text>Pre vytvorenie je potrebné klinúť 2x na odoslať</Text>
        <Input
          placeholder="Predmet newslettru"
          onChange={(e) => setSubject(e.target.value)}
        />
        <Textarea
          placeholder="Text newslettru"
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={() => handleSendNewsletter()}>Odoslať</Button>
      </form>
    </Flex>
  )
}

export default Newsletter
