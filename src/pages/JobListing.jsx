import { getJobs } from '@/api/apiJobs'
import { useSession } from '@clerk/clerk-react'
import React, { useEffect } from 'react'

function JobListing() {
    const {session}  = useSession();
    console.log(session);

    async function fetchJobs() {
        const supabaseAccessToken = await session.getToken({
            template: "supabase",
        });
        console.log("HELLO JIIII");

        const data = await getJobs(supabaseAccessToken)
        console.log(data);
    }
    useEffect(() => {
        fetchJobs();
    }, [session])


  return (
    <div>

    </div>
  )
}

export default JobListing
