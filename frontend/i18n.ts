import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                kapa: 'Kapa',
                home: 'Home',
                community: 'Community',
                neighbourhood: 'Neighbourhood',
                store: 'Store',
                settings: 'Settings',
                selectLanguage: 'Select a language',
                likedPost: 'Liked posts',
                savedPost: 'Saved posts',
                myProfile: 'My profile',
                yourComments: 'Your comments',
                logout: 'Logout',
                searchVideos: 'Search videos, people...',
                // home page
                price: 'Price',
                localTalks: 'Local talks',
                videos: 'Videos',
                hotTopics: 'Hot topics',
            },
        },
        ta: {
            translation: {
                kapa: 'கப',
                home: 'வீடு',
                community: 'சமூக',
                neighbourhood: 'அக்கம்',
                store: 'ஸ்டோர்',
                settings: 'அமைப்புகள்',
                selectLanguage: 'மொழியை மாற்றவும் (Language)',
                likedPost: 'விரும்பிய இடுகைகள்',
                savedPost: 'சேமித்த இடுகைகள்',
                myProfile: 'என் சுயவிவரம்',
                yourComments: 'உங்கள் கருத்துக்கள்',
                logout: 'வெளியேறு',
                searchVideos: 'வீடியோக்களைத் தேடுங்கள், நபர்கள்...',
                // home page
                price: 'விலை',
                localTalks: 'உள்ளூர் பேச்சுக்கள்',
                videos: 'வீடியோக்கள்',
                hotTopics: 'சூடான தலைப்புகள்',
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
