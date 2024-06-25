import React from 'react'
import { Link, ModalRoutingContext } from 'gatsby-plugin-modal-routing-3'
import x from '../images/_X_SVG.svg'

const ConditionalLayout = ({ children, id }) => (
  <ModalRoutingContext.Consumer>
    {({ modal, closeTo }) =>
      modal ? (
        <>
          <Link to={closeTo} className='modal-close'>
            <img src={x} alt='close' className='close-icon'></img>
          </Link>
          {children}
        </>
      ) : (
        <>
          <Link className='modal-close' to={`/#${id}`}>
            <img src={x} alt='close' className='close-icon'></img>
          </Link>
          <div className='page-container'>{children}</div>
        </>
      )
    }
  </ModalRoutingContext.Consumer>
)

export default ConditionalLayout
