
import Layout from "@/components/layout";
import MockLoading from "@/components/ui/mockLoading";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/community/MapComponent"), { ssr: false });


const CommunityPage: React.FC = () => {
    return (
        <Layout activeNavigation="community">
            <MockLoading>
                <Map />
            </MockLoading>
        </Layout>
    );
}

export default CommunityPage;