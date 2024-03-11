import React from 'react'
import Link from 'next/link';

const LikedItems = (props) => {

    const { object } = props;

    return (
        <div className='item'>
            <Link className='likeImageDiv' href={`/watch/${object.videoId}`}>
                <img src={object?.thumbnail} className='likeImage' alt='thumbnail' />
            </Link>
            <div className='likeInfo' >
                <Link className='likeTitle' href={`/watch/${object.videoId}`}>{object?.title}</Link>
                <Link className='likeChannel' href={`/channel/${object?.channelId}`}>
                    <img src={object.channelThumbnail} className='likeChannelIcon' alt='channelIcon' />
                    <span>{object.channelTitle}</span>
                </Link>
            </div>
        </div>
    )
}

export default LikedItems