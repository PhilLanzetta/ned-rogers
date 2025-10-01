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
