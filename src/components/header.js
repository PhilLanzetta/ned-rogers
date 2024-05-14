import React, { useState } from 'react'
import useWindowSize from '../utils/useWindowSize'
import { Link } from 'gatsby'

const Header = () => {
  const [isOpen, SetIsOpen] = useState(false)
  const { width } = useWindowSize()
  const isMobile = width < 900

  return (
    <div className='navbar'>
      {isMobile ? (
        <div className='mobile-nav'>
          <div className='mobile-logo-link'>Ned Rogers</div>
          <div className='mobile-options'>
            <div className='mobile-view-options'>
              <button className='view-button'>Grid</button>
              <button className='view-button'>List</button>
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
          <div className='logo-link'>Ned Rogers</div>
          <div className='view-options'>
            <button className='view-button'>Grid</button>
            <button className='view-button'>List</button>
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
