import NavBar from "#components/NavBar"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom"
import { clearUserValues, setUserValues } from "./feature/UserSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/user`, {
        method: "GET",
        credentials: "include"
      }).then(async (res) => {
        if (!res.ok) {
          dispatch(clearUserValues());
          return;
        }
        const data = await res.json().then((data) => data.user);
        const user = {_id: data._id, name: data.name, email: data.email, avatar: data.avatar}
        dispatch(setUserValues(user));
      }).catch(() => {
        dispatch(clearUserValues());
      })
    }
    catch (error) {
      console.error("Error fetching profile:", error);
    }
  }, []);
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

export default App
