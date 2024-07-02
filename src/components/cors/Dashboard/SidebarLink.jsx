import React from 'react'
import { matchPath, NavLink, useLocation } from 'react-router-dom'
import * as Icons from "react-icons/vsc"

const SidebarLink = ({link}) => {

    const location = useLocation();
    const Icon = Icons[link.icon];

    const matchRoute = (route) => {
        return matchPath(route , location.pathname)
    }

  return (
    <NavLink to={link.path} className={`relative w-full px-4 py-2 text-sm bg-yellow-800 font-medium
    ${matchRoute(link.path) ? "bg-opacity-100 text-yellow-100" : "bg-opacity-0"}`}>

      <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50
      ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}>
      </span>

      <div className='flex gap-x-2 items-center'>
          <Icon className='text-lg'/>
          <span>{link.name}</span>
      </div>
         
    </NavLink>
  )
}

export default SidebarLink