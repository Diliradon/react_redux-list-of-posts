/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useState } from 'react';
import { Post } from '../types/Post';
import {
  useAddNewPostMutation,
  useDeletePostMutation,
  useEditPostMutation,
} from '../api/postsApi';
import { NewPostForm } from './NewPostForm';
import { User } from '../types/User';
import { EditPostForm } from './EditPostForm';

type Props = {
  author: User;
  posts: Post[];
  selectedPostId?: number;
  onPostSelected: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  author,
  posts,
  selectedPostId = 0,
  onPostSelected,
}) => {
  const [addNewPost] = useAddNewPostMutation();
  const [deletePost] = useDeletePostMutation();
  const [editPost] = useEditPostMutation();
  const [visible, setVisible] = useState(false);

  return (
    <div data-cy="PostsList">
      <NewPostForm authorId={author?.id || 0} onSubmit={addNewPost} />
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  className="button is-link is-light"
                  onClick={() => setVisible(true)}
                >
                  Edit Post
                </button>
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button', 'is-link', {
                    'is-light': post.id !== selectedPostId,
                  })}
                  onClick={() => {
                    onPostSelected(post.id === selectedPostId ? null : post);
                  }}
                >
                  {post.id === selectedPostId ? 'Close' : 'Open'}
                </button>
                <button
                  type="button"
                  className="button is-link is-light"
                  onClick={() => deletePost(post.id)}
                >
                  Delete Post
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {visible && <EditPostForm authorId={author.id} onSubmit={editPost} />}
    </div>
  );
};
