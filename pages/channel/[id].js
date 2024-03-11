import React from 'react'
import { useState, useEffect } from 'react'
import ChannelVideos from '../../components/ChannelVideos';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router';
import { getChannel, getChannelInfo, getVideoInfo, postSubscribe } from '@/services/api';
import Linkify from 'react-linkify';
import { setUserStats } from '@/redux/reducer/userStats';
import { setUserSubs } from '@/redux/reducer/userSubs';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSubscription, getSubscribed } from '@/services/api';
import { getAllSubscriptions, getUserStatsApi } from '@/services/api';
import Link from 'next/link';



const key = "AIzaSyBe7MDYvGzRey4IDwJLv4nmZIcUL7BQcTQ";

const Channel = () => {

  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(state => state.userAuth.user);

  const notify = (message, type) => {
    toast(message, {
      type: type,
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 1000,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      pauseOnFocusLoss: false,
      // hideProgressBar: false,
      // progress: "",
      closeButton: false,
      className: "toast"
    })
  }

  const componentDecorator = (decoratedHref, decoratedText, key) => (
    <a target="blank" href={decoratedHref} key={key} style={{ color: "#3ea6ff", backgroundColor: "#00000000" }}>
      {decoratedText}
    </a>
  );



  const [banner, setBanner] = useState("");
  const [subscribeState, setSubscribeState] = useState(false);
  const [icon, setIcon] = useState("");
  const [trailerId, setTrailerId] = useState("");
  const [channelId, setChannelId] = useState(router.query.id);
  const [channelName, setChannelName] = useState("");
  const [channelDescription, setChannelDescription] = useState("");
  const [country, setCountry] = useState("");
  const [subs, setSubs] = useState("");
  const [videoCount, setVideoCount] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [joinedDate, setJoinedDate] = useState('');
  const [views, setViews] = useState("");
  const [trailerTitle, setTrailerTitle] = useState("");
  const [trailerViews, setTrailerViews] = useState("");
  const [trailerDate, setTrailerDate] = useState("");
  const [trailerDesc, setTrailerDesc] = useState("");
  const [channelVideos, setChannelVideos] = useState([]);


  const subscribeBtn = useRef();


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

    return interval + ' ' + intervalType;
  };


  const calcViews = (views) => {
    if (views?.length === 4) {
      return (views?.charAt(0) + "." + views?.charAt(1) + "K ");
    }
    else if (views?.length === 5) {
      return (views?.substring(0, 2) + "." + views?.charAt(2) + "K ");
    }
    else if (views?.length === 6) {
      return (views?.substring(0, 3) + "K ");
    }
    else if (views?.length === 7) {
      return (views?.charAt(0) + "." + views?.charAt(1) + "M ");
    }
    else if (views?.length === 8) {
      return (views?.substring(0, 2) + "M ");
    }
    else if (views?.length === 9) {
      return (views?.substring(0, 3) + "M ");
    }
    else if (views?.length === 10) {
      return (views?.charAt(0) + "." + views?.charAt(1) + "B ");
    }
    else {
      return (views);
    }
  };

  const fetchData = async (channelId) => {

    const channelJson = await getChannelInfo(channelId);
    const channelSnippet = channelJson?.items[0]?.snippet;
    const channelStats = channelJson?.items[0]?.statistics;

    setChannelId(channelId);
    setTrailerId(channelJson?.items[0]?.brandingSettings.channel.unsubscribedTrailer);
    setChannelName(channelSnippet.title);
    setChannelDescription(channelSnippet.description);
    setIcon(channelSnippet.thumbnails.high.url);
    setCustomUrl(channelSnippet.customUrl);
    setCountry(channelSnippet.country);
    setVideoCount(channelStats?.videoCount);
    setJoinedDate(setTime(channelSnippet?.publishedAt.toString()));
    setViews(calcViews(channelJson?.items[0]?.statistics?.viewCount?.toString()))
    setSubs(calcViews(channelJson?.items[0]?.statistics?.subscriberCount));

    setBanner(channelJson?.items[0]?.brandingSettings.image.bannerExternalUrl);

    const json = await getVideoInfo(channelJson?.items[0]?.brandingSettings.channel.unsubscribedTrailer);
    setTrailerTitle(json?.items[0]?.snippet?.title);
    setTrailerDate(setTime(json?.items[0]?.snippet?.publishedAt));
    setTrailerViews(calcViews(json?.items[0]?.statistics?.viewCount?.toString()));
    setTrailerDesc(json?.items[0]?.snippet?.description?.substring(0, 200) + "...");


  }

  const getChannelVideos = async (channelId) => {

    const json = await getChannel(channelId);

    setChannelVideos(json?.items);

  }

  const isSubscribed = async () => {
    if (user) {
      const response = await getSubscribed(channelId);

      if (response?.status === "ok") {
        configureSubscribeBtn(response?.action);
      }
      else {
        configureSubscribeBtn("false");
      }
    }
  }


  const configureSubscribeBtn = (action) => {
    if (action === "Subscribed" || action === "true") {
      setSubscribeState(true);
      subscribeBtn.current.style.backgroundColor = "#222222"
      subscribeBtn.current.style.color = "white"
      subscribeBtn.current.style.border = "1.5px solid #ff0000"
      subscribeBtn.current.innerText = "Unsubscribe"
    }

    else if (action === "Unsubscribed" || action === "false") {
      setSubscribeState(false);
      subscribeBtn.current.style.backgroundColor = "white"
      subscribeBtn.current.style.color = "black"
      subscribeBtn.current.style.border = "none"
      subscribeBtn.current.innerText = "Subscribe"
    }
  }

  const subscribeChannel = async () => {

    if (user) {

      if (channelId !== null && channelId !== undefined) {
        const response = await postSubscribe({
          channelId,
          channelName,
          "channelImage": icon
        });


        if (response.status === "ok") {
          configureSubscribeBtn(response?.action);
          notify(response?.action, "success");
        }
        else {
          notify("Some error occured", "error");
        }

      }
      else {
        notify("Some error occured", "error");
      }

    }
    else {
      notify("Sign In to subscribe", "info");
    }
  }

  const deleteSubscribe = async () => {

    if (user) {

      if (channelId) {
        const response = await deleteSubscription(channelId);

        if (response.status === "ok") {
          notify("Subscription Deleted", "success");
          configureSubscribeBtn("false");
        }
        else {
          notify("Some error occured", "error");
        }

      }
      else {
        notify("Some error occured", "error");
      }

    }
  }

  const handleStats = async () => {
    const res = await getUserStatsApi();
    if (res.status === "ok") {
      dispatch(setUserStats({
        likeCount: res.likedVideosCount,
        subCount: res.subscriptionsCount,
        watchCount: res.watchLaterCount,
        user: res.user
      }));
    }
  }

  const handleSubs = async () => {
    const res = await getAllSubscriptions();
    if (res.status === "ok") {
      dispatch(setUserSubs(res.subscriptions));
    }
  }


  const handleSubscribe = async () => {
    if (user) {
      if (subscribeState) {
        await deleteSubscribe();
        handleStats();
      }
      else {
        await subscribeChannel();
        handleStats();
      }


      handleSubs();
      isSubscribed();
    }
    else {
      notify("Sign in to subscribe", "info");
    }
  }

  useEffect(() => {
    if (user) {
      handleStats();
      handleSubs();
      isSubscribed();
    }
  }, [user]);


  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;


      try {
        fetchData(id);
        getChannelVideos(id);
        isSubscribed();
      } catch (error) {
        notify("Something went wrong" + error, "error");
      }

    }
  }, [router.isReady, router.query]);


  return (
    <div className='channel'>
      <img className='channelBanner' src={banner} alt='banner' />

      <div className='channelHeader'>
        <img className='channelIcon' src={icon} alt='channnelIcon' />
        <div className='channelInfo'>
          <div className='name'>{channelName}</div>
          <div className='channelStats'> {customUrl} &nbsp; &nbsp; {subs}subscribers &nbsp; &nbsp; {videoCount} videos</div>
          <div className='channelOrigin'>Country: {country}</div>
        </div>
        <button className='subscribe subscribeBtn' ref={subscribeBtn} onClick={handleSubscribe}>Subscribe</button>
      </div>

      <hr color='#aaaaaa' width={"99%"} />

      <div className='channelData'>
        <div className='channelTrailer'>
          <iframe className='trailer' src={`https://www.youtube.com/embed/${trailerId}`} allowFullScreen={true} title='BroadcastTrailer' />
          <div className='trailerInfo'>
            <Link href={`/watch/${trailerId}`} className='trailerTitle'>{trailerTitle}</Link>
            <div className='trailerMetaData'>
              <span className='trailerViews'>{trailerViews} views</span> | <span className='trailerDate'>{trailerDate} ago</span>
            </div>
            <div className='trailerDesc'><Linkify componentDecorator={componentDecorator}>{trailerDesc}</Linkify></div>
          </div>
        </div>

        <hr color='#aaaaaa' width={"99%"} />

        <div className='aboutChannel'>
          <div className='channelDescription'>
            <span>Description</span>
            <div className='desc'><Linkify componentDecorator={componentDecorator}>{channelDescription}</Linkify></div>
          </div>
          <div className='stats'>
            <span>Stats</span>
            <hr color='#aaaaaa' />
            <div className='channelJoin'>Joined {joinedDate} ago</div>
            <hr color='#aaaaaa' />
            <div className='channelViews'>{views} views</div>
            <hr color='#aaaaaa' />
          </div>
        </div>

        <hr color='#aaaaaa' width={"99%"} />

        <div className='channelVideos'>
          <span>Videos</span>
          <div className='videosList'>
            <ChannelVideos list={channelVideos} key={134} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channel