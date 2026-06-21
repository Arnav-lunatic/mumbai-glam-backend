import { GoogleLogin } from "@react-oauth/google";

export default function GoogleLoginButton() {
    return (
        <GoogleLogin
            onSuccess={async (credentialResponse) => {
                const token = credentialResponse.credential;
                await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/google`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ token })
                    }
                );
            }}
        />
    )
}