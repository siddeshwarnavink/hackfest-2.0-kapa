import { Loader } from "@mantine/core";
import { ReactNode, useEffect, useState } from "react"

function MockLoading(props: { children: ReactNode }) {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => setLoading(false), 1000)
    }, [])

    if (loading) {
        return <Loader />;
    }
    return props.children;
}

export default MockLoading;