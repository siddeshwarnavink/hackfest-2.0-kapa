
import Layout from "@/components/layout";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/community/MapComponent"), { ssr: false });


const CommunityPage: React.FC = () => {
    return (
        <Layout activeNavigation="community">
            <Map />
        </Layout>
    );
}

export default CommunityPage;