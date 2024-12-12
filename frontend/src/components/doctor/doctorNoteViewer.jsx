import React, { useState, useEffect } from 'react'

import axios from 'axios';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

import { usePatientStore } from "@/store/patient.store";
import { useExaminationStore } from '@/store/examination.store';
  

function doctorNoteViewer() {
    const {isRefetchNeeded} = useExaminationStore(); //state to refresh the table data
    const {patientId} = usePatientStore(state => ({
        patientId: state.patient.patientId,
    }));

    const [noteList, setNoteList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // fetch note data from backend
                if(patientId){
                    const response = await axios.get(`http://localhost:5000/api/v1/doctorNote/patient/${patientId}`)
                    const noteData = await response.data.notes;
                    console.log(noteData)
                    noteData.sort((a, b) => new Date(b.date) - new Date(a.date));
                    noteData.forEach((note) => {
                        note.date = new Date(note.date).toDateString();
                    });
                    setNoteList(noteData)
                }
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

    }, [patientId, isRefetchNeeded]);



  return (
    <div className=''>
        <h1 className='my-3 ml-4 uppercase text-slate-700'>Previous Notes</h1>
        <div className='p-8 h-[50vh] overflow-y-auto scrollbar-thin'>
        <Accordion type="single" collapsible>
            {noteList.map((note) => (
                <AccordionItem key={note._id} value={note._id}>
                    <AccordionTrigger className="font-semibold">{note.subject}</AccordionTrigger>
                    <AccordionContent className="w-[34vw]  overflow-x-auto">
                        <h4 className='font-semibold text-slate-500'>Date: {note.date}<br/><br/></h4>
                        <p><pre>{note.note}</pre></p>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
        </div>
    </div>
  )
}

export default doctorNoteViewer