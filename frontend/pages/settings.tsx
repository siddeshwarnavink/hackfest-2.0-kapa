import { Container } from "@mantine/core";
import { t } from "i18next";

import Layout from "@/components/layout";

const CommunityPage: React.FC = () => {
    return (
        <Layout activeNavigation="">
            <Container>
                <h1>{t('settings')}</h1>
            </Container>
        </Layout>
    );
}

export default CommunityPage;