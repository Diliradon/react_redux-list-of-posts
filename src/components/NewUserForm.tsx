import classNames from 'classnames';
import React, { useState } from 'react';
import { UserData } from '../types/User';

type Props = {
  onSubmit: (user: UserData) => void;
};

export const NewUserForm: React.FC<Props> = ({ onSubmit }) => {
  const [submitting, setSubmitting] = useState(false);

  const [errors, setErrors] = useState({
    name: false,
    username: false,
    email: false,
    phone: false,
  });

  const [{ name, username, email, phone }, setValues] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
  });

  const clearForm = () => {
    setValues({
      name: '',
      username: '',
      email: '',
      phone: '',
    });

    setErrors({
      name: false,
      username: false,
      email: false,
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
      username: !username,
      email: !email,
      phone: !phone,
    });

    if (!name || !username || !email || !phone) {
      return;
    }

    setSubmitting(true);

    await onSubmit({ name, username, email, phone });

    setSubmitting(false);
    setValues({
      name: '',
      username: '',
      email: '',
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

      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-username">
          Author Username
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="username"
            id="comment-author-username"
            placeholder="Username Surname"
            className={classNames('input', { 'is-danger': errors.username })}
            value={username}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors.username && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.username && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': errors.email })}
            value={email}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.email && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-phone">
          Comment Text
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
