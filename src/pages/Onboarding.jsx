import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

function Onboarding() {
    const {user, isLoaded} = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        if (user?.unsafeMetadata?.role) {
            navigate(user.unsafeMetadata?.role === "candidate"? "/jobs" : "/post-job")
        }
        // navigate("/onboarding")
    }, [user])
    if (!isLoaded) {
        return <BarLoader  className='mb-4' width={"100%"} color='#36d7b7'/>;
    }
    async function handleRoleSelection(role) {
        await user.update({
            unsafeMetadata: {role}
        }).then(() => {
            navigate(role === "candidate"? "/jobs" : "/post-job")
        }).catch((error) => {
            console.log("ERROR IN SETTING THE ROLE OF THE USER :: ", error);
        })
    }
    return (
    <div className='flex flex-col items-center justify-center mt-32'>
      <h2 className='gradient-title font-extrabold text:7xl sm:text-8xl tracking-tighter'>
        I am a...
      </h2>
      <div className='grid grid-cols-2 gap-4 w-full md:px-40 mt-16'>
        <Button variant="blue" className="h-36 text-2xl" onClick={(e) => handleRoleSelection("candidate")}>Candidate</Button>
        <Button variant="destructive" className="h-36 text-2xl" onClick={(e) => handleRoleSelection("recruiter")}>Recruiter</Button>
      </div>
    </div>
  )
}

export default Onboarding;
