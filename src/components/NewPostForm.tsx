import classNames from 'classnames';
import React, { useState } from 'react';
import { PostData } from '../types/Post';

type Props = {
  authorId: number;
  onSubmit: (data: PostData) => void;
};

export const NewPostForm: React.FC<Props> = ({ authorId, onSubmit }) => {
  const [submitting, setSubmitting] = useState(false);

  const [errors, setErrors] = useState({
    title: false,
    body: false,
  });

  const [{ title, body }, setValues] = useState({
    title: '',
    body: '',
  });

  const clearForm = () => {
    setValues({
      title: '',
      body: '',
    });

    setErrors({
      title: false,
      body: false,
    });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name: field, value } = event.target;

    setValues(current => ({ ...current, [field]: value }));
    setErrors(current => ({ ...current, [field]: false }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setErrors({
      title: !title,
      body: !body,
    });

    if (!title || !body || !authorId) {
      return;
    }

    setSubmitting(true);

    await onSubmit({ userId: authorId, title, body });

    setSubmitting(false);
    setValues({
      title: '',
      body: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} onReset={clearForm} data-cy="NewCommentForm">
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-title">
          Title post
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="title"
            id="comment-author-title"
            placeholder="Title"
            className={classNames('input', { 'is-danger': errors.title })}
            value={title}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors.title && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.title && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Body post
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea', { 'is-danger': errors.body })}
            value={body}
            onChange={handleChange}
          />
        </div>

        {errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': submitting,
            })}
          >
            Add Post
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
