import React from 'react'
import { useState, useEffect } from 'react'
import VideoItem from './VideoItem'
import { getHomeVideos } from '@/services/api';
import { useSelector } from 'react-redux';



const HomeVideo = () => {

  const [videos, setvideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const tag = useSelector((state) => state.activeTag.activeTag);

  useEffect(() => {

    setLoading(true);
    const run = async () => {
      const response = await getHomeVideos(tag.id);
      setvideos(response?.items);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }

    run();
  }, [tag])


  return (


    loading ?
      (
        <>
          {[...Array(10)].map((_, index) => (
            <div key={index} className='homeVideo'>
              <div className='homeVideoSkeleton'></div>
            </div>
          ))}
        </>
      )
      : (videos?.map(element => {
        return (
          <VideoItem object={element} key={element.id} />
        )
      })
      )
  )


}

export default HomeVideo