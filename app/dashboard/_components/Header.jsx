import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useContext } from 'react'
import { UserButton } from '@clerk/nextjs'
import { UserDetailsContext } from '@/app/_context/UserDetailsContext'


const Header = () => {
  const {userDetail, setUserDetail} = useContext(UserDetailsContext)
  return (
    <div className='p-3 px-5 flex items-center justify-between shadow-md'>
      <div className='flex gap-3 items-center'>
        <Image src={'/file.svg'} width={30} height={30}/>
        <h2 className='font-bold text-xl'>AI short Video</h2>
      </div>
      <div className='flex gap-3 items-center'>
        <Image src={'/dollar.gif'} width={45} height={20}/>
        <div className='flex gap-2 items-center'><h2>{userDetail?.credits}</h2></div>
        <Button>Dashboard</Button>
        <UserButton/>
      </div>
    </div>
  )
}

export default Header
