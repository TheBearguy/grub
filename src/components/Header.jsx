import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedOut, SignedIn, SignInButton, UserButton, SignIn, useUser} from '@clerk/clerk-react'
import { Briefcase, BriefcaseBusiness, PenBox } from 'lucide-react'
function Header() {

    const [showSignIn, setShowSignIn] = useState(false);
    const [search, setSearch] = useSearchParams();
    const {user} = useUser();
    useEffect(() => {
      if(search.get("sign-in")) setShowSignIn(true)
    }, [search])

    const handleOverlayClick = (e) => {
        if (e.target == e.currentTarget) {
           setShowSignIn(false);
            setSearch({})
        }
    }

  return (
    <div className=''>
        <nav className='py-4 flex justify-between items-center'>
            <Link>
            <img  src="/logo.jpeg" className='h-24' />
            </Link>
            <div className='flex gap-8'>
                {/* <Button variant="outline"  >Login</Button> */}
                <SignedOut>
                    <Button variant="outline" onClick={() => setShowSignIn(true)}>Login</Button>
                </SignedOut>
                <SignedIn>
                    {
                        user?.unsafeMetaData?.role === "recruiter" && (
                            <Link to="/post-jobs" >
                                <Button variant="destructive" className="rounded-full">
                                    <PenBox  size={20} className='mr-2'  />
                                    Post job
                                </Button>
                            </Link>
                        )
                    }
                    <UserButton appearance={{
                        elements: {
                            avatarBox: "w-10 h-10"
                        }
                    }}>
                        <UserButton.MenuItems>
                            <UserButton.Link
                                label='My Jobs'
                                labelIcon={<BriefcaseBusiness size={15}/>}
                                href='/my-jobs'
                            />
                           <UserButton.Link
                                label='Saved Jobs'
                                labelIcon={<BriefcaseBusiness size={15}/>}
                                href='/saved-jobs'
                            />
                        </UserButton.MenuItems>
                    </UserButton>
                </SignedIn>
            </div>
        </nav>
        {showSignIn && <div className='fixed inset-0 flex items-center justify-center backdrop-blur'
            onClick={handleOverlayClick}
        >
                <SignIn
                    signUpForceRedirectUrl='/onboarding'
                    fallbackRedirectUrl='/onboarding'
                />
            </div>}
    </div>
  )
}

export default Header
