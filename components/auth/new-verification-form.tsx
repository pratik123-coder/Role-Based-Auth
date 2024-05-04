"use client"

import { CardWrapper } from "@/components/auth/card-wrapper";
import { BeatLoader } from "react-spinners";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { newVerification } from "@/actions/verification";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

const NewVerificationForm = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if ( success || error ) return;
        if (!token) {
            setError("Token is missing");
            return;
        };

        newVerification(token)
            .then((data) => {
                if (data.success) {
                    setSuccess(data.success);
                    setError(null); // Reset error when success
                } else {
                    setError(data.error || "Something went wrong");
                }
            })
            .catch((error) => {
                setError("Something went wrong");
            });
    }, [token,error,success]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <CardWrapper
            headerLable="Confirm Your Verification"
            backButtonLable="Back to Login"
            backButtonHref="/auth/login"
        >
            <div className="flex items-center w-full justify-center">
                {!success && !error &&(
                    <BeatLoader />
                )}
                <FormSuccess message={success} />
                {!success && (
                    <FormError message={error} />
                )}
            </div>
            
        </CardWrapper>
    );
}

export default NewVerificationForm;
