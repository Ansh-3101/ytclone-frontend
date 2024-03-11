import React from 'react'
import Linkify from 'react-linkify';

const CommentItem = (props) => {
  const { snippet } = props;

  const componentDecorator = (decoratedHref, decoratedText, key) => (
    <a target="blank" href={decoratedHref} key={key} style={{ color: "#3ea6ff", backgroundColor: "#00000000" }}>
      {decoratedText}
    </a>
  );

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

  return (
    <div className='commentItem'>
      <img className='commentImage' src={snippet.authorProfileImageUrl} alt='commentorImg' />
      <div className='commentInfo'>
        <div className='commentStats'><span className='commentor'>{snippet?.authorDisplayName}</span> <span className='commentDate'>{setTime(snippet.publishedAt.slice(0, 19))}</span></div>
        <div className='commentText'><p><Linkify componentDecorator={componentDecorator}>{snippet.textDisplay}</Linkify></p> </div>
      </div>
    </div>
  )
}

export default CommentItem