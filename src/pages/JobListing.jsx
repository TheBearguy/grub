import { getJobs } from '@/api/apiJobs'
import useFetch from '@/hooks/useFetch';
import { useSession, useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners';

function JobListing() {
    const [searchQuery, setSearchQuery] = useState("");
    const [location, setLocation] = useState("");
    const [company_id, setCompany_id] = useState("");
    const {isLoaded}  = useUser();
    const {fn: fnJobs, data: jobs, loading: loadingJobs} = useFetch(getJobs,{location,  company_id, searchQuery} )
    console.log(jobs);
    console.log(loadingJobs);



    useEffect(()=> {
        if(isLoaded) {
            fnJobs();
        }
    }, [isLoaded, location, searchQuery, company_id]);

    if (!isLoaded) {
        return <BarLoader className='mb-4' width={"100%"} color='#36d7b7'   />;
    }

  return (
    <div>
        <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8'>Latent Jobs</h1>

        {/* Add filters here */}


        {loadingJobs && (
            <BarLoader className='mt-4' width={"100%"} color='#36d7b7' />
        )}

       {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs?.length ? (
                jobs.map((job) => {
                return (
                    <div>{job.title}</div>
                );
                })
                ) : (
                <div>No Jobs Found 😢</div>
            )}
        </div>
      )}
    </div>
  )
}

export default JobListing
