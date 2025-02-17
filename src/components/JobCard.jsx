import { useUser } from '@clerk/clerk-react'
import React, {useEffect, useState} from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import useFetch from '@/hooks/useFetch';
import { deleteJob, savedJobs } from '@/api/apiJobs';
import { BarLoader } from 'react-spinners';

function JobCard({job, isMyJob=false, savedInit=false, onJobAction = () => {}}) {
    const [saved, setSaved] = useState(savedInit);
    const {user} = useUser();
    const {fn: fnSavedJob, data:savedJob, loading: loadingSavedJob}  = useFetch(savedJobs, {
        alreadySaved: saved
    });
    async function handleSaveJob () {
        await fnSavedJob({
            user_id: user.id,
            job_id: job.id,
        })
        onJobAction();
    }

    const {loading: loadingDeleteJob, fn: fnDeleteJob} = useFetch(deleteJob, {
        job_id: job.id
    })

    const handleDeleteJob = async  () => {
        await fnDeleteJob();
        onJobAction();
    }

    useEffect(() => {
        if (savedJob !== undefined) {
            setSaved(savedJob?.length > 0);
        }
    }, [savedJob])

    return (
        <Card className="flex flex-col">
            {loadingDeleteJob && (
                <BarLoader className='mt-4' width={"100%"} color='#36d7b7'  />
            )}
            <CardHeader>
                <CardTitle className='flex justify-between font-bold'>
                    {job.title}
                {
                    isMyJob && (
                        <Trash2Icon fill='red' size={18} className='text-red-300 cursor-pointer' onClick={handleDeleteJob} />
                    )
                }
                </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-4 flex-1'>
                <div className='flex justify-between'>
                    {job.company && (
                        <img src={job.company.logo_url} alt="company logo" className='h-6'/>
                    )}
                    <div className='flex items-center gap-2'>
                        <MapPinIcon size={15} /> {job.location}
                    </div>
                </div>
                <hr />
                {job.description.split('.')[0] + "."}
            </CardContent>
            <CardFooter className='flex gap-2'>
               <Link to={`/job/${job.id}`}  className='flex-1'>
                    <Button variant='secondary' className='w-full'>
                        More Details
                    </Button>
               </Link>
               {!isMyJob && (
                <Button variant="outline" className="w-15" disabled={loadingSavedJob} onClick={handleSaveJob} >
                    {saved ? (
                        <Heart stroke='red' fill='red' size={20} />
                    ) : (
                            <Heart size={20} />
                        )
                    }
                </Button>
               )}
            </CardFooter>
        </Card>
  )
}

export default JobCard
