"use client"

import { Card,CardContent,CardFooter,CardHeader } from "../ui/card";
import { BackButton } from "./back-button";
import { Header } from "./header";
import { Social } from "./social";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLable: string;
    backButtonLable: string;
    backButtonHref: string;
    showSocial?: boolean;
};

export const CardWrapper = ({
    children,
    headerLable,
    backButtonLable,
    backButtonHref,
    showSocial
}:CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header lable={headerLable}/>
            </CardHeader>
                <CardContent>
                    {children}
                </CardContent>
                {showSocial && (
                    <CardFooter>
                        <Social />
                    </CardFooter>
                )}
                <CardFooter>
                    <BackButton 
                    href={backButtonHref}
                    lable={backButtonLable}
                    />
                </CardFooter>
        </Card>
    );
}