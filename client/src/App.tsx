import { Route, Routes } from 'react-router'
import Header from './components/global/Header'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import { Box } from '@chakra-ui/react'
import Cart from './pages/Cart'
import Payment from './pages/Payment'
import StripeContainer from './components/StripeContainer'
import PaymentForm from './components/PaymentForm'
import Succes from './pages/Succes'
import Footer from './components/global/Footer'
import Newsletter from './pages/Newsletter'

function App() {
  return (
    <Box backgroundColor="black" minH="100vh">
      <Header />
      <Routes>
        <Route index path="/home" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="payment" element={<StripeContainer />} />
        <Route path="/qna" element={<About />} />
        <Route path="/succes" element={<Succes />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/news-letter" element={<Newsletter />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </Box>
  )
}

export default App
