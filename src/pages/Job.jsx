import { getSingleJob, updateHiringStatus } from '@/api/apiJobs';
import useFetch from '@/hooks/useFetch';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import MDEditor from '@uiw/react-md-editor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ApplyJobDrawer from '@/components/apply-to-job';
import ApplicationCard from '@/components/ApplicationCard';



function Job() {

    const {isLoaded, user} = useUser();
    const {id} = useParams();
    const {fn: fnJob, data: job, erorr: errorJob, loading: loadingJob}  = useFetch(getSingleJob, {
        job_id:id
    });
    const {fn: fnHiringStatus, data:dataHiringStatus, error: errorHiringStatus, loading: loadingHiringStatus} = useFetch(updateHiringStatus, {job_id: id})

    useEffect(() => {
        if (isLoaded) {
            fnJob();
        }
    }, [isLoaded])

    if (loadingJob || !isLoaded) {
        <BarLoader className='mb-4' width={"100%"} color='#36d7b7'/>
    }

    function handleStatus(value) {
        const isOpen = value === "open";
        fnHiringStatus(isOpen)
        .then(()=> {
            fnJob()
        })
    }

    return (
     <div className="flex flex-col gap-8 mt-5">
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
        <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">
          {job?.title}
        </h1>
        <img src={job?.company?.logo_url} className="h-12" alt={job?.title} />
      </div>

      <div className="flex justify-between ">
        <div className="flex gap-2">
          <MapPinIcon /> {job?.location}
        </div>
        <div className="flex gap-2">
          <Briefcase /> {job?.applications?.length} Applicants
        </div>
        <div className="flex gap-2">
          {job?.isOpen ? (
            <>
              <DoorOpen /> Open
            </>
          ) : (
            <>
              <DoorClosed /> Closed
            </>
          )}
        </div>
      </div>

          {/* Hiring Status */}
        {loadingHiringStatus && <BarLoader width={"100%"} color='#36d7b7'  />}
        {
            job?.recruiter_id == user?.id && (
                <Select onValueChange={handleStatus}>
                    <SelectTrigger className={`w-full ${job?.isOpen ? "bg-green-950" : "bg-red-950"}`}>
                        <SelectValue placeholder={
                            "Hiring Status " + (job?.isOpen ? "( Open )" : "( Closed )")
                             }
                        />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={"open"}>
                            Open
                        </SelectItem>
                        <SelectItem value={"closed"}>
                            Closed
                        </SelectItem>
                    </SelectContent>
                </Select>
            )
        }

        <h2 className="text-2xl sm:text-3xl font-bold">About the job</h2>
            <p className="sm:text-lg">{job?.description}</p>

        <h2 className="text-2xl sm:text-3xl font-bold">
                What we are looking for
        </h2>
        <MDEditor.Markdown source={job?.requirements} className="bg-transparent sm:text-lg"/>

        {/* Render applications:  */}
        {job?.recruiter_id !== user?.id && (
            <ApplyJobDrawer job={job} user={user} fetchJob={fnJob} applied={job?.applications.find((applicant) => applicant.candidate_id === user.id)} />
        )}

        {job?.applications?.length > 0 && job?.recruiter_id == user?.id && (
            <div className="flex flex-col gap-2">
                <h2 className="font-bold mb-4 text-xl ml-1">Applications</h2>
                {job?.applications.map((application) => {
                    return <ApplicationCard application={application} key={application.id} />
                })}
            </div>
        )}

    </div>
  )
}

export default Job;
