import React from 'react'
import { NavLink } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <>
      <NavLink to={"/"}>Home</NavLink>
    <NavLink to={"/login"}>Login</NavLink>
    </>

  )
}

export default PageNotFound