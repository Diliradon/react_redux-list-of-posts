import React, { useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { NewUserForm } from './components/NewUserForm';
import { useAddNewUserMutation, useEditUserMutation } from './api/usersApi';
import { useGetUserPostsQuery } from './api/postsApi';
import { EditUserForm } from './components/EditUserForm';

export const App: React.FC = () => {
  const [addNewUser] = useAddNewUserMutation();
  const [editUser] = useEditUserMutation();
  const [author, setAuthor] = useState<User | null>(null);
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
  } = useGetUserPostsQuery(author?.id || 0);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [visible, setVisible] = useState(false);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <NewUserForm onSubmit={addNewUser} />
              </div>

              <div className="block">
                <UserSelector value={author} onChange={setAuthor} />
              </div>

              <div className="block" data-cy="MainContent">
                {author && (
                  <button
                    type="button"
                    className={classNames('button', 'is-link')}
                    onClick={() => setVisible(true)}
                  >
                    Edit User
                  </button>
                )}

                {author && visible && (
                  <EditUserForm authorId={author.id || 0} onSubmit={editUser} />
                )}

                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && isLoading && <Loader />}

                {author && isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Somthing wrong!
                  </div>
                )}

                {author &&
                  !isLoading &&
                  !isError &&
                  !isSuccess &&
                  !(posts || []).length && (
                    <div className="notification" data-cy="NoPostsYet">
                      No posts yet
                    </div>
                )}

                {author && isSuccess && !!posts.length && (
                  <PostsList
                    author={author}
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={setSelectedPost}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
