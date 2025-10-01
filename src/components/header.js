import React, { useState } from 'react'
import useWindowSize from '../utils/useWindowSize'
import HideOnScroll from '../utils/hideOnScroll'
import { Link, navigate } from 'gatsby'
import { Link as ModalLink } from 'gatsby-plugin-modal-routing-3'
import Logo from '../images/Ned_Logo.svg'
import useStore from '../context/StoreContext'
import { AnimatePresence } from 'framer-motion'
import Cart from './cart'

const Header = ({ view, setView, setChangeView, setFade, location }) => {
  const { width } = useWindowSize()
  const isMobile = width < 900
  const { cart } = useStore()
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <>
      <div className='navbar'>
        {isMobile ? (
          <div className='mobile-nav'>
            <Link
              to='/'
              className='mobile-logo-link'
              onClick={() => {
                localStorage.setItem('view', 'grid')
                setView('grid')
              }}
            >
              <img src={Logo} alt='Ned Rogers'></img>
            </Link>
            <HideOnScroll>
              <div className='mobile-category-links'>
                <Link
                  to='/motion'
                  className='header-link'
                  activeClassName='active-link'
                >
                  Motion
                </Link>
                <Link
                  to='/still'
                  className='header-link'
                  activeClassName='active-link'
                >
                  Still
                </Link>
                <Link
                  to='/'
                  className='header-link'
                  activeClassName='active-link'
                >
                  All
                </Link>
              </div>
              <div className='mobile-view-options'>
                <button
                  className={
                    view === 'grid' ? 'view-button active-link' : 'view-button'
                  }
                  onClick={() => {
                    localStorage.setItem('view', 'grid')
                    setView('grid')
                  }}
                >
                  Grid
                </button>
                <button
                  className={
                    view === 'list' ? 'view-button active-link' : 'view-button'
                  }
                  onClick={() => {
                    localStorage.setItem('view', 'list')
                    setView('list')
                    navigate('#top')
                    setChangeView(true)
                  }}
                >
                  List
                </button>
              </div>
              <div className='mobile-information'>
                <ModalLink to='/shop' asModal>
                  Publications
                </ModalLink>
                <ModalLink to='/about' asModal className='information-link'>
                  Info
                </ModalLink>
              </div>
              {(cart.length > 0 || isCartOpen) && (
                <div className='shopping-bag-container'>
                  <button
                    onClick={() => setIsCartOpen(!isCartOpen)}
                    className='shopping-bag'
                  >
                    <span>CART</span>
                    {cart.length > 0 && (
                      <span className='cart-number'>
                        {cart
                          .map((item) => item.quantity)
                          .reduce((prev, next) => prev + next)}
                      </span>
                    )}
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
            </HideOnScroll>
          </div>
        ) : (
          <div className='desktop-link-container'>
            <HideOnScroll classProp='category-links'>
              <button
                onClick={
                  view === 'grid'
                    ? () => {
                        setFade(true)
                        setTimeout(() => {
                          navigate('/motion')
                        }, 700)
                      }
                    : () => navigate('/motion')
                }
                className={`header-link ${
                  location?.pathname === '/motion/' ? 'active-link' : ''
                }`}
              >
                Motion
              </button>
              <button
                onClick={
                  view === 'grid'
                    ? () => {
                        setFade(true)
                        setTimeout(() => {
                          navigate('/still')
                        }, 700)
                      }
                    : () => navigate('/still/')
                }
                className={`header-link ${
                  location?.pathname === '/still/' ? 'active-link' : ''
                }`}
              >
                Still
              </button>
              <button
                onClick={
                  view === 'grid'
                    ? () => {
                        setFade(true)
                        setTimeout(() => {
                          navigate('/')
                        }, 700)
                      }
                    : () => navigate('/')
                }
                className={`header-link ${
                  location?.pathname === '/' ? 'active-link' : ''
                }`}
              >
                All
              </button>
            </HideOnScroll>
            <button
              to='/'
              className='logo-link'
              onClick={() => {
                localStorage.setItem('view', 'grid')
                setFade(true)
                setTimeout(() => {
                  navigate('/')
                  setView('grid')
                  setFade(false)
                }, 700)
              }}
            >
              <img src={Logo} alt='Ned Rogers'></img>
            </button>
            <HideOnScroll classProp='view-options'>
              <button
                className={
                  view === 'grid' ? 'view-button active-link' : 'view-button'
                }
                onClick={() => {
                  localStorage.setItem('view', 'grid')
                  setFade(true)
                  setTimeout(() => {
                    setView('grid')
                    navigate('#top')
                    setFade(false)
                  }, 700)
                }}
              >
                Grid
              </button>
              <button
                className={
                  view === 'list' ? 'view-button active-link' : 'view-button'
                }
                onClick={() => {
                  localStorage.setItem('view', 'list')
                  setFade(true)
                  navigate('#top')
                  setChangeView(true)
                  setTimeout(() => {
                    setView('list')
                    setFade(false)
                  }, 700)
                }}
              >
                List
              </button>
            </HideOnScroll>
            <HideOnScroll classProp='information'>
              <ModalLink to='/shop' asModal>
                Publications
              </ModalLink>
              <ModalLink to='/about' asModal className='information-link'>
                Information
              </ModalLink>
              {(cart.length > 0 || isCartOpen) && (
                <div className='shopping-bag-container'>
                  <button
                    onClick={() => setIsCartOpen(!isCartOpen)}
                    className='shopping-bag'
                  >
                    <span>CART</span>
                    {cart.length > 0 && (
                      <span className='cart-number'>
                        {cart
                          .map((item) => item.quantity)
                          .reduce((prev, next) => prev + next)}
                      </span>
                    )}
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
            </HideOnScroll>
          </div>
        )}
      </div>
      <AnimatePresence>
        {isCartOpen && (
          <Cart toggleCart={() => setIsCartOpen(!isCartOpen)}></Cart>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
