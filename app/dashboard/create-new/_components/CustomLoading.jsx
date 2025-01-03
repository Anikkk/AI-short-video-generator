import React from 'react'
import {
    AlertDialog,
    AlertDialogContent,
  } from "@/components/ui/alert-dialog"
import Image from 'next/image'
  

const CustomLoading = ({loading}) => {
  return (
    <AlertDialog open={loading}>
        <AlertDialogContent className='bg-white'>
            <div className='bg-white flex flex-col items-center my-10 justify-center'>
                <Image src={'/rocket.gif'} width={200} height={200}/>
                <h2>Generating your video.... Do not referesh</h2>
            </div>
        </AlertDialogContent>
    </AlertDialog>

  )
}

export default CustomLoading
