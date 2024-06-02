import React from 'react'
import Header from './header'

const Layout = ({ view, setView, children }) => {
  return (
    <>
      <Header view={view} setView={setView}></Header>
      <main>{children}</main>
    </>
  )
}

export default Layout
