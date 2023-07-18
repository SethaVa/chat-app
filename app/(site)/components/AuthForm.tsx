"use client"

import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import { useCallback, useState } from "react";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import Separator from "@/app/components/Separator";
import AuthSocialButton from "./AuthSocialButton";
import axios from "axios"

import { BsGithub, BsGoogle} from "react-icons/bs"

type Variant = 'LOGIN' | 'REGISTER';
const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>("LOGIN");
    const [isLoading, setIsLoading] = useState(false);

    const toggleVariant = useCallback(() => {
        if(variant === "LOGIN"){
            setVariant("REGISTER")
        }else{
            setVariant("LOGIN");
        }
    }, [variant])

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if(variant === "REGISTER"){
            axios.post("/api/register", data);
        }

        if(variant === "LOGIN"){
            // Next Auth Sign In
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true);

        // Next Social Sign In
    }

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="px-4 py-8 shadow bg-white sm:rounded-lg sm:px-10">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    { 
                        variant === "REGISTER" && 
                        <Input 
                            label="Name" 
                            id="name"
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                        />
                    }
                    <Input 
                        label="Email" 
                        id="email"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    <Input 
                        label="Password" 
                        id="password"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    <Button
                        type="submit"
                        disabled={isLoading}
                        fullWidth
                    >
                        {variant === "LOGIN"? "Sign in": "Register"}
                    </Button>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="flex items-center absolute inset-0">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>            
                        <div className="text-sm relative flex justify-center">
                            <span className="text-gray-500 bg-white px-2">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-2 mt-6">
                        <AuthSocialButton 
                            icon={BsGithub}
                            disabled={isLoading}
                            onClick={() => socialAction('github')}
                        />
                        <AuthSocialButton 
                            icon={BsGoogle}
                            disabled={isLoading}
                            onClick={() => socialAction('google')}
                        />
                    </div>
                </div>

                <div className="flex gap-2 justify-center text-gray-500 text-sm px-2 mt-6">
                    <div>
                        {variant === "LOGIN"? 'New to Messenger?': "Already have an account?"}
                    </div>
                    <div 
                        onClick={toggleVariant}
                        className="underline cursor-pointer"
                    >
                        {variant === "LOGIN"? 'Create an account': 'Login'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthForm;