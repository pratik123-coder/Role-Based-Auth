
import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";

const Server = async () => {
    const user = await currentUser();
    return ( 
        <UserInfo user={user} lable="Server Component" />
    );
}
 
export default Server;