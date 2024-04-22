import React, { useEffect } from 'react'
import { usePatientStore } from "@/store/patient.store";

import { Button } from '@/components/ui/button'
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"

export default function profileDeatailSheet() {

    const {patientId,
            fName,
            lName,
            dob,
            gender,
            bloodGroup,
            allergies,
            vitals,
            } = usePatientStore(state => ({
                patientId: state.patient.patientId,
                fName: state.patient.fName,
                lName: state.patient.lName,
                dob: state.patient.dob,
                gender: state.patient.gender,
                bloodGroup: state.patient.bloodGroup,
                allergies: state.patient.allergies,
                vitals: state.patient.vitals,
        }))

        let age = (new Date().getFullYear() - new Date(dob).getFullYear())  // calculate age

        console.log(vitals)
    return(
        <Sheet>
            <SheetTrigger asChild>
            <div className='flex-grow mx-4 mt-2'><Button variant="outline" className="bg-teal-500 text-white">profile</Button></div>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                <SheetTitle >Patient Profile</SheetTitle>
                <Separator className="my-4"/>
                {/* <SheetDescription>
                </SheetDescription> */}
                </SheetHeader>
                <div className="grid gap-4 py-4 ">
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label className="text-left col-span-1 text-slate-600 font-bold">
                        Patient Id
                        </Label>
                        <Label  className="text-left col-span-2 ">
                            :  {patientId}
                        </Label>
                        
                        <Label className="text-left col-span-1 text-slate-600 font-bold">
                        Name
                        </Label>
                        <Label  className="text-left col-span-2">
                            :  { fName} {lName}
                        </Label>

                        <Label className="text-left col-span-1 text-slate-600 font-bold">
                        Age (Yrs)
                        </Label>
                        <Label  className="text-left col-span-2">
                            : { age}
                        </Label>

                        <Label className="text-left col-span-1 text-slate-600 font-bold">
                        Gender
                        </Label>
                        <Label  className="text-left col-span-2">
                            : { gender}
                        </Label>

                        <Label className="text-left col-span-1 text-slate-600 font-bold">
                        Blood Group
                        </Label>
                        <Label  className="text-left col-span-2">
                            : {bloodGroup}
                        </Label>
                        <Separator className="w-full col-span-3"/>
                    </div>

                    {
                        allergies.length > 0 && (
                            <>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label className="text-left col-span-1 text-slate-600 font-bold">
                                    Allergies
                                    </Label>
                                    <Label  className="text-left col-span-2">
                                        :  { allergies.join(', ')}
                                    </Label>
                                </div>
                                <Separator className=""/>
                            </>
                        )
                        
                    }
                    
                    {
                        vitals && (
                            <>
                                <div className="grid grid-cols-3 items-center gap-4 mt-4">
                                    <Label className="text-left col-span-1 font-bold">
                                    Vitals
                                    </Label>
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4 mb-8">
                                    <Label className="text-left col-span-1 text-slate-600 font-bold">
                                        Height
                                    </Label>
                                    <Label  className="text-left col-span-2">
                                        : {vitals[0].height} cm
                                    </Label>

                                    <Label className="text-left col-span-1 text-slate-600 font-bold">
                                        Weight
                                    </Label>
                                    <Label  className="text-left col-span-2">
                                        : {vitals[0].weight} kg
                                    </Label>

                                    <Label className="text-left col-span-1 text-slate-600 font-bold">
                                        Blood Pressure
                                    </Label>
                                    <Label  className="text-left col-span-2">
                                        : {vitals[0].bloodPressure} mmHg
                                    </Label>

                                    <Label className="text-left col-span-1 text-slate-600 font-bold">
                                        Pulse Rate
                                    </Label>
                                    <Label  className="text-left col-span-2">
                                        : {vitals[0].pulseRate} bpm
                                    </Label>

                                    <Label className="text-left col-span-1 text-slate-600 font-bold">
                                        Temperature
                                    </Label>
                                    <Label  className="text-left col-span-2">
                                        : {vitals[0].temperature} °C
                                    </Label>

                                    <Label className="text-left col-span-1 text-slate-600 font-bold">
                                        Last Checked
                                    </Label>
                                    <Label  className="text-left col-span-2">
                                        : {new Date(vitals[0].checkdate).toLocaleDateString()}
                                    </Label>
                                    
                                </div>
                            </>
                        )
                    }
                    
                </div>
                <SheetFooter className="flex flex-col-reverse sm:flex-row sm:justify-start sm:space-x-2">
                <SheetClose  asChild>
                    <Button type="close" className="bg-teal-500 justify-start">Close</Button>
                </SheetClose>
                </SheetFooter>
            </SheetContent>
    </Sheet>
    )
}