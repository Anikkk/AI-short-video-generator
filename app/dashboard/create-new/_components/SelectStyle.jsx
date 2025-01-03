import Image from 'next/image'
import React, { isValidElement, useState } from 'react'

const SelectStyle = ({onUserSelect}) => {

    const styleOptions=[
        {
        name:'Realistic',
        image:'/real.jpg'
        },
        {
            name:'Cartoon',
            image:'/cartoon.png'
        },
        {
            name:'Comic',
            image:'/comic.avif'
        },
        {
            name:'WaterColor',
            image:'/watercolor.webp'
        },
        {
            name:'GTA',
            image:'/gta.jpeg'
        },
    ]

    const [selectedOption, setSelectedOption] = useState();
  return (
    <div className='mt-7'>
        <h2 className='font-bold text-2xl text-primary'>Style</h2>
        <p className='text-gray-500'>Select your video style</p>
        <div className='grid grid-col-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-3'>
            {styleOptions.map((item, index)=>(
                <div className={`relative hover:scale-105 transition-all cursor-pointer rounded-xl ${selectedOption == item.name && 'border-4 border-purple-500'}`}>
                    <Image key={index} src={item.image} alt='image' width={200} height={200} className='h-40 object-cover rounded-lg w-full' onClick={()=>{setSelectedOption(item.name); onUserSelect('imageStyle',item.name)}}/>
                    <h2 className='absolute p-1 bg-black bottom-0 w-full text-white text-center rounded-b-lg '>{item.name}</h2>
                </div>
            ))}
        </div>
      
    </div>
  )
}

export default SelectStyle
