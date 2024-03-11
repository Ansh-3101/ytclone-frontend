import React from 'react'
import CommentItem from './CommentItem';


const Comments = (props) => {
  const { object } = props;


  return (
    object?.map((element, i) => {
      let snippet = element.snippet.topLevelComment.snippet;
      return (
        <CommentItem key={i} snippet={snippet} />
      )
    })

  )
}

export default Comments