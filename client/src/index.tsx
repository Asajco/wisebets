import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, Flex, Text } from '@chakra-ui/react'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'
import { CartContextProvider } from './store/cartContext'

// Set this variable to true if it's a production environment
const isProduction = true

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <ChakraProvider>
    <CartContextProvider>
      <HashRouter>
        {!isProduction ? (
          <App />
        ) : (
          <Flex justify="center" align="center" h="100vh">
            <Text fontSize="2xl" fontWeight="bold">
              Na stránke pracujeme aby sme Vám priniesli ten najlepší zážitok.
            </Text>
          </Flex>
        )}
      </HashRouter>
    </CartContextProvider>
  </ChakraProvider>,
)
