import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './lang/en.json';
import tr from './lang/tr.json';

const resources = {
    en,
    tr
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: ['tr', 'en'].includes(localStorage.getItem('fooder.lang')) ? localStorage.getItem('fooder.lang') : 'en',

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;