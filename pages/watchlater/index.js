import React from 'react'
import { useState, useEffect } from 'react';
import LikedItems from '../../components/LikedItems';
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import { getAllWatchLater } from '@/services/api';

const WatchLater = () => {
    const [list, setlist] = useState([]);

    const user = useSelector(state => state.userAuth.user);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    async function getWatchLater() {
        if (!user) return;
        const response = await getAllWatchLater();
        setlist(response?.watchLater);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }


    useEffect(() => {
        if (router.isReady && user) {
            getWatchLater();
        }

    }, [router.isReady, user])

    return (
        <div className='likedVideos'>
            <div className='heading'>Watch Later</div>
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

export default WatchLater