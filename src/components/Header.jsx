import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedOut, SignedIn, SignInButton, UserButton} from '@clerk/clerk-react'
function Header() {
  return (
    <div className=''>
        <nav className='py-4 flex justify-between items-center'>
            <Link>
            <img  src="/logo.jpeg" className='h-24' />
            </Link>
            <Button variant="outline"  >Login</Button>
            {/* <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn> */}
        </nav>
    </div>
  )
}

export default Header
