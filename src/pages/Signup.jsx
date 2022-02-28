import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import routes from '../routes.js';
import Header from './Header.jsx';
import { locale } from '../locales/index.js';
import { ValidationError } from 'yup';

const schema = yup.object().shape({
  // eslint-disable-next-line newline-per-chained-call
  username: yup.string().trim().required().min(3).max(20),
  password: yup.string().required().min(6),
  passwordConfirmation: yup.string()
    .required('password confirmation is a required field')
    .oneOf(
      [yup.ref('password'), null],
      'password confirmation does not match to password',
    ),
});

function Signup() {
  const [isValid, setValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const myStorage = window.localStorage;

  // редирект
  useEffect(() => {
    if (myStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    onSubmit: async (fields) => {
      try {
        schema.validateSync(fields);
        setErrorMessage('');
        await axios.post(routes.signUpPath(), fields);
        navigate('/login');
      } catch (e) {
        switch (e.constructor) {
          case ValidationError: {
            setErrorMessage(e.message);
            break;
          }
          default: {
            setErrorMessage('network error');
          }
        }
      }
    },
  });

  return (
    <>
      <Header hideExitButton />
      <form onSubmit={formik.handleSubmit}>
        <input
          className="form-control my-2"
          type="username"
          name="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        <input
          className="form-control my-2"
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <input
          className="form-control my-2"
          type="passwordConfirmation"
          name="passwordConfirmation"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.passwordConfirmation}
        />
        <div className="form-text">
          {errorMessage}
        </div>
        <button
          className="btn btn-outline-primary my-2"
          type="submit"
        >
          {locale.t('register')}
        </button>
      </form>
    </>
  );
}

export default Signup;
