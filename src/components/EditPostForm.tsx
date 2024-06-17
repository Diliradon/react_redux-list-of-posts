import classNames from 'classnames';
import React, { useState } from 'react';
import { Post } from '../types/Post';

type Props = {
  authorId: number;
  onSubmit: (user: Partial<Post>) => void;
};

export const EditPostForm: React.FC<Props> = ({ authorId, onSubmit }) => {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    title: false,
  });

  const [{ title }, setValues] = useState({
    title: '',
  });

  const clearForm = () => {
    setValues({
      title: '',
    });

    setErrors({
      title: false,
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
    });

    if (!title) {
      return;
    }

    setSubmitting(true);

    await onSubmit({ id: authorId, title });

    setSubmitting(false);
    setValues({
      title: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} onReset={clearForm} data-cy="NewCommentForm">
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-title">
          Author title
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="title"
            id="comment-author-name"
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

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': submitting,
            })}
          >
            Add User
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
