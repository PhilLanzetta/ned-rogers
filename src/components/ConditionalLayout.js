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
                    xmlns='http://www.w3.org/2000/svg'
                    className='cart-svg'
                    viewBox='0 0 19 27'
                  >
                    <g
                      id='Ellipse_2'
                      data-name='Ellipse 2'
                      transform='translate(2)'
                      fill='none'
                      stroke='#000'
                      strokeWidth='1'
                    >
                      <circle cx='7.5' cy='7.5' r='7.5' stroke='none' />
                      <circle cx='7.5' cy='7.5' r='7' fill='none' />
                    </g>
                    <g
                      id='Rectangle_97'
                      data-name='Rectangle 97'
                      transform='translate(0 7)'
                      fill={isCartOpen ? '#f5f5f5' : '#fff'}
                      stroke='#000'
                      strokeWidth='1'
                    >
                      <rect width='19' height='20' stroke='none' />
                      <rect
                        x='0.5'
                        y='0.5'
                        width='18'
                        height='19'
                        fill='none'
                      />
                    </g>
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
                    xmlns='http://www.w3.org/2000/svg'
                    className='cart-svg'
                    viewBox='0 0 19 27'
                  >
                    <g
                      id='Ellipse_2'
                      data-name='Ellipse 2'
                      transform='translate(2)'
                      fill='none'
                      stroke='#000'
                      strokeWidth='1'
                    >
                      <circle cx='7.5' cy='7.5' r='7.5' stroke='none' />
                      <circle cx='7.5' cy='7.5' r='7' fill='none' />
                    </g>
                    <g
                      id='Rectangle_97'
                      data-name='Rectangle 97'
                      transform='translate(0 7)'
                      fill='#f5f5f5'
                      stroke='#000'
                      strokeWidth='1'
                    >
                      <rect width='19' height='20' stroke='none' />
                      <rect
                        x='0.5'
                        y='0.5'
                        width='18'
                        height='19'
                        fill='none'
                      />
                    </g>
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
