import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getChannelInfo, getVideoInfo } from '@/services/api';
const key = "AIzaSyAe5jJptHUl_LaIZDONdNUsMS8zmY0j1bk";


const SearchItem = (props) => {
  const { object } = props;
  const [searchImage, setSearchImage] = useState("")
  const [searchTitle, setSearchTitle] = useState("")
  const [views, setViews] = useState("");
  const [date, setDate] = useState("");
  const [channelImage, setChannelImage] = useState("");
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState('');
  const [channelId, setChannelId] = useState('');
  const [videoId, setVideoId] = useState('');


  async function fetchData() {

    setChannelId(object.snippet.channelId);
    setVideoId(object.id.videoId);

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

      const json = await getVideoInfo(object.id.videoId);

      const channelJson = await getChannelInfo(object.snippet.channelId);

      const viewsCount = json?.items[0].statistics.viewCount;
      const views = viewsCount?.toString();
      const length = views?.length;

      setChannelImage(channelJson?.items[0]?.snippet?.thumbnails?.high?.url);
      setDescription(json?.items[0]?.snippet?.description?.substring(0, 150));
      setSearchImage(json?.items[0]?.snippet?.thumbnails?.high?.url);


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


    // setSearchImage(object.snippet.thumbnails.medium.url);
    setChannelName(object.snippet.channelTitle);
    setSearchTitle(object.snippet.title);
    setTime(object.snippet.publishedAt.substring(0, 19));
    setVideoInfo();

  }

  useEffect(() => {

    try {

      fetchData();
    }
    catch (error) {
      console.log(error)
    }

  }, [])

  return (
    <div className='searchItem'>
      <Link className='searchImageDiv' href={`/watch/${videoId}`}>
        <img src={searchImage} className='searchImage' alt="searchImage" />
      </Link>
      <div className='searchInfo' >
        <Link href={`/watch/${object.id.videoId}`} className='searchTitle'>{searchTitle}</Link>
        <div className='searchStats'>
          <span>{views}</span> &nbsp; | &nbsp; <span>{date} ago</span>
        </div>
        <Link className='searchChannel' href={`/channel/${channelId}`}>
          <img src={channelImage} className='searchChannelIcon' alt='searchChannelIcon' />
          <span>{channelName}</span>
        </Link>
        <div className='searchDescription'>{description + "..."}</div>
      </div>
    </div>
  )
}

export default SearchItem