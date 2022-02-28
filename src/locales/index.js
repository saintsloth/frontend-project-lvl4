import i18n from 'i18next';
import en from './en.js';
import ru from './ru.js';

export const locale = i18n.createInstance();
// eslint-disable-next-line no-return-await
export const initLocales = async () => await locale.init({
  lng: 'ru',
  resources: {
    ru,
    en,
  },
});
