import nProgress, { set } from "nprogress";
import "nprogress/nprogress.css";
import {
    login as userLoginAction,
    loaded as userLoadedAction,
} from "@/redux/reducer/userAuth";
import { setUserStats } from "@/redux/reducer/userStats";
import { setUserSubs } from "@/redux/reducer/userSubs";
import {
    getAllSubscriptions,
    getUserStatsApi,
    userGetSelf as userGetSelfApi,
} from "@/services/api";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

const Init = () => {
    const dispatch = useDispatch();
    nProgress.configure({ showSpinner: false });


    useEffect(() => {
        const run = async () => {
            nProgress.start();

            const response = await userGetSelfApi();
            if (response.status === "ok") {
                dispatch(userLoginAction(response.user));
            }

            dispatch(userLoadedAction());

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

            nProgress.done();
        };

        run();
    }, [dispatch]);

    return (
        <>
            {/* <ToastContainer className={styles.toastStyle} newestOnTop="true" transition="slide" pauseOnFocusLoss="false" theme='dark' /> */}
        </>
    );
};

export default Init;
