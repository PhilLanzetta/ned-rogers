import React from 'react'
import Layout from './layout'
import { Link, ModalRoutingContext } from 'gatsby-plugin-modal-routing-3'

const ConditionalLayout = ({ children, ...rest }) => (
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
          <Layout {...rest}>{children}</Layout>
        )
      }
    </ModalRoutingContext.Consumer>
  )

export default ConditionalLayout
