import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'
import { CartContextProvider } from './store/cartContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <React.StrictMode>
  <ChakraProvider>
    <CartContextProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </CartContextProvider>
  </ChakraProvider>,
  // </React.StrictMode>,
)
