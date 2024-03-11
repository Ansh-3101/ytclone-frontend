import React from 'react'
import RecommendationItem from './RecommendationItem';
import { useState } from 'react';

const Recommendation = (props) => {
  const { list } = props;
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false)
  }, 1000);

  return (
    loading ?
      (
        <>
          {[...Array(10)].map((_, index) => (
            <div key={index} className='watchRightItem skeleton'>

            </div>
          ))}
        </>
      ) : (
        list?.map((element, i) => {
          return (
            <div className='watchRightItem' key={element.id.videoId} >
              <RecommendationItem object={element} />
            </div>
          )
        })
      )
  )
}

export default Recommendation