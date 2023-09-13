import { Container } from "@mantine/core";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { Select } from '@mantine/core';

import Layout from "@/components/layout";

const CommunityPage: React.FC = () => {
    const { i18n } = useTranslation();

    const handleChangeLanguage = (selectedLanguage) => {
        i18n.changeLanguage(selectedLanguage);
    };

    return (
        <Layout activeNavigation="">
            <Container>
                <h1>{t('settings')}</h1>
                <Select
                    label={t('selectLanguage')}
                    placeholder={t('selectLanguage')}
                    value={i18n.language}
                    onChange={handleChangeLanguage}
                    radius="md"
                    data={[
                        { label: 'English', value: 'en' },
                        { label: 'தமிழ்', value: 'ta' },
                    ]}
                />
            </Container>
        </Layout>
    );
}

export default CommunityPage;