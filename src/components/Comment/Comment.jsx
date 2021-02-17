import React, { useState, useCallback, useRef, useEffect } from 'react'
import moment from 'moment'
import 'moment/locale/ko'
import './Comment.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import classnames from 'classnames'
import { humanizeNumber } from '@/utils'
export const Comment = ({
  authorChannelUrl,
  authorProfileImageUrl,
  authorDisplayName,
  publishedAt,
  textDisplay,
  textOriginal,
  likeCount,
}) => {
  const [isContentLong, setIsContentLong] = useState(false)
  const [isContentBriefMode, setIsContentBriefMode] = useState(false)

  const contentRef = useRef(null)
  useEffect(() => {
    const originContentHeight = contentRef.current.clientHeight
    if (originContentHeight > 80) {
      setIsContentBriefMode(true)
      setIsContentLong(true)
    }
    const contentAnchors = document.querySelectorAll('.comment-content-body a')
    contentAnchors.forEach((contentAnchor) => {
      contentAnchor.setAttribute('target', '_blank')
    })
  }, [])
  return (
    <div className="comment">
      <div className="comment-thumbnail">
        <a href={authorChannelUrl}>
          <img
            src={authorProfileImageUrl}
            alt={authorDisplayName}
            width={40}
            height={40}
            className="thumbnail"
          />
        </a>
      </div>
      <div className="comment-content">
        <div className="comment-content-header mb-1">
          <a href={authorChannelUrl}>
            <span className="badge">{authorDisplayName}</span>
          </a>
          <span className="time">{moment(publishedAt).fromNow()}</span>
        </div>
        <div
          ref={contentRef}
          className={classnames('comment-content-body', {
            brief: isContentBriefMode,
          })}
          dangerouslySetInnerHTML={{ __html: textDisplay }}
        ></div>
        <div
          className={classnames('comment-content-more', {
            hidden: !isContentLong,
          })}
          onClick={() => setIsContentBriefMode(!isContentBriefMode)}
        >
          {isContentBriefMode ? '자세히 보기' : '간략히 보기'}
        </div>
        <div className="comment-content-footer mt-2">
          <FontAwesomeIcon icon={faThumbsUp} />{' '}
          <span>{humanizeNumber(likeCount)}</span>
        </div>
      </div>
    </div>
  )
}
