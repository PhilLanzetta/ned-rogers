import React from 'react'
import useStore from '../context/StoreContext'
import ProductRow from './productRow'
import { HiOutlineXMark } from 'react-icons/hi2'
import { motion } from 'framer-motion'

const Cart = ({ toggleCart }) => {
  const { cart, checkout } = useStore()
  const formattedNum = (num) =>
    Number(num)
      .toFixed(2)
      .replace(/[.,]00$/, '')

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className='cart-container'
    >
      <motion.div
        initial={{ translateY: '-100%' }}
        animate={{ translateY: 0 }}
        exit={{ translateY: '-100%' }}
        transition={{ duration: 0.4 }}
        className='cart-inner-container'
      >
        <h2 className='cart-title'>CART</h2>
        <article className='cart-products-container'>
          {cart.length > 0 ? (
            cart.map((item, index) => <ProductRow key={index} item={item} />)
          ) : (
            <p>Your cart is empty.</p>
          )}
        </article>
        <article className='cart-summary'>
          <div className='checkout-info'>
            <div>
              SUBTOTAL: $
              {checkout.totalPrice
                ? formattedNum(checkout.totalPrice?.amount)
                : 0}
            </div>
          </div>
          <div>TAXES AND SHIPPING CALCULATED AT CHECKOUT</div>
          <button
            disabled={cart.length === 0}
            onClick={() => window.open(checkout.webUrl)}
            className='checkout-btn'
          >
            CHECKOUT
          </button>
        </article>
      </motion.div>
      <button aria-label='close cart' onClick={toggleCart} className='click-to-close-cart'></button>
    </motion.section>
  )
}

export default Cart
