import React from 'react'
import Layout from './layout'
import { Link, ModalRoutingContext } from 'gatsby-plugin-modal-routing-3'
import { navigate } from 'gatsby'

const ConditionalLayout = ({ children, id }) => (
  <ModalRoutingContext.Consumer>
    {({ modal, closeTo }) =>
      modal ? (
        <>
          <Link to={closeTo} className='modal-close'>
            X
          </Link>
          {children}
        </>
      ) : (
        <>
          <Link className='modal-close' to={`/#${id}`}>
            X
          </Link>
          <div className='page-container'>{children}</div>
        </>
      )
    }
  </ModalRoutingContext.Consumer>
)

export default ConditionalLayout
