/*
 * Copyright (c) 2021 LINE Corporation. All rights reserved.
 * LINE Corporation PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React, {useContext} from 'react'
import useSWR from 'swr'

import {ModalContext} from '@/libs/contexts/modal-cotnext'

export interface PostPageProps {}

const PostPage: React.FC<PostPageProps> = () => {
  const { modalHandler } = useContext(ModalContext)

  const { data: posts } =
    useSWR<{ id: number; title: string; author: string }[]>('/posts')

  return (
    <div>
      <div>
        <div>
          <button onClick={modalHandler}>Modal Handler Button</button>
        </div>
      </div>
      <hr />
      <hr />

      {posts
        ?.sort((a, b) => b.id - a.id)
        .map((post) => {
          return (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <div>
                <p>{post.author}</p>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default PostPage
