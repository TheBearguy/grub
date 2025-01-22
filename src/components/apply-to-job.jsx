import React from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


function ApplyJobDrawer({user, job, applied=false, fetchJob}) {
  return (
    <div>
        <Drawer open={applied?false:undefined}>
            <DrawerTrigger asChild className='w-full'>
                <Button
                size="lg"
                variant={job?.isOpen && !applied ? "blue" : "destructive"}
                disabled={!job?.isOpen || applied}
                >
                {job?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring Closed"}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                <DrawerTitle>
                    Apply for {job?.title} at {job?.company?.name}
                </DrawerTitle>
                <DrawerDescription>Please Fill the form below</DrawerDescription>
                </DrawerHeader>
                <form className='flex flex-col gap-4 p-4 pb-0'>
                    <Input type="number" placeholder="Years of Experience" className='flex-1'  />
                   <Input type="text" placeholder="Skills (Comma Separated)" className='flex-1'  />
                    <RadioGroup defaultValue="option-one">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Intermediate" id="intermediate" />
                            <Label htmlFor="intermediate">Intermediate</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Graduate" id="graduate" />
                            <Label htmlFor="graduate">Graduate</Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <RadioGroupItem value="Post Graduate" id="post-graduate" />
                            <Label htmlFor="post-graduate">Post Graduate</Label>
                        </div>
                    </RadioGroup>
                    <Input type="file" accept=".pdf, .doc, .docx" className="flex-1 file:text-gray-500"  />
                    <Button variant="blue" type="submit" size="lg">Submit</Button>
                </form>
                <DrawerFooter>
                <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    </div>
  )
}

export default ApplyJobDrawer
