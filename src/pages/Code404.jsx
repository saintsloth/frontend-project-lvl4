import React from 'react';
import { useLocation } from 'react-router-dom';
import { locale } from '../locales/index.js';
import Header from './Header.jsx';

function Code404() {
  const location = useLocation();

  return (
    <>
      <Header hideExitButton />
      <div>
        <h3>
          {locale.t('noPage')}
          {' '}
          <code>{location.pathname}</code>
        </h3>
      </div>
    </>
  );
}

export default Code404;
