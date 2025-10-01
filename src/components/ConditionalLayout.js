import React, { useState } from 'react'
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing-3'
import { navigate } from 'gatsby'
import x from '../images/_X_SVG.svg'
import useStore from '../context/StoreContext'
import { AnimatePresence } from 'framer-motion'
import Cart from './cart'

const ConditionalLayout = ({ children, id }) => {
  const [fadeOut, setFadeOut] = useState(false)
  const { cart } = useStore()
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <ModalRoutingContext.Consumer>
      {({ modal, closeTo }) =>
        modal ? (
          <div className={fadeOut ? 'fade-out' : ''}>
            {(cart.length > 0 || isCartOpen) && (
              <div className='modal-shopping-bag-container'>
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className='shopping-bag'
                >
                  <span>CART</span>
                  <span className='cart-number'>
                    {cart
                      .map((item) => item.quantity)
                      .reduce((prev, next) => prev + next)}
                  </span>
                  <svg
                    className='cart-svg'
                    viewBox='0 0 13 15'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M10.095 4.5H2.90499C2.39124 4.5 1.96107 4.8893 1.90995 5.4005L1.10995 13.4005C1.05108 13.9892 1.51337 14.5 2.10499 14.5H10.895C11.4866 14.5 11.9489 13.9892 11.89 13.4005L11.09 5.4005C11.0389 4.88929 10.6088 4.5 10.095 4.5Z'
                      stroke='black'
                    />
                    <path
                      d='M4 5.50004V2.5C4 1 5 0.5 6.5 0.5C7.85088 0.5 9 1 9 2.50004V5.50004'
                      stroke='black'
                      strokeLinecap='round'
                    />
                  </svg>
                </button>
              </div>
            )}
            <button
              onClick={() => {
                setFadeOut(true)
                document
                  .getElementsByClassName('ReactModal__Overlay')[0]
                  .classList.add('fade-out-slow')
                setTimeout(() => {
                  navigate(closeTo, { state: { noScroll: true } })
                }, 1000)
              }}
              className='modal-close'
            >
              <img src={x} alt='close' className='close-icon'></img>
            </button>
            {children}
            <AnimatePresence>
              {isCartOpen && (
                <Cart toggleCart={() => setIsCartOpen(!isCartOpen)}></Cart>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className={fadeOut ? 'fade-out' : ''}>
            {(cart.length > 0 || isCartOpen) && (
              <div className='modal-shopping-bag-container'>
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className='shopping-bag'
                >
                  <span>CART</span>
                  <span className='cart-number'>
                    {cart
                      .map((item) => item.quantity)
                      .reduce((prev, next) => prev + next)}
                  </span>
                  <svg
                    className='cart-svg'
                    viewBox='0 0 13 15'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M10.095 4.5H2.90499C2.39124 4.5 1.96107 4.8893 1.90995 5.4005L1.10995 13.4005C1.05108 13.9892 1.51337 14.5 2.10499 14.5H10.895C11.4866 14.5 11.9489 13.9892 11.89 13.4005L11.09 5.4005C11.0389 4.88929 10.6088 4.5 10.095 4.5Z'
                      stroke='black'
                    />
                    <path
                      d='M4 5.50004V2.5C4 1 5 0.5 6.5 0.5C7.85088 0.5 9 1 9 2.50004V5.50004'
                      stroke='black'
                      strokeLinecap='round'
                    />
                  </svg>
                </button>
              </div>
            )}
            <button
              className='modal-close'
              onClick={() => {
                setFadeOut(true)
                setTimeout(() => {
                  navigate(`/#${id}`)
                }, 700)
              }}
            >
              <img src={x} alt='close' className='close-icon'></img>
            </button>
            <div className='page-container'>{children}</div>
            <AnimatePresence>
              {isCartOpen && (
                <Cart toggleCart={() => setIsCartOpen(!isCartOpen)}></Cart>
              )}
            </AnimatePresence>
          </div>
        )
      }
    </ModalRoutingContext.Consumer>
  )
}

export default ConditionalLayout
