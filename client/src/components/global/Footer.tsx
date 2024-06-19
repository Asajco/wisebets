import {
  Button,
  Flex,
  Heading,
  Image,
  Input,
  useToast,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { colors } from "../../store/colors";
import { Link } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import axios from "axios";
import { v4 } from "uuid";

const Footer = () => {
  const [email, setEmail] = useState<any>();

  const [isSmallerThan900] = useMediaQuery("(max-width: 900px)");
  const toast = useToast();
  const businessPdfPath = require("../../assets/pdf/PODMIENKY PLATIEB A AKTIVÁCIE.pdf");
  const personalPdfPath = require("../../assets/pdf/SPRACOVANIE OSOBNÝCH ÚDAJOV Informačná povinnosť prevádzkovateľa voči dotknutej osobe-2.pdf");
  const overviewPdfPath = require("../../assets/pdf/VŠEOBECNÉ OBCHODNÉ PODMIENKY Informačná povinnosť o všeobecných obchodných podmienkach-3.pdf");
  const logo = require("../../assets/logo.png");

  const handleSubscribe = async () => {
    try {
      await setDoc(doc(collection(db, "emails"), email), {
        email,
      });
      toast({
        title: "Úspešné prihlásenie na odber!",
        position: "top-right",
        duration: 1000,
        status: "info",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: `Nepodarilo sa prihlásiť na odber!`,
        description: `Skontrolujte prosím vaše údaje a skúste znovu.`,
        position: "top-right",
        isClosable: true,
        duration: 5000,
        status: "error",
      });
    }
    // await axios
    //   .post('https://wisebets.onrender.com/add-email', { email: email })
    //   .then((response: any) => {
    //     console.log(email)
    //     toast({
    //       title: 'Úspešné prihlásenie na odber!',
    //       position: 'top-right',
    //       duration: 1000,
    //       status: 'info',
    //     })
    //     console.log(response.data) // Log the response from the server
    //     // Update UI or show a success message
    //   })
    //   .catch((error: any) => {
    //     console.error('Error:', error)
    //     toast({
    //       title: 'Niekde nastala chyba!',
    //       position: 'top-right',
    //       duration: 1000,
    //       status: 'error',
    //     })
    //     // Handle errors or show error message
    //   })
    // setEmail('')
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="space-around"
      mt="1rem"
      p="1.5rem"
      gap={isSmallerThan900 ? "2rem" : 0}
      borderTop="2px solid"
      flexDir={isSmallerThan900 ? "column" : "row"}
      borderColor={colors.primaryGold}
    >
      <Flex
        flexDirection="column"
        alignItems={isSmallerThan900 ? "center" : "flex-start"}
        w={isSmallerThan900 ? "100%" : "60%"}
      >
        <Flex
          flexDir={isSmallerThan900 ? "column" : "row"}
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src={logo}
            width="7.5rem"
            h="5.5rem"
            alt="Logo of the company"
            m="1rem"
            display={isSmallerThan900 ? "none" : "block"}
          />
          <Heading
            color={colors.primaryGold}
            fontFamily="Poppins"
            fontWeight="bold"
            alignSelf="center"
            mb={isSmallerThan900 ? "1rem" : 0}
            letterSpacing={2}
          >
            WiseBets
          </Heading>
        </Flex>
        <Text
          color="white"
          fontFamily="Poppins"
          fontSize="0.8rem"
          pl={isSmallerThan900 ? "0" : "2rem"}
          textAlign={isSmallerThan900 ? "justify" : "left"}
        >
          Web je určený iba pre užívateľov starších ako 18 rokov. Negarantujeme
          žiadny príjem ani zisk. Ministerstvo financií varuje: Účasťou na
          hazardných hrách môže vzniknúť závislosť
        </Text>
        {/* <Flex
          flexDir={isSmallerThan900 ? 'column' : 'row'}
          alignItems="start"
          gap="1rem"
          fontSize="0.85rem"
          mt="2rem"
          pl="2rem"
          mb="2rem"
          color="#92989F"
        >
          <a href={businessPdfPath} download style={{ textDecoration: 'none' }}>
            <Text
              fontFamily="Poppins"
              borderRight={isSmallerThan900 ? 'none' : '2px solid gray'}
              pr="1rem"
              color="#92989F"
            >
              Podmienky platieb a aktivácie
            </Text>
          </a>
          <a href={personalPdfPath} download style={{ textDecoration: 'none' }}>
            <Text
              fontFamily="Poppins"
              borderRight={isSmallerThan900 ? 'none' : '2px solid gray'}
              pr="1rem"
            >
              Spracovanie osobných údajov
            </Text>
          </a>

          <a href={overviewPdfPath} download style={{ textDecoration: 'none' }}>
            <Text
              fontFamily="Poppins"
              borderRight={isSmallerThan900 ? 'none' : '2px solid gray'}
              pr="1rem"
            >
              Všeobecné obchodné podmienky
            </Text>
          </a>
        </Flex> */}
      </Flex>

      <Flex
        flexDir="column"
        alignItems="center"
        fontSize="0.8rem"
        gap="1rem"
        w={isSmallerThan900 ? "100%" : "40%"}
      >
        <Flex flexDir="column">
          <Heading
            as="h4"
            color={colors.primaryGold}
            mb="1rem"
            textAlign="center"
          >
            Prihláste sa na čerstvé novinky
          </Heading>
          <form
            style={{
              display: "flex",
              flexDirection: isSmallerThan900 ? "column" : "row",
              width: "100%",
              color: "white",
              gap: "1rem",
              alignContent: "center",
              justifyContent: "center",
            }}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Input
              placeholder="Zadajte Váš e-mail..."
              borderColor={colors.primaryGold}
              onChange={(e) => setEmail(e.target.value)}
              _focus={{ textDecoration: "none" }}
            />
            <Button
              type="submit"
              alignSelf="center"
              onClick={handleSubscribe}
              w="10rem"
              color="white"
              border="2px solid  #dab56f"
              bg="black"
              _hover={{
                backgroundColor: "#dab56f",
                color: "black",
                border: "none",
              }}
            >
              Odoberať
            </Button>
          </form>
        </Flex>

        <Text color={colors.primaryGold} fontWeight="bold" fontSize="1rem">
          Kontakt na nás
        </Text>
        <Flex flexDir="row" gap="1rem">
          <Link
            to="https://www.facebook.com/wisebets.official"
            target="_blanc"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              borderRight: "2px solid gray",
              paddingRight: "1rem",
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
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              borderRight: "2px solid gray",
              paddingRight: "1rem",
            }}
          >
            <Text color="white" fontFamily="Poppins" fontWeight="bold">
              Intagram
            </Text>
          </Link>
          <Link
            to="https://t.me/wisebets_official"
            target="_blanc"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              borderRight: "2px solid gray",
              paddingRight: "1rem",
            }}
          >
            <Text color="white" fontFamily="Poppins" fontWeight="bold">
              Telegram
            </Text>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;
