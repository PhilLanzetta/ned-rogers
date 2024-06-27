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
      <main>{children}</main>
    </>
  )
}

export default Layout
