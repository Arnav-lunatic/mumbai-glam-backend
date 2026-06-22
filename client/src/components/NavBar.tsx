import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useSelector } from "react-redux"
import type { RootState } from "../app/store"
import { Spinner } from "./ui/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function NavBar() {
    const user = useSelector((state: RootState) => state.user.user);
    const isLoading = useSelector((state: RootState) => state.user.loading);

    return (
        <div className="fixed top-0 right-0 left-0 p-2 bg-zinc-200">
            {isLoading ?
                <Button disabled variant="outline" >
                    <Spinner data-icon="inline-start" />
                    Loading...
                </Button>
                : (user ?
                    
                    <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.charAt(0)+user.name.charAt(1)}</AvatarFallback>
                    </Avatar>
                    :
                    <Button variant="outline" asChild>
                        <Link to="/login">
                            Login
                        </Link>
                    </Button>)}
        </div>
    )
}