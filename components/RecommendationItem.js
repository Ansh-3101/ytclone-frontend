import React from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
const key = "AIzaSyAe5jJptHUl_LaIZDONdNUsMS8zmY0j1bk";

const RecommendationItem = (props) => {
  // const navigate = useNavigate();
  const { object } = props;
  const [searchImage, setSearchImage] = useState("")
  const [searchTitle, setSearchTitle] = useState("")
  const [views, setViews] = useState("");
  const [date, setDate] = useState("");
  const [channelName, setChannelName] = useState("");

  useEffect(() => {
    async function fetchData() {
      const videoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&part=statistics&id=${object?.id?.videoId}&key=${key}`

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

      const setVideoInfo = async (videoUrl) => {

        const response = await fetch(videoUrl);
        const json = await response?.json();
        const viewsCount = json?.items[0]?.statistics?.viewCount;
        const views = viewsCount?.toString();
        const length = views?.length;
        setSearchImage(json?.items[0]?.snippet?.thumbnails?.medium?.url);


        if (length === 4) {
          setViews(views?.charAt(0) + "." + views?.charAt(1) + "K views");
        }
        else if (length === 5) {
          setViews(views?.substring(0, 2) + "." + views?.charAt(2) + "K views");
        }
        else if (length === 6) {
          setViews(views?.substring(0, 3) + "K views");
        }
        else if (length === 7) {
          setViews(views?.charAt(0) + "." + views?.charAt(1) + "M views");
        }
        else if (length === 8) {
          setViews(views?.substring(0, 2) + "M views");
        }
        else if (length === 9) {
          setViews(views?.substring(0, 3) + "M views");
        }
        else if (length === 10) {
          setViews(views?.charAt(0) + "." + views?.charAt(1) + "B views");
        }
        else {
          setViews(views);
        }

      }

      setChannelName(object.snippet.channelTitle);
      setSearchTitle(object.snippet.title);
      setTime(object.snippet.publishedAt.substring(0, 19));
      setVideoInfo(videoUrl);
    }

    fetchData();

  }, [object.id.videoId])
  return (
    <div className='recommendationItem'>
      <Link className='recommendationImageDiv' href={`/watch/${object.id.videoId}`}>
        <img src={searchImage} className='recommendationImage' alt='searchImage' />
      </Link>
      <div className='searchInfo' >
        <Link className='recommendationTitle' href={`/watch/${object.id.videoId}`}>{searchTitle.substring(0, 25) + ".."}</Link>
        <Link className='recommendationChannel' href={`/channel/${object.snippet.channelId}`}>
          <span>{channelName}</span>
        </Link>
        <div className='recommendationStats'>
          <span>{views}</span> <span>|</span> <span>{date} ago</span>
        </div>
      </div>
    </div>
  )
}

export default RecommendationItem