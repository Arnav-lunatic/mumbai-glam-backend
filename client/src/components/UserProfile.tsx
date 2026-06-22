import { useEffect, useState } from "react";

export default function () {
    const [data, setData] = useState<{ status: string; message: string; user: any } | null>(null);

    const userData = async () => {
        try {
            const user = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user`, {
                method: "GET",
                credentials: "include"
            })

            const userJson = await user.json();

            setData(userJson);
        }
        catch (error) {
            console.error("Error fetching profile:", error);
        }
    }

    useEffect(() => {
        userData();
    }, []);

    return (
        <>
            <div>
                <p>{data?.message}</p>
                <p>{data?.user?.name}</p>
                <p>{data?.user?.email}</p>
            </div>
        </>
    )
} 