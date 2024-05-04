"use client"
import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";


const Settings = () => {
    const user = useCurrentUser();
    const onClick = () => {
        logout();
    }
    return ( 
        <div className="bg-white p-10 rounded-xlw">
            <button type="submit" onClick={onClick}>
                Logout
            </button>
        </div>
     );
}
 
export default Settings;