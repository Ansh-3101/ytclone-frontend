import React, { useRef } from 'react'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getChannelInfo, getVideoInfo } from '@/services/api';

const key = "AIzaSyBe7MDYvGzRey4IDwJLv4nmZIcUL7BQcTQ"

const VideoItem = (props) => {
  const router = useRouter();
  const { object } = props;
  const videoId = object?.id;

  if (object == null || object == undefined) return null;


  const [videoImage, setVideoImage] = useState(" ");
  const [title, setTitle] = useState(" ");
  const [channelName, setChannelName] = useState(" ");
  const [channelImage, setChannelImage] = useState(" ");
  const [views, setViews] = useState(" ");
  const [channelId, setChannelId] = useState(" ");
  const [date, setDate] = useState(" ");



  useEffect(() => {
    async function fetchData() {


      const setTime = function (date) {

        if (typeof date !== 'object') {
          date = new Date(date);
        }

        var seconds = Math.floor((new Date() - date) / 1000);
        var intervalType;

        var interval = Math.floor(seconds / 31536000);
        if (interval >= 1) {
          intervalType = 'year';
        } else {
          interval = Math.floor(seconds / 2592000);
          if (interval >= 1) {
            intervalType = 'month';
          } else {
            interval = Math.floor(seconds / 86400);
            if (interval >= 1) {
              intervalType = 'day';
            } else {
              interval = Math.floor(seconds / 3600);
              if (interval >= 1) {
                intervalType = "hour";
              } else {
                interval = Math.floor(seconds / 60);
                if (interval >= 1) {
                  intervalType = "minute";
                } else {
                  interval = seconds;
                  intervalType = "second";
                }
              }
            }
          }
        }

        if (interval > 1 || interval === 0) {
          intervalType += 's';
        }

        // return interval + ' ' + intervalType;
        setDate(interval + ' ' + intervalType);
      };

      const setVideoInfo = async () => {

        const json = await getVideoInfo(videoId);

        setVideoImage(json?.items[0]?.snippet?.thumbnails?.medium?.url);
        setChannelId(json?.items[0]?.snippet?.channelId);


        const viewsCount = json?.items[0]?.statistics?.viewCount;
        const views = viewsCount?.toString();
        const length = views?.length;

        if (length === 4) {
          setViews(views.charAt(0) + "." + views.charAt(1) + "K views");
        }
        else if (length === 5) {
          setViews(views.substring(0, 2) + "." + views.charAt(2) + "K views");
        }
        else if (length === 6) {
          setViews(views.substring(0, 3) + "K views");
        }
        else if (length === 7) {
          setViews(views.charAt(0) + "." + views.charAt(1) + "M views");
        }
        else if (length === 8) {
          setViews(views.substring(0, 2) + "M views");
        }
        else if (length === 9) {
          setViews(views.substring(0, 3) + "M views");
        }
        else if (length === 10) {
          setViews(views.charAt(0) + "." + views.charAt(1) + "B views");
        }
        else {
          setViews(views);
        }

      }

      const channelJson = await getChannelInfo(object?.snippet?.channelId);
      try {

        setChannelImage(channelJson?.items[0]?.snippet?.thumbnails?.high?.url);
      }
      catch (error) {
        console.log(channelJson)
      }

      setChannelName(object?.snippet?.channelTitle);
      setTitle(object?.snippet?.title?.substring(0, 50) + "...");
      setTime(object?.snippet?.publishedAt?.substring(0, 19));
      setVideoInfo();

    }


    fetchData();

  }, [object?.id])




  return (
    <div className='homeVideo'>
      <div className='videoItem'>
        <Link href={`/watch/${object?.id}`}><img className='itemImage' src={videoImage} /></Link>
        <div>
          <div className='itemInfo'>
            <img className='itemChannelImage' src={channelImage} />
            <div className='videoInfo'>
              <div className='videoTitle' onClick={() => { router.push(`/watch/${object?.id}`) }}>{title}</div>
              <Link className='channelName' href={`/channel/${channelId}`}> {channelName} </Link>
              <div className='videoStats'>
                <div className='videoView'>{views}  &nbsp; </div>
                <span> | </span>
                <div className='videoDate'>&nbsp; {date} ago </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoItem