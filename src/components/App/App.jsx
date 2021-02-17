import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faBug } from '@fortawesome/free-solid-svg-icons'
import './App.css'
import { Comment, Spinner, InfoModal, BugModal } from '@/components'
import { getVideoIdPromise, commentsURL } from '@/utils'

export const App = () => {

  const [items, setItems] = useState([])
  const [loadingState, setLoadingState] = useState('')
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [showBugModal, setShowBugModal] = useState(false)
  const [updatedBefore, setUpdatedBefore] = useState('')

  const onCloseInfoModal = () => {
    setShowInfoModal(false)
  }
  const onCloseBugModal = () => {
    setShowBugModal(false)
  }
  const getComments = async () => {
    // return true if video have to update comments list
    setLoadingState('read')

    const videoId = await getVideoIdPromise()

    const { data } = await axios({
      url: commentsURL,
      method: 'GET',
      params: {
        v: videoId,
      },
    })

    setLoadingState('')

    if (data?.updated_at) {
      const now = moment()
      const updatedAt = moment(data.updated_at)
      const timediff = now.diff(updatedAt, 'days')

      if (timediff > 2) {
        return true
      }else {
        if (timediff===0){
          setUpdatedBefore('오늘')
        }
        if (timediff===1){
          setUpdatedBefore('어제')
        }
        if (timediff===2){
          setUpdatedBefore('이틀 전에')
        }
      }
    }
    if (data?.items) {
      setItems(data.items)
      return false
    }
    return true
  }

  const updateComments = async () => {
    // return true if updated
    setLoadingState('update')
    const videoId = await getVideoIdPromise()
    const { data } = await axios({
      url: commentsURL,
      method: 'POST',
      data: {
        v: videoId,
      },
    })
    setLoadingState('')
    if (data.status === 200) {
      return true
    }
    return false
  }
  const readAndUpdate = async () => {
    const getCommentsResult = await getComments()
    if (getCommentsResult) {
      //have to update
      const updateCommentsResult = await updateComments()
      if (updateCommentsResult) {
        getComments()
      }
    }
  }

  useEffect(() => {
    readAndUpdate()
  }, [])
  return (
    <>
      <FontAwesomeIcon
        icon={faInfoCircle}
        size="3x"
        color="green"
        className="info-icon"
        onClick={() => {
          setShowInfoModal(true)
        }}
      />
      <FontAwesomeIcon
        icon={faBug}
        size="3x"
        color="blue"
        className="bug-icon"
        onClick={() => {
          setShowBugModal(true)
        }}
      />
      <InfoModal
        showInfoModal={showInfoModal}
        onCloseInfoModal={onCloseInfoModal}
      />
      <BugModal showBugModal={showBugModal} onCloseBugModal={onCloseBugModal} />
      {loadingState ? <Spinner loadingState={loadingState} /> : null}
      {updatedBefore ? <div className="updated-info">{updatedBefore} 업데이트 되었습니다. </div> : null }
      {items.length
        ? items.map((item) => {
            const {
              authorChannelUrl,
              authorDisplayName,
              authorProfileImageUrl,
              updatedAt,
              publishedAt,
              textDisplay,
              textOriginal,
              likeCount,
            } = item.snippet.topLevelComment.snippet
            const props = {
              authorChannelUrl,
              authorDisplayName,
              authorProfileImageUrl,
              updatedAt,
              publishedAt,
              textDisplay,
              textOriginal,
              likeCount,
            }
            return <Comment {...props} key={item.id} />
          })
        : null}
    </>
  )
}
