import React from 'react'
import Header from './header'
import Fade from './fade'

const Layout = ({ view, setView, children, setChangeView }) => {
  return (
    <>
      <Header
        view={view}
        setView={setView}
        setChangeView={setChangeView}
      ></Header>
      <Fade>
        <main>{children}</main>
      </Fade>
    </>
  )
}

export default Layout
