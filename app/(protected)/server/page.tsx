"use client"
import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";


const Server = () => {
    const user = useCurrentUser();
    const onClick = () => {
        logout();
    }
    return ( 
        <div className="bg-white p-10 rounded-xl">
            
        </div>
     );
}
 
export default Server;