import React from 'react'
const homeIcon = "/icons/icons8-home-48.png"
const watchIcon = "/icons/icons8-clock-24.png"
const historyIcon = "/icons/icons8-history-24.png"
const sportsIcon = "/icons/icons8-trophy-30.png"
const trendingIcon = "/icons/icons8-trending-32.png"
const gamingIcon = "/icons/icons8-game-controller-30.png"
const likeIcon = "/icons/icons8-like-24.png"
const musicIcon = "/icons/icons8-music-30.png"
const filmsIcon = "/icons/icons8-movie-30.png"
const liveIcon = "/icons/icons8-live-30.png"
const newsIcon = "/icons/icons8-google-news-30.png"
import { useEffect } from 'react'
import { useState } from 'react'
import SubscriptionItem from './SubscriptionItem'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { useRef } from 'react'
import { setActiveTag } from '@/redux/reducer/activeTag'
import { RouteMatcher } from 'next/dist/server/future/route-matchers/route-matcher'



const Sidebar = () => {

  const router = useRouter();
  const dispatch = useDispatch();
  const subRef = useRef();


  const [subscriptions, setSubscriptions] = useState([]);
  const user = useSelector((state) => state.userAuth.user);
  const subs = useSelector((state) => state.userSubs.subs);

  const tag = useSelector((state) => state.activeTag.activeTag);


  // const [activeTag, setActiveTag] = useState({});
  const [selectedItem, setSelectedItem] = useState();




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


  const likedVideos = () => {
    if (user === null || user === undefined) {
      notify("Sign in to see liked video", "info");
    }
    else {
      router.push('/likedvideos')
      setSelectedItem("Liked Videos");
    }
  }

  const history = () => {
    if (user === null || user === undefined) {
      notify("Sign in to see history", "info");
    }
    else {
      router.push('/history')
      setSelectedItem("History");
    }
  }

  const watchlater = () => {
    if (user === null || user === undefined) {
      notify("Sign in to see watch later", "info");
    }
    else {
      router.push('/watchlater')
      setSelectedItem("Watch Later");
    }
  }

  const handleExplore = (tag, id) => {
    if (router.pathname !== "/") router.push('/')
    setSelectedItem(tag);
    dispatch(setActiveTag({
      tag,
      id
    }))
  }


  useEffect(() => {
    setSubscriptions(subs);
    if (!user || !subs) {
      subRef.current.style.display = 'none';
    }
    else {
      subRef.current.style.display = "block";
    }
  }, [subs])


  useEffect(() => {
    // setActiveTag(tag);
    setSelectedItem(tag.tag);
  }, [tag])


  useEffect(() => {
    setSelectedItem(tag.tag);
    if (router.pathname.includes("watchlater")) {
      setSelectedItem("Watch Later");
    }
    else if (router.pathname.includes("history")) {
      setSelectedItem("History");
    }
    else if (router.pathname.includes("likedvideos")) {
      setSelectedItem("Liked Videos");
    }
  }, [router.query])

  return (
    <div id='sidebar'>
      <div className='utils'>

        <Link className={`sidebarItem ${selectedItem === 'Home' ? 'selected' : ""}`} href={"/"} onClick={() => { handleExplore("Home", null) }} ><img className='sideBarIcon' width={"20px"} src={homeIcon} alt='Home' /> <span className='sideBarSpan'>Home</span></Link>
        <div className={`sidebarItem ${selectedItem === 'History' ? 'selected' : ""}`} onClick={history}><img className='sideBarIcon' width={"20px"} src={historyIcon} alt='History' /> <span className='sideBarSpan'>History</span></div>
        <div className={`sidebarItem ${selectedItem === 'Liked Videos' ? 'selected' : ""}`} onClick={likedVideos}><img className='sideBarIcon' width={"20px"} src={likeIcon} alt='Liked Videos' /> <span className='sideBarSpan'>Liked Videos</span></div>
        <div className={`sidebarItem ${selectedItem === 'Watch Later' ? 'selected' : ""}`} onClick={watchlater}><img className='sideBarIcon' width={"20px"} src={watchIcon} alt='Watch Later' /> <span className='sideBarSpan'>Watch Later</span></div>

      </div>

      <hr width={"100%"} color='#3f3f3f' />

      <div className='subscriptions' ref={subRef}>
        <div className='sidebarHeading'>Subscriptions</div>
        {subscriptions?.map((element, i) => {
          return (
            <SubscriptionItem key={i} object={element} />
          )
        })}
        <hr width={"100%"} color='#3f3f3f' />
      </div>


      <div className='explore'>
        <div className='sidebarHeading'>Explore</div>
        <div onClick={() => { handleExplore("Trending", 24) }} className={`sidebarItem ${selectedItem === 'Trending' ? 'selected' : ""}`}><img className='sideBarIcon' width={"20px"} src={trendingIcon} alt='Trending' /> <span className='sideBarSpan'>Trending</span></div>
        <div onClick={() => { handleExplore("Music", 10) }} className={`sidebarItem ${selectedItem === 'Music' ? 'selected' : ""}`}><img className='sideBarIcon' width={"20px"} src={musicIcon} alt='Music' /> <span className='sideBarSpan'>Music</span></div>
        <div onClick={() => { handleExplore("Movies", 1) }} className={`sidebarItem ${selectedItem === 'Movies' ? 'selected' : ""}`}><img className='sideBarIcon' width={"20px"} src={filmsIcon} alt='Films' /> <span className='sideBarSpan'>Movies</span></div>
        <div onClick={() => { handleExplore("Blogs", 22) }} className={`sidebarItem ${selectedItem === 'Live' ? 'selected' : ""}`}><img className='sideBarIcon' width={"20px"} src={liveIcon} alt='Live' /> <span className='sideBarSpan'>Live</span></div>
        <div onClick={() => { handleExplore("Gaming", 20) }} className={`sidebarItem ${selectedItem === 'Gaming' ? 'selected' : ""}`}><img className='sideBarIcon' width={"20px"} src={gamingIcon} alt='Gaming' /> <span className='sideBarSpan'>Gaming</span></div>
        <div onClick={() => { handleExplore("News", 25) }} className={`sidebarItem ${selectedItem === 'News' ? 'selected' : ""}`}><img className='sideBarIcon' width={"20px"} src={newsIcon} alt='News' /> <span className='sideBarSpan'>News</span></div>
        <div onClick={() => { handleExplore("Sports", 17) }} className={`sidebarItem ${selectedItem === 'Sports' ? 'selected' : ""}`}><img className='sideBarIcon' width={"20px"} src={sportsIcon} alt='Sports' /> <span className='sideBarSpan'>Sports</span></div>

      </div>
    </div>
  )
}

export default Sidebar