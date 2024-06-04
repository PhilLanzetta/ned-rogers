import React from 'react'
import useWindowSize from '../utils/useWindowSize'
import { Link } from 'gatsby'

const Header = ({ view, setView }) => {
  const { width } = useWindowSize()
  const isMobile = width < 900

  return (
    <div className='navbar'>
      {isMobile ? (
        <div className='mobile-nav'>
          <Link to='/' className='mobile-logo-link'>
            Ned Rogers
          </Link>
          <div className='mobile-options'>
            <div className='mobile-view-options'>
              <button className='view-button' onClick={() => setView('grid')}>
                Grid
              </button>
              <button className='view-button' onClick={() => setView('list')}>
                List
              </button>
            </div>
            <div className='mobile-category-links'>
              <Link to='/' className='header-link'>
                Motion
              </Link>
              <Link to='/' className='header-link'>
                Still
              </Link>
              <Link to='/' className='header-link'>
                All
              </Link>
            </div>
            <div className='mobile-information'>
              <Link to='/' className='information-link'>
                Info
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className='desktop-link-container'>
          <div className='category-links'>
            <Link to='/' className='header-link'>
              Motion
            </Link>
            <Link to='/' className='header-link'>
              Still
            </Link>
            <Link to='/' className='header-link'>
              All
            </Link>
          </div>
          <Link to='/' className='logo-link'>
            Ned Rogers
          </Link>
          <div className='view-options'>
            <button
              className='view-button'
              onClick={() => {
                localStorage.setItem('view', 'grid')
                setView('grid')
              }}
            >
              Grid
            </button>
            <button
              className='view-button'
              onClick={() => {
                localStorage.setItem('view', 'list')
                setView('list')
              }}
            >
              List
            </button>
          </div>
          <div className='information'>
            <Link to='/' className='information-link'>
              Information
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
