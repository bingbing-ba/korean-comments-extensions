import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './InfoModal.css'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal'

Modal.setAppElement('#app')

export const InfoModal = ({ showInfoModal, onCloseInfoModal }) => {
  return (
    <Modal
      isOpen={showInfoModal}
      onRequestClose={onCloseInfoModal}
      className="modal-info"
      style={{ overlay: { backgroundColor: 'rgba(0,0,0,0.4)' } }}
    >
      <FontAwesomeIcon
        icon={faTimesCircle}
        size="3x"
        className="modal-close-button"
        onClick={onCloseInfoModal}
      />
      <h1>앱 정보</h1>
      <div className="modal-paragraph">
        <h2>Korean Comments는...</h2>
        <ul>
          <li>영상마다 최대 100개의 댓글을 제공합니다.(인기 댓글 순)</li>
          <li>
            댓글의 업데이트는 3일에 한 번 일어납니다. 많은 분들이 이용해 주실
            수록, 업데이트 기간은 빨라질 수 있습니다.
          </li>
          <li>
            해당 영상에 최초 접속하거나 이미 저장된 댓글의 업데이트 기간(3일)이
            지난 경우, 한글 댓글을 추려내는 시간이 최대 3분 가량 소요될 수
            있습니다.
          </li>
          <li>
            답글 보기는 사용자가 많아지면 추가 구현할 예정입니다.
          </li>
        </ul>
      </div>
      <div className="modal-paragraph">
        <h2>개발자의 말</h2>
        <ul>
          <li>
            <span className="bold">왜 한글 댓글이 이거 밖에 없어?</span> :
            Youtube API에서 인기 댓글을 내부적으로 1700개 까지만 저장하고 있는
            듯합니다. 외국인들이 많이 보는 우리나라 영상(ex. 블랙핑크 등 아이돌
            영상)의 경우, 전체 댓글은 100만개가 넘어도 인기 댓글 1700개 안에
            한글 댓글은 100개가 채 되지 않을 수 있습니다ㅠㅠ 더 많은 분들이 이
            앱을 사용하게 되면, 다른 방법을 통해 더 많은 한글 댓글을 보실 수
            있게 개발할 예정입니다.
          </li>
          <li>
            <span className="bold">업데이트 속도가 너무 느려요</span> : Youtube
            API에서 요청 한 번에 최대 100개의 댓글만을 응답으로 주고 있습니다.
            예를 들어 2000천개의 댓글을 확인하려고 하면 20번의 요청이 이루어져야
            하고, 한 번의 요청에 1초만 걸려도 전체 처리 시간은 20초가 훨씬
            넘어게게 됩니다. 이는 Youtube API의 문제로 당장은 해결이
            어렵습니다ㅠㅠ 좀 더 많은 분들이 이 앱을 이용하게 되면 적극적으로
            해결 방법을 강구하도록 하겠습니다.
          </li>
        </ul>
      </div>
    </Modal>
  )
}
