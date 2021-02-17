import React, { useState } from 'react'
import Modal from 'react-modal'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { TextField, Button } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'
import './BugModal.css'

import { opinionsURL } from '@/utils'

const useStyles = makeStyles(() => {
  const formWidth = window.innerWidth * 0.8 - 50
  return {
    root: {
      '& .MuiTextField-root': {
        width: `${formWidth}px`,
      },
    },
    inputRoot: {
      fontSize: '1.4rem',
      lineHeight: '2rem',
    },
    labelRoot: {
      fontSize: '1.6rem',
    },
  }
})

Modal.setAppElement('#app')
export const BugModal = ({ showBugModal, onCloseBugModal }) => {
  const classes = useStyles()
  const [formUserName, setFormUserName] = useState('')
  const [formContent, setFormContent] = useState('')
  const onChangeFormUserName = (e) => {
    setFormUserName(e.target.value)
  }
  const onChangeFormContent = (e) => {
    setFormContent(e.target.value)
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    if (!formUserName) {
      alert('이름을 써주세요')
      return
    }
    if (!formContent) {
      alert('내용을 써주세요')
      return
    }
    try {
      const { data } = await axios({
        url: opinionsURL,
        method: 'POST',
        data: {
          username: formUserName,
          content: formContent,
        },
      })
      if (data.status === 200) {
        setFormContent('')
        setFormUserName('')
        alert('제출되었습니다. 감사합니다 :)')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Modal
      isOpen={showBugModal}
      onRequestClose={onCloseBugModal}
      className="modal-info"
      style={{ overlay: { backgroundColor: 'rgba(0,0,0,0.4)' } }}
    >
      <FontAwesomeIcon
        icon={faTimesCircle}
        size="3x"
        className="modal-close-button"
        onClick={onCloseBugModal}
      />
      <h1>버그나 개선사항을 알려주세요</h1>
      <div className="modal-paragraph">
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={onSubmit}
        >
          <TextField
            label="이름"
            InputProps={{ classes: { input: classes.inputRoot } }}
            InputLabelProps={{ classes: { root: classes.labelRoot } }}
            value={formUserName}
            onChange={onChangeFormUserName}
          />
          <br/>
          <TextField
            multiline
            rows={4}
            label="내용"
            InputProps={{ classes: { input: classes.inputRoot } }}
            InputLabelProps={{ classes: { root: classes.labelRoot } }}
            value={formContent}
            onChange={onChangeFormContent}
          />
          <Button
            variant="contained"
            color="primary"
            className="mt-1"
            onClick={onSubmit}
          >
            제출하기
          </Button>
        </form>
      </div>
    </Modal>
  )
}
