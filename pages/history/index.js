import React from 'react'
import { useState, useEffect } from 'react'
import LikedItems from '../../components/LikedItems';
import { useRouter } from 'next/router';
import { getHistory } from '@/services/api';
import { useSelector } from 'react-redux';

const History = () => {
    const router = useRouter();
    const [list, setlist] = useState();
    const user = useSelector(state => state.userAuth.user);
    const [loading, setLoading] = useState(true);


    async function fetchHistory() {
        const response = await getHistory();

        setlist(response?.history);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

    useEffect(() => {
        if (user) {
            fetchHistory();
        }
    }, [user])


    return (

        <div className='likedVideos'>
            <div className='heading'>Watch History</div>
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

export default History