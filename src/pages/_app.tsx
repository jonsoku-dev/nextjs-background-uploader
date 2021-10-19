import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import Link from 'next/link'
import React from 'react'
import { SWRConfig } from 'swr'

import CommonModal from '@/components/modals/CommonModal'
import { ModalProvider } from '@/libs/contexts/modal-cotnext'
import axiosInstance from '@/libs/utils/axios-instance'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider>
      <SWRConfig
        value={{
          fetcher: (url) => axiosInstance.get(url).then((res) => res.data),
        }}
      >
        <div>
          <Link href={'/'}>
            <a>home</a>
          </Link>
          <br />
          <Link href={'/posts'}>
            <a>posts</a>
          </Link>
        </div>
        <Component {...pageProps} />
        <CommonModal />
      </SWRConfig>
    </ModalProvider>
  )
}

export default MyApp
