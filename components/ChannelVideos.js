import React from 'react'
import Link from 'next/link';

const ChannelVideos = (props) => {
  const { list } = props;

  return (
    list?.map((element, i) => {
      return (
        <Link key={i} className='channelVideoItem' href={`/watch/${element.id.videoId}`}>
          <img src={element?.snippet.thumbnails.medium.url} alt='thumbnail' />
          <div className='channelVideoItemInfo'>
            <div className='videoTitle'>{element.snippet.title.substring(0, 25) + ".."}</div>
          </div>
        </Link>
      )
    })
  )
}

export default ChannelVideos