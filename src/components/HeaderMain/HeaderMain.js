import React from 'react'
import { Link } from 'react-router-dom'
import './headerMain.css'

export function HeaderMain() {
  return (
    <header>
      <div className="container">
        <div className="logo">
          <h1>Revai</h1>
        </div>
        <div className="btn-newPost">
          <Link to="/post">
            <button>New request</button>
          </Link>
        </div>
      </div>
    </header>
  )
}
