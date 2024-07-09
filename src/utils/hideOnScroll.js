import React, { useEffect, useState } from 'react'
import useWindowSize from './useWindowSize'

const HideOnScroll = ({ children, classProp }) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)
  const { width } = useWindowSize()
  const isMobile = width < 601

  const handleScroll = () => {
    const currentScrollPos = window.scrollY
    if (prevScrollPos > currentScrollPos) {
      if (currentScrollPos < 100 || prevScrollPos - currentScrollPos > 15) {
        setVisible(true)
        setPrevScrollPos(currentScrollPos)
      }
    } else {
      if (isMobile) {
        setVisible(currentScrollPos < 50)
        setPrevScrollPos(currentScrollPos)
      } else if (currentScrollPos < 10) {
        setVisible(true)
        setPrevScrollPos(currentScrollPos)
      } else {
        setVisible(false)
        setPrevScrollPos(currentScrollPos)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos, visible])

  return (
    <>
      <div
        className={
          isMobile
            ? `mobile-options ${
                visible ? 'mobile-options-show' : 'mobile-options-hide'
              }`
            : `${classProp || 'mobile-options'} ${visible ? 'show' : 'hide'}`
        }
      >
        {children}
      </div>
      <div
        className={
          isMobile
            ? visible
              ? 'mobile-options-show'
              : 'mobile-options-hide'
            : ''
        }
      ></div>
    </>
  )
}

export default HideOnScroll
