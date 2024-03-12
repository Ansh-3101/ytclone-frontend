import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { googleSignIn } from '@/services/api';
import nProgress from 'nprogress';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '@/redux/reducer/userAuth';
import { setUserStats } from '@/redux/reducer/userStats';
import { setUserSubs } from '@/redux/reducer/userSubs';
import { getAllSubscriptions, getUserStatsApi } from '@/services/api';



const SignIn = () => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

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


    useEffect(() => {
        loading ? nProgress.start() : nProgress.done();
    }, [loading]);


    const handleGoogleSuccess = async (credential) => {
        setLoading(true);
        if (!credential) {
            notify("Some error occured !cred", "error");
            setLoading(false);
        }
        else {
            try {
                const response = await googleSignIn(credential);
                console.log("response", response);
                if (response.status === "ok") {
                    notify(response?.message, "success");
                    dispatch(loginAction(response.user));
                    localStorage.setItem("JWT-TOKEN", response.token);
                    const res = await getUserStatsApi();

                    if (res.status === "ok") {
                        dispatch(setUserStats({
                            likeCount: res.likedVideosCount,
                            subCount: res.subscriptionsCount,
                            watchCount: res.watchLaterCount,
                            user: res.user
                        }));

                    }

                    const subRes = await getAllSubscriptions();

                    if (subRes.status === "ok") {
                        dispatch(setUserSubs(subRes.subscriptions));
                    }
                    setLoading(false);
                }
                else {
                    notify(response?.message, "error");
                    setLoading(false);
                }
            } catch (error) {
                notify("Some error occured  " + error, "error");
            }
        }
    }

    const handleGoogleFailure = async () => {
        notify("Some error occured google", "error");
    }

    return (
        <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
        />
    )
}

// G client id = 356940682119-du1mq7l79ht4pae6hgee83dnhaade3d4.apps.googleusercontent.com
// linkedIn = 77p31p8meerkr7;

// https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin-v2?context=linkedin%2Fconsumer%2Fcontext

export default SignIn
