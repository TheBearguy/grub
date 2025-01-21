import { useUser } from '@clerk/clerk-react'
import React, {useState} from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

function JobCard({job, isMyJob=false, savedInit=false, onJobSaved = () => {}}) {

    const {user} = useUser();
    const [isFilled, setIsFilled] = useState(false); // State to track if the heart is filled

    const fillHeart = () => {
        setIsFilled(!isFilled); // Toggle the filled state
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className='flex justify-between font-bold'>
                    {job.title}
                {
                    isMyJob && (
                        <Trash2Icon fill='red' size={18} className='text-red-300 cursor-pointer' />
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
               <Link to={`job/${job.id}`}  className='flex-1'>
                    <Button variant='secondary' className='w-full'>
                        More Details
                    </Button>
               </Link>
               <Heart
                    stroke='red'
                    size={20}
                    color={isFilled ? "red" : "black"} // Change color based on state
                    fill={isFilled ? "red" : "none"} // Fill the heart when filled
                    className="cursor-pointer"
                    onClick={fillHeart} // Toggle state on click
                />
            </CardFooter>
        </Card>
  )
}

export default JobCard
