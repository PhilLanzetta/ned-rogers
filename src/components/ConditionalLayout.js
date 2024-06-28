import React, { useState } from 'react'
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing-3'
import { navigate } from 'gatsby'
import x from '../images/_X_SVG.svg'

const ConditionalLayout = ({ children, id }) => {
  const [fadeOut, setFadeOut] = useState(false)
  return (
    <ModalRoutingContext.Consumer>
      {({ modal, closeTo }) =>
        modal ? (
          <div className={fadeOut ? 'fade-out' : ''}>
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
          </div>
        ) : (
          <div className={fadeOut ? 'fade-out' : ''}>
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
          </div>
        )
      }
    </ModalRoutingContext.Consumer>
  )
}

export default ConditionalLayout
