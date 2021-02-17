import React from 'react'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Spinner.css'

export const Spinner = ({ loadingState }) => {
  // update 중인지, read 중인지만 표시
  return (
    <div className="spinner-box">
      <FontAwesomeIcon icon={faCircleNotch} spin size="10x" />
      <h2>
        {loadingState === 'update'
          ? '한글 댓글을 업데이트 하는 중입니다. 1분 정도 소요될 수 있습니다.'
          : '한글 댓글을 읽어오고 있습니다.'}
      </h2>
      <h2>
        {loadingState === 'update'
          ? '창을 닫아도 업데이트를 멈추지 않습니다.'
          : null}
      </h2>
    </div>
  )
}
