import React from 'react';
import { useNavigate } from 'react-router-dom';
import { locale } from '../locales/index.js';

function Header(props) {
  const { hideExitButton } = props;
  const navigate = useNavigate();

  const exitHandler = () => {
    const myStorage = window.localStorage;
    myStorage.removeItem('token');
    navigate('/login');
  };

  const button = (
    <button
      onClick={exitHandler}
      type="button"
      className="btn btn-primary"
    >
      {locale.t('exit')}
    </button>
  );

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Duck Chat</a>
        {(hideExitButton ?? false) ? null : button}
      </div>
    </nav>
  );
}

export default Header;
