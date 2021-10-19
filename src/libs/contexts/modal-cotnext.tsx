import React, { useCallback, useState } from 'react'
import useSWR from 'swr'

import axiosInstance from '@/libs/utils/axios-instance'

export interface IModalContext {
  isOpen: boolean
  isUploading: boolean
  percent: number
  modalHandler?: () => void
  submitHandler?: () => void
}

const defaultState = {
  isOpen: false,
  isUploading: false,
  percent: 0,
}

export const ModalContext = React.createContext<IModalContext>(defaultState)

export const ModalProvider: React.FC = ({ children }) => {
  const [percent, setPercent] = useState(defaultState.percent)
  const [isOpen, setIsOpen] = useState(defaultState.isOpen)
  const [isUploading, setIsUploading] = useState(defaultState.isUploading)
  const modalHandler = useCallback(() => {
    if (isOpen && isUploading) {
      setIsUploading(false)
    }
    setIsOpen(!isOpen)
  }, [isOpen, isUploading])

  const { mutate } = useSWR('/posts')

  const submitHandler = async () => {
    setIsUploading(true)
    setPercent(0)
    try {
      await axiosInstance.post(
        '/posts',
        {
          id: +new Date(),
          title: `title-${+new Date()}`,
          author: `jonsoku`,
        },
        {
          onUploadProgress: (e) => {
            console.log(e)
            setPercent(Math.round((100 * e.loaded) / e.total))
          },
        }
      )
      await mutate()
      // modalHandler()
      setIsUploading(false)
    } catch (err) {
      console.log(err)
      setPercent(0)
      setIsUploading(false)
    }
  }
  return (
    <ModalContext.Provider
      value={{
        isOpen,
        isUploading,
        percent,
        modalHandler,
        submitHandler,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}
