'use client'
import React, { useContext, useEffect, useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
import {v4 as uuidv4} from 'uuid';
import { VideoDataContext } from '@/app/_context/VideoDataContext';
import { db } from '@/configs/db';
import { useUser } from '@clerk/nextjs';
import { Users, VideoData } from '@/configs/schema';
import PlayerDialog from '../_components/PlayerDialog';
import { UserDetailsContext } from '@/app/_context/UserDetailsContext';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';



const CreateNew = () => {

  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] =  useState();
  const [captions, setCaptions]= useState();
  const [imageList, setImageList] = useState();
  const {videoData, setVideoData} = useContext(VideoDataContext);
  const {user} = useUser();
  const [playVideo, setPlayVideo] = useState(false);
  const [videoId, setVideoId] = useState();
  const {userDetail, setUserDetail} = useContext(UserDetailsContext);


  const onHandleInputChange=(fieldName, fieldValue)=>{
    console.log(fieldName, fieldValue);
    setFormData(prev =>({
      ...prev, 
      [fieldName]:fieldValue
    }))   
  }

  const onCreateClickHandler=()=>{
    if(userDetail?.credits<=0){
      toast("You don't have enough credit")
      return;
    }  
    GetVideoScript();  
  }


  //get video script
  const GetVideoScript= async()=>{
    setLoading(true);
    const prompt = 'Write a script to generate '+formData.duration+' seconds video on topic:'+formData.topic+' along with AI image prompt in '+formData.imageStyle+' format for each scene and give me result in JSON format with imagePromt and ContentText as field, No Plain Text'
    console.log(prompt);
    const resp = await axios.post('/api/get-video-script',{
      prompt: prompt
    });
    if(resp.data.result){
      setVideoData(prev =>({
        ...prev,
        'videoScript': resp.data.result
      }))
      setVideoScript(resp.data.result);
      await GenerateAudioFile(resp.data.result);  
    }
  }

  const GenerateAudioFile = async (videoScriptData) =>{
    setLoading(true);
    let script = '';    
    const id = uuidv4();
    videoScriptData.forEach((item)=>{
      script = script + item.ContentText + ' ';
    })
    
    const resp = await axios.post('/api/generate-audio',{
      text: script, 
      id: id,
    })
    setVideoData(prev =>({
      ...prev,
      'audioFileUrl': resp.data.result
    }))
    setAudioFileUrl(resp.data.result);
    resp.data.result && await GenerateAudioCaption(resp.data.result, videoScriptData);

  }

  const GenerateAudioCaption = async(fileUrl, videoScriptData) =>{
    setLoading(true);
    const resp = await axios.post('/api/generate-caption',{
      audioFileUrl: fileUrl
    })
    setCaptions(resp?.data?.result)
    setVideoData(prev =>({
      ...prev,
      'captions': resp.data.result
    }))
    resp.data.result && await GenerateImage(videoScriptData);
  }

  const GenerateImage = async(videoScriptData)=>{
    let images =[];
    for(const element of videoScriptData){
      try {
        const resp = await axios.post('/api/generate-image',{
          prompt: element.imagePrompt
        });
        images.push(resp.data.result);
      } catch (e) {
        console.log('Error:'+e);
      }
    }
    setVideoData(prev =>({
      ...prev,
      'imageList': images
    }))
    setImageList(images)
    setLoading(false)
  }

  useEffect(()=>{
    console.log(videoData);
    videoData? (Object.keys(videoData).length == 4) ? SaveVideoData(videoData):<></>:<></>
    
  },[videoData])

  const SaveVideoData =async(videoData)=>{
    setLoading(true);
    const result = await db.insert(VideoData).values({
      script: videoData?.videoScript, 
      audioFileUrl: videoData?.audioFileUrl,
      captions: videoData?.captions,
      imageList: videoData?.imageList,
      createdBy: user?.primaryEmailAddress?.emailAddress
    }).returning({id: VideoData?.id})
    await UpdateUserCredits();
    setVideoId(result[0].id);
    setPlayVideo(true);
    console.log(result);
    setLoading(false);  
  }

  const UpdateUserCredits =async()=>{
    const result = await db.update(Users).set({
      credits: userDetail?.credits-10
    }).where(eq(Users.email, user?.primaryEmailAddress?.emailAddress))
    setUserDetail(prev=>({
      ...prev,
      'credits': userDetail?.credits-10
    }))
    setVideoData(null);
  }

  return (
    <div className='md:px-20'>
      <h2 className='font-bold text-4xl text-primary text-center'>Create New</h2>
      <div className='mt-10 shadow-md p-10'>
        {/* Select Topic */}
        <SelectTopic onUserSelect={onHandleInputChange}/>

        {/* Select Style */}
        <SelectStyle onUserSelect={onHandleInputChange}/>

        {/* Duartion */}
        <SelectDuration onUserSelect={onHandleInputChange}/>
        {/* create Button */}

        <Button className='mt-10 w-full' onClick={onCreateClickHandler}>Create Short Video</Button>
      </div>
      <CustomLoading loading={loading}/>

      <PlayerDialog playVideo={playVideo} videoId={videoId}/>
    </div>
  )
}

export default CreateNew;
