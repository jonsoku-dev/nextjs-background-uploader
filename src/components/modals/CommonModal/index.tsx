/*
 * Copyright (c) 2021 LINE Corporation. All rights reserved.
 * LINE Corporation PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React, {useContext} from 'react'
import {createPortal} from 'react-dom'

import {ModalContext} from '@/libs/contexts/modal-cotnext'

export interface CommonModalProps {}

const CommonModal: React.FC<CommonModalProps> = () => {
  const { submitHandler, modalHandler, isOpen, percent, isUploading } =
    useContext(ModalContext)
  if (!isOpen) return null
  return createPortal(
    <div
      style={{
        background: isUploading ? 'pink' : 'greenyellow',
        width: '300px',
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h4>progress : {percent}%</h4>
      <h1>Form</h1>
      <div>
        <button disabled={isUploading} onClick={submitHandler}>
          Submit
        </button>
        <button onClick={modalHandler}>Close</button>
      </div>
    </div>,
    document.getElementById('portal')!
  )
}

export default CommonModal
