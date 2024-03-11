import React from 'react'
import Link from 'next/link';

const SubscriptionItem = (props) => {
  const { object } = props;
  return (
    <Link className="sidebarItem" href={`/channel/${object?.channelId}`}>
      <img className='subsIcon' width={"30px"} src={object?.channelThumbnail} alt='Trending' />
      <span className='sideBarSpan'>{object?.channelTitle}</span>
    </Link>
  )
}

export default SubscriptionItem