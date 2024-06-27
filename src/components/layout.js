import React from 'react'
import Header from './header'
import Fade from './fade'

const Layout = ({ view, setView, children, setChangeView, setFade, location }) => {
  return (
    <>
      <Header
        view={view}
        setView={setView}
        setChangeView={setChangeView}
        setFade={setFade}
        location={location}
      ></Header>
      <main>{children}</main>
    </>
  )
}

export default Layout
