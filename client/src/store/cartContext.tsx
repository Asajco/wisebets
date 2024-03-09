import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react'

interface CartContextProps {
  cart: any[] // Change 'any[]' to the actual type of your cart items
  setCart: Dispatch<SetStateAction<any[]>> // Change 'any[]' to the actual type of your cart items
  count: number
  setCount: Dispatch<SetStateAction<number>>
  totalPriceOfCart: number
  customerEmail: string
  setCustomerEmail: Dispatch<SetStateAction<any>>
  setTotalPriceOfCart: Dispatch<SetStateAction<number>>
}

const CartContext = createContext<CartContextProps>({
  cart: [],
  setCart: () => {},
  count: 0,
  setCount: () => {},
  totalPriceOfCart: 0,
  setTotalPriceOfCart: () => {},
  customerEmail: '',
  setCustomerEmail: () => {},
})

interface CartContextProviderProps {
  children: ReactNode
}

export const CartContextProvider = (props: CartContextProviderProps) => {
  const [cart, setCart] = useState<any[]>([]) // Change 'any[]' to the actual type of your cart items
  const [count, setCount] = useState<number>(0)
  const [totalPriceOfCart, setTotalPriceOfCart] = useState<number>(0)
  const [customerEmail, setCustomerEmail] = useState('')

  const contextValue: CartContextProps = {
    cart,
    setCart,
    count,
    setCount,
    totalPriceOfCart,
    setTotalPriceOfCart,
    customerEmail,
    setCustomerEmail,
  }

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartContext
