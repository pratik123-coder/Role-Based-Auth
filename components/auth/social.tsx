"use client"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { Button } from "../ui/button";

export const Social = () => {
    return (
        <div className="flex justify-center w-full gap-x-2">
            <Button variant="outline" size="lg" onClick={()=>{}}>
                <FcGoogle className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" onClick={()=>{}}>
                <FaGithub className="h-5 w-5" />
            </Button>
        </div>
    )
}