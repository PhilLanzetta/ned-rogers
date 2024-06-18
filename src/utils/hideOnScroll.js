import React, { useEffect, useState } from 'react'

const HideOnScroll = ({ children }) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)

  const handleScroll = () => {
    const currentScrollPos = window.scrollY
    if (prevScrollPos > currentScrollPos) {
      if (prevScrollPos - currentScrollPos > 200 || currentScrollPos < 100) {
        setVisible(true)
        setPrevScrollPos(currentScrollPos)
      }
    } else {
      setVisible(false)
      setPrevScrollPos(currentScrollPos)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos, visible])

  return (
    <>
      <div
        className={`mobile-options ${
          visible ? 'mobile-options-show' : 'mobile-options-hide'
        }`}
      >
        {children}
      </div>
      <div
        className={`mobile-nav-background ${
          visible ? 'mobile-options-show' : 'mobile-options-hide'
        }`}
      ></div>
    </>
  )
}

export default HideOnScroll
