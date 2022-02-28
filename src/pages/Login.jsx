import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { locale } from '../locales/index.js';
import routes from '../routes.js';
import Header from './Header.jsx';

const schema = yup.object().shape({
  username: yup.string().trim().required(),
  password: yup.string().required().min(5),
});

function Login() {
  const [isValid, setValid] = useState(true);
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
    },
    onSubmit: async (fields) => {
      setValid(schema.isValidSync(fields));
      if (isValid) {
        setErrorMessage('');
        try {
          const data = await axios.post(routes.loginPath(), fields);
          const { token, username } = JSON.parse(data.request.response);
          myStorage.setItem('token', token);
          myStorage.setItem('username', username);
          navigate('/');
        } catch (e) {
          setErrorMessage(`${e.message} (${e.response.data.message})`);
        }
      } else {
        setErrorMessage('Неверные имя пользователя или пароль');
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
        <div className="form-text">
          {errorMessage}
        </div>
        <button
          className="btn btn-outline-primary my-2"
          type="submit"
        >
          {locale.t('submit')}
        </button>
        <div className="text-center">
          <span>{locale.t('Нет аккаунта')}
            ?
          </span>
          <a href="/signup">
            {locale.t('registration')}
          </a>
        </div>
      </form>
    </>
  );
}

export default Login;
