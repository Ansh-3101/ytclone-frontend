import jwtDecode from 'jwt-decode'
import React from 'react'
import { useState, useEffect } from 'react'
import LikedItems from '../../components/LikedItems'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { getAllLikedVideos } from '@/services/api'

const LikedVideos = () => {
  const [list, setList] = useState([]);

  const user = useSelector(state => state.userAuth.user);
  const [loading, setLoading] = useState(true);


  async function getLikedItems() {
    const response = await getAllLikedVideos();
    setList(response?.likedVideos);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

  }

  useEffect(() => {

    if (user) {
      getLikedItems();
    }
  }, [user])

  return (
    <div className='likedVideos'>
      <div className='heading'>Liked Videos</div>
      <div className='likedItems'>
        {
          loading ? (
            <>
              {[...Array(10)].map((_, index) => (
                <div key={index} className='itemSkeleton'>
                  <div></div>
                </div>
              ))}
            </>
          ) : (
            list?.map(element => {
              return (
                <LikedItems object={element} key={element?.videoId} />
              )
            })
          )
        }
      </div>
    </div>
  )
}

export default LikedVideos