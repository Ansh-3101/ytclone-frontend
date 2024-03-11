import React from 'react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import Recommendation from '@/components/Recommendation';
import Comments from '@/components/Comments'
import { useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { deleteLiked, deleteSubscription, deleteWatchLater, fetchData as getDataApi } from '@/services/api';
import Link from 'next/link';
import { postLike, postHistory, postSubscribe, postWatchLater } from '@/services/api';
import { getLiked, getSubscribed, getAllSubscriptions, getWatchLater } from '@/services/api';
import { getUserStatsApi } from '@/services/api';
import { useSelector, useDispatch } from 'react-redux';
import Linkify from 'react-linkify';
import { setUserStats } from '@/redux/reducer/userStats';
import { setUserSubs } from '@/redux/reducer/userSubs';


const likeImg = '/icons/icons8-like-24.png'
const add = '/icons/icons8-plus-50.png';
const checked = '/icons/icons8-approved-checkmark-symbol-to-verify-the-result-24.png'
const key = "AIzaSyBe7MDYvGzRey4IDwJLv4nmZIcUL7BQcTQ";



const Watch = () => {

  const router = useRouter();
  const { id } = router.query;
  const user = useSelector(state => state.userAuth.user);
  const dispatch = useDispatch();

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



  const [recommendation, setRecommendation] = useState([]);
  const [title, setTitle] = useState("");
  const [views, setViews] = useState("");
  const [channelName, setChannelName] = useState("");
  const [channelImage, setChannelImage] = useState("");
  const [channelId, setchannelId] = useState("");
  const [time, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [subscribeCount, setSubscribeCount] = useState("");
  const [videoImage, setvideoImage] = useState("");
  const [comments, setComments] = useState([]);


  const [likeState, setLikeState] = useState(false);
  const [subscribeState, setSubscribeState] = useState(false);
  const [watchLaterState, setWatchLaterState] = useState(false);

  const like = useRef();
  const likeHeading = useRef();
  const likeBtn = useRef();
  const watchLater = useRef();
  const watchLaterIcon = useRef();
  const watchHeading = useRef();
  const subscribeBtn = useRef();



  const watchComponent = useRef(null);

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      fetchData(id);
    }
  }, [router.isReady, router.query, id]);

  const configureLikeBtn = (action) => {
    if (action === "true") {
      setLikeState(true);
      likeHeading.current.innerText = "Liked"
      like.current.style.filter = "none";
      likeBtn.current.style.backgroundColor = "#222222"
      likeBtn.current.style.border = "1.5px solid #ff0000"
      likeHeading.current.style.color = "white"

    }
    else if (action === 'false') {
      setLikeState(false);
      likeHeading.current.innerText = "Like"
      like.current.style.filter = "invert()";
      likeBtn.current.style.backgroundColor = "#ffffff"
      likeBtn.current.style.border = "none"
      likeHeading.current.style.color = "black"
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

  const configureWatchLaterBtn = (action) => {
    if (action === "true") {
      setWatchLaterState(true);
      watchLaterIcon.current.style.filter = "none";
      watchLaterIcon.current.backgroundColor = "#222222"
      watchLater.current.style.backgroundColor = "#222222"
      watchLater.current.style.border = "1.5px solid #ff0000"
      watchHeading.current.style.color = "white"
      watchLaterIcon.current.src = `${checked}`
    }
    else if (action === 'false') {
      setWatchLaterState(false);
      watchLaterIcon.current.style.filter = "invert()";
      watchLater.current.style.backgroundColor = "#ffffff"
      watchLater.current.style.border = "none"
      watchHeading.current.style.color = "black"
      watchLaterIcon.current.src = `${add}`
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

  useEffect(() => {

    async function getStats() {

      const isLiked = async () => {
        const response = await getLiked(id)


        if (response?.status === "ok") {
          configureLikeBtn(response?.action);
        }
        else {
          configureLikeBtn("false");
        }
      }

      const isSubscribed = async () => {
        const response = await getSubscribed(channelId);


        if (response?.status === "ok") {
          configureSubscribeBtn(response?.action);
        }
        else {
          configureSubscribeBtn("false");
        }
      }

      const isWatchLater = async () => {
        const response = await getWatchLater(id);


        if (response?.status === "ok") {
          configureWatchLaterBtn(response?.action);
        }
        else {
          configureWatchLaterBtn("false");
        }
      }

      if (user) isLiked();
      if (user) isSubscribed();
      if (user) isWatchLater();
    }

    getStats()
  }, [id, channelId, user])


  async function fetchData() {

    const data = await getDataApi(id);

    const { json, channelJson, channelInfo, commentsJson } = data;
    setvideoImage(json?.items[0].snippet.thumbnails.medium.url);

    setRecommendation(channelJson?.items);

    const setTime = function (date) {


      date = new Date(date);


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

    const setVideoInfo = async () => {

      const viewsCount = json.items[0].statistics.viewCount;
      const views = viewsCount?.toString();
      // const length = views?.length;
      setDescription(json.items[0].snippet.description);

      setViews(calcViews(views));

    }

    const calcViews = (views) => {
      if (views.length === 4) {
        return (views.charAt(0) + "." + views.charAt(1) + "K ");
      }
      else if (views.length === 5) {
        return (views.substring(0, 2) + "." + views.charAt(2) + "K ");
      }
      else if (views.length === 6) {
        return (views.substring(0, 3) + "K ");
      }
      else if (views.length === 7) {
        return (views.charAt(0) + "." + views.charAt(1) + "M ");
      }
      else if (views.length === 8) {
        return (views.substring(0, 2) + "M ");
      }
      else if (views.length === 9) {
        return (views.substring(0, 3) + "M ");
      }
      else if (views.length === 10) {
        return (views.charAt(0) + "." + views.charAt(1) + "B ");
      }
      else {
        return (views);
      }
    }


    setChannelImage(channelInfo.items[0].snippet.thumbnails.high.url);
    setchannelId(channelInfo.items[0].id);
    setSubscribeCount(calcViews(channelInfo.items[0].statistics.subscriberCount));



    setComments(commentsJson?.items);
    setChannelName(json.items[0].snippet.channelTitle);
    setDate(setTime(json.items[0].snippet.publishedAt.substring(0, 19)));
    setTitle(json.items[0].snippet.title);


    setVideoInfo();
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

  const deleteLike = async () => {
    if (user) {
      const response = await deleteLiked(id);

      if (response.status === "ok") {
        notify("Deleted from liked videos", "success");
        configureLikeBtn("false")
      }
      else {
        notify("Some error occured", "error");
      }
    }
  }

  const deleteWatch = async () => {

    if (user) {
      const response = await deleteWatchLater(id);

      if (response.status === "ok") {

        notify("Removed from watch later", "success");
        configureWatchLaterBtn("false");
      }
      else {
        notify("Some error occured", "error");
      }

    }
  }


  const subscribeChannel = async () => {

    if (user) {

      if (channelId && channelImage && channelName) {
        const response = await postSubscribe({
          channelId,
          channelImage,
          channelName,
        });

        if (response.status === "ok") {
          notify("Subscription Added", "success");
          configureSubscribeBtn(response.action);
        }
        else if (response.status === "error") {
          configureSubscribeBtn(response.action);

        }
        else {
          notify("Some error occured", "error");
        }

      }

    }
    else {
      notify("Sign in to subscribe", "info");
    }
  }

  const addLike = async () => {
    if (user) {
      const response = await postLike({
        id,
        videoImage,
        title,
        channelId,
        channelImage,
        channelName
      })


      if (response.status === "ok") {
        notify("Added to liked videos", "success");
        configureLikeBtn("true")
      }
      else {
        notify("Some error occured", "error");
      }
    }
    else {
      notify("Sign in to like videos", "info");
    }

  }

  const addWatchLater = async () => {

    if (user) {
      const response = await postWatchLater({
        id,
        videoImage,
        title,
        channelId,
        channelImage,
        channelName
      });


      if (response.status === "ok") {

        notify("Added to watch later", "success");
        configureWatchLaterBtn("true");
      }
      else {
        notify("Some error occured", "error");
      }

    }

    else {
      notify("Sign in to add to watch later", "info");
    }

  }

  const addToHistory = async () => {

    if (channelId && channelImage && channelName && videoImage && title && id) {

      const response = await postHistory({
        id,
        videoImage,
        title,
        channelId,
        channelImage,
        channelName,
      })


    }
  }



  const handleLike = async () => {
    if (user) {
      if (likeState) {
        await deleteLike();
        handleStats();
      }
      else {
        await addLike();
        handleStats();
      }

    }
    else {
      notify("Sign in to like videos", "info");
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
    }
    else {
      notify("Sign in to subscribe", "info");
    }
  }

  const handleWatchLater = async () => {
    if (user) {
      if (watchLaterState) {
        await deleteWatch();
        handleStats();
      }
      else {
        await addWatchLater();
        handleStats();
      }
    }
    else {
      notify("Sign in to add to watch later", "info");
    }
  }

  useEffect(() => {

    if (router.isReady) {
      if (user) addToHistory();
    }


  }, [router.isReady, channelId])



  return (
    <div id='watchComponent' ref={watchComponent}>
      <div className='watchLeft'>
        <iframe id='watchVideo' title='video' src={`https://www.youtube.com/embed/${id}`} allowFullScreen={true} />
        <div className='watchInfo'>
          <div className='watchTitle'><span>{title}</span></div>
          <div className='watchStats'>
            <img src={channelImage} className='watchChannelIcon' alt='channelImage' />
            <Link className='watchChannelInfo' href={`/channel/${channelId}`}>
              <div className='channelName'><span>{channelName}</span></div>
              <div className='watchStatsInfo'><span>{subscribeCount} subscribers</span></div>
            </Link>
            <button className='likeBtn' ref={likeBtn} onClick={handleLike}>
              <img src={likeImg} ref={like} alt='likeBtn' />
              <span ref={likeHeading} className='likeHeading'>Like</span>
            </button>
            <button className='watchLaterBtn' ref={watchLater} onClick={handleWatchLater}>
              <img src={add} ref={watchLaterIcon} alt='watchLaterBtn' />
              <span ref={watchHeading} >Watch later</span>
            </button>
            <button className='subscribeBtn' ref={subscribeBtn} onClick={handleSubscribe}>Subscribe</button>
          </div>
          <div className='watchDescription'>
            <div className='viewsTime'><span>{views} views </span> <span>{time} ago</span></div>
            <div className='description'><p><Linkify componentDecorator={componentDecorator}>{description}</Linkify></p></div>
          </div>
          <div className='watchComments'>
            <Comments object={comments} />
          </div>
        </div>
      </div>
      <div className='watchRight'>
        <Recommendation list={recommendation} key={"3545"} />
      </div>
    </div>
  )
}

export default Watch