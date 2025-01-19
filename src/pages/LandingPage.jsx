import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from "@/components/ui/card"
import {
Carousel,
CarouselContent,
CarouselItem,
CarouselNext,
CarouselPrevious,
} from "@/components/ui/carousel"

function LandingPage() {
  return (
    <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>
        <section className='text-center'>
            <h1 className='flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-5xl lg:text-7xl tracking-tighter'>Careers That Consume Ordinary <span className='flex items-center gap-4 sm:gap-6'> Your Professional Singularity Starts Here  </span> </h1>
            <p className='text-gray-300 sm:mt-4 text-xs sm:text-xl'>
                Swipe Right on Your Dream Career
            </p>
        </section>
        <div className='flex gap-6 justify-center'>
            <Link to="/jobs">
            <Button variant="blue" size="xl" >Find Jobs</Button>
            </Link>
            <Link to="/post-job">
            <Button variant="destructive" size="xl" >Post Jobs</Button>
            </Link>
        </div>
        {/* CAROUSEL */}
            <Carousel className="w-full py-10">
            <CarouselContent>
               {com}
            </CarouselContent>
            </Carousel>

        banner
        <section>
            cards
        </section>
        accordian
    </main>
  )
}

export default LandingPage
