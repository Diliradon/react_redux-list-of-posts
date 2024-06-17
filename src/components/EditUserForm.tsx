import classNames from 'classnames';
import React, { useState } from 'react';
import { User } from '../types/User';

type Props = {
  authorId: number;
  onSubmit: (user: Partial<User>) => void;
};

export const EditUserForm: React.FC<Props> = ({ authorId, onSubmit }) => {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    phone: false,
  });

  const [{ name, phone }, setValues] = useState({
    name: '',
    phone: '',
  });

  const clearForm = () => {
    setValues({
      name: '',
      phone: '',
    });

    setErrors({
      name: false,
      phone: false,
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
      name: !name,
      phone: !phone,
    });

    if (!name || !phone) {
      return;
    }

    setSubmitting(true);

    await onSubmit({ id: authorId, name, phone });

    setSubmitting(false);
    setValues({
      name: '',
      phone: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} onReset={clearForm} data-cy="NewCommentForm">
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': errors.name })}
            value={name}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.name && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-phone">
          Phone Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="phone"
            placeholder="Type phone here"
            className={classNames('textarea', { 'is-danger': errors.phone })}
            value={phone}
            onChange={handleChange}
          />
        </div>

        {errors.phone && (
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
