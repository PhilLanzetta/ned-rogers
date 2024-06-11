import React from 'react'
import useWindowSize from '../utils/useWindowSize'
import HideOnScroll from '../utils/hideOnScroll'
import { Link } from 'gatsby'
import { Link as ModalLink } from 'gatsby-plugin-modal-routing-3'

const Header = ({ view, setView }) => {
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
            Ned Rogers
          </Link>
          <HideOnScroll>
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
                }}
              >
                List
              </button>
            </div>
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
            <div className='mobile-information'>
              <ModalLink to='/about' asModal className='information-link'>
                Info
              </ModalLink>
            </div>
          </HideOnScroll>
        </div>
      ) : (
        <div className='desktop-link-container'>
          <div className='category-links'>
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
            <Link to='/' className='header-link' activeClassName='active-link'>
              All
            </Link>
          </div>
          <Link
            to='/'
            className='logo-link'
            onClick={() => {
              localStorage.setItem('view', 'grid')
              setView('grid')
            }}
          >
            Ned Rogers
          </Link>
          <div className='view-options'>
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
              }}
            >
              List
            </button>
          </div>
          <div className='information'>
            <ModalLink to='/about' asModal className='information-link'>
              Information
            </ModalLink>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
