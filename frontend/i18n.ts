import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                home: 'Home',
                community: 'Community',
                neighbourhood: 'Neighbourhood',
                store: 'Store',
                // home page
                settings: 'Settings'
            },
        },
        ta: {
            translation: {
                home: 'வீடு',
                community: 'சமூக',
                neighbourhood: 'அக்கம்',
                store: 'ஸ்டோர்',
                // home page
                settings: 'அமைப்புகள்'
            },
        },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
