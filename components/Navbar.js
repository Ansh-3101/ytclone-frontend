import React, { useState, useEffect, useRef } from 'react'
const icon = '/icons/icons8-menu-50.png'
const ytIcon = '/icons/ytNew.png'
const searchIcon = '/icons/icons8-search-50.png'
const logoutIcon = '/icons/icons8-logout-50.png'
const closeIcon = '/icons/icons8-close-50.png'
import Sidebar from './Sidebar'
import { GoogleOAuthProvider } from '@react-oauth/google';
import SignIn from './SignIn'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar } from '@/redux/reducer/sideBarToggle'
import { getUserStatsApi, logoutApi } from '@/services/api'
import { logout as logoutAction } from '@/redux/reducer/userAuth'
import { setUserSubs } from '@/redux/reducer/userSubs'
import { setActiveTag } from '@/redux/reducer/activeTag'




const Navbar = () => {

  const router = useRouter();


  const [query, setQuery] = useState();
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState("");
  const [userPic, setUserPic] = useState()
  const [userStats, setUserStats] = useState({
    likeCount: 0,
    subCount: 0,
    watchCount: 0
  });



  const element = useRef();
  const searchQuery = useRef();
  const loginMenu = useRef();
  const userIcon = useRef();
  const userInfo = useRef();

  let userInfoToggle = false;

  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sideBarToggle.isOpen);

  const user = useSelector((state) => state.userAuth.user);
  const stats = useSelector((state) => state.userStats.stats);





  useEffect(() => {

    if (user) {
      setUserName(user?.name);
      setUserEmail(user?.email);
      setUserPic(user?.iconUrl);

    }

  }, [])



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

  const getUserStats = async () => {

    try {

      setUserStats({
        likeCount: stats.likeCount,
        subCount: stats.subCount,
        watchCount: stats.watchCount
      })
      setUserPic(stats?.user?.iconUrl);
      setUserEmail(stats?.user?.email);
      setUserName(stats?.user?.name);

    } catch (error) {
      console.log('Some error occured' + error)
    }

  }


  useEffect(() => {


    if (user === null || user === undefined) {
      userIcon.current.style.display = "none"
      loginMenu.current.style.display = "block";

    }
    else {
      loginMenu.current.style.display = "none";
      userIcon.current.style.display = "block"

      if (userIcon.current) {
        userIcon.current.src = user.iconUrl;
      }
    }

    userInfo.current.style.display = "none"

  }, [user])


  useEffect(() => {
    if (user) {
      getUserStats();
    }
  }, [stats]);


  const onClickLogo = () => {
    if (router.pathname !== "/") {
      dispatch(setActiveTag({
        tag: "Home",
        id: null
      }))
      router.push('/');
      searchQuery.current.value = "";
    }
  }


  const userToggle = () => {
    if (user) {
      if (userInfoToggle === true) {
        userInfo.current.style.display = "none"
        userInfoToggle = !userInfoToggle
      }
      else {
        userInfo.current.style.display = "flex"
        userInfoToggle = !userInfoToggle
      }
    }
  }

  // useEffect(() => {
  //   userToggle();
  // }, [user]);


  const signout = async () => {

    const response = await logoutApi();

    if (response.status === "ok") {
      dispatch(logoutAction());
      dispatch(setUserSubs([]));
      router.push('/')
      notify("Signed out successfully", "success");
    }
    else {
      notify("Some error occured", "error");
    }


  }

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(`/search/${query}`)
  }

  const handleBlur = (event) => {
    // if (userInfo.current) {
    userInfo.current.style.display = "none"
    // }
  }

  const handleClick = () => {
    if (isOpen) {
      element.current.style.width = "0%";
    }
    else {
      if (window.innerWidth <= "500") {
        element.current.style.width = "60%";
        element.current.style.position = "absolute";
      }
      else {
        if (router.pathname.includes('watch/')) {
          element.current.style.position = "absolute";
          element.current.style.width = "18%";
        }
        else {
          element.current.style.width = "22%";
        }
      }
    }
    dispatch(toggleSidebar())
  }

  useEffect(() => {

    if (window.innerWidth <= "500") {
      element.current.style.width = "0%"
      element.current.style.position = "absolute"
      dispatch(toggleSidebar());
    }

    if (router.pathname.includes('watch/')) {
      element.current.style.position = "absolute"
      element.current.style.width = "0%"
      dispatch(toggleSidebar())
    }
    else {
      if (window.innerWidth <= "500") {
        element.current.style.width = "0%"
        element.current.style.position = "absolute"

      }
      else {
        element.current.style.width = "22%"
        element.current.style.position = "relative"
      }
    }


  }, [router.pathname])


  return (
    <>
      <div id='navbar'>

        <div className='start'>
          <img src={icon} id='menu' onClick={handleClick} alt='menu' />
          <img src={ytIcon} id='logoTitle' width={"110px"} onClick={onClickLogo} alt='logo' />
        </div>

        <div className='center'>
          <img id='searchClose' src={closeIcon} width={"24px"} height={"20px"} alt='icon' />
          <form className='search' onSubmit={handleSubmit}>
            <input id='search' ref={searchQuery} autoComplete="off" name='query' placeholder="Search" type='text' required onChange={(event) => setQuery(event.target.value)} />
          </form>

          <img id="searchIcon" src={searchIcon} width={"24px"} height={"24px"} alt='icon' />
        </div>

        <div className='end'>
          <img src={userPic} onClick={userToggle} ref={userIcon} width={"30px"} height={"30px"} id='profilePic' alt='profilePic' />
          {/* <img src={logout} id='logoutBtn' width={"20px"} height={"20px"}/>
        <img src={settingsIcon} id='settings' width={"20px"} height={"20px"}/> */}
          <div className='userInfo' onBlur={handleBlur} ref={userInfo}>
            <img src={userPic} width={"30px"} height={"30px"} id='userPic' alt='userPic' />
            <div className='userName'>{userName}</div>
            <hr color='#aaaaaa' width={"99%"} />
            <div className='userEmail'>Email: {userEmail}</div>
            <div className='userStats'>
              <h4>Stats</h4>
              <div className='statsItem'>Subscriptions: {userStats?.subCount}</div>
              <div className='statsItem'>Liked videos: {userStats?.likeCount}</div>
              <div className='statsItem'>Watch later: {userStats?.watchCount}</div>
            </div>
            <button id='signout' onClick={signout}><img src={logoutIcon} width={"20px"} height={"20px"} alt='signoutIcon' />Sign out</button>
          </div>
          <div id='googleBtn' ref={loginMenu}>
            <GoogleOAuthProvider clientId="356940682119-du1mq7l79ht4pae6hgee83dnhaade3d4.apps.googleusercontent.com">
              <SignIn />
            </GoogleOAuthProvider>
          </div>

        </div>


      </div>

      <div className='sideBarDiv' ref={element}>
        <Sidebar />
      </div>

    </>
  )
}

export default Navbar