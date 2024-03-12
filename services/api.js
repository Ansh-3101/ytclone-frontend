const API_URL = "https://ytclone-backend.onrender.com";
// const API_URL = "http://localhost:5000";

const key = "AIzaSyBe7MDYvGzRey4IDwJLv4nmZIcUL7BQcTQ";

const getApi = async () => {


    try {
        const response = await fetch(API_URL, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage?.getItem("JWT-TOKEN") || null
            },
        });

        return response.json();
    } catch (error) {
        return {
            status: "error",
            error: "Some error occurred"

        }
    }

}



export const postLike = async (data) => {

    if (!data) return null;

    try {
        const response = await fetch(`${API_URL}/likedVideos/`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                authorization: localStorage?.getItem("JWT-TOKEN") || null,
            },
            mode: "cors",
            credentials: "include",
            withCredentials: true,
            body: JSON.stringify({

                "videoId": data.id,
                "thumbnail": data.videoImage,
                "title": data.title,
                "channelId": data.channelId,
                "channelThumbnail": data.channelImage,
                "channelTitle": data.channelName
            })
        })

        const json = await response.json();

        return json;
    } catch (error) {
        return {
            status: "error",
            error: "Some error occurred"
        }
    }



}

export const postWatchLater = async (data) => {

    if (!data) return null;

    try {
        const response = await fetch(`${API_URL}/watchlater/`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage?.getItem("JWT-TOKEN") || null,
            },
            mode: "cors",
            credentials: "include",
            withCredentials: true,
            body: JSON.stringify({
                "videoId": data.id,
                "thumbnail": data.videoImage,
                "title": data.title,
                "channelId": data.channelId,
                "channelThumbnail": data.channelImage,
                "channelTitle": data.channelName
            })
        })

        const json = await response.json();

        return json;
    } catch (error) {
        return {
            status: "error",
            error: "Some error occured"
        }
    }

}

export const postSubscribe = async (data) => {

    if (!data) return null;

    try {
        const response = await fetch(`${API_URL}/subscribe/`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage?.getItem("JWT-TOKEN") || null,
                accept: "application/json",
            },
            mode: "cors",
            credentials: "include",
            withCredentials: true,
            body:
                JSON.stringify({
                    "channelId": data.channelId,
                    "channelTitle": data.channelName,
                    "channelThumbnail": data.channelImage
                })
        })

        const json = await response.json();
        console.log(json)
        return json;
    }
    catch (error) {
        return {
            status: "error",
            error: "Some error occured"
        }
    }



}

export const postHistory = async (data) => {

    if (!data) return;

    try {
        const response = await fetch(`${API_URL}/history/`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage?.getItem("JWT-TOKEN") || null,
                accept: "application/json",
            },
            mode: "cors",
            credentials: "include",
            withCredentials: true,
            body: JSON.stringify({
                "videoId": data.id,
                "thumbnail": data.videoImage,
                "title": data.title,
                "channelId": data.channelId,
                "channelThumbnail": data.channelImage,
                "channelTitle": data.channelName
            })
        })

        const json = await response.json();
        return json;
    }
    catch (error) {
        return {
            status: "error",
            error: "Some error occured"
        }
    }

}




export const getLiked = async (id) => {

    if (!id) return null;

    try {
        const response = await fetch(`${API_URL}/likedVideos/video/${id}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "appliaction/json",
                accept: "application/json",
                authorization: localStorage?.getItem("JWT-TOKEN") || null,
            },
            mode: "cors",
            credentials: "include",
            withCredentials: true
        })
        const json = await response.json();

        return json;
    }
    catch (error) {
        return {
            status: "error",
            error: "Some error occurred"
        }
    }
}


export const getSubscribed = async (channelId) => {

    if (!channelId) return null;

    try {
        const response = await fetch(`${API_URL}/subscribe/channel/${channelId}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "appliaction/json",
                accept: "application/json",
                authorization: localStorage?.getItem("JWT-TOKEN") || null,
            },
            mode: "cors",
            credentials: "include",
            withCredentials: true,
        })
        const json = await response.json();
        return json;
    }
    catch (error) {
        return {
            status: "error",
            error: "Some error occured"
        }
    }
}

export const getWatchLater = async (id) => {

    if (!id) return null;

    try {
        const response = await fetch(`${API_URL}/watchlater/video/${id}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "appliaction/json",
                accept: "application/json",
                authorization: localStorage?.getItem("JWT-TOKEN") || null,
            },
            mode: "cors",
            credentials: "include",
            withCredentials: true,
        })
        const json = await response.json();
        console.log(json)
        return json;
    }
    catch (error) {
        return {
            status: "error",
            error: "Some error occured"
        }
    }
}

export const getAllSubscriptions = async () => {
    try {
        const response = await fetch(`${API_URL}/subscribe/all`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                authorization: localStorage?.getItem("JWT-TOKEN") || null,
            },
            withCredentials: true,
            credentials: "include",
        });

        const json = await response.json();

        return json;
    } catch (error) {
        return {
            status: "error",
            error: "Some error occurred"
        }
    }
}

export const getAllLikedVideos = async () => {
    try {
        const response = await fetch(`${API_URL}/likedvideos/`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                authorization: localStorage?.getItem("JWT-TOKEN") || null,
            },
            withCredentials: true,
            credentials: "include",
        })

        const json = await response.json();
        return json;
    } catch (error) {
        return {
            status: "error",
            error: "Some error occurred"
        }
    }
}

export const getAllWatchLater = async () => {
    try {
        const response = await fetch(`${API_URL}/watchlater/all`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                authorization: localStorage?.getItem("JWT-TOKEN") || null,
            },
            credentials: "include",
            withCredentials: true,
        })

        const json = await response.json();
        return json;
    } catch (error) {
        return {
            status: "error",
            error: "Some error occurred"
        }
    }
}

export const getHistory = async () => {
    try {
        const response = await fetch(`${API_URL}/history/`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                authorization: localStorage?.getItem("JWT-TOKEN") || null,
            },
            credentials: "include",
            withCredentials: true,
        });

        const json = await response.json();

        return json;
    } catch (error) {
        return {
            status: "error",
            error: "Some error occurred"
        }
    }
}


export const deleteLiked = async (id) => {
    try {
        const response = await fetch(`${API_URL}/likedvideos/${id}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                authorization: localStorage?.getItem("JWT-TOKEN") || null,
            },
            credentials: "include",
            withCredentials: true,
        });

        const json = await response.json();
        return json;
    } catch (error) {
        return {
            status: "error",
            error: "Some error occurred"
        }
    }
}

export const deleteWatchLater = async (id) => {
    try {
        const response = await fetch(`${API_URL}/watchlater/${id}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                authorization: localStorage?.getItem("JWT-TOKEN") || null,
            },
            credentials: "include",
            withCredentials: true,
        });

        const json = await response.json();
        return json;
    } catch (error) {
        return {
            status: "error",
            error: "Some error occurred"
        }
    }
}

export const deleteSubscription = async (channelId) => {
    try {
        const response = await fetch(`${API_URL}/subscribe/${channelId}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                authorization: localStorage?.getItem("JWT-TOKEN") || null,
            },
            credentials: "include",
            withCredentials: true,
        });

        const json = await response.json();
        return json;
    } catch (error) {
        return {
            status: "error",
            error: "Some error occurred"
        }
    }
}






export const fetchData = async (videoId) => {

    if (!videoId) return null;

    try {
        const videoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&part=statistics&id=${videoId}&key=${key}`

        const response = await fetch(videoUrl);
        const json = await response.json();

        const channelJson = await getChannel(json.items[0].snippet.channelId);

        const channelInfo = await getChannelInfo(json.items[0].snippet.channelId);
        const commentsJson = await getComments(videoId);

        const data = {
            json,
            channelJson,
            channelInfo,
            commentsJson
        }

        return data;
    }
    catch (error) {
        return {
            status: "error",
            error: "Some error occurred"
        }
    }

}

export const getChannelInfo = async (channelId) => {
    if (!channelId) return null;

    try {
        // const channelUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=contentDetails&part=statistics&id=${channelId}&key=${key}`
        const channelUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=contentDetails&part=snippet&part=statistics&part=status&part=topicDetails&part=brandingSettings&part=localizations&part=id&part=contentOwnerDetails&id=${channelId}&key=${key}`;
        const response = await fetch(channelUrl);
        const json = await response.json();

        return json;
    }
    catch (error) {
        return {
            status: "error",
            error: "Some error occurred"
        }
    }
}

export const getChannel = async (channelId) => {
    if (!channelId) return null;

    try {
        const channelUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&maxResults=20&key=${key}`
        const channelResponse = await fetch(channelUrl);
        const channelJson = await channelResponse.json();

        return channelJson;
    }
    catch (error) {
        return {
            status: "error",
            error: "Some error occurred"
        }
    }
}

export const getComments = async (videoId) => {
    if (!videoId) return null;

    try {
        const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${key}`
        const commentsRespone = await fetch(commentUrl);
        const commentsJson = await commentsRespone.json();
        return commentsJson;
    }
    catch (error) {
        return {
            status: "error",
            error: "Some error occurred"
        }
    }
}


export const getVideoInfo = async (videoId) => {
    if (!videoId) return null;
    try {
        const videoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&part=statistics&id=${videoId}&key=${key}`

        const request = await fetch(videoUrl);
        const response = await request.json();

        return response;
    } catch (error) {
        return {
            status: "error",
            error: "Some error occurred"
        }
    }

}


export const getHomeVideos = async (id) => {
    let url;
    try {
        if (!id) {
            url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=IN&maxResults=48&key=${key}`
        }
        else {
            url = `https://youtube.googleapis.com/youtube/v3/videos?key=AIzaSyBe7MDYvGzRey4IDwJLv4nmZIcUL7BQcTQ&part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=IN&videoCategoryId=${id}&maxResults=48`
        }

        const request = await fetch(url);
        const response = await request.json();

        console.log(response)
        return response;
    } catch (error) {
        return {
            status: "error",
            error: "Some error occurred"
        }
    }

}



export const getSearchApi = async (query) => {
    if (!query) return null;
    try {
        const searchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&order=relevance&q=${query}&type=video&key=${key}`

        const response = await fetch(searchUrl);
        const json = await response.json();

        console.log(json)
        return json;
    } catch (error) {
        return {
            status: "error",
            error: "Some error occurred"
        }
    }

}


export const googleSignIn = async (googleToken) => {
    try {
        const res = await fetch(`${API_URL}/user/signin`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accept: "application/json",
            },
            mode: "cors",
            credentials: "include",
            withCredentials: true,
            body: JSON.stringify({ googleToken: googleToken.credential }),
        });

        const data = await res.json();
        console.log(data)

        return data;
    } catch (error) {
        console.log(error)
        return {
            status: "error",
            error: "Some error occurred, please try again later",
        };
    }
}


export const logoutApi = async () => {
    try {
        const res = await fetch(`${API_URL}/user/signout`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accept: "application/json",
                authorization: localStorage?.getItem("JWT-TOKEN") || null,
            },
            mode: "cors",
            credentials: "include",
            withCredentials: true,
        });

        const data = await res.json();

        return data;
    } catch (error) {
        return {
            status: "error",
            error: "Some error occurred, please try again later",
        };
    }

}

export const userGetSelf = () => {
    return getApi("/")
};



export const getUserStatsApi = async () => {
    try {
        const response = await fetch(`${API_URL}/user/stats`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                authorization: localStorage?.getItem("JWT-TOKEN") || null,
            },
            credentials: "include",
            withCredentials: true,
        });

        const data = response.json();

        return data;
    } catch (error) {
        return {
            status: "error",
            error: "Some error occurred, please try again later",
        };
    }
}
