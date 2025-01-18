import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

function Header() {
  return (
    <div>
        <nav className='py-4 flex justify-between items-center'>
            <Link>
            <img src="/logo.jpeg" className='h-20' />
            </Link>
            <Button variant="outline"  >Login</Button>
        </nav>
    </div>
  )
}

export default Header
