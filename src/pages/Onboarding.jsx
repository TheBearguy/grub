import { useUser } from '@clerk/clerk-react'
import React from 'react'

function Onboarding() {
    const {user, isLoaded} = useUser()

    



    return (
    <div>Onboarding</div>
  )
}

export default Onboarding
