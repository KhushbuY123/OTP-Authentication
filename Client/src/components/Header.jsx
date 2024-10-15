import React from 'react'

function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-blue-400">
         <ul>
          <li>
            <a href="/">Login</a>
          </li>
          <li>
            <a href="/register">Registration</a> 
          </li>
         </ul>
      </nav>
    </div>
  )
}

export default Header
