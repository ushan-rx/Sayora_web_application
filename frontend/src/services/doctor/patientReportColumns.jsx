import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import axios from "axios";
import { useExaminationStore } from '@/store/examination.store';

import {getDownloadURL, ref} from 'firebase/storage'
import {storage} from '@/utils/firebase'

import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
  


export const patientReportColumns = [
      
    {
        accessorKey: "testName",
        header: "Report Name",
    },
    {
        accessorKey: "date",
        header: "Uploaded Date",
        cell: ({ row }) => {
          const date = new Date(row.getValue("date"))
          const dateFormatted = date.toLocaleDateString()
          return <div className="font-medium">{dateFormatted}</div>
        },
    },
    //action section
    {
        id: "view",
        cell: ({ row }) => {
          const appointment = row.original
          const navigate = useNavigate() 

          const [doc, setDoc]=useState(null);
          useEffect(()=>{
            try{
            getDownloadURL(ref(storage, appointment.documentURL)).then((url)=>{
                setDoc(url);
            })
            }catch(error){
                console.log(error)
            }
          },[])
          return (
            <Dialog>
                <DialogTrigger>
                    <Button 
                        className="h-8 lg:px-3 text-white bg-teal-500 hover:bg-teal-600 hover:text-white"
                        onClick={() => navigate(`/doctor/examination/${appointment.App_Id}`)}
                    >
                    View
                    </Button>
                    </DialogTrigger>
                <DialogContent className="w-[70vw] h-full z-50">
                <div className="m-[0.2rem]">
                    {
                        doc ? (
                            <embed type="application/pdf" src={doc} width={100+`%`} height={100+'%'}/>
                        ) : (
                            <div className="text-center font-bold text-3xl text-teal-500">  
                                    Report Loading Error
                            </div>
                        )
                    }
                            
                </div>
                </DialogContent>
            </Dialog>
          )
        },
    },
    {
        id: "download",
        cell: ({ row }) => {
          const appointment = row.original
          const {setRefetchExaminationNeeded} = useExaminationStore() 

          const [docDownload, setDownload]=useState(null);
          useEffect(()=>{
            try{
                getDownloadURL(ref(storage, appointment.documentURL)).then((url)=>{
                setDownload(url);
            })
            }catch(error){
                console.log(error)
            }
          },[])

          const handleDownloadClick = () => {
            if (docDownload) {
              const link = document.createElement('a');
              link.href = docDownload;
              link.download = 'my-pdf-file.pdf'; // desired filename
              link.click();
            }
          };

          return (
            <Button 
                onClick={handleDownloadClick}
                className="h-8 lg:px-3 text-white bg-sky-600 hover:bg-sky-700 hover:text-white"
            >
               Download
            </Button>   
          )
        },
      },
]