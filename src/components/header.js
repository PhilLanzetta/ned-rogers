import React from 'react'
import useWindowSize from '../utils/useWindowSize'
import HideOnScroll from '../utils/hideOnScroll'
import { Link, navigate } from 'gatsby'
import { Link as ModalLink } from 'gatsby-plugin-modal-routing-3'
import Logo from '../images/Ned_Logo.svg'

const Header = ({ view, setView, setChangeView, setFade, location }) => {
  const { width } = useWindowSize()
  const isMobile = width < 900

  return (
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
                  setChangeView(true)
                }}
              >
                List
              </button>
            </div>
            <div className='mobile-information'>
              <ModalLink to='/about' asModal className='information-link'>
                Info
              </ModalLink>
            </div>
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
          <HideOnScroll classProp="view-options">
              <button
                className={
                  view === 'grid' ? 'view-button active-link' : 'view-button'
                }
                onClick={() => {
                  localStorage.setItem('view', 'grid')
                  setFade(true)
                  setTimeout(() => {
                    setView('grid')
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
            <HideOnScroll classProp="information">
              <ModalLink to='/about' asModal className='information-link'>
                Information
              </ModalLink>
          </HideOnScroll>
        </div>
      )}
    </div>
  )
}

export default Header
