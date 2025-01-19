import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import {
Carousel,
CarouselContent,
CarouselItem,
CarouselNext,
CarouselPrevious,
} from "@/components/ui/carousel"
import companies from './../data/companies.json'
import Autoplay from 'embla-carousel-autoplay'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import faq from "./../data/faq.json"


function LandingPage() {
  return (
    <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>
        <section className='text-center'>
            <h1 className='flex flex-col items-center justify-center gradient-title text-6xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter'>Careers That Consume Ordinary <span className='flex items-center gap-4 sm:gap-6'> Your Professional Singularity Starts Here  </span> </h1>
            <br />
            <br />
            <p className='text-gray-300 sm:mt-4 text-xs sm:text-3xl'>
                Swipe Right on Your Dream Career
            </p>
        </section>
        <div className='flex gap-6 justify-center'>
            <Link to={"/jobs"}>
                <Button variant="blue" size="xl" >Find Jobs</Button>
            </Link>
            <Link to={"/post-job"}>
            <Button variant="destructive" size="xl" >Post Jobs</Button>
            </Link>
        </div>
        {/* CAROUSEL */}
            <Carousel className="w-full py-10"  plugins={[Autoplay(({delay:2000, stopOnInteraction: true}))]}  >
            <CarouselContent className="flex gap-5 sm:gap-20 items-center">
               {companies.map(({name, id, path}) => (
                <CarouselItem key={id}  className="basis-1/3 lg:basis-1/6"  > <img src={path} alt="Hello"  className='h-9 sm:h-14 object-contain'  /> </CarouselItem>
               ))}
            </CarouselContent>
            </Carousel>
            <br />
            <br />
           <div className='flex flex-row justify-between'>
                <h1 className='flex flex-col  justify-center gradient-title text-4xl font-extrabold sm:text-2xl lg:text-4xl tracking-tighter'>Work From Places like this<span className='flex gap-4 sm:gap-6 font-mono'> Without the hassle of stereotypical office loads  </span> </h1>

                <img src="beach_animated.gif" alt="" className='w-full transition-all duration-300 ease-in-out hover:shadow-lg hover:opacity-80 rounded-full' />
           </div>
        <section className='grid gird-cols-1 md:grid-cols-2 gap-4'>
           <Card className="p-6 rounded-lg shadow-lg bg-gray-900 text-white flex items-center justify-between space-x-4">
                {/* Left Section */}
                <div className="flex flex-col space-y-3">
                    {/* Badge */}
                    <span className="bg-blue-600 text-xs text-white font-semibold px-2 py-1 rounded-full w-max">
                        Job Seekers
                    </span>

                    {/* Title & Description */}
                    <div>
                        <CardTitle className="text-2xl font-semibold">New Opportunities one swipe away!</CardTitle>
                        <CardDescription className="text-sm text-gray-400">
                            Search for Opportunites you fancy
                        </CardDescription>
                    </div>

                    {/* Button */}
                    <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                        Explore Now
                    </Button>
                </div>

                {/* Right Section (Image Placeholder) */}
                <div className="w-24 h-24 bg-gray-800 rounded-md flex items-center justify-center">
                    {/* Placeholder text; replace with the actual image later */}
                    <span className="text-sm text-gray-500 ">
                        <img src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgpYPU-hOYuwRweALoNe50MKiHqZ34NLmlDw&s  " alt=""  className='rounded-xl' />

                    </span>
                </div>
            </Card>


            <Card className="p-6 rounded-lg shadow-lg bg-gray-900 text-white flex items-center justify-between space-x-4">
                {/* Left Section */}
                <div className="flex flex-col space-y-3">
                    {/* Badge */}
                    <span className="bg-red-800 text-xs text-white font-semibold px-2 py-1 rounded-full w-max">
                        Host a Job
                    </span>

                    {/* Title & Description */}
                    <div>
                        <CardTitle className="text-2xl font-semibold">Talented Developers one swipe away!</CardTitle>
                        <CardDescription className="text-sm text-gray-400">
                            Hire Developers that fancy you
                        </CardDescription>
                    </div>

                    {/* Button */}
                    <Button
                        className="text-white px-4 py-2 rounded-md text-sm font-medium shadow-md transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-900"
                        variant="destructive"
                    >
                        Explore Now
                    </Button>
                </div>

                {/* Right Section (Image Placeholder) */}
                <div className="w-24 h-24 bg-gray-800 rounded-md flex items-center justify-center">
                    {/* Placeholder text; replace with the actual image later */}
                    <span className="text-sm text-gray-500 ">
                        <img src="  https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149629579.jpg " alt=""  className='rounded-xl' />

                    </span>
                </div>
            </Card>

        </section>
        <Accordion type="single" collapsible>
            {faq.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx+1}`}>
                    <AccordionTrigger>{faq.question }</AccordionTrigger>
                    <AccordionContent>
                        {faq.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>

    </main>
  )
}

export default LandingPage
