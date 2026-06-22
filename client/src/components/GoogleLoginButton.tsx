import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUserValues, setUserValues } from "../feature/UserSlice";

export default function GoogleLoginButton() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <GoogleLogin
            onSuccess={async (credentialResponse) => {
                const token = credentialResponse.credential;
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/google`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: "include",
                        body: JSON.stringify({ token })
                    }
                );

                if (res.ok) {
                    try {
                        const data = await res.json().then((data) => data.user);
                        const user = { _id: data._id, name: data.name, email: data.email, avatar: data.avatar };
                        dispatch(setUserValues(user));
                        navigate("/profile");
                    } catch {
                        () => dispatch(clearUserValues());
                    }
                } else {
                    // handle login error
                    console.error("Login failed");

                }
            }}
        />
    )
}